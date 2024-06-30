import './App.css';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, moveTodo, deleteDone } from './redux/todoSlice'

const App = () => {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const { todoList, doneList } = useSelector(state => state.todos);

    const input_click = () => {
        inputRef.current.value = "";
    }

    const input_enter = (e) => {
        if (e.key === "Enter") {
            dispatch(addTodo(inputRef.current.value));
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    }

    return (
        <div className="container">
            <h1>UMC Study Plan</h1>
            <input type="text" ref={inputRef} id="input_box" defaultValue="스터디 계획을 작성해 보세요!" onClick={input_click} onKeyDown={input_enter} />
            <table className="table">
                <tbody>
                    <tr>
                        <td id="todo">해야할 일</td>
                        <td id="done">해낸 일</td>
                    </tr>
                    <tr>
                        <td>
                            <ul className="todo-list">
                                {todoList.map((item, index) => (
                                    <li key={index}>
                                        {item} <button onClick={() => dispatch(moveTodo(index))}>완료</button>
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <ul className="done-list">
                                {doneList.map((item, index) => (
                                    <li key={index}>
                                        {item} <button onClick={() => dispatch(deleteDone(index))}>삭제</button>
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default App;
