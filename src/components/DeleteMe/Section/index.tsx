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
// NOTE • The Swiss section shell: an ink rule, a numbered label in the
// left columns, and a big light title with its intro to the right
const Section = ({ id, index, eyebrow, title, intro, children, className }: I.SectionProps) => (
	<section id={id} className={cx(s.jacket, className)} aria-labelledby={id && `${id}-title`} data-pad>
		<Grid $isFixed className={s.header}>
			<Col $m='1/3' $l='1/4' className={s.label}>
				<span className={s.index}>{index}</span>
				<span>{eyebrow}</span>
			</Col>
			<Col $m='3/7' $l='4/13' className={s.lead}>
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
