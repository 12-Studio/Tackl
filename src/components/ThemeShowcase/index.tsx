'use client';

// Imports
// ------------
import { typeRoles, typeScale } from '@tackl/type';
import { borderRadiusValues } from '@theme/borderRadius';
import { baseColors } from '@theme/colors';
import { easingValues } from '@theme/easing';
import { fontFamilies, fontVariables } from '@theme/fonts';
import { gapValues } from '@theme/gap';
import { spaceValues } from '@theme/space';
import { timeValues } from '@theme/time';

// Styles + Interfaces
// ------------
import * as S from './styles';

// Constants
// ------------
const SPECIMEN = 'The quick brown fox jumps over the lazy dog';

// NOTE • Type styles grouped by role so each pair sits under its descriptor
const TYPE_ROLE_STYLES: { role: keyof typeof typeRoles; styles: (keyof typeof typeScale)[] }[] = [
	{ role: 'display', styles: ['displayL', 'displayS'] },
	{ role: 'headline', styles: ['headlineL', 'headlineS'] },
	{ role: 'title', styles: ['titleL', 'titleS'] },
	{ role: 'body', styles: ['bodyL', 'bodyS'] },
	{ role: 'caption', styles: ['captionL', 'captionS'] },
];

// Component
// ------------
// NOTE • A live view of every theme token — it reads the same objects the
// setup wizard writes, so it always shows the current theme in action.
const ThemeShowcase = () => {
	// Render
	return (
		<S.Jacket>
			<S.Block>
				<S.BlockTitle>Colours</S.BlockTitle>
				{Object.entries(baseColors).map(([group, colours]) => (
					<S.SwatchGroup key={group}>
						<S.GroupLabel>{group}</S.GroupLabel>
						<S.Row>
							{Object.entries(colours).map(([name, value]) => (
								<S.SwatchCard key={name}>
									<S.SwatchChip style={{ background: `var(--${group}-${name})` }} />
									<S.TokenName>{name}</S.TokenName>
									<S.TokenValue>{value}</S.TokenValue>
								</S.SwatchCard>
							))}
						</S.Row>
					</S.SwatchGroup>
				))}
			</S.Block>

			<S.Block>
				<S.BlockTitle>Fonts</S.BlockTitle>
				<S.SwatchGroup>
					<S.GroupLabel>Registered</S.GroupLabel>
					{Object.entries(fontVariables).map(([name, cssVariable]) => (
						<S.SpecimenRow key={name}>
							<S.TokenValue>
								{name} · var({cssVariable})
							</S.TokenValue>
							<S.FontRow style={{ fontFamily: `var(${cssVariable})` }}>
								Aa Bb Cc 0123456789 — {SPECIMEN}
							</S.FontRow>
						</S.SpecimenRow>
					))}
				</S.SwatchGroup>
				<S.SwatchGroup>
					<S.GroupLabel>Roles</S.GroupLabel>
					{Object.entries(fontFamilies).map(([role, stack]) => (
						<S.SpecimenRow key={role}>
							<S.TokenValue>
								{role} · {stack}
							</S.TokenValue>
							<S.FontRow style={{ fontFamily: stack }}>Aa Bb Cc — {SPECIMEN}</S.FontRow>
						</S.SpecimenRow>
					))}
				</S.SwatchGroup>
			</S.Block>

			<S.Block>
				<S.BlockTitle>Type scale</S.BlockTitle>
				{TYPE_ROLE_STYLES.map(({ role, styles }) => (
					<S.SwatchGroup key={role}>
						<S.GroupLabel>{role}</S.GroupLabel>
						<S.RoleNote>{typeRoles[role]}</S.RoleNote>
						{styles.map(name => {
							const entry = typeScale[name];

							return (
								<S.SpecimenRow key={name}>
									<S.TokenValue>
										{name} · {entry.base.family}/{entry.base.weight} · {entry.base.size}
										{entry.xl?.size ? ` → ${entry.xl.size} (bp.xl)` : ''}
									</S.TokenValue>
									<S.Specimen $style={name}>{SPECIMEN}</S.Specimen>
								</S.SpecimenRow>
							);
						})}
					</S.SwatchGroup>
				))}
			</S.Block>

			<S.Block>
				<S.BlockTitle>Spacing</S.BlockTitle>
				{Object.entries(spaceValues).map(([name, value]) => (
					<S.BarRow key={name}>
						<S.TokenName>{name}</S.TokenName>
						<S.Bar style={{ width: value }} />
						<S.TokenValue>{value}</S.TokenValue>
					</S.BarRow>
				))}
			</S.Block>

			<S.Block>
				<S.BlockTitle>Gaps</S.BlockTitle>
				{Object.entries(gapValues).map(([name, value]) => (
					<S.BarRow key={name}>
						<S.TokenName>{name}</S.TokenName>
						<S.Bar style={{ width: value }} />
						<S.TokenValue>{value}</S.TokenValue>
					</S.BarRow>
				))}
			</S.Block>

			<S.Block>
				<S.BlockTitle>Radius</S.BlockTitle>
				<S.Row>
					{Object.entries(borderRadiusValues).map(([name, value]) => (
						<S.SwatchCard key={name}>
							<S.RadiusBox style={{ borderRadius: `var(--br-${name})` }} />
							<S.TokenName>{name}</S.TokenName>
							<S.TokenValue>{value}</S.TokenValue>
						</S.SwatchCard>
					))}
				</S.Row>
			</S.Block>

			<S.Block>
				<S.BlockTitle>Motion</S.BlockTitle>
				<S.SwatchGroup>
					<S.GroupLabel>Timing — hover to play (with bezzy)</S.GroupLabel>
					<S.Row>
						{Object.entries(timeValues).map(([name, value]) => (
							<S.MotionChip key={name}>
								<span
									style={{
										transitionDuration: value,
										transitionTimingFunction: 'var(--easing-bezzy)',
									}}
								/>
								<S.TokenName>{name}</S.TokenName>
								<S.TokenValue>{value}</S.TokenValue>
							</S.MotionChip>
						))}
					</S.Row>
				</S.SwatchGroup>
				<S.SwatchGroup>
					<S.GroupLabel>Easing — hover to play (at --time-m)</S.GroupLabel>
					<S.Row>
						{Object.entries(easingValues).map(([name, value]) => (
							<S.MotionChip key={name}>
								<span
									style={{
										transitionDuration: 'var(--time-m)' as string,
										transitionTimingFunction: value,
									}}
								/>
								<S.TokenName>{name}</S.TokenName>
								<S.TokenValue>{value}</S.TokenValue>
							</S.MotionChip>
						))}
					</S.Row>
				</S.SwatchGroup>
			</S.Block>
		</S.Jacket>
	);
};

// Exports
// ------------
ThemeShowcase.displayName = 'ThemeShowcase';
export default ThemeShowcase;
