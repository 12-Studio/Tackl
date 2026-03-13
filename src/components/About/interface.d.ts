// Imports
// ------------
import type { PageBuilderBlock } from '@parts/PageBuilder/interface';
import type { HeroProps } from './Hero/interface';

// Exports
// ------------
export interface AboutProps extends HeroProps {
	pageBuilder: PageBuilderBlock[];
}
