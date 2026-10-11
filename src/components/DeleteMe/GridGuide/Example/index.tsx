// Imports
// ------------
import Grid from '@waffl';
import Code from '../../Code';
import Tile from '../../Tile';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Component
// ------------
// NOTE • One grid feature as a bento tile: what it does, a live demo (a
// grid nested in the tile, with its own column overlay) and the code
const Example = ({ id, title, children, demo, code, label = 'tsx' }: I.ExampleProps) => (
	<Grid $isFixed className={s.jacket}>
		<Tile aria-labelledby={id}>
			<div className={s.copy}>
				<h3 id={id} className={s.title}>
					{title}
				</h3>
				<div className={s.text}>{children}</div>
			</div>
			{demo}
			<Code label={label} code={code} />
		</Tile>
	</Grid>
);

// Exports
// ------------
Example.displayName = 'Example';
export default Example;
