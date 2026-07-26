'use client';

// Imports
// ------------
import gsap from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import {
	BRAND_LABELS,
	DEFAULT_AVAILABLE_FONTS,
	defaultTokens,
	pxToRem,
	stepFields,
	steps,
	validateField,
} from './steps';
import * as S from './styles';

// Constants
// ------------
const ENDPOINT = '/api/tackl-setup';
const STORAGE_KEY = 'tackl-setup';

// NOTE • Slide 0 is the welcome, then one slide per step, review last
const SLIDE_COUNT = steps.length + 2;
const REVIEW_SLIDE = SLIDE_COUNT - 1;

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
// NOTE • First-run theme setup — every screen is a fullscreen slide on a
// GSAP-driven track (swipe or use the footer to move freely both ways).
// Finishing writes the tokens into src/theme via /api/tackl-setup, then the
// wizard deletes itself (component, API route and the marked lines in
// Providers.tsx).
const TacklSetup = () => {
	// Refs
	const fileRef = useRef<HTMLInputElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const touchStart = useRef<{ x: number; y: number } | null>(null);

	// State
	const [slide, setSlide] = useState(0);
	const [isDone, setIsDone] = useState(false);
	const [tokens, setTokens] = useState<I.TokenValues>(defaultTokens);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);
	const [fontName, setFontName] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [uploadedFonts, setUploadedFonts] = useState<I.UploadedFont[]>([]);
	const [availableFonts, setAvailableFonts] = useState<string[]>(DEFAULT_AVAILABLE_FONTS);

	// Derived
	const fieldKind = (currentStep: I.StepDef, field: I.FieldDef): I.FieldKind => field.kind ?? currentStep.kind;

	// NOTE • The brand section is dynamic — its fields come from state, so any
	// added/removed colours show up everywhere (fields, validation, review)
	const sectionRows = (section: I.SectionDef): I.RowDef[] =>
		section.dynamic === 'brand'
			? [
					{
						fields: Object.keys(tokens.brand).map(key => ({
							group: 'brand' as const,
							key,
							label: BRAND_LABELS[key] ?? key,
						})),
					},
				]
			: section.rows;

	const liveStepFields = (currentStep: I.StepDef): I.FieldDef[] =>
		currentStep.sections.flatMap(section => sectionRows(section).flatMap(row => row.fields));

	const hasStepErrors = (currentStep: I.StepDef): boolean =>
		liveStepFields(currentStep).some(
			field =>
				validateField(fieldKind(currentStep, field), tokens[field.group][field.key], field.optional) !== null
		);

	// NOTE • Navigation is free — validation only gates the finish
	const invalidSteps = steps.filter(hasStepErrors);

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

	// Handlers
	// NOTE • GSAP slides the track — xPercent keeps it resize-proof, and the
	// transient tween needs no revert (it only moves this track)
	const goTo = (index: number) => {
		const target = Math.max(0, Math.min(index, SLIDE_COUNT - 1));
		setSlide(target);
		gsap.to(trackRef.current, { xPercent: -100 * target, duration: 0.6, ease: 'power3.inOut' });
	};

	// NOTE • Lightweight swipe support — a horizontal flick moves one slide
	const handleTouchStart = (event: React.TouchEvent) => {
		const touch = event.touches[0];
		touchStart.current = { x: touch.clientX, y: touch.clientY };
	};

	const handleTouchEnd = (event: React.TouchEvent) => {
		const start = touchStart.current;
		touchStart.current = null;
		if (!start) return;

		const touch = event.changedTouches[0];
		const deltaX = touch.clientX - start.x;
		const deltaY = touch.clientY - start.y;
		if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return;

		goTo(deltaX < 0 ? slide + 1 : slide - 1);
	};

	const setValue = (group: I.TokenGroup, key: string, value: string) => {
		setTokens(prev => ({ ...prev, [group]: { ...prev[group], [key]: value } }));
	};

	const addBrandColour = () => {
		setTokens(prev => {
			const next = Math.max(0, ...Object.keys(prev.brand).map(key => Number.parseInt(key.slice(2), 10) || 0)) + 1;
			return { ...prev, brand: { ...prev.brand, [`bc${next}`]: '#888888' } };
		});
	};

	const removeBrandColour = (key: string) => {
		setTokens(prev => {
			if (Object.keys(prev.brand).length <= 1) return prev;
			const { [key]: _removed, ...rest } = prev.brand;
			return { ...prev, brand: rest };
		});
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

			setIsDone(true);
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
			setAvailableFonts(prev => (prev.includes(uploaded.exportName) ? prev : [...prev, uploaded.exportName]));
			setFontName('');
			if (fileRef.current) fileRef.current.value = '';
		} catch (error) {
			setUploadError(error instanceof Error ? error.message : 'Upload failed — check the dev server logs.');
		} finally {
			setIsUploading(false);
		}
	};

	// Effects
	// NOTE • Editing the root layout (font upload) hard-reloads the page, so
	// progress lives in sessionStorage until setup completes
	useEffect(() => {
		const raw = sessionStorage.getItem(STORAGE_KEY);
		if (!raw) return;

		try {
			const stored = JSON.parse(raw) as Partial<{
				slide: number;
				tokens: I.TokenValues;
				uploadedFonts: I.UploadedFont[];
				availableFonts: string[];
			}>;
			const storedTokens = stored.tokens;

			if (storedTokens) {
				setTokens(
					prev =>
						Object.fromEntries(
							(Object.keys(prev) as I.TokenGroup[]).map(group => [
								group,
								// NOTE • brand is dynamic — restore it verbatim, merge the rest
								group === 'brand' && storedTokens.brand
									? storedTokens.brand
									: { ...prev[group], ...storedTokens[group] },
							])
						) as I.TokenValues
				);
			}
			if (stored.uploadedFonts) setUploadedFonts(stored.uploadedFonts);
			if (stored.availableFonts) setAvailableFonts(stored.availableFonts);
			if (typeof stored.slide === 'number') {
				const target = Math.max(0, Math.min(stored.slide, SLIDE_COUNT - 1));
				setSlide(target);
				gsap.set(trackRef.current, { xPercent: -100 * target });
			}
		} catch {
			sessionStorage.removeItem(STORAGE_KEY);
		}
	}, []);

	useEffect(() => {
		if (isDone) {
			sessionStorage.removeItem(STORAGE_KEY);
			return;
		}
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ slide, tokens, uploadedFonts, availableFonts }));
	}, [isDone, slide, tokens, uploadedFonts, availableFonts]);

	// Render
	if (isDone) {
		return (
			<S.Jacket style={previewVars}>
				<S.Panel $center>
					<S.Kicker>All done</S.Kicker>
					<S.Title>Happy building</S.Title>
					<S.Intro>
						Your theme is saved and the wizard has removed itself — this overlay will disappear as soon as
						the dev server reloads.
					</S.Intro>
				</S.Panel>
			</S.Jacket>
		);
	}

	return (
		<S.Jacket style={previewVars}>
			<S.Slider onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
				<S.Track ref={trackRef}>
					<S.Slide $center>
						<S.Kicker>Welcome to</S.Kicker>
						<S.Title>Tackl</S.Title>
						<S.Intro>
							Let&rsquo;s make this theme yours. Swipe through the slides and set every design token —
							colours, type, spacing, motion — they&rsquo;re written straight into <code>src/theme</code>.
							When you finish, this wizard deletes itself and the theme is ready for the front end.
						</S.Intro>

						<S.Nav>
							<S.Ghost type='button' onClick={() => submit('skip')} disabled={isSaving}>
								{isSaving ? 'Removing…' : 'Skip — keep the defaults'}
							</S.Ghost>
						</S.Nav>

						{saveError && <S.ErrorText role='alert'>{saveError}</S.ErrorText>}
					</S.Slide>

					{steps.map(step => (
						<S.Slide key={step.id}>
							<S.StepTitle>{step.title}</S.StepTitle>
							<S.Intro>{step.intro}</S.Intro>

							{step.hasFontUpload && (
								<S.Upload>
									<S.UploadTitle>Add a font</S.UploadTitle>
									<S.Intro>
										Drops the file into <code>src/theme/fonts/custom</code>, wires it up with
										next/font and registers it in the theme under your name — it appears in the role
										dropdowns below.
									</S.Intro>

									<S.UploadRow>
										<S.Input
											value={fontName}
											onChange={event => setFontName(event.target.value)}
											placeholder='Font name, e.g. myFont'
											spellCheck={false}
											aria-label='Font name'
										/>
										<S.FileInput
											ref={fileRef}
											accept='.woff2,.woff,.ttf,.otf'
											aria-label='Font file'
										/>
										<S.Ghost type='button' onClick={uploadFont} disabled={isUploading}>
											{isUploading ? 'Uploading…' : 'Upload'}
										</S.Ghost>
									</S.UploadRow>

									{uploadedFonts.map(font => (
										<S.UploadHint key={font.cssVariable}>
											✓ <code>{font.exportName}</code> added — pick it in the dropdowns below
										</S.UploadHint>
									))}
									{uploadError && <S.ErrorText role='alert'>{uploadError}</S.ErrorText>}
								</S.Upload>
							)}

							<S.Content>
								{step.sections.map((section, sectionIndex) => (
									<S.Section key={section.title ?? sectionIndex}>
										{section.title && <S.SectionTitle>{section.title}</S.SectionTitle>}

										{sectionRows(section).map((row, rowIndex) => (
											<S.Row key={row.label ?? rowIndex}>
												{row.label && <S.RowLabel>{row.label}</S.RowLabel>}

												<S.Fields>
													{row.fields.map(field => {
														const id = `tackl-setup-${field.group}-${field.key}`;
														const kind = fieldKind(step, field);
														const value = tokens[field.group][field.key];
														const error = validateField(kind, value, field.optional);
														const options =
															field.optionsKey === 'fonts'
																? availableFonts
																: (field.options ?? []);
														const removable =
															section.dynamic === 'brand' &&
															Object.keys(tokens.brand).length > 1;
														const onChange = (
															event:
																| React.ChangeEvent<HTMLInputElement>
																| React.ChangeEvent<HTMLSelectElement>
														) => setValue(field.group, field.key, event.target.value);

														return (
															<S.Field key={id}>
																<S.LabelRow>
																	<S.Label htmlFor={id}>{field.label}</S.Label>
																	{removable && (
																		<S.RemoveButton
																			type='button'
																			onClick={() => removeBrandColour(field.key)}
																			aria-label={`Remove ${field.label}`}
																		>
																			Remove
																		</S.RemoveButton>
																	)}
																</S.LabelRow>

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
																		{options.map(option => (
																			<option key={option} value={option}>
																				{option === '' ? '—' : option}
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
																		inputMode={
																			kind === 'px' ? 'decimal' : undefined
																		}
																	/>
																)}

																{error && <S.ErrorText>{error}</S.ErrorText>}
															</S.Field>
														);
													})}
												</S.Fields>
											</S.Row>
										))}

										{section.dynamic === 'brand' && (
											<S.Nav>
												<S.Ghost type='button' onClick={addBrandColour}>
													+ Add colour
												</S.Ghost>
											</S.Nav>
										)}
									</S.Section>
								))}
							</S.Content>
						</S.Slide>
					))}

					<S.Slide>
						<S.StepTitle>Everything look right?</S.StepTitle>
						<S.Intro>
							Finishing writes these values into <code>src/theme</code> and removes the wizard for good.
						</S.Intro>

						{invalidSteps.length > 0 && (
							<S.ErrorText role='alert'>
								Fix the invalid fields on: {invalidSteps.map(invalid => invalid.title).join(', ')}
							</S.ErrorText>
						)}

						{steps.map((reviewStep, reviewIndex) => (
							<S.ReviewGroup key={reviewStep.id}>
								<S.ReviewHeader>
									<S.ReviewTitle>{reviewStep.title}</S.ReviewTitle>
									<S.Ghost type='button' onClick={() => goTo(reviewIndex + 1)}>
										Edit
									</S.Ghost>
								</S.ReviewHeader>

								{reviewStep.sections.map((section, sectionIndex) => (
									<S.ReviewBlock key={section.title ?? sectionIndex}>
										{section.title && <S.ReviewSection>{section.title}</S.ReviewSection>}

										<S.ReviewList>
											{sectionRows(section).flatMap(row =>
												row.fields
													.filter(field => tokens[field.group][field.key].trim() !== '')
													.map(field => (
														<S.ReviewItem key={`${field.group}-${field.key}`}>
															<S.ReviewTerm>
																{row.label
																	? `${row.label} · ${field.label}`
																	: field.label}
															</S.ReviewTerm>
															<S.ReviewValue>
																{fieldKind(reviewStep, field) === 'color' && (
																	<S.ReviewSwatch
																		style={{
																			background: tokens[field.group][field.key],
																		}}
																	/>
																)}
																{tokens[field.group][field.key]}
																{fieldKind(reviewStep, field) === 'px' &&
																/^\d*\.?\d+$/.test(
																	tokens[field.group][field.key].trim()
																)
																	? 'px'
																	: ''}
															</S.ReviewValue>
														</S.ReviewItem>
													))
											)}
										</S.ReviewList>
									</S.ReviewBlock>
								))}
							</S.ReviewGroup>
						))}

						{saveError && <S.ErrorText role='alert'>{saveError}</S.ErrorText>}
					</S.Slide>
				</S.Track>
			</S.Slider>

			<S.Footer>
				<S.Ghost type='button' onClick={() => goTo(slide - 1)} disabled={slide === 0}>
					Back
				</S.Ghost>

				<S.Progress>
					{slide === 0 && 'Welcome'}
					{slide > 0 &&
						slide < REVIEW_SLIDE &&
						`Step ${slide} of ${steps.length} · ${steps[slide - 1].title}`}
					{slide === REVIEW_SLIDE && 'Review'}
				</S.Progress>

				{slide < REVIEW_SLIDE ? (
					<S.Primary type='button' onClick={() => goTo(slide + 1)}>
						{slide === 0 ? 'Start setup' : 'Next'}
					</S.Primary>
				) : (
					<S.Primary
						type='button'
						onClick={() => submit('finish')}
						disabled={isSaving || invalidSteps.length > 0}
					>
						{isSaving ? 'Saving…' : 'Finish setup'}
					</S.Primary>
				)}
			</S.Footer>
		</S.Jacket>
	);
};

// Exports
// ------------
TacklSetup.displayName = 'TacklSetup';
export default TacklSetup;
