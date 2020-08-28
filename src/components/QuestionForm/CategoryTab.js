import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Draggable} from 'react-beautiful-dnd';

const CategoryTab = ({label, categoryId, index, isActive = false, onClick}) => {
	const cx = clsx('nav-link', {
		active: isActive
	});

	function handleClick(e) {
		onClick(e, categoryId);
	}

	return (
		<Draggable draggableId={categoryId} index={index}>
			{(drag) => (
				<li
					className="nav-item"
					ref={drag.innerRef}
					{...drag.draggableProps}
					{...drag.dragHandleProps}
				>
					<a
						className={cx}
						onClick={handleClick}>
						{label}
					</a>
				</li>
			)}
		</Draggable>
	);
};

CategoryTab.propTypes = {
	label: PropTypes.string.isRequired,
	categoryId: PropTypes.string,
	index: PropTypes.number,
	isActive: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

export default CategoryTab;