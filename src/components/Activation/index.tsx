'use client';

// Imports
// ------------
import { use, useEffect } from 'react';
import { GlobalContext } from '@parts/Contexts';
import Modal from '@parts/Modal';
import Hero from './Hero';
import PageBuilder from '@parts/PageBuilder';

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Component
// ------------
const Activation = ({
	title,
	heading,
	desc,
	logoMarquee,
	pageBuilder,
	isCtaOverriden,
	ctaHeading,
	ctaButtonLabel,
}: I.ActivationProps) => {
	// Context
	const { modalActive } = use(GlobalContext);

	return (
		<Modal isOpen={modalActive === 'activation'}>
			<Hero logoMarquee={logoMarquee} title={title} heading={heading} desc={desc} />

			{pageBuilder.map(block => (
				<PageBuilder key={`${block.__typename}-${block.id}`} pageBuilder={block} />
			))}

			<div style={{ height: '100lvh', backgroundColor: 'red' }} />
		</Modal>
	);
};

// Exports
// ------------
Activation.displayName = 'Activation';
export default Activation;
