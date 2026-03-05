'use client';

// Imports
// ------------
import { use, useEffect } from 'react';
import { GlobalContext } from '@parts/Contexts';
import Modal from '@parts/Modal';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Activation = ({ title }: I.ActivationProps) => {
	// Context
	const { modalActive } = use(GlobalContext);

	useEffect(() => {
		console.log(modalActive);

		// if (modalActive === 'activation') {
		// 	console.log('activation');
		// }
	}, [modalActive]);

	return (
		<Modal isOpen={modalActive === 'activation'}>
			<S.Jacket>
				<h2>{title}</h2>
			</S.Jacket>
		</Modal>
	);
};

// Exports
// ------------
Activation.displayName = 'Activation';
export default Activation;
