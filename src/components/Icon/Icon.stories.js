import React from 'react';
import Icon from './';

export default {
	title: 'Components/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		name: {
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

// Template for all stories
const Template = args => <Icon {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
	name: 'home',
};
