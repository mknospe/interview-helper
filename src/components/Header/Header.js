import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Header = ({title, fullsize = false}) => {
	return (
		<header>
			<div
				className={clsx({
					'container-fluid': fullsize,
					'container': !fullsize,
				})}
			>
				<div className="row">
					<div className="col">
						<h2 className="headline">{title}</h2>
					</div>
				</div>
			</div>
		</header>
	);
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
	fullsize: PropTypes.bool,
};

export default Header;
