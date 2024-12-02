// Imports
// ------------
import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';

/**
 * FormField - A reusable form field component that can be used for various input types
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.name - Field name attribute
 * @param {string} props.id - Field id attribute
 * @param {string} [props.label] - Label text for the field
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.value] - Field value
 * @param {function} [props.onChange] - Change handler function
 * @param {function} [props.onBlur] - Blur handler function
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.required] - Whether the field is required
 * @param {boolean} [props.disabled] - Whether the field is disabled
 * @param {Object} [props.inputProps] - Additional props to pass to the input element
 * @param {string} [props.className] - Additional CSS classes for the wrapper
 * @param {React.Ref} ref - Forwarded ref
 *
 * @example
 * <FormField
 *   type="email"
 *   name="email"
 *   id="email"
 *   label="Email Address"
 *   placeholder="Enter your email"
 *   required
 *   onChange={(e) => handleChange(e)}
 *   error={errors.email}
 * />
 */

// Styles
// ------------
import { Jacket } from './styles';

// Memoized sub-components
// ------------
const Label = memo(({ fieldId, label, required }) => (
    <label htmlFor={fieldId}>
        {label}
        {required && <span className="required-indicator">*</span>}
    </label>
));

Label.displayName = 'FormField.Label';

const ErrorMessage = memo(({ fieldId, error }) => (
    <span className="error-message" id={`${fieldId}-error`} role="alert">
        {error}
    </span>
));

ErrorMessage.displayName = 'FormField.ErrorMessage';

// Component
// ------------
const FormField = memo(
    forwardRef(
        (
            {
                type = 'text',
                name,
                id,
                label,
                placeholder = 'This is placeholder text, change me',
                value,
                onChange,
                onBlur,
                error,
                required = false,
                disabled = false,
                inputProps = {},
                className = '',
            },
            ref
        ) => {
            // Generate unique ID if none provided
            const fieldId = id || `field-${name}`;

            return (
                <Jacket className={`form-field ${className}`}>
                    {label && <Label fieldId={fieldId} label={label} required={required} />}

                    <input
                        ref={ref}
                        type={type}
                        name={name}
                        id={fieldId}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${fieldId}-error` : undefined}
                        {...inputProps}
                    />

                    {error && <ErrorMessage fieldId={fieldId} error={error} />}
                </Jacket>
            );
        }
    )
);

// Display name
// ------------
FormField.displayName = 'FormField';

// PropTypes
// ------------
FormField.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    inputProps: PropTypes.object,
    className: PropTypes.string,
};

// Exports
// ------------
export default FormField;
