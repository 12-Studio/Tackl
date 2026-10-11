// Imports
// ------------
import Grid, { Col } from '@waffl';
import Code from '../../Code';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Component
// ------------
// NOTE • One grid feature: what it does, a live demo, and the code behind it
const Example = ({ id, title, children, demo, code, label = 'tsx' }: I.ExampleProps) => (
	<article className={s.jacket} aria-labelledby={id}>
		<Grid $isFixed>
			<Col $m='1/6' $l='1/7' className={s.copy}>
				<h3 id={id} className={s.title}>
					{title}
				</h3>
				<div className={s.text}>{children}</div>
			</Col>
		</Grid>

		{demo}

		<Grid $isFixed>
			<Col $l='1/9'>
				<Code label={label} code={code} />
			</Col>
		</Grid>
	</article>
);

// Exports
// ------------
Example.displayName = 'Example';
export default Example;
