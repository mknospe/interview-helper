import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from 'components/Button';

function getActionButton(action, label, style = '') {
	return <Button className={`btn btn-block ${style}`} onClick={action}>{label}</Button>;
}

const Footer = props => {
	const {
		fullsize = false,
		hasPrev = false,
		hasNext = false,
		labelPrev,
		labelNext,
		onNext,
		onPrev,
	} = props;
	const backButton = hasPrev ? getActionButton(onPrev, labelPrev, 'btn-outline-secondary') : '';
	const nextButton = hasNext ? getActionButton(onNext, labelNext, 'btn-primary') : '';

	return (
		<footer>
			<div
				className={clsx({
					'container-fluid': fullsize,
					'container': !fullsize,
				})}
			>
				<div className={clsx('row', {
					'justify-content-between': backButton,
					'justify-content-end': !backButton,
				})}>
					{backButton && <div className="col-lg-3 col-md-4 col-6" data-qa="back">
						{backButton}
					</div>}
					<div className={clsx('col-lg-3 col-md-4', {
						'col-6': backButton,
						'col-8': !backButton
					})} data-qa="continue">
						{nextButton}
					</div>
				</div>
			</div>
		</footer>
	);
};

Footer.propTypes = {
	fullsize: PropTypes.bool,
	hasPrev: PropTypes.bool,
	hasNext: PropTypes.bool,
	labelPrev: PropTypes.string,
	labelNext: PropTypes.string,
	onNext: PropTypes.func,
	onPrev: PropTypes.func,
};

export default Footer;
