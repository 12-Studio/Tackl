// Imports
// ------------
import Grid, { Col } from '@waffl';

// Styles
// ------------
import s from './styles.module.scss';

// Component
// ------------
const Outro = () => (
	<footer className={s.jacket} data-pad>
		<Grid $isFixed>
			<Col $m='1/5' $l='1/8'>
				<p className={s.title}>That's Tackl.</p>
				<p className={s.text}>
					This page lives in <code>src/components/DeleteMe</code>. Delete the folder (and its import in{' '}
					<code>app/(site)/(home)/page.tsx</code>) and start building.
				</p>
			</Col>
			<Col $m='5/7' $l='9/13' className={s.meta}>
				<p>MIT licensed</p>
				<p>
					Made by <a href='https://12.studio'>12 Studio</a>
				</p>
			</Col>
		</Grid>
	</footer>
);

// Exports
// ------------
Outro.displayName = 'Outro';
export default Outro;
