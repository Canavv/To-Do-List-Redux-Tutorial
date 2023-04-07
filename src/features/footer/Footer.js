import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { availableColors, capitalize } from "../filters/colors";
import {
    StatusFilters,
    colorFilterChanged,
    statusFilterChanged
} from "../filters/filtersSlice";
import {
    selectTodos,
    completedTodosCleared,
    allTodosCompleted
} from "../todos/todosSlice";

const RemainingTodos = ({ count }) => {
    const suffix = count === 1 ? "" : "s";
    return (
        <div>
            <h3>Remaining Todo</h3>
            <strong>{count}</strong> item{suffix} left
        </div>
    )
}

const StatusFilter = ({ status, onChange }) => {
    const renderedFilters = Object.keys(StatusFilters).map((key) => {
        const value = StatusFilters[key];
        const handleClick = () => {
            onChange(value)
        };
        const className = value === status ? 'selected' : '';
        return (
            <li key={value}>
                <button className={className} onClick={handleClick}>
                    {key}
                </button>
            </li>
        );
    })
    return (
        <div>
            <h3>Filter by Status</h3>
            <ul>{renderedFilters}</ul>
        </div>
    );
}

const ColorFilters = ({ onChange }) => {
    const renderedColors = availableColors.map((color) => {
        const handleChange = (event) => {
            const changeType = event.target.checked ? 'added' : 'removed';
            onChange(color, changeType)
        }

        return (
            <label key={color}>
                <input
                    type='checkbox'
                    name={color}
                    onChange={handleChange}
                />
                <span
                    className="color-block"
                    style={{
                        backgroundColor: color
                    }}
                ></span>
                {capitalize(color)}
            </label>
        );
    })

    return (
        <div>
            <h3>Filter by Color</h3>
            <form className="colorSelection">{renderedColors}</form>
        </div>
    );
}

const Footer = () => {
    const dispatch = useDispatch();
    const todosRemaining = useSelector(state => {
        const uncompletedTodos = selectTodos(state).filter((todo) => !todo.completed)
        return uncompletedTodos.length;
    })
    const { status, colors } = useSelector((state) => state.filters);
    const onMarkCompletedClicked = () => dispatch(allTodosCompleted());
    const onClearCompletedClicked = () => dispatch(completedTodosCleared());
    const onColorChange = (color, changeType) => {
        dispatch(colorFilterChanged(color, changeType))
    }
    const onStatusChange = (status) => {
        dispatch(statusFilterChanged(status))
    };

    return (
        <footer className="footer">
            <div className="actions">
                <h3>Action</h3>
                <button className="button" onClick={onMarkCompletedClicked}>Mark All Completed</button>
                <button className="button" onClick={onClearCompletedClicked}>Clear Completed</button>
            </div>

            <RemainingTodos count={todosRemaining} />
            <StatusFilter status={status} onChange={onStatusChange} />
            <ColorFilters colors={colors} onChange={onColorChange} />
        </footer>
    );
}

export default Footer