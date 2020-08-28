import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const QuestionRating = ({question, onClick}) => {
	function handleClick(rating) {
		if (question.rating === rating && rating === 1) {
			onClick(question.id, 0);
		} else {
			onClick(question.id, rating);
		}
	}

	return (
		<div>
			<label>Rate the given answer</label>
			<div className="rating">
				{[5,4,3,2,1].map((rating) => {
					const isActive = (question.rating >= rating);
					const star = isActive ? '★' : '☆';

					return (
						<span
							key={rating}
							className={clsx('rating__star', {
								'rating--active': isActive,
							})}
							onClick={() => {handleClick(rating)}}
						>
							{star}
						</span>
					);
				})}
			</div>
		</div>
	);
};

QuestionRating.propTypes = {
	question: PropTypes.object,
	onChange: PropTypes.func,
};

export default QuestionRating;