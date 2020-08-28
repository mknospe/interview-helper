import React from 'react';
import {navigate} from '@reach/router';
import {useSession} from 'contexts/SessionContext';
import {now} from 'lib/utils';
import Header from 'components/Header';
import Main from 'components/Main';
import QuestionNotes from 'components/QuestionNotes';
import QuestionRating from 'components/QuestionRating';
import Footer from 'components/Footer';

const Question = () => {
	const {
		session,
		restart,
		changeQuestionNote,
		changeQuestionRating,
		setNextQuestion
	} = useSession();
	const [time, setTime] = React.useState(null);

	React.useEffect(() => {
		if (session.isCompleted) {
			navigate('/summary').then();
			return;
		}

		setTime(now());
	}, [session]);

	const {index,	categoryId} = session.current;
	const activeCategory = session.categories[categoryId];
	const totalNum = activeCategory.questionOrder.length;
	const questionId = activeCategory.questionOrder[index];
	const question = session.questions[questionId];
	const currentNum = index + 1;
	const title = `${activeCategory.name} (${currentNum} of ${totalNum})`;

	function handleBack() {
		restart();
		navigate('/').then();
	}

	function handleNext() {
		const duration = now() / 1000 - time / 1000;
		setNextQuestion(categoryId, questionId, duration);
	}

	return (
		<React.Fragment>
			<Header title={title}/>

			<Main className="container">
				<h1>{question.text}</h1>

				<QuestionNotes
					question={question}
					onChange={changeQuestionNote}
				/>

				<QuestionRating
					question={question}
					onClick={changeQuestionRating}
				/>
			</Main>

			<Footer
				hasPrev={true}
				hasNext={true}
				labelPrev="Restart"
				labelNext="Continue"
				onPrev={handleBack}
				onNext={handleNext}
			/>
		</React.Fragment>
	);
};

export default Question;
