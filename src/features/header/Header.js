import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { saveNewTodo } from "../todos/todosSlice";

const Header = () => {
    const [text, setText] = useState('')
    const [status, setStatus] = useState('idle')
    const dispatch = useDispatch()

    const handleChange = e => {
        setText(e.target.value)
    }

    const handleKeyDown = e => {
        const trimmedText = e.target.value.trim()
        if (e.key === 'Enter' && trimmedText) {
            dispatch(saveNewTodo(trimmedText))
            setText('')
            setStatus('idle')
        }
    }

    let isLoading = status === 'loading';
    let placeholder = isLoading ? '' : 'What needs to be done?';
    let loader = isLoading ? <div className="Loader" /> : null;

    return (
        <header>
            <input
                type='text'
                placeholder='What needs to be done?'
                autoFocus={true}
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
            />
            {loader}
        </header>
    )
}

export default Header