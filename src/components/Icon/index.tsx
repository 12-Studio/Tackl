// Imports
// ------
import { memo } from 'react';

// Styles
// ------
import { Jacket } from './styles';

// Interfaces
// ------------
import type { IconProps } from './interface';

/**
 * Icon Component
 *
 * A reusable component for displaying SVG icons with consistent styling.
 * Icons are rendered using predefined SVG paths from ICON_MAP.
 *
 * @component
 * @example
 * // Basic usage
 * <Icon type="facebook" />
 *
 * // With custom class and click handler
 * <Icon
 *   type="codepen"
 *   className="custom-icon"
 *   onClick={() => console.log('Icon clicked')}
 * />
 *
 * @param {Object} props - Component props
 * @param {('facebook'|'codepen')} props.type - The type of icon to display
 * @param {string} [props.className] - Optional CSS class name for styling
 * @param {Function} [props.onClick] - Optional click handler
 * @param {string} [props.size='medium'] - Size of the icon ('small'|'medium'|'large')
 * @param {string} [props.color] - Custom color for the icon
 *
 * @returns {React.Element|null} Returns the icon component or null if type is invalid
 */

// Icon map to avoid repetitive if statements
// ------------
const ICON_MAP: Record<string, { viewBox: string; path: React.ReactNode }> = {
	facebook: {
		viewBox: '0 0 24 24',
		path: (
			<path d='M24,12.072A12,12,0,1,0,10.125,23.926V15.541H7.078V12.072h3.047V9.428c0-3.007,1.792-4.669,4.532-4.669a18.611,18.611,0,0,1,2.687.234V7.947H15.83a1.734,1.734,0,0,0-1.947,1.49,1.71,1.71,0,0,0-.008.385v2.25H17.2l-.532,3.469h-2.8v8.385A12,12,0,0,0,24,12.072Z' />
		),
	},
	codepen: {
		viewBox: '0 0 24 24',
		path: (
			<path d='M24,8.2C24,8.2,24,8.2,24,8.2c0-0.1,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0,0,0-0.1c0,0,0,0,0-0.1 c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0-0.1-0.1c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0l-11-7.3 c-0.3-0.2-0.8-0.2-1.1,0l-11,7.3c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0-0.1,0c0,0,0,0,0,0c0,0,0,0-0.1,0.1c0,0,0,0,0,0c0,0,0,0,0,0.1 c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0.1,0,0.1c0,0,0,0,0,0c0,0,0,0.1,0,0.1v7.3 c0,0,0,0.1,0,0.1c0,0,0,0,0,0c0,0,0,0.1,0,0.1c0,0,0,0,0,0c0,0,0,0.1,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0,0,0,0,0.1 c0,0,0,0,0,0c0,0,0,0,0.1,0.1c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0,0l11,7.3c0.2,0.1,0.4,0.2,0.6,0.2 c0.2,0,0.4-0.1,0.6-0.2l11-7.3c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0.1,0c0,0,0,0,0,0c0,0,0,0,0.1-0.1c0,0,0,0,0,0c0,0,0,0,0-0.1 c0,0,0,0,0,0c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0,0,0-0.1,0-0.1V8.3 C24,8.3,24,8.3,24,8.2z M13,3l8.1,5.4l-3.6,2.4l-4.5-3V3z M11,3v4.8l-4.5,3L2.9,8.3L11,3z M2.1,10.3L4.6,12l-2.6,1.7V10.3z M11,21 l-8.1-5.4l3.6-2.4l4.5,3V21z M12,14.4L8.4,12L12,9.6l3.6,2.4L12,14.4z M13,21v-4.8l4.5-3l3.6,2.4L13,21z M21.9,13.7L19.4,12l2.6-1.7 V13.7z' />
		),
	},
	activation: {
		viewBox: '0 0 24 24',
		path: (
			<>
				<path
					d='M17.25 4.5498C20.25 6.2498 22.25 9.5498 22.25 13.2498C22.25 18.7498 17.75 23.2498 12.25 23.2498C6.75 23.2498 2.25 18.7498 2.25 13.2498C2.25 9.5498 4.25 6.3498 7.25 4.5498'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M12.25 1.25V8.25'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
			</>
		),
	},
	dataSupply: {
		viewBox: '0 0 24 24',
		path: (
			<>
				<path
					d='M12.25 15.25V13.25'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M14.3711 16.1289L15.7861 14.7139'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M12.25 21.25C13.9069 21.25 15.25 19.9069 15.25 18.25C15.25 16.5931 13.9069 15.25 12.25 15.25C10.5931 15.25 9.25 16.5931 9.25 18.25C9.25 19.9069 10.5931 21.25 12.25 21.25Z'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M15.25 18.25H17.25'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M14.3711 20.3711L15.7861 21.7861'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M12.25 21.25V23.25'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M10.1298 20.3711L8.71484 21.7861'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M9.25 18.25H7.25'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M10.1298 16.1289L8.71484 14.7139'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M12.25 9.25V5.25'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M12.25 5.25C13.3546 5.25 14.25 4.35457 14.25 3.25C14.25 2.14543 13.3546 1.25 12.25 1.25C11.1454 1.25 10.25 2.14543 10.25 3.25C10.25 4.35457 11.1454 5.25 12.25 5.25Z'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M3.25 5.25C4.35457 5.25 5.25 4.35457 5.25 3.25C5.25 2.14543 4.35457 1.25 3.25 1.25C2.14543 1.25 1.25 2.14543 1.25 3.25C1.25 4.35457 2.14543 5.25 3.25 5.25Z'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M21.25 5.25C22.3546 5.25 23.25 4.35457 23.25 3.25C23.25 2.14543 22.3546 1.25 21.25 1.25C20.1454 1.25 19.25 2.14543 19.25 3.25C19.25 4.35457 20.1454 5.25 21.25 5.25Z'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M5.814 11.814L3.25 9.25V5.25'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M18.6855 11.814L21.2495 9.25V5.25'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
			</>
		),
	},
	about: {
		viewBox: '0 0 24 24',
		path: (
			<>
				<path
					d='M12.25 5.25C11.421 5.25 10.75 4.579 10.75 3.75C10.75 2.921 11.421 2.25 12.25 2.25C13.079 2.25 13.75 2.921 13.75 3.75C13.75 4.579 13.079 5.25 12.25 5.25Z'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M5.25 6.25C4.421 6.25 3.75 5.579 3.75 4.75C3.75 3.921 4.421 3.25 5.25 3.25C6.079 3.25 6.75 3.921 6.75 4.75C6.75 5.579 6.079 6.25 5.25 6.25Z'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M19.25 6.25C20.079 6.25 20.75 5.579 20.75 4.75C20.75 3.921 20.079 3.25 19.25 3.25C18.421 3.25 17.75 3.921 17.75 4.75C17.75 5.579 18.421 6.25 19.25 6.25Z'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M14.25 22.25H10.25L9.75 16.25L7.75 15.25L8.58 10.269C8.692 9.597 9.133 9.01 9.765 8.754C11.422 8.082 13.078 8.082 14.735 8.754C15.366 9.01 15.808 9.597 15.92 10.269L16.75 15.25L14.75 16.25L14.25 22.25Z'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M5.226 9.27344C4.483 9.29244 3.758 9.51644 3.055 10.0164C2.854 10.1594 2.723 10.3854 2.675 10.6264L1.75 15.2504L3.75 16.2504L4.25 21.2504H6.25'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
				<path
					d='M19.274 9.27344C20.017 9.29244 20.742 9.51644 21.445 10.0164C21.646 10.1594 21.777 10.3854 21.825 10.6264L22.75 15.2504L20.75 16.2504L20.25 21.2504H18.25'
					strokeWidth='1.5'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
			</>
		),
	},
	mail: {
		viewBox: '0 0 24 24',
		path: (
			<path d='M21 2H3C2.20435 2 1.44129 2.31607 0.87868 2.87868C0.31607 3.44129 0 4.20435 0 5V19C0 19.7956 0.31607 20.5587 0.87868 21.1213C1.44129 21.6839 2.20435 22 3 22H21C21.7956 22 22.5587 21.6839 23.1213 21.1213C23.6839 20.5587 24 19.7956 24 19V5C24 4.20435 23.6839 3.44129 23.1213 2.87868C22.5587 2.31607 21.7956 2 21 2ZM20.7 6.8L12.7 13.8C12.4822 13.9123 12.2443 13.9803 12 14C11.7557 13.9803 11.5178 13.9123 11.3 13.8L3.3 6.8C3.10109 6.62761 2.9788 6.38326 2.96005 6.12071C2.9413 5.85816 3.02761 5.59891 3.2 5.4C3.37239 5.20109 3.61674 5.0788 3.87929 5.06005C4.14184 5.0413 4.40109 5.12761 4.6 5.3L11.9 11.7L19.2 5.3C19.2972 5.21203 19.4113 5.14465 19.5352 5.1019C19.6592 5.05916 19.7905 5.04194 19.9213 5.05128C20.0521 5.06062 20.1797 5.09633 20.2963 5.15626C20.4129 5.21619 20.5162 5.2991 20.6 5.4C20.7108 5.47664 20.8029 5.57716 20.8697 5.69417C20.9364 5.81117 20.9761 5.94166 20.9857 6.07602C20.9953 6.21038 20.9746 6.34519 20.9251 6.47049C20.8757 6.59579 20.7988 6.7084 20.7 6.8Z' />
		),
	},
	close: {
		viewBox: '0 0 24 24',
		path: (
			<>
				<path d='M5.00015 3.58579L3.58594 5L19.0002 20.4142L20.4144 19L5.00015 3.58579Z' />
				<path d='M19.0002 3.5848L3.58594 18.999L5.00015 20.4132L20.4144 4.99902L19.0002 3.5848Z' />
			</>
		),
	},
	contact: {
		viewBox: '0 0 24 24',
		path: (
			<>
				<path d='M1.25 13.25V19.25C1.25 19.7804 1.46071 20.2891 1.83579 20.6642C2.21086 21.0393 2.71957 21.25 3.25 21.25H21.25C21.7804 21.25 22.2891 21.0393 22.6642 20.6642C23.0393 20.2891 23.25 19.7804 23.25 19.25V13.25' />
				<path d='M23.25 8.25V5.25C23.25 4.71957 23.0393 4.21086 22.6642 3.83579C22.2891 3.46071 21.7804 3.25 21.25 3.25H3.25C2.71957 3.25 2.21086 3.46071 1.83579 3.83579C1.46071 4.21086 1.25 4.71957 1.25 5.25V8.25L12.25 14.25L23.25 8.25Z' />
			</>
		),
	},
	// Add other icons here following same pattern...
};

const Icon = memo(({ type, className, onClick }: IconProps) => {
	// Get icon config from map
	const iconConfig = ICON_MAP[type];

	// If icon type not found, log error and return null
	if (!iconConfig) {
		console.error(
			`Icon type "${type}" not found. Please check the type prop passed to Icon component.`
		);
		return null;
	}

	// Default props for all icons
	const defaultProps = {
		width: '24',
		height: '24',
		xmlns: 'http://www.w3.org/2000/svg',
		className,
		onClick,
		viewBox: iconConfig.viewBox,
	};

	return <Jacket {...defaultProps}>{iconConfig.path}</Jacket>;
});

// Exports
// ------------
Icon.displayName = 'Icon';
export default Icon;
