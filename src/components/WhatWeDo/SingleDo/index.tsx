'use client';

// Imports
// ------------
import Button from '@parts/Button';
import ContentBlock from '@parts/ContentBlock';
import Grid from '@waffl';
import ReactPlayer from 'react-player';

// Styles
// ------------
import { Content, Jacket, StickyMedia, Title } from './styles';

// Interfaces
// ------------
import { SingleDoProps } from './interface';

// Component
// ------------
const SingleDo = ({ title, text, alt, threeD }: SingleDoProps) => {
	return (
		<Jacket>
			<Grid $isFullscreen>
				<StickyMedia $l={alt ? '1/7' : '7/13'} $isAlt={alt}>
					<ReactPlayer
						src={threeD}
						muted
						autoPlay
						loop={true}
						playsInline
						controls={false}
						height='100%'
						width='100%'
					/>
				</StickyMedia>

				<Content $l={alt ? '7/12' : '2/7'} $isAlt={alt}>
					<Title>{title}</Title>
					<ContentBlock text={text} />
					<Button
						to='/contact/'
						label='Chat to a strategist'
						icon='chat'
					/>
				</Content>
			</Grid>
		</Jacket>
	);
};

// Exports
// ------------
SingleDo.displayName = 'SingleDo';
export default SingleDo;
