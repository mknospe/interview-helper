import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {useSession} from 'contexts/SessionContext';
import {TabContent} from 'components/Tabs';
import Category from './Category';
import CategoryTabList from './CategoryTabList';
import QuestionList from './QuestionList';

const MAX_CATEGORIES = 8;

const QuestionForm = () => {
	const {
		session,
		addCategory,
		changeCategory,
		reorderCategory,
		removeCategory,
		setCurrentCategoryId,
		addQuestion,
		changeQuestion,
		reorderQuestion,
		removeQuestion,
	} = useSession();

	function onDragEnd(result) {
		const {
			source,
			destination,
			draggableId,
			type,
		} = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		switch (type) {
			case 'category':
				reorderCategory(draggableId, source.index, destination.index);
				break;

			case 'question':
				reorderQuestion(draggableId, source.index, destination.index);
				break;

			default:
				throw new Error(`Unsupported draggable type ${type}.`);
		}
	}

	const activeCategory = session.categories[session.current.categoryId];

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<CategoryTabList
				categories={session.categories}
				categoryOrder={session.categoryOrder}
				activeCategory={activeCategory}
				categoryLimit={MAX_CATEGORIES}
				onAdd={addCategory}
				onSelect={setCurrentCategoryId}
			/>

			{activeCategory &&
				<TabContent>
					<h3>Category Settings</h3>
					<Category
						category={activeCategory}
						onChange={changeCategory}
						onDelete={removeCategory}
					/>

					<br/>

					<h3>Questions</h3>
					<QuestionList
						category={activeCategory}
						questions={session.questions}
						onAdd={addQuestion}
						onChange={changeQuestion}
						onDelete={removeQuestion}
					/>
				</TabContent>
			}
		</DragDropContext>
	);
};

export default QuestionForm;