import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../InputField';
import Button from '../Button';

const Question = (props) => {
	const {
		id,
		categoryId,
		label,
		question,
		onAdd,
		onChange,
		onDelete,
	} = props;

	function handleAdd() {
		onAdd(categoryId, id);
	}

	function handleChange(e) {
		onChange(id, e.target.value);
	}

	function handleRemove() {
		onDelete(categoryId, id);
	}

	return (
		<div className="row mb-3">
			<div className="col-sm-10">
				<InputField
					className="form-control"
					label={label}
					value={question}
					onChange={handleChange}
					placeholder="What do you want to ask?"
					maxLength={500}
				/>
			</div>
			<div className="col-sm-2 d-flex align-items-end">
				<div className="btn-group btn-block">
					<Button className="btn btn-outline-secondary" onClick={handleAdd}>+</Button>
					<Button className="btn btn-outline-secondary" onClick={handleRemove}>-</Button>
				</div>
			</div>
		</div>
	);

	return (
		<div>


		</div>
	);
};

Question.propTypes = {
	id: PropTypes.string.isRequired,
	categoryId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	question: PropTypes.string.isRequired,
	onAdd: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default Question;