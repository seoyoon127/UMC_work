let inputBox = document.getElementById("input_box");
var todoList=[];

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
        printList();
    }
}
function printList(){ 
    let list="<ul style=\"list-style-type: none;>\"";  
    for(let i=0; i<todoList.length;i++){  //"<span class='close' id=" + i + ">" + "</span>
        list+="<li>" + todoList[i] + "</li><input type=\"button\" id=\"move" +i+ "\" value=\"완료\">";
    }
    list+="</ul>";
    document.getElementById("todo").innerHTML=list;
    
    for (let i = 0; i <todoList.length ; i++) {
        document.getElementById("move" + i).onclick = function() {
            moveItem(i);
        };
    }
}

function moveItem(index) {
    let item = todoList.splice(index, 1)[0]; //todoList index 위치를 제거하고 item에 대입
    let doneList = document.getElementById("done");
    let doneItem = document.createElement("li");
    doneItem.textContent = item;
    doneItem.innerHTML += "<span class='close'></span>";
    doneList.appendChild(doneItem);
}

