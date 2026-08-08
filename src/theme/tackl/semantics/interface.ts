// Semantics Types / Interfaces
// ------------
import type { Breakpoints } from '@theme/grid/interface';

// Generate grid props from breakpoints
type GridProps = {
	[K in keyof Breakpoints as `$${K}`]?: string;
};

// SECTION • Semantics
// NOTE — Transient props only; HTML attributes (id, className, style, ref…)
// come from styled.div's own typing on the polymorphic Div base
export interface SemanticProps extends GridProps {
	$marBottom?: boolean;
	$marTop?: boolean;
	$mar?: boolean;
	$padBottom?: boolean;
	$padTop?: boolean;
	$pad?: boolean;
}
