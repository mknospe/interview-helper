import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = props => {
	const {
		className = 'btn-primary',
		children,
		type = 'button',
		disabled = false,
		onClick
	} = props;

	return (
		<button
			type={type}
			className={clsx('btn', className)}
			disabled={disabled}
			onClick={onClick}
			role="button"
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};

export default Button;
