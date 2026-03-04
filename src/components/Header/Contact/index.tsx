'use client';

// Imports
// ------------
import Icon from '@parts/Icon';
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import * as S from './styles';

// Component
// ------------
const Contact = () => {
	// Contexts
	const { isModalOpen, setIsModalOpen, setModalActive } = use(GlobalContext);

	// Handle Click
	const handleClick = (label: string) => {
		setIsModalOpen(true);
		setModalActive(label);
	};

	return (
		<S.Jacket
			data-hover
			type='button'
			aria-label='Contact us'
			$isModalOpen={isModalOpen}
			onClick={() => handleClick('contact')}
		>
			<Icon type='mail' />
			<span>Contact</span>
		</S.Jacket>
	);
};

// Exports
// ------------
Contact.displayName = 'Contact';
export default Contact;
