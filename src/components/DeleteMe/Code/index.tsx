// Imports
// ------------
import { cx } from '@utils/cx';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Component
// ------------
const Code = ({ label, code, className }: I.CodeProps) => (
	<figure className={cx(s.jacket, className)}>
		{label && <figcaption className={s.label}>{label}</figcaption>}
		<pre className={s.pre}>
			<code>{code.trim()}</code>
		</pre>
	</figure>
);

// Exports
// ------------
Code.displayName = 'Code';
export default Code;
