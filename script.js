var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");

button.addEventListener("click",function(){
    if(input.value.length > 0){
        var btn = document.createElement("button");
        var li = document.createElement("li");
        btn.append("-");
        btn.addEventListener("click",removeItemAfterClick);
        li.append(btn, input.value);
        li.addEventListener("click",changeItemAfterClick);
        ul.append(li);
        input.value="";
    }
});

input.addEventListener("keypress",function(event){
    if(event.which===13 && input.value.length > 0){
        var btn = document.createElement("button");
        var li = document.createElement("li");
        btn.append("-");
        btn.addEventListener("click",removeItemAfterClick);
        li.append(btn, input.value);
        li.addEventListener("click",changeItemAfterClick);
        ul.append(li);
        input.value="";
    }
});

function removeItemAfterClick(event){
    event.target.parentElement.remove();
}

function changeItemAfterClick(event){
    if(!control(event)){
        event.target.classList.add("text-done");
        event.target.children[0].innerHTML = "x";
    } else {
        event.target.classList.remove("text-done");
        event.target.children[0].innerHTML = "-";
    }
}

function control(event){
    var control = false;
    if(event.target.className === 'text-done')
        control = true;
    return control;
}

for(var i=0;i<document.querySelectorAll("button").length-1;i++){
    document.querySelectorAll("button")[i].addEventListener("click",removeItemAfterClick);
}

for(var i=0;i<document.querySelectorAll("li").length;i++){
    document.querySelectorAll("li")[i].addEventListener("click",changeItemAfterClick);
}

