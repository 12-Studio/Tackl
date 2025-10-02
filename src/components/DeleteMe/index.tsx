'use client';

// Imports
// ------------
// @ts-ignore
import UnicornScene from 'unicornstudio-react/next';

// Styles
// ------------
import { Background, Jacket } from './styles';

// Interfaces
// ------------
import { DeleteMeProps } from './interface';

// Component
// ------------

const DeleteMe: React.FC<DeleteMeProps> = ({
	projectId = 'p3qwmwgkcE3DmuIEtPzz',
}) => {
	return (
		<Jacket>
			<Background
				style={
					{
						'--unicorn-width': '100%',
						'--unicorn-height': '100%',
					} as React.CSSProperties
				}
			>
				<UnicornScene
					projectId={projectId}
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
			</Background>
		</Jacket>
	);
};

// Exports
// ------------
export default DeleteMe;
