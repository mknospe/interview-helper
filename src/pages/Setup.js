import React from 'react';
import {navigate} from '@reach/router';
import Header from 'components/Header';
import InfoBox from 'components/InfoBox';
import Main from 'components/Main';
import QuestionForm from 'components/QuestionForm';
import Footer from 'components/Footer';

const Setup = () => {
	function startInterview() {
		navigate('/questions').then();
	}

	return (
		<React.Fragment>
			<Header title="Setup"/>

			<Main className="container">
				<InfoBox>Add candidate information and manage your questions.</InfoBox>
				<QuestionForm/>
			</Main>

			<Footer
				hasNext={true}
				labelNext="Start Interview"
				onNext={startInterview}
			/>
		</React.Fragment>
	);
};

export default Setup;