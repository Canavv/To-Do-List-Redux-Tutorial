import React from 'react'
import { useSelector } from 'react-redux'
import TodoListItem from './TodoListitem'
import { selectFilteredTodoIds } from './todosSlice'

const TodoList = () => {
    let todoIds = useSelector(selectFilteredTodoIds)
    
    let renderedListItems = todoIds.map(todoId => {
            return <TodoListItem key={todoId} id={todoId} />;
        })
    

    return <ul className='todo-list'>{renderedListItems}</ul>
}

export default TodoList