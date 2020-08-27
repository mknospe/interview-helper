import React from 'react';
import {useSession} from 'contexts/SessionContext';
import {Tab, TabContent} from 'components/Tabs';
import Question from './Question';
import Category from './Category';

const MAX_CATEGORIES = 10;

const QuestionForm = () => {
	const {
		session,
		addCategory,
		changeCategory,
		removeCategory,
		addQuestion,
		changeQuestion,
		removeQuestion,
		setCurrentCategoryId,
	} = useSession();

	const handleAddCategory = () => {
		addCategory();
	};

	const handleSelectCategory = (e, categoryId) => {
		setCurrentCategoryId(categoryId);
	};

	const activeCategory = session.categories[session.current.categoryId];
	const canAddCategories = session.categoryOrder.length < MAX_CATEGORIES;

	return (
		<React.Fragment>
			<nav>
				<ul className="nav nav-tabs">
					{canAddCategories && <Tab label="+" onClick={handleAddCategory}/>}

					{session.categoryOrder.map((categoryId) => {
						const {name, questionOrder} = session.categories[categoryId];
						const label = `${name} (${questionOrder.length})`;

						return (
							<Tab
								key={categoryId}
								id={categoryId}
								label={label}
								isActive={session.current.categoryId === categoryId}
								onClick={handleSelectCategory}
							/>
						);
					})}
				</ul>
			</nav>

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
					{activeCategory.questionOrder.map((questionId, index) => {
						const {text} = session.questions[questionId];

						return (
							<Question
								key={questionId}
								id={questionId}
								categoryId={session.current.categoryId}
								question={text}
								label={`Question #${index + 1}`}
								onAdd={addQuestion}
								onChange={changeQuestion}
								onDelete={removeQuestion}
							/>
						);
					})}
				</TabContent>
			}
		</React.Fragment>
	);
};

export default QuestionForm;