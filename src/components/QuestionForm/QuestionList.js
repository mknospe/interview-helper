import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import Question from './Question';
import Button from '../Button';

const QuestionList = ({category, questions, onAdd, onChange, onDelete}) => {
	if (category.questionOrder.length > 0) {
		return (
			<Droppable droppableId="questions" direction="vertical" type="question">
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{category.questionOrder.map((questionId, index) => {
							const question = questions[questionId];

							return (
								<Question
									key={questionId}
									index={index}
									question={question}
									onAdd={onAdd}
									onChange={onChange}
									onDelete={onDelete}
								/>
							);
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		);
	}

	function handleAdd() {
		onAdd(category.id, '');
	}

	return (
		<div className="row">
			<div className="offset-sm-9 offset-md-10 col-sm-3 col-md-2">
				<Button className="btn btn-block btn-outline-secondary" onClick={handleAdd}>+</Button>
			</div>
		</div>
	);
};

export default QuestionList;