import React from 'react';
import PropTypes from 'prop-types';
import {Draggable} from 'react-beautiful-dnd';
import InputField from 'components/InputField';
import Button from 'components/Button';

const Question = (props) => {
	const {
		index,
		question,
		onAdd,
		onChange,
		onDelete,
	} = props;

	function handleAdd() {
		onAdd(question.categoryId, question.id);
	}

	function handleChange(e) {
		onChange(question.id, e.target.value);
	}

	function handleRemove() {
		onDelete(question.categoryId, question.id);
	}

	return (
		<Draggable draggableId={question.id} index={index}>
			{(drag) => (
				<div
					className="row mb-3"
					ref={drag.innerRef}
					{...drag.draggableProps}

				>
					<div className="col-sm-9 col-md-10 d-flex align-items-end">
						<div
							{...drag.dragHandleProps}
							style={{padding: '0 8px 4px 0', fontSize: '1.5rem', color: '#aaa'}}
						>
							↕
						</div>
						<div style={{width:'100%', background:'white'}}>
							<InputField
								className="form-control"
								label={`Question #${index + 1}`}
								value={question.text}
								onChange={handleChange}
								placeholder="What do you want to ask?"
								maxLength={500}
							/>
						</div>
					</div>
					<div className="col-sm-3 col-md-2 d-flex align-items-end">
						<div className="btn-group btn-block">
							<Button className="btn btn-outline-secondary" onClick={handleAdd}>+</Button>
							<Button className="btn btn-outline-secondary" onClick={handleRemove}>-</Button>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};

Question.propTypes = {
	index: PropTypes.number,
	question: PropTypes.object.isRequired,
	onAdd: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default Question;