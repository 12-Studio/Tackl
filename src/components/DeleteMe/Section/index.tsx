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
// NOTE • The shell every landing-page section shares: an eyebrow, a title,
// an optional intro, then the section's own content on the grid
const Section = ({ id, eyebrow, title, intro, children, className }: I.SectionProps) => (
	<section id={id} className={cx(s.jacket, className)} aria-labelledby={id && `${id}-title`} data-pad>
		<Grid $isFixed>
			<Col $m='1/6' $l='1/8' className={s.header}>
				<p className={s.eyebrow}>{eyebrow}</p>
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
