import React from 'react';
import {
	getQuestionsByCategory,
	getNextCategory, getCategoryIndex,
} from 'lib/utils';

const SessionContext = React.createContext();
const actions = {
	ADD_QUESTION: 'ADD_QUESTION',
	CHANGE_QUESTION: 'CHANGE_QUESTION',
	REMOVE_QUESTION: 'REMOVE_QUESTION',
	SET_NEXT_QUESTION: 'SET_NEXT_QUESTION',
	RESTART: 'RESTART',
};

function changeQuestion(state, payload) {
	const {categoryId, questionId, value} = payload;

	const updatedQuestion = {
		...state.questions[questionId],
		text: value,
	}

	return {
		...state,
		questions: {
			...state.questions,
			[questionId]: updatedQuestion,
		}
	};
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
	const index = questionOrder.indexOf(questionId);
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
		case actions.ADD_QUESTION:
			return addQuestion(state, payload);

			case actions.CHANGE_QUESTION:
			return changeQuestion(state, payload);

		case actions.REMOVE_QUESTION:
			return removeQuestion(state, payload);

		case actions.SET_NEXT_QUESTION:
			return setNextQuestion(state, payload);

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
				rating: '',
				note: '',
				duration: 0,
			},
			q2: {
				id: 'q2',
				categoryId: 'c1',
				text: 'What are the most important tasks/jobs in your career and why?',
				rating: '',
				note: '',
				duration: 0,
			},
			q3: {
				id: 'q3',
				categoryId: 'c1',
				text: 'Why did you become a developer?',
				rating: '',
				note: '',
				duration: 0,
			},
			q4: {
				id: 'q4',
				categoryId: 'c2',
				text: 'You did apply for the payment team. Do you have any experience with payment solutions?',
				rating: '',
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
	const changeQuestion = (categoryId, questionId, value) => dispatch({
		type: actions.CHANGE_QUESTION,
		payload: {
			categoryId,
			questionId,
			value,
		}
	});
	const addQuestion = (categoryId, questionId) => dispatch({
		type: actions.ADD_QUESTION,
		payload: {
			categoryId,
			questionId,
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
	const restart = () => dispatch({
		type: actions.RESTART,
		payload: {}
	});

	return {
		session: state,
		addQuestion,
		changeQuestion,
		removeQuestion,
		setNextQuestion,
		restart,
	};
}

export {
	SessionProvider,
	useSession,
};
