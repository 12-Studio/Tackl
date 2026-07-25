'use client';

// Imports
// ------------
import { useEffect, useMemo, useRef, useState } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import { defaultTokens, pxToRem, stepFields, steps, validateField } from './steps';
import * as S from './styles';

// Constants
// ------------
const ENDPOINT = '/api/tackl-setup';
const STORAGE_KEY = 'tackl-setup';

// NOTE • Wizard group → CSS variable prefix on :root (radius is --br-*, fonts are
// --font-*). Type-scale groups are absent — they compile into the styles, not vars.
const VAR_PREFIX: Partial<Record<I.TokenGroup, string>> = {
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

const readFileAsBase64 = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
		reader.onerror = () => reject(new Error('Could not read the font file'));
		reader.readAsDataURL(file);
	});

// Component
// ------------
// NOTE • First-run theme setup — walks through the theme tokens like a form,
// writes them into src/theme via /api/tackl-setup, then deletes itself
// (component, API route and the marked lines in Providers.tsx).
const TacklSetup = () => {
	// Refs
	const fileRef = useRef<HTMLInputElement>(null);

	// State
	const [screen, setScreen] = useState<I.Screen>('welcome');
	const [tokens, setTokens] = useState<I.TokenValues>(defaultTokens);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);
	const [fontName, setFontName] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [uploadedFonts, setUploadedFonts] = useState<I.UploadedFont[]>([]);

	// Derived
	const stepIndex = typeof screen === 'number' ? screen : null;
	const step = stepIndex === null ? undefined : steps[stepIndex];
	const fieldKind = (currentStep: I.StepDef, field: I.FieldDef): I.FieldKind => field.kind ?? currentStep.kind;
	const hasStepErrors = (currentStep: I.StepDef): boolean =>
		stepFields(currentStep).some(
			field => validateField(fieldKind(currentStep, field), tokens[field.group][field.key]) !== null
		);

	// NOTE • Overrides the :root tokens inside the overlay only — the wizard
	// previews itself with the values being typed
	const previewVars = useMemo(
		() =>
			Object.fromEntries(
				(Object.keys(tokens) as I.TokenGroup[]).flatMap(group => {
					const prefix = VAR_PREFIX[group];
					if (!prefix) return [];
					return Object.entries(tokens[group]).map(([key, value]) => [`--${prefix}-${key}`, value]);
				})
			) as React.CSSProperties,
		[tokens]
	);

	// Effects
	// NOTE • Editing the root layout (font upload) hard-reloads the page, so
	// progress lives in sessionStorage until setup completes
	useEffect(() => {
		const raw = sessionStorage.getItem(STORAGE_KEY);
		if (!raw) return;

		try {
			const stored = JSON.parse(raw) as Partial<{
				screen: I.Screen;
				tokens: I.TokenValues;
				uploadedFonts: I.UploadedFont[];
			}>;
			const storedTokens = stored.tokens;

			if (storedTokens) {
				setTokens(
					prev =>
						Object.fromEntries(
							(Object.keys(prev) as I.TokenGroup[]).map(group => [
								group,
								{ ...prev[group], ...storedTokens[group] },
							])
						) as I.TokenValues
				);
			}
			if (stored.uploadedFonts) setUploadedFonts(stored.uploadedFonts);
			if (stored.screen !== undefined) setScreen(stored.screen);
		} catch {
			sessionStorage.removeItem(STORAGE_KEY);
		}
	}, []);

	useEffect(() => {
		if (screen === 'done') {
			sessionStorage.removeItem(STORAGE_KEY);
			return;
		}
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ screen, tokens, uploadedFonts }));
	}, [screen, tokens, uploadedFonts]);

	// Handlers
	const setValue = (group: I.TokenGroup, key: string, value: string) => {
		setTokens(prev => ({ ...prev, [group]: { ...prev[group], [key]: value } }));
	};

	// NOTE • px fields are edited in px but stored in the theme as rem (px ÷ 10)
	const buildPayload = (): I.TokenValues => {
		const payload = structuredClone(tokens);
		for (const payloadStep of steps) {
			for (const field of stepFields(payloadStep)) {
				if (fieldKind(payloadStep, field) === 'px') {
					payload[field.group][field.key] = pxToRem(payload[field.group][field.key]);
				}
			}
		}
		return payload;
	};

	const submit = async (action: 'finish' | 'skip') => {
		setIsSaving(true);
		setSaveError(null);

		try {
			const response = await fetch(ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(action === 'finish' ? { action, tokens: buildPayload() } : { action }),
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

	const uploadFont = async () => {
		const file = fileRef.current?.files?.[0];
		if (!file || !fontName.trim()) {
			setUploadError('Pick a font file and give it a name first');
			return;
		}

		setIsUploading(true);
		setUploadError(null);

		try {
			const response = await fetch(ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					action: 'upload-font',
					name: fontName.trim(),
					fileName: file.name,
					data: await readFileAsBase64(file),
				}),
			});

			const payload: unknown = await response.json().catch(() => null);
			if (!response.ok || payload === null || typeof payload !== 'object') {
				const message =
					payload !== null &&
					typeof payload === 'object' &&
					'error' in payload &&
					typeof payload.error === 'string'
						? payload.error
						: 'Upload failed — check the dev server logs.';
				throw new Error(message);
			}

			const uploaded = payload as I.UploadedFont;
			setUploadedFonts(prev => [...prev, uploaded]);
			setFontName('');
			if (fileRef.current) fileRef.current.value = '';
		} catch (error) {
			setUploadError(error instanceof Error ? error.message : 'Upload failed — check the dev server logs.');
		} finally {
			setIsUploading(false);
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

					{step.sections.map((section, sectionIndex) => (
						<S.Section key={section.title ?? sectionIndex}>
							{section.title && <S.SectionTitle>{section.title}</S.SectionTitle>}

							<S.Fields $columns={section.columns}>
								{section.fields.map(field => {
									const id = `tackl-setup-${field.group}-${field.key}`;
									const kind = fieldKind(step, field);
									const value = tokens[field.group][field.key];
									const error = validateField(kind, value);
									const onChange = (
										event:
											| React.ChangeEvent<HTMLInputElement>
											| React.ChangeEvent<HTMLSelectElement>
									) => setValue(field.group, field.key, event.target.value);

									return (
										<S.Field key={id}>
											<S.Label htmlFor={id}>{field.label}</S.Label>

											{kind === 'color' && (
												<S.ColorRow>
													<S.Swatch
														value={toPickerHex(value)}
														onChange={onChange}
														aria-label={`${field.label} colour picker`}
													/>
													<S.Input
														id={id}
														value={value}
														onChange={onChange}
														$hasError={error !== null}
														spellCheck={false}
													/>
												</S.ColorRow>
											)}

											{kind === 'select' && (
												<S.Select id={id} value={value} onChange={onChange}>
													{(field.options ?? []).map(option => (
														<option key={option} value={option}>
															{option}
														</option>
													))}
												</S.Select>
											)}

											{(kind === 'text' || kind === 'px') && (
												<S.Input
													id={id}
													value={value}
													onChange={onChange}
													$hasError={error !== null}
													spellCheck={false}
													inputMode={kind === 'px' ? 'decimal' : undefined}
												/>
											)}

											{error && <S.ErrorText>{error}</S.ErrorText>}
										</S.Field>
									);
								})}
							</S.Fields>
						</S.Section>
					))}

					{step.hasFontUpload && (
						<S.Upload>
							<S.UploadTitle>Add a font</S.UploadTitle>
							<S.Intro>
								Drops the file into <code>src/theme/fonts/custom</code>, wires it up with next/font and
								registers it under your variable name — then reference it in the stacks above, e.g.{' '}
								<code>var(--my-font), Arial, sans-serif</code>.
							</S.Intro>

							<S.UploadRow>
								<S.Input
									value={fontName}
									onChange={event => setFontName(event.target.value)}
									placeholder='Variable name, e.g. myFont'
									spellCheck={false}
									aria-label='Font variable name'
								/>
								<S.FileInput ref={fileRef} accept='.woff2,.woff,.ttf,.otf' aria-label='Font file' />
								<S.Ghost type='button' onClick={uploadFont} disabled={isUploading}>
									{isUploading ? 'Uploading…' : 'Upload'}
								</S.Ghost>
							</S.UploadRow>

							{uploadedFonts.map(font => (
								<S.UploadHint key={font.cssVariable}>
									✓ <code>{font.exportName}</code> added — use <code>{font.varRef}</code> in a stack
									above
								</S.UploadHint>
							))}
							{uploadError && <S.ErrorText role='alert'>{uploadError}</S.ErrorText>}
						</S.Upload>
					)}

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

							{reviewStep.sections.map((section, sectionIndex) => (
								<S.ReviewBlock key={section.title ?? sectionIndex}>
									{section.title && <S.ReviewSection>{section.title}</S.ReviewSection>}

									<S.ReviewList>
										{section.fields.map(field => (
											<S.ReviewItem key={`${field.group}-${field.key}`}>
												<S.ReviewTerm>{field.label}</S.ReviewTerm>
												<S.ReviewValue>
													{fieldKind(reviewStep, field) === 'color' && (
														<S.ReviewSwatch
															style={{ background: tokens[field.group][field.key] }}
														/>
													)}
													{tokens[field.group][field.key]}
													{fieldKind(reviewStep, field) === 'px' ? 'px' : ''}
												</S.ReviewValue>
											</S.ReviewItem>
										))}
									</S.ReviewList>
								</S.ReviewBlock>
							))}
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
