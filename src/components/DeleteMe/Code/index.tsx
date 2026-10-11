// Imports
// ------------
import { cx } from '@utils/cx';

// Styles + Interfaces
// ------------
import { highlight, inferLanguage } from './highlight';
import type * as I from './interface';
import s from './styles.module.scss';

// Component
// ------------
// NOTE • A labelled, syntax-highlighted snippet. Highlighting is plain string
// work, so it runs on the server — or in the client for live code
const Code = ({ label, code, language = inferLanguage(label), className }: I.CodeProps) => (
	<figure className={cx(s.jacket, className)}>
		{label && <figcaption className={s.label}>{label}</figcaption>}
		<pre className={s.pre}>
			<code data-language={language}>
				{highlight(code.trim(), language).map(({ type, text }, index) =>
					type ? (
						// biome-ignore lint/suspicious/noArrayIndexKey: tokens are positional and re-derived from the code
						<span key={index} data-token={type}>
							{text}
						</span>
					) : (
						text
					)
				)}
			</code>
		</pre>
	</figure>
);

// Exports
// ------------
Code.displayName = 'Code';
export default Code;
