import React from 'react';
import {navigate} from '@reach/router';
import {useSession} from 'contexts/SessionContext';
import Header from 'components/Header';
import Footer from 'components/Footer';

const Summary = props => {
	const {restart} = useSession();
	function handleBack() {
		restart();
		navigate('/').then();
	}

	return (
		<React.Fragment>
			<Header title="Summary"/>

			<Footer
				hasPrev={true}
				hasNext={false}
				labelPrev="Restart"
				onPrev={handleBack}
			/>
		</React.Fragment>
	);
};

export default Summary;
