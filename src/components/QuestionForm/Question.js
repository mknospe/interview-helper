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
		addQuestion,
		removeQuestion,
		changeQuestion,
	} = props;

	function handleChange(e) {
		changeQuestion(categoryId, id, e.target.value);
	}

	function handleAdd() {
		addQuestion(categoryId, id);
	}

	function handleRemove() {
		removeQuestion(categoryId, id);
	}

	return (
		<div>
			<InputField
				className="form-control"
				label={label}
				value={question}
				onChange={handleChange}
				placeholder="What do you want to ask?"
				maxLength={500}
			/>
			<Button onClick={handleAdd}>+</Button>
			<Button onClick={handleRemove}>-</Button>
		</div>
	);
};

Question.propTypes = {
	id: PropTypes.string.isRequired,
	categoryId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	question: PropTypes.string.isRequired,
	addQuestion: PropTypes.func.isRequired,
	removeQuestion: PropTypes.func.isRequired,
	changeQuestion: PropTypes.func.isRequired,
};

export default Question;