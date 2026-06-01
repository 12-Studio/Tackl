import { PortableText as PortableTextRenderer } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

type PortableTextProps = {
	value?: PortableTextBlock[];
};

const PortableText = ({ value }: PortableTextProps) => {
	if (!value?.length) {
		return null;
	}

	return <PortableTextRenderer value={value} />;
};

PortableText.displayName = 'PortableText';
export default PortableText;
