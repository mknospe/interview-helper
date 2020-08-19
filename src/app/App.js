import React from 'react';
import {Router} from '@reach/router';
import {SessionProvider} from 'contexts/SessionContext';
import Setup from 'pages/Setup';
import Question from 'pages/Question';
import Summary from 'pages/Summary';
import 'scss/styles.scss';

const App = () => {
	return (
		<SessionProvider>
			<Router>
				<Setup path="/"/>
				<Question path="/questions"/>
				<Summary path="/summary"/>
			</Router>
		</SessionProvider>
	);
};

export default App;
