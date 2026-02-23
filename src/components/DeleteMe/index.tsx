'use client';

// Imports
// ------------
import UnicornScene from 'unicornstudio-react/next';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------

const DeleteMe: React.FC<I.DeleteMeProps> = ({ projectId }) => {
	return (
		<S.Jacket>
			<S.Background
				style={
					{
						'--unicorn-width': '100%',
						'--unicorn-height': '100%',
					} as React.CSSProperties
				}
			>
				<UnicornScene
					jsonFilePath='/scene.json'
					width='100%'
					height='100%'
					scale={1}
					dpi={1}
					fps={120}
					altText='Interactive 3D scene'
					ariaLabel='Animated background scene'
					lazyLoad={false}
					production={true}
				/>
			</S.Background>
		</S.Jacket>
	);
};

// Exports
// ------------
export default DeleteMe;
