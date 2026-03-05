'use client';

// Imports
// ------------
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';
import Icon from '@parts/Icon';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Modal = ({ children, isOpen }: I.ModalProps) => {
	// Contexts
	const { setIsModalOpen, setModalActive } = use(GlobalContext);

	// Handle Close
	const handleClose = () => {
		setIsModalOpen(false);
		setModalActive('home');
	};

	return (
		<S.Jacket $isOpen={isOpen}>
			<S.VerticalLine $isOpen={isOpen}>
				<S.VerticalLinePlus />
				<S.VerticalLinePlus $isEnd />
			</S.VerticalLine>

			<S.Content $isOpen={isOpen}>{children}</S.Content>

			<S.CloseButton
				$isOpen={isOpen}
				aria-label='Close modal'
				type='button'
				data-hover
				onClick={() => handleClose()}
			>
				<Icon type='close' />
			</S.CloseButton>
		</S.Jacket>
	);
};

// Exports
// ------------
Modal.displayName = 'Modal';
export default Modal;
