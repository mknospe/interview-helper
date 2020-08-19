import React from 'react';
import {useSession} from 'contexts/SessionContext';
import Category from './Category';
import Question from './Question';

const QuestionForm = () => {
	const {
		session,
		addQuestion,
		changeQuestion,
		removeQuestion,
	} = useSession();

	return session.categoryOrder.map((categoryId) => {
		const {name, questionOrder} = session.categories[categoryId];

		return (
			<React.Fragment key={categoryId}>
				<Category
					name={name}
					itemCount={questionOrder.length}
				/>

				{questionOrder.map((questionId, index) => {
					const {text} = session.questions[questionId];

					return (
						<Question
							key={questionId}
							id={questionId}
							categoryId={categoryId}
							question={text}
							label={`Question #${index + 1}`}
							addQuestion={addQuestion}
							changeQuestion={changeQuestion}
							removeQuestion={removeQuestion}
						/>
					);
				})}
			</React.Fragment>
		);
	});
};

export default QuestionForm;