import { render } from '@testing-library/react';
import React, { useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import TodoListItem from './TodoListitem'

const selectTodoIds = state => state.todos

const TodoList = () => {
    let todoIds = useSelector(selectTodoIds, shallowEqual)
    const todo = todoIds
    const filter = useSelector(state => state.filters)
    
    todoIds = filter.colors.length === 0 ? todoIds : todoIds.filter(state => state.color && filter.colors.includes(state.color))

    let renderedListItems = [];
    if(filter.status === 'active'){
        renderedListItems = todoIds.filter(state => !state.completed).map(todoId => {
            return <TodoListItem key={todoId.id} id={todoId.id}/>
        })
    }

    else if(filter.status === 'completed'){
        renderedListItems = todoIds.filter(state => state.completed).map(todoId => {
            return <TodoListItem key={todoId.id} id={todoId.id}/>
        })
    }

    else if(filter.status === 'all'){
        renderedListItems = todoIds.map(todoId => {
            return <TodoListItem key={todoId.id} id={todoId.id} />;
        })
    }

    return <ul className='todo-list'>{renderedListItems}</ul>
}

export default TodoList