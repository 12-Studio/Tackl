// Imports
// ------------
import { cx } from '@utils/cx';
import { Col } from '@waffl';
import ParticleImage from '../ParticleImage';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Component
// ------------
// NOTE • One bento tile — a grid column, so it takes the usual span props
const Tile = ({
	children,
	as = 'article',
	tone = 'default',
	image,
	imageSizes = '100vw',
	className,
	...props
}: I.TileProps) => (
	<Col as={as} {...props} className={cx(s.jacket, className)} data-tone={tone} data-image={image ? '' : undefined}>
		{image && <ParticleImage image={image} sizes={imageSizes} className={s.image} />}
		{children}
	</Col>
);

// Exports
// ------------
Tile.displayName = 'Tile';
export default Tile;
