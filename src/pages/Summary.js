import React from 'react';
import {navigate} from '@reach/router';
import PropTypes from 'prop-types';
import {useSession} from 'contexts/SessionContext';
import Header from 'components/Header';
import Main from 'components/Main';
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

Summary.propTypes = {
	
};

export default Summary;