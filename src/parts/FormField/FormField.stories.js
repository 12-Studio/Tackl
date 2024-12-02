import React from 'react';
import FormField from './';

export default {
    title: 'Components/FormField',
    component: FormField,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'tel'],
        },
        name: { control: 'text' },
        id: { control: 'text' },
        label: { control: 'text' },
        placeholder: { control: 'text' },
        value: { control: 'text' },
        error: { control: 'text' },
        required: { control: 'boolean' },
        disabled: { control: 'boolean' },
        className: { control: 'text' },
    },
};

// Template for all stories
const Template = args => <FormField {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
    type: 'text',
    name: 'default-field',
    label: 'Default Field',
    placeholder: 'Enter some text',
};

// With Error story
export const WithError = Template.bind({});
WithError.args = {
    ...Default.args,
    error: 'This field has an error',
};

// Required Field story
export const Required = Template.bind({});
Required.args = {
    ...Default.args,
    required: true,
};

// Disabled Field story
export const Disabled = Template.bind({});
Disabled.args = {
    ...Default.args,
    disabled: true,
};

// Email Field story
export const EmailField = Template.bind({});
EmailField.args = {
    type: 'email',
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
};

// Password Field story
export const PasswordField = Template.bind({});
PasswordField.args = {
    type: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    required: true,
};
