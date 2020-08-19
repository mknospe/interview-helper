import React from 'react';
import PropTypes from 'prop-types';

const Category = ({name, itemCount}) => {
	return (
		<h2>{name} ({itemCount})</h2>
	);
};

Category.propTypes = {
	name: PropTypes.string.isRequired,
	itemCount: PropTypes.number.isRequired,
};

export default Category;