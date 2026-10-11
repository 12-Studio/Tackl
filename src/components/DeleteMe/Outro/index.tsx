// Imports
// ------------
import Grid, { Col } from '@waffl';
import CopyButton from '../CopyButton';

// Styles
// ------------
import s from './styles.module.scss';

// Component
// ------------
const Outro = () => (
	<footer className={s.jacket} data-pad>
		<Grid $isFixed>
			<Col $m='2/6' $l='3/11' className={s.inner}>
				<p className={s.title}>Tackl.</p>
				<p className={s.tagline}>Start on the design, not the setup.</p>
				<CopyButton text='bunx tackl' />
			</Col>

			<Col className={s.footer}>
				<p>
					This page lives in <code>src/components/DeleteMe</code> — delete the folder (and its import in{' '}
					<code>app/(site)/(home)/page.tsx</code>) and start building.
				</p>
				<p>
					MIT licensed · Made by <a href='https://12.studio'>12 Studio</a>
				</p>
			</Col>
		</Grid>
	</footer>
);

// Exports
// ------------
Outro.displayName = 'Outro';
export default Outro;
