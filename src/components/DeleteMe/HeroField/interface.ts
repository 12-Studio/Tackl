// Exports
// ------------
export interface HeroEffect {
	id: string;
	name: string;
	// NOTE • A complete fragment shader — the shared header plus its main()
	fragment: string;
}

export interface HeroFieldProps {
	// NOTE • Wraps the backdrop <Grid> whose column cells the effects follow
	columnsRef: React.RefObject<HTMLElement | null>;
	effect: HeroEffect;
	className?: string;
}
