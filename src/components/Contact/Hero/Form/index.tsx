'use client';

// Imports
// ------------
import Button from '@parts/Button';
import { useActionState, useEffect, useRef, startTransition } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Constants
// ------------
const FORM_NAME = 'contact';
const FORM_ACTION = '/__forms.html';
const FORM_DATA = {
	radios: [
		{ label: 'Platform' },
		{ label: 'Agency' },
		{ label: 'Brand' },
		{ label: 'General Enquiry' },
	],
	inputs: {
		name: {
			label: 'Name',
			placeholder: 'Name',
		},
		email: {
			label: 'Email',
			placeholder: 'Email',
		},
		message: {
			label: 'Message',
			placeholder: 'Start your message...',
		},
	},
};

const FAKE_SUCCESS = process.env.NODE_ENV === 'development'; // Set to true to test success UI

const submitContact = async (_prevState: I.FormState, formData: FormData): Promise<I.FormState> => {
	if (FAKE_SUCCESS) {
		await new Promise(r => setTimeout(r, 800)); // Simulate network delay
		return { status: 'success' };
	}

	const params = new URLSearchParams();
	formData.forEach((value, key) => {
		if (typeof value === 'string') params.append(key, value);
	});

	try {
		const response = await fetch(FORM_ACTION, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: params.toString(),
		});

		if (!response.ok) throw new Error('Submission failed');
		return { status: 'success' };
	} catch {
		return { status: 'error' };
	}
};

// Component
// ------------
const Form = () => {
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction, isPending] = useActionState(submitContact, {
		status: 'idle',
	} satisfies I.FormState);

	useEffect(() => {
		if (state.status === 'success' && formRef.current) {
			formRef.current.reset();
		}
	}, [state.status]);

	const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);
		startTransition(() => {
			formAction(formData);
		});
	};

	const handleButtonClick = () => {
		if (!formRef.current) return;
		const formData = new FormData(formRef.current);
		startTransition(() => {
			formAction(formData);
		});
	};

	return (
		<S.Jacket
			ref={formRef}
			name={FORM_NAME}
			method='POST'
			data-netlify='true'
			onSubmit={handleSubmit}
		>
			<input type='hidden' name='form-name' value={FORM_NAME} />

			<S.Radios>
				<h3>What are you?</h3>

				<fieldset>
					{FORM_DATA.radios.map(({ label }, index) => {
						// Label to Value
						const labelToValue = label.toLowerCase().replace(/ /g, '-');
						const isLast = index === FORM_DATA.radios.length - 1;

						return (
							<S.Radio data-hover key={labelToValue}>
								<input
									type='radio'
									name='typical-radio'
									value={labelToValue}
									defaultChecked={isLast}
								/>
								<span>{label}</span>
							</S.Radio>
						);
					})}
				</fieldset>
			</S.Radios>

			<S.Inputs>
				<S.Input
					data-hover
					required
					type='text'
					id={FORM_DATA.inputs.name.label}
					name={FORM_DATA.inputs.name.label}
					placeholder={FORM_DATA.inputs.name.placeholder}
					autoComplete='name'
					$area='name'
				/>
				<S.Input
					data-hover
					required
					type='email'
					id={FORM_DATA.inputs.email.label}
					name={FORM_DATA.inputs.email.label}
					placeholder={FORM_DATA.inputs.email.placeholder}
					autoComplete='email'
					$area='email'
				/>
				<S.TextArea
					data-hover
					required
					id={FORM_DATA.inputs.message.label}
					name={FORM_DATA.inputs.message.label}
					placeholder={FORM_DATA.inputs.message.placeholder}
					autoComplete='off'
					$area='message'
				/>
			</S.Inputs>

			<S.StatusButtonContainer>
				{state.status === 'success' && (
					<S.Status $variant='success'>Thanks! We'll be in touch shortly.</S.Status>
				)}
				{state.status === 'error' && (
					<S.Status $variant='error'>Something went wrong. Please try again.</S.Status>
				)}

				<Button
					type='button'
					onClick={handleButtonClick}
					label={isPending ? 'Sending...' : 'Put me in touch'}
					onLight
					disabled={isPending}
				/>
			</S.StatusButtonContainer>
		</S.Jacket>
	);
};

// Exports
// ------------
Form.displayName = 'Form';
export default Form;
