// Imports
// ------------
// NOTE • No 'use client' — it's rendered by the server 404 pages and by the
// client error boundaries alike

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// NOTE • For the links and buttons passed as children
export const actionClass = s.action;

// Component
// ------------
// NOTE • The shared layout of the 404 and error pages (app/(site)/not-found,
// app/global-not-found, app/(site)/error, app/global-error)
const StatusPage = ({ code, title, message, children }: I.StatusPageProps) => (
	<section className={s.jacket}>
		{code && <p className={s.code}>{code}</p>}
		<h1 className={s.title}>{title}</h1>
		{message && <p className={s.message}>{message}</p>}
		{children && <div className={s.actions}>{children}</div>}
	</section>
);

// Exports
// ------------
StatusPage.displayName = 'StatusPage';
export default StatusPage;
