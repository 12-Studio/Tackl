'use client';

// Imports
// ------------
import { cx } from '@utils/cx';
import { useEffect, useState } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Constants
// ------------
const RESET_AFTER_MS = 2000;

// Component
// ------------
// NOTE • A shell command with a copy button — the only client component on
// the landing page
const CopyButton = ({ text, className }: I.CopyButtonProps) => {
	// State
	const [isCopied, setIsCopied] = useState(false);

	// Handlers
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setIsCopied(true);
		} catch {
			// NOTE • Clipboard blocked (permissions, insecure context) — the
			// command is still selectable
		}
	};

	// Effects
	useEffect(() => {
		if (!isCopied) return;
		const timeout = setTimeout(() => setIsCopied(false), RESET_AFTER_MS);
		return () => clearTimeout(timeout);
	}, [isCopied]);

	// Render
	return (
		<div className={cx(s.jacket, className)}>
			<code className={s.command}>
				<span className={s.prompt} aria-hidden='true'>
					$
				</span>
				{text}
			</code>
			<button type='button' className={s.button} onClick={handleCopy}>
				<span aria-live='polite'>{isCopied ? 'Copied' : 'Copy'}</span>
			</button>
		</div>
	);
};

// Exports
// ------------
CopyButton.displayName = 'CopyButton';
export default CopyButton;
