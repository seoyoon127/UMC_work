import './App.css';
import React, { useRef } from 'react';

const App = () => {
    let todoList= [];
    let doneList=[];
    const inputRef = useRef(null);

    const input_click = () => {
        inputRef.current.value = "";
    }

    const input_enter = (e) => {
        if (e.key === "Enter") {
            let item = inputRef.current.value;
            todoList.push(item);
            inputRef.current.value = "";
            inputRef.current.focus();
            printTodoList();
        }
    }

    const printTodoList = () => {
        let list = "<ul style=\"list-style-type: none;\">";  
        for (let i = 0; i < todoList.length; i++) {
            list += "<li>" + todoList[i] + "</li><input type=\"button\" id=\"move" + i + "\" value=\"완료\">";
        }
        list += "</ul>";
        document.getElementById("todoList").innerHTML = list;
        for (let i = 0; i <todoList.length ; i++) {
            document.getElementById("move" + i).onclick = function() {
                moveItem(i);
            };
        }
    }
    const moveItem=(index)=>{
        let item = todoList.splice(index, 1); //todoList index 위치를 제거하고 item에 대입
        doneList.push(item);
        printTodoList();
        printDoneList();
    }
    const printDoneList=()=>{
        let list="<ul style=\"list-style-type: none;\">";  
        for(let i=0; i<doneList.length;i++){  //"<span class='close' id=" + i + ">" + "</span>
            list+="<li>" + doneList[i] + "</li><input type=\"button\" id=\"delete" +i+ "\" value=\"삭제\">";
        }
        list+="</ul>";
        document.getElementById("doneList").innerHTML=list;

        for (let i = 0; i <doneList.length ; i++) {
            document.getElementById("delete" + i).onclick = function() {
                //document.getElementById("delete" + i).value="";  
                doneList.splice(i, 1);
                printDoneList();
            };
        }
    }
 
    return (
        <div class="container">
            <h1>UMC Study Plan</h1>
            <br /><hr /><br />
            <input type="text" ref={inputRef} id="input_box"defaultValue="스터디 계획을 작성해 보세요!" onClick={input_click} onKeyDown={input_enter}></input>
            <table class="table">
                <tbody>
                    <tr>
                        <td id="todo">해야할 일</td>
                        <td id="done">해낸 일</td>
                    </tr>
                    <tr>
                        <td><div id="todoList"></div></td>
                        <td><div id="doneList"></div></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default App;
