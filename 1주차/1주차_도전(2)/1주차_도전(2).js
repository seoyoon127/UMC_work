let inputBox = document.getElementById("input_box");
var todoList=[];
var doneList=[];

inputBox.onclick=function(){
    inputBox.value="";
}
inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addItem();
    }
});

function addItem() {
    let item = inputBox.value;
    if (item !== "") {
        todoList.push(item);
        inputBox.value = "";
        inputBox.focus();
        printTodoList()
    }
}
function printTodoList(){ 
    let list="<ul style=\"list-style-type: none;>\"";  
    for(let i=0; i<todoList.length;i++){  //"<span class='close' id=" + i + ">" + "</span>
        list+="<li>" + todoList[i] + "</li><input type=\"button\" id=\"move" +i+ "\" value=\"완료\">";
    }
    list+="</ul>";
    document.getElementById("todoList").innerHTML=list;
    
    for (let i = 0; i <todoList.length ; i++) {
        document.getElementById("move" + i).onclick = function() {
            moveItem(i);
        };
    }
}

function moveItem(index) {
    let item = todoList.splice(index, 1)[0]; //todoList index 위치를 제거하고 item에 대입
    doneList.push(item);
    printTodoList();
    printDoneList();
    
}
function printDoneList(){
    let list="<ul style=\"list-style-type: none;\">";  
    for(let i=0; i<doneList.length;i++){  //"<span class='close' id=" + i + ">" + "</span>
        list+="<li>" + doneList[i] + "</li><input type=\"button\" id=\"delete" +i+ "\" value=\"삭제\">";
    }
    list+="</ul>";
    document.getElementById("doneList").innerHTML=list;

    for (let i = 0; i <doneList.length ; i++) {
        document.getElementById("delete" + i).onclick = function() {
            //document.getElementById("delete" + i).value="";  
            doneList.splice(i,1)[0];
            printDoneList();
        };
    }
}

