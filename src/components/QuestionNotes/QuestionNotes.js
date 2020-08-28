import React from 'react';
import PropTypes from 'prop-types';

const QuestionNotes = ({question, onChange}) => {
	function handleChange(e) {
		onChange(question.id, e.target.value);
	}

	return (
		<div className="row">
			<div className="col">
				<label>Notes</label>
				<textarea
					className="form-control"
					rows="6"
					value={question.note}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};

QuestionNotes.propTypes = {
	question: PropTypes.object,
	onChange: PropTypes.func,
};

export default QuestionNotes;