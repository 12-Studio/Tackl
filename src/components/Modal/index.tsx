'use client';

// Imports
// ------------
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';
import Icon from '@parts/Icon';
import NestedLenis from '@parts/NestedLenis';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Modal = ({ children, title }: I.ModalProps) => {
	// Contexts
	const { setIsModalOpen, setModalActive, modalActive } = use(GlobalContext);

	// Handle Close
	const handleClose = () => {
		setIsModalOpen(false);
		setModalActive('home');
	};

	// Check if modal is open
	const isOpen = modalActive === title;

	return (
		<S.Jacket $isOpen={isOpen}>
			<S.CloseButton
				$isOpen={isOpen}
				aria-label='Close modal'
				type='button'
				data-hover
				onClick={() => handleClose()}
			>
				<Icon type='close' />
			</S.CloseButton>

			<S.Content>
				<S.VerticalLine $isOpen={isOpen}>
					<S.VerticalLinePlus />
					<S.VerticalLinePlus $isEnd />
				</S.VerticalLine>

				<S.Clip $isOpen={isOpen}>
					<NestedLenis isOpen={isOpen}>{children}</NestedLenis>
				</S.Clip>
			</S.Content>
		</S.Jacket>
	);
};

// Exports
// ------------
Modal.displayName = 'Modal';
export default Modal;
