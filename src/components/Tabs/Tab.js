import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Tab = ({label, id = '', isActive = false, onClick}) => {
	const cx = clsx('nav-link', {
		active: isActive
	});

	function handleClick(e) {
		onClick(e, id);
	}

	return (
		<li className="nav-item">
			<a
				className={cx}
				onClick={handleClick}>
				{label}
			</a>
		</li>
	);
};

Tab.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string,
	isActive: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

export default Tab;