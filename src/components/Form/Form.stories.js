import React from 'react';
import Form from './';
import FormField from '@parts/FormField';

export default {
    title: 'Components/Form',
    component: Form,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        onSubmit: { action: 'submitted' },
        className: { control: 'text' },
    },
};

// Template for all stories
const Template = args => <Form {...args} />;

// Default story with basic form fields
export const Default = Template.bind({});
Default.args = {
    children: (
        <>
            <FormField type="text" name="firstName" label="First Name" placeholder="Enter your first name" required />
            <FormField type="text" name="lastName" label="Last Name" placeholder="Enter your last name" required />
            <FormField type="email" name="email" label="Email Address" placeholder="Enter your email" required />
            <button type="submit">Submit</button>
        </>
    ),
};

// Story with validation errors
export const WithErrors = Template.bind({});
WithErrors.args = {
    children: (
        <>
            <FormField
                type="text"
                name="username"
                label="Username"
                placeholder="Enter username"
                error="Username is required"
                required
            />
            <FormField
                type="email"
                name="email"
                label="Email"
                placeholder="Enter email"
                error="Please enter a valid email"
                required
            />
            <button type="submit">Submit</button>
        </>
    ),
};

// Story with disabled fields
export const Disabled = Template.bind({});
Disabled.args = {
    children: (
        <>
            <FormField type="text" name="username" label="Username" placeholder="Enter username" disabled />
            <FormField type="password" name="password" label="Password" placeholder="Enter password" disabled />
            <button type="submit" disabled>
                Submit
            </button>
        </>
    ),
};
