import 'styled-components';
import type { Theme } from '@theme/interface';

declare module 'styled-components' {
	export interface DefaultTheme extends Theme {}
}
