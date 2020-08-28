import React from 'react';
import PropTypes from 'prop-types';
import {Droppable} from 'react-beautiful-dnd';
import CategoryTab from './CategoryTab';
import {Tab} from 'components/Tabs';

const CategoryTabList = ({categories, categoryOrder, activeCategory, categoryLimit, onAdd, onSelect}) => {
	const canAddCategories = categoryOrder.length < categoryLimit;

	function handleSelectCategory(e, categoryId) {
		onSelect(categoryId);
	}

	return (
		<nav>
			<Droppable droppableId="categories" direction="horizontal" type="category">
				{(provided) => (
					<ul
						className="nav nav-tabs"
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{canAddCategories && <Tab label="+" onClick={onAdd}/>}

						{categoryOrder.map((categoryId, index) => {
							const {name, questionOrder} = categories[categoryId];
							const label = `${name} (${questionOrder.length})`;

							return (
								<CategoryTab
									key={categoryId}
									categoryId={categoryId}
									index={index}
									label={label}
									isActive={activeCategory.id === categoryId}
									onClick={handleSelectCategory}
								/>
							);
						})}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</nav>
	);
};

CategoryTabList.propTypes = {
	categories: PropTypes.object,
	categoryOrder: PropTypes.array,
	activeCategory: PropTypes.object,
	categoryLimit: PropTypes.number,
	onAdd: PropTypes.func,
	onSelect: PropTypes.func,
};

export default CategoryTabList;