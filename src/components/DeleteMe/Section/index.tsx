// Imports
// ------------
import { cx } from '@utils/cx';
import Grid, { Col } from '@waffl';
import PinnedStage from '../PinnedStage';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Component
// ------------
// NOTE • A keynote "slide": a centred headline and intro (optionally on
// its own pinned, full-screen stage), then the
// section's bento tiles on the grid
const Section = ({ id, title, intro, children, className, isPinned }: I.SectionProps) => {
	// Render
	const header = (
		<Col $m='2/6' $l='3/11' className={s.header} data-section-header>
			<h2 id={id && `${id}-title`} className={s.title}>
				{title}
			</h2>
			{intro && <div className={s.intro}>{intro}</div>}
		</Col>
	);

	return (
		<section
			id={id}
			className={cx(s.jacket, className)}
			aria-labelledby={id && `${id}-title`}
			data-pad={isPinned ? 'bottom' : true}
		>
			{isPinned ? (
				<PinnedStage>
					<Grid $isFixed className={s.pinned}>
						{header}
					</Grid>
				</PinnedStage>
			) : (
				<Grid $isFixed>{header}</Grid>
			)}

			{children}
		</section>
	);
};

// Exports
// ------------
Section.displayName = 'Section';
export default Section;
