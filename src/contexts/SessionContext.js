import React from 'react';
import {getNextCategory} from 'lib/utils';

const SessionContext = React.createContext();
const actions = {
	ADD_CATEGORY: 'ADD_CATEGORY',
	CHANGE_CATEGORY: 'CHANGE_CATEGORY',
	REORDER_CATEGORY: 'REORDER_CATEGORY',
	REMOVE_CATEGORY: 'REMOVE_CATEGORY',
	ADD_QUESTION: 'ADD_QUESTION',
	CHANGE_QUESTION: 'CHANGE_QUESTION',
	CHANGE_QUESTION_NOTE: 'CHANGE_QUESTION_NOTE',
	CHANGE_QUESTION_RATING: 'CHANGE_QUESTION_RATING',
	REORDER_QUESTION: 'REORDER_QUESTION',
	REMOVE_QUESTION: 'REMOVE_QUESTION',
	SET_NEXT_QUESTION: 'SET_NEXT_QUESTION',
	SET_CURRENT_CATEGORY_ID: 'SET_CURRENT_CATEGORY_ID',
	RESTART: 'RESTART',
};

function updateCurrentCategoryId(state) {
	return {
		...state,
		current: {
			...state.current,
			categoryId: state.categoryOrder[0] || '',
		}
	}
}

function addCategory(state, payload) {
	const categoryId = `c${state.idCounter}`;
	const newCategory = {
		id: categoryId,
		name: 'Untitled',
		questionOrder: [],
	};

	const newState = updateCurrentCategoryId({
		...state,
		categories: {
			...state.categories,
			[categoryId]: newCategory
		},
		categoryOrder: [
			...state.categoryOrder,
			categoryId,
		],
		idCounter: state.idCounter + 1,
	});

	return addQuestion(newState, {categoryId});
}

function changeCategory(state, payload) {
	const {categoryId, value} = payload;

	const updatedCategory = {
		...state.categories[categoryId],
		name: value,
	};

	return {
		...state,
		categories: {
			...state.categories,
			[categoryId]: updatedCategory,
		}
	};
}

function reorderCategory(state, payload) {
	const {categoryId, sourceIndex, destinationIndex} = payload;
	const categoryOrder = state.categoryOrder.concat([]);
	categoryOrder.splice(sourceIndex, 1);
	categoryOrder.splice(destinationIndex, 0, categoryId);

	return {
		...state,
		categoryOrder
	};
}

function removeCategory(state, payload) {
	const {categoryId} = payload;
	const categoryOrder = state.categoryOrder.concat([]);
	const questionOrder = state.categories[categoryId].questionOrder.concat([]);
	const index = categoryOrder.indexOf(categoryId);
	categoryOrder.splice(index , 1);

	const updatedCategories = {
		...state.categories,
	};
	delete updatedCategories[categoryId];

	const updatedQuestions = {
		...state.questions,
	};
	questionOrder.forEach(questionId => {
		delete updatedQuestions[questionId];
	});

	return updateCurrentCategoryId({
		...state,
		categories: updatedCategories,
		categoryOrder,
		questions: updatedQuestions,
	});
}

function addQuestion(state, payload) {
	const {categoryId, questionId} = payload;
	const newQuestion = {
		id: `q${state.idCounter}`,
		categoryId,
		text: '',
		rating: '',
		note: '',
		duration: 0,
	};

	const questionOrder = state.categories[categoryId].questionOrder.concat([]);
	const index = questionOrder.indexOf(questionId) || 0;
	questionOrder.splice(index + 1 , 0, newQuestion.id);

	return {
		...state,
		categories: {
			...state.categories,
			[categoryId]: {
				...state.categories[categoryId],
				questionOrder
			}
		},
		questions: {
			...state.questions,
			[newQuestion.id]: newQuestion,
		},
		idCounter: state.idCounter + 1,
	};
}

function changeQuestion(state, payload) {
	const {questionId, value} = payload;

	const updatedQuestion = {
		...state.questions[questionId],
		text: value,
	};

	return {
		...state,
		questions: {
			...state.questions,
			[questionId]: updatedQuestion,
		}
	};
}

function changeQuestionNote(state, payload) {
	const {questionId, value} = payload;

	const updatedQuestion = {
		...state.questions[questionId],
		note: value,
	};

	return {
		...state,
		questions: {
			...state.questions,
			[questionId]: updatedQuestion,
		}
	};
}

function changeQuestionRating(state, payload) {
	const {questionId, value} = payload;

	const updatedQuestion = {
		...state.questions[questionId],
		rating: value,
	};

	return {
		...state,
		questions: {
			...state.questions,
			[questionId]: updatedQuestion,
		}
	};
}

function reorderQuestion(state, payload) {
	const {questionId, sourceIndex, destinationIndex} = payload;
	const categoryId = state.questions[questionId].categoryId;
	const questionOrder = state.categories[categoryId].questionOrder.concat([]);
	questionOrder.splice(sourceIndex, 1);
	questionOrder.splice(destinationIndex, 0, questionId);

	return {
		...state,
		categories: {
			...state.categories,
			[categoryId]: {
				...state.categories[categoryId],
				questionOrder,
			}
		}
	};
}

function removeQuestion(state, payload) {
	const {categoryId, questionId} = payload;
	const questionOrder = state.categories[categoryId].questionOrder.concat([]);
	const index = questionOrder.indexOf(questionId);
	questionOrder.splice(index , 1);

	const updatedQuestions = {
		...state.questions,
	};
	delete updatedQuestions[questionId];

	return {
		...state,
		categories: {
			...state.categories,
			[categoryId]: {
				...state.categories[categoryId],
				questionOrder
			}
		},
		questions: updatedQuestions,
	};
}

function setNextQuestion(state, payload) {
	const {categoryId, questionId, duration} = payload;
	const category = state.categories[categoryId];
	const isLastCategoryQuestion = state.current.index === category.questionOrder.length - 1;

	if (isLastCategoryQuestion) {
		const nextCategoryId = getNextCategory(categoryId, state.categoryOrder);

		if (state.current.categoryId === nextCategoryId) {
			return {
				...state,
				isCompleted: true,
			}
		}

		return {
			...state,
			current: {
				...state.current,
				categoryId: nextCategoryId,
				index: 0,
			}
		}
	}

	const index = isLastCategoryQuestion ? 0 : state.current.index + 1;

	return {
		...state,
		current: {
			...state.current,
			index,
		}
	};
}

function setCurrentCategoryId(state, payload) {
	const {categoryId} = payload;

	return {
		...state,
		current: {
			...state.current,
			categoryId,
		}
	}
}

function restart(state, payload) {
	return {
		...state,
		current: {
			...state.current,
			index: 0,
			categoryId: state.categoryOrder[0]
		},
		isCompleted: false,
	}
}

function sessionReducer(state, action) {
	const {type, payload} = action;

	switch (type) {
		case actions.ADD_CATEGORY:
			return addCategory(state, payload);

		case actions.CHANGE_CATEGORY:
			return changeCategory(state, payload);

		case actions.REORDER_CATEGORY:
			return reorderCategory(state, payload);

		case actions.REMOVE_CATEGORY:
			return removeCategory(state, payload);

		case actions.ADD_QUESTION:
			return addQuestion(state, payload);

		case actions.CHANGE_QUESTION:
			return changeQuestion(state, payload);

		case actions.CHANGE_QUESTION_NOTE:
			return changeQuestionNote(state, payload);

		case actions.CHANGE_QUESTION_RATING:
			return changeQuestionRating(state, payload);

		case actions.REORDER_QUESTION:
			return reorderQuestion(state, payload);

		case actions.REMOVE_QUESTION:
			return removeQuestion(state, payload);

		case actions.SET_NEXT_QUESTION:
			return setNextQuestion(state, payload);

		case actions.SET_CURRENT_CATEGORY_ID:
			return setCurrentCategoryId(state, payload);

		case actions.RESTART:
			return restart(state, payload);

		default:
			throw new Error(`Unsupported action type: ${type}`);
	}
}

function SessionProvider(props) {
	const data = {
		categories: {
			c1: {
				id: 'c1',
				name: 'General',
				questionOrder: ['q1', 'q3', 'q2'],
			},
			c2: {
				id: 'c2',
				name: 'Tech',
				questionOrder: ['q4'],
			},
		},
		categoryOrder: ['c1', 'c2'],
		questions: {
			q1: {
				id: 'q1',
				categoryId: 'c1',
				text: 'You’re currently employed. What’s your motivation to change your job?',
				rating: 2,
				note: '',
				duration: 0,
			},
			q2: {
				id: 'q2',
				categoryId: 'c1',
				text: 'What are the most important tasks/jobs in your career and why?',
				rating: 0,
				note: '',
				duration: 0,
			},
			q3: {
				id: 'q3',
				categoryId: 'c1',
				text: 'Why did you become a developer?',
				rating: 0,
				note: '',
				duration: 0,
			},
			q4: {
				id: 'q4',
				categoryId: 'c2',
				text: 'You did apply for the payment team. Do you have any experience with payment solutions?',
				rating: 0,
				note: '',
				duration: 0,
			},
		},
	};
	const initialState = {
		current: {
			index: 0,
			categoryId: data.categoryOrder[0],
		},
		idCounter: Object.keys(data.questions).length + 1,
		isCompleted: false,
		...data,
	};
	const [state, dispatch] = React.useReducer(sessionReducer, initialState);
	const value = React.useMemo(() => [state, dispatch], [state]);

	return <SessionContext.Provider value={value} {...props} />;
}

function useSession() {
	const context = React.useContext(SessionContext);

	if (!context) {
		throw new Error(`useSession must be used within a SessionProvider`);
	}

	const [state, dispatch] = context;
	const addCategory = (name) => dispatch({
		type: actions.ADD_CATEGORY,
		payload: {
			name,
		}
	});
	const changeCategory = (categoryId, value) => dispatch({
		type: actions.CHANGE_CATEGORY,
		payload: {
			categoryId,
			value,
		}
	});
	const reorderCategory = (categoryId, sourceIndex, destinationIndex) => dispatch({
		type: actions.REORDER_CATEGORY,
		payload: {
			categoryId,
			sourceIndex,
			destinationIndex,
		}
	});
	const removeCategory = (categoryId) => dispatch({
		type: actions.REMOVE_CATEGORY,
		payload: {
			categoryId,
		}
	});
	const addQuestion = (categoryId, questionId) => dispatch({
		type: actions.ADD_QUESTION,
		payload: {
			categoryId,
			questionId,
		}
	});
	const changeQuestion = (questionId, value) => dispatch({
		type: actions.CHANGE_QUESTION,
		payload: {
			questionId,
			value,
		}
	});
	const changeQuestionNote = (questionId, value) => dispatch({
		type: actions.CHANGE_QUESTION_NOTE,
		payload: {
			questionId,
			value,
		}
	});
	const changeQuestionRating = (questionId, value) => dispatch({
		type: actions.CHANGE_QUESTION_RATING,
		payload: {
			questionId,
			value,
		}
	});
	const reorderQuestion = (questionId, sourceIndex, destinationIndex) => dispatch({
		type: actions.REORDER_QUESTION,
		payload: {
			questionId,
			sourceIndex,
			destinationIndex,
		}
	});
	const removeQuestion = (categoryId, questionId) => dispatch({
		type: actions.REMOVE_QUESTION,
		payload: {
			categoryId,
			questionId,
		}
	});
	const setNextQuestion = (categoryId, questionId, duration) => dispatch({
		type: actions.SET_NEXT_QUESTION,
		payload: {
			categoryId,
			questionId,
			duration,
		}
	});
	const setCurrentCategoryId = (categoryId) => dispatch({
		type: actions.SET_CURRENT_CATEGORY_ID,
		payload: {
			categoryId,
		}
	});
	const restart = () => dispatch({
		type: actions.RESTART,
		payload: {}
	});

	return {
		session: state,
		addCategory,
		changeCategory,
		reorderCategory,
		removeCategory,
		addQuestion,
		changeQuestion,
		changeQuestionNote,
		changeQuestionRating,
		reorderQuestion,
		removeQuestion,
		setNextQuestion,
		setCurrentCategoryId,
		restart,
	};
}

export {
	SessionProvider,
	useSession,
};
