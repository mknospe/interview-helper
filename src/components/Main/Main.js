import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Main = ({children, fullsize = false}) => {
	return (
		<div className={clsx('main', {
			'container-fluid main--fullsize': fullsize,
			'container': !fullsize
		})}>
			{children}
		</div>
	);
};

Main.propTypes = {
	children: PropTypes.any,
	fullsize: PropTypes.bool,
};

export default Main;
