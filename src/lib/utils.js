function getQuestionsByCategory(category, questions) {
	return questions.filter(q => q.category === category).pop().items;
}

function getCategoryIndex(category, questions) {
	return questions.reduce((acc, cur, index) => {
		if (cur.category === category) {
			return index;
		}

		return acc;
	}, '');
}

function getNextCategory(categoryId, categoryOrder) {
	const categoryIndex = categoryOrder.indexOf(categoryId);
	const hasNextCategory = categoryIndex + 1 < categoryOrder.length;

	if (hasNextCategory) {
		return categoryOrder[categoryIndex + 1];
	}

	return categoryId;
}

function now() {
	return (new Date()).getTime();
}

export {
	getCategoryIndex,
	getQuestionsByCategory,
	getNextCategory,
	now,
}