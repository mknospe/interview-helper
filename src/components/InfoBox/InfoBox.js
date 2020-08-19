import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const InfoBox = ({className = '', children, type = 'info'}) => {
	return (
		<div className={clsx('info-box', className, `info-box--${type}`)}>
			{children}
		</div>
	);
}

InfoBox.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
	type: PropTypes.string,
};

export default InfoBox;
