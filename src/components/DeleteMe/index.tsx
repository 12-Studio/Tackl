// Styles
// ------------
import s from './styles.module.scss';

// Component
// ------------
// NOTE • Placeholder landing screen — delete this component (and its usage
// in app/(home)/page.tsx) when you start building.
const DeleteMe = () => {
	return (
		<>
			<div className={s.jacket}>
				<h1 className={s.title}>Tackl</h1>
				<p className={s.hint}>You’re all set — delete this component and start building.</p>
			</div>

			{/* Scroll room so the smooth-scroll setup is feelable out of the box */}
			<div className={s.spacer} aria-hidden />
		</>
	);
};

// Exports
// ------------
export default DeleteMe;
