// Imports
// ------------
import { cx } from '@utils/cx';
import Grid, { Col } from '@waffl';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Component
// ------------
// NOTE • A keynote "slide": a centred headline and intro, then the
// section's bento tiles on the grid
const Section = ({ id, title, intro, children, className }: I.SectionProps) => (
	<section id={id} className={cx(s.jacket, className)} aria-labelledby={id && `${id}-title`} data-pad>
		<Grid $isFixed>
			<Col $m='2/6' $l='3/11' className={s.header}>
				<h2 id={id && `${id}-title`} className={s.title}>
					{title}
				</h2>
				{intro && <div className={s.intro}>{intro}</div>}
			</Col>
		</Grid>

		{children}
	</section>
);

// Exports
// ------------
Section.displayName = 'Section';
export default Section;
