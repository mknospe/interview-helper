import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../InputField';
import Button from '../Button';

const Category = ({category, onChange, onDelete}) => {
	function handleChange(e) {
		onChange(category.id, e.target.value);
	}

	function handleDelete() {
		if (confirm(`Do you really want to delete the category "${category.name}" and all of its questions?`)) {
			onDelete(category.id);
		}
	}

	return (
		<div className="row">
			<div className="col">
				<InputField
					className="form-control"
					label="Name"
					value={category.name}
					onChange={handleChange}
				/>
			</div>
			<div className="col d-flex align-items-end justify-content-end">
				<Button
					className="btn-danger"
					onClick={handleDelete}
				>
					Delete Category
				</Button>
			</div>
		</div>
	);
};

Category.propTypes = {
	category: PropTypes.object,
	onChange: PropTypes.func,
	onDelete: PropTypes.func,
};

export default Category;