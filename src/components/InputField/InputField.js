import React from 'react';
import PropTypes from 'prop-types';

const InputField = props => {
	const {
		className,
		disabled = false,
		error = '',
		id,
		label,
		maxLength = 64,
		name = '',
		onChange = () => {},
		placeholder = '',
		type = 'text',
		valid = true,
		value,
	} = props;

	return (
		<React.Fragment>
			{label && <label htmlFor={id}>{label}</label>}
			<input
				id={id}
				className={className}
				name={name}
				type={type}
				value={value}
				placeholder={placeholder}
				maxLength={maxLength}
				onChange={onChange}
				disabled={disabled}
			/>
			{!valid &&
			<div className="invalid-feedback d-block">
				{error}
			</div>
			}
		</React.Fragment>
	);
};

InputField.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	error: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	maxLength: PropTypes.number,
	name: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.oneOf(['text', 'password', 'hidden']),
	valid: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

export default InputField;
