import type { Meta, StoryObj } from '@storybook/nextjs';
import ThemeShowcase from './';

const meta: Meta<typeof ThemeShowcase> = {
	title: 'Theme/Overview',
	component: ThemeShowcase,
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof ThemeShowcase>;

// NOTE • Reads the live theme objects — always shows the current tokens
export const Overview: Story = {};
