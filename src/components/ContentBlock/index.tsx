'use client';

// Imports
// ------------
import { StructuredText } from 'react-datocms';

// Styles
// ------------
import { Jacket } from './styles';

// Interfaces
// ------------
import { ContentBlockProps } from './interface';

// Component
// ------------
const ContentBlock = ({ text }: ContentBlockProps) => {
	return (
		<Jacket>
			<StructuredText data={text} />
		</Jacket>
	);
};

// Exports
// ------------
ContentBlock.displayName = 'ContentBlock';
export default ContentBlock;
