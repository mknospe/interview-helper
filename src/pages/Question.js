import React from 'react';
import {navigate} from '@reach/router';
import {useSession} from 'contexts/SessionContext';
import {now} from 'lib/utils';
import Header from 'components/Header';
import Main from 'components/Main';
import Footer from 'components/Footer';

const Question = () => {
	const {session, restart, setNextQuestion} = useSession();
	const [time, setTime] = React.useState(null);
	const {
		current: {
			index,
			categoryId
		},
		categories,
		questions
	} = session;
	const {name: categoryName, questionOrder} = categories[categoryId];
	const totalNum = questionOrder.length;
	const questionId = questionOrder[index];
	const question = questions[questionId].text;
	const currentNum = index + 1;

	React.useEffect(() => {
		if (session.isCompleted) {
			navigate('/summary').then();
			return;
		}

		setTime(now());
	}, [session]);

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
			<Header title={`${categoryName} (${currentNum} of ${totalNum})`}/>

			<Main className="container">
				<h1>{question}</h1>
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
