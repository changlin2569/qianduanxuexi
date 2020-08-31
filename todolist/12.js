function addTodolist(e) {
    var obj_list = {
        todo: "", //用于存储用户输入的数据
        done: false //初始化用户输入的数据属性，以便对用户待办事项进行分类
    };
    document.getElementById("add_list").value = document.getElementById("add_list").value.trim();
    if (document.getElementById("add_list").value.length === 0) {
        alert("不能为空");
        return;
    }

    obj_list.todo = document.getElementById("add_list").value;
    todolist.push(obj_list);

    saveData(todolist);

    document.getElementById("add_list").value = ""; //初始化输入框
    load(); //将用户输入的数据添加至dom节点
    document.getElementById("add_list").focus();
}

//将输入的数据添加至dom节点，并且根据输入数据属性("done")的值进行分类
function load() {
    var todo = document.getElementById("todolist"),
        done = document.getElementById("donelist"),
        todocount = document.getElementById("todocount"),
        donecount = document.getElementById("donecount"),
        todoString = "",
        doneString = "",
        todoCount = 0,
        doneCount = 0;
    document.getElementById("add_list").focus();

    todolist = loadData();

    //todolist数组对象里若包含用户输入数据，则将其添加至dom节点；若为空对象，则初始化页面。
    if (todolist != null) {
        for (var i = 0; i < todolist.length; i++) {
            if (!todolist[i].done) {
                todoString += "<li>"
                    //通过onchange事件，复选框值有改变则调用update函数，并改变输入数据“done”属性的布尔值，这样
                    //下次load()后，这段数据会进入不同的分组，未完成的事项分入已完成事项组，已完成事项分入未完成事项组
                    //点击事项调用edit函数
                    //点击“-”，调用remove函数
                    +
                    "<input type='checkbox' οnchange='update(" + i + ", \"done\", true)'>" +
                    "<p id='p-" + i + "' οnclick='edit(" + i + ")'>" + todolist[i].todo + "</p>" +
                    "<a οnclick='remove(" + i + ")'>-</a>" +
                    "</li>"; //将每次用户输入的数据，通过节点<p>利用id标记，以便后续编辑功能定位
                todoCount++;
            } else {
                doneString += "<li>" +
                    "<input type='checkbox' " +
                    "οnchange='update(" + i + ", \"done\", false)' checked>" +
                    "<p id='p-" + i + "' οnclick='edit(" + i + ")'>" + todolist[i].todo + "</p>" +
                    "<a οnclick='remove(" + i + ")'>-</a>" +
                    "</li>";
                doneCount++;
            }
        }

        todo.innerHTML = todoString;
        done.innerHTML = doneString;
        todocount.innerHTML = todoCount;
        donecount.innerHTML = doneCount;
    } else {
        todo.innerHTML = "";
        done.innerHTML = "";
        todocount.innerHTML = 0;
        donecount.innerHTML = 0;
    }
}

//击事项触发编辑事件，将可编辑表单控件插入段落中，并将用户输入的值通过update函数对todolist数组里存储的数据进行更新
function edit(i) {
    var p = document.getElementById('p-' + i),
        pContent = p.innerHTML,
        inputId;

    //通过upadate函数对todolist数组相应项进行更新，将用户输入的内容写入到todolist数组相应项的todo属性中
    function confirm() {
        if (inputId.value.length === 0) {
            p.innerHTML = pContent;
            alert("内容不能为空");
        } else {
            update(i, "todo", inputId.value); //修改事项内容后，更新数组里对应项"todo"属性的值，以便更新dom节点
        }
    }

    //结合keypress事件，按下enter键，调用confirm函数
    function enter(e) {
        if (e.keyCode == 13) {
            confirm();
        }
    }

    p.innerHTML = "<input type='text' id='input-" + i + "' value='" + pContent + "'>";
    inputId = document.getElementById('input-' + i);
    inputId.focus();
    inputId.setSelectionRange(0, inputId.value.length);
    inputId.onblur = confirm; //表单控件失去焦点，调用confirm函数，即对页面内容进行更新
    inputId.onkeypress = enter; //对按键事件进行监控
}

//将数组todolist相应项的属性（“todo”或“done”）进行更新，并加载
function update(i, field, value) {
    todolist[i][field] = value;
    saveData(todolist);
    load();
}

//删除相应项，并加载
function remove(i) {
    todolist.splice(i, 1);

    saveData(todolist); //相同名称的缓存会覆盖，更新缓存

    load();
}

//将用户数据保存至本地缓存
function saveData(data) {
    localStorage.setItem("mytodolist", JSON.stringify(data)); //JS对象转换成JSON对象存进本地缓存
}
//从本地缓存中获取数据，有数据，赋值给todolist，这样刷新页面用户数据依旧存在
function loadData() {
    var hisTory = localStorage.getItem("mytodolist");
    if (hisTory != null) {
        return JSON.parse(hisTory); //JSON对象转换为JS对象
    } else {
        return [];
    }
}

//清楚本地缓存
function clear() {
    localStorage.clear();
    load();
}

//一系列事件的监听
window.addEventListener("load", load); //页面加载完毕调用load函数
document.getElementById("clearbutton").onclick = clear;
document.getElementById("add_list").onkeypress = function (event) {
    if (event.keyCode === 13) {
        addTodolist();
    }
};