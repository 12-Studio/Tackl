import type { Meta, StoryObj } from '@storybook/nextjs';
import Icon from './';

const meta: Meta<typeof Icon> = {
	title: 'Components/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		type: {
			table: {
				disable: true,
			},
		},
		className: {
			control: 'text',
			table: {
				disable: true,
			},
		},
		onClick: {
			table: {
				disable: true,
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Default story
export const Default: Story = {
	args: {
		type: 'facebook',
	},
};
