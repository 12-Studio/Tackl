'use client';

// Imports
// ------------
import { useMemo, useState } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import { defaultTokens, steps, validateField } from './steps';
import * as S from './styles';

// Constants
// ------------
const ENDPOINT = '/api/tackl-setup';

// NOTE • Wizard group → CSS variable prefix on :root (radius is --br-*, fonts are --font-*)
const VAR_PREFIX: Record<I.TokenGroup, string> = {
	brand: 'brand',
	global: 'global',
	feedback: 'feedback',
	fonts: 'font',
	space: 'space',
	gap: 'gap',
	radius: 'br',
	time: 'time',
	easing: 'easing',
};

// NOTE • input[type='color'] only accepts #rrggbb — widen #rgb, drop alpha
const toPickerHex = (value: string): string => {
	const hex = value.trim();
	if (/^#[0-9a-fA-F]{3}$/.test(hex)) return `#${[...hex.slice(1)].map(char => char + char).join('')}`;
	if (/^#[0-9a-fA-F]{8}$/.test(hex)) return hex.slice(0, 7);
	return /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : '#000000';
};

// Component
// ------------
// NOTE • First-run theme setup — walks through the theme tokens like a form,
// writes them into src/theme via /api/tackl-setup, then deletes itself
// (component, API route and the marked lines in Providers.tsx).
const TacklSetup = () => {
	// State
	const [screen, setScreen] = useState<I.Screen>('welcome');
	const [tokens, setTokens] = useState<I.TokenValues>(defaultTokens);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	// Derived
	const stepIndex = typeof screen === 'number' ? screen : null;
	const step = stepIndex === null ? undefined : steps[stepIndex];
	const hasStepErrors = (currentStep: I.StepDef): boolean =>
		currentStep.fields.some(field => validateField(currentStep.kind, tokens[field.group][field.key]) !== null);

	// NOTE • Overrides the :root tokens inside the overlay only — the wizard
	// previews itself with the values being typed
	const previewVars = useMemo(
		() =>
			Object.fromEntries(
				(Object.keys(tokens) as I.TokenGroup[]).flatMap(group =>
					Object.entries(tokens[group]).map(([key, value]) => [`--${VAR_PREFIX[group]}-${key}`, value])
				)
			) as React.CSSProperties,
		[tokens]
	);

	// Handlers
	const setValue = (group: I.TokenGroup, key: string, value: string) => {
		setTokens(prev => ({ ...prev, [group]: { ...prev[group], [key]: value } }));
	};

	const submit = async (action: 'finish' | 'skip') => {
		setIsSaving(true);
		setSaveError(null);

		try {
			const response = await fetch(ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(action === 'finish' ? { action, tokens } : { action }),
			});

			if (!response.ok) {
				const payload: unknown = await response.json().catch(() => null);
				const message =
					payload !== null &&
					typeof payload === 'object' &&
					'error' in payload &&
					typeof payload.error === 'string'
						? payload.error
						: 'Setup failed — check the dev server logs.';
				throw new Error(message);
			}

			setScreen('done');
		} catch (error) {
			setSaveError(error instanceof Error ? error.message : 'Setup failed — check the dev server logs.');
		} finally {
			setIsSaving(false);
		}
	};

	// Render
	return (
		<S.Jacket style={previewVars}>
			{screen === 'welcome' && (
				<S.Panel>
					<S.Kicker>Welcome to</S.Kicker>
					<S.Title>Tackl</S.Title>
					<S.Intro>
						Let&rsquo;s make this theme yours. A few quick steps set every design token — colours, type,
						spacing, motion — and write them straight into <code>src/theme</code>. When you finish, this
						wizard deletes itself and the theme is ready for the front end.
					</S.Intro>

					<S.Nav>
						<S.Primary type='button' onClick={() => setScreen(0)}>
							Start setup
						</S.Primary>
						<S.Ghost type='button' onClick={() => submit('skip')} disabled={isSaving}>
							{isSaving ? 'Removing…' : 'Skip — keep the defaults'}
						</S.Ghost>
					</S.Nav>

					{saveError && <S.ErrorText role='alert'>{saveError}</S.ErrorText>}
				</S.Panel>
			)}

			{step !== undefined && stepIndex !== null && (
				<S.Panel>
					<S.Progress>
						Step {stepIndex + 1} of {steps.length}
					</S.Progress>
					<S.StepTitle>{step.title}</S.StepTitle>
					<S.Intro>{step.intro}</S.Intro>

					<S.Fields>
						{step.fields.map(field => {
							const id = `tackl-setup-${field.group}-${field.key}`;
							const value = tokens[field.group][field.key];
							const error = validateField(step.kind, value);

							return (
								<S.Field key={id}>
									<S.Label htmlFor={id}>{field.label}</S.Label>

									{step.kind === 'color' ? (
										<S.ColorRow>
											<S.Swatch
												value={toPickerHex(value)}
												onChange={event => setValue(field.group, field.key, event.target.value)}
												aria-label={`${field.label} colour picker`}
											/>
											<S.Input
												id={id}
												value={value}
												onChange={event => setValue(field.group, field.key, event.target.value)}
												$hasError={error !== null}
												spellCheck={false}
											/>
										</S.ColorRow>
									) : (
										<S.Input
											id={id}
											value={value}
											onChange={event => setValue(field.group, field.key, event.target.value)}
											$hasError={error !== null}
											spellCheck={false}
										/>
									)}

									{error && <S.ErrorText>{error}</S.ErrorText>}
								</S.Field>
							);
						})}
					</S.Fields>

					<S.Nav>
						<S.Ghost type='button' onClick={() => setScreen(stepIndex === 0 ? 'welcome' : stepIndex - 1)}>
							Back
						</S.Ghost>
						<S.Primary
							type='button'
							onClick={() => setScreen(stepIndex === steps.length - 1 ? 'review' : stepIndex + 1)}
							disabled={hasStepErrors(step)}
						>
							{stepIndex === steps.length - 1 ? 'Review' : 'Next'}
						</S.Primary>
					</S.Nav>
				</S.Panel>
			)}

			{screen === 'review' && (
				<S.Panel>
					<S.Progress>Review</S.Progress>
					<S.StepTitle>Everything look right?</S.StepTitle>
					<S.Intro>
						Finishing writes these values into <code>src/theme</code> and removes the wizard for good.
					</S.Intro>

					{steps.map((reviewStep, reviewIndex) => (
						<S.ReviewGroup key={reviewStep.id}>
							<S.ReviewHeader>
								<S.ReviewTitle>{reviewStep.title}</S.ReviewTitle>
								<S.Ghost type='button' onClick={() => setScreen(reviewIndex)}>
									Edit
								</S.Ghost>
							</S.ReviewHeader>

							<S.ReviewList>
								{reviewStep.fields.map(field => (
									<S.ReviewItem key={`${field.group}-${field.key}`}>
										<S.ReviewTerm>{field.label}</S.ReviewTerm>
										<S.ReviewValue>
											{reviewStep.kind === 'color' && (
												<S.ReviewSwatch
													style={{ background: tokens[field.group][field.key] }}
												/>
											)}
											{tokens[field.group][field.key]}
										</S.ReviewValue>
									</S.ReviewItem>
								))}
							</S.ReviewList>
						</S.ReviewGroup>
					))}

					<S.Nav>
						<S.Ghost type='button' onClick={() => setScreen(steps.length - 1)}>
							Back
						</S.Ghost>
						<S.Primary type='button' onClick={() => submit('finish')} disabled={isSaving}>
							{isSaving ? 'Saving…' : 'Finish setup'}
						</S.Primary>
					</S.Nav>

					{saveError && <S.ErrorText role='alert'>{saveError}</S.ErrorText>}
				</S.Panel>
			)}

			{screen === 'done' && (
				<S.Panel>
					<S.Kicker>All done</S.Kicker>
					<S.Title>Happy building</S.Title>
					<S.Intro>
						Your theme is saved and the wizard has removed itself — this overlay will disappear as soon as
						the dev server reloads.
					</S.Intro>
				</S.Panel>
			)}
		</S.Jacket>
	);
};

// Exports
// ------------
TacklSetup.displayName = 'TacklSetup';
export default TacklSetup;
