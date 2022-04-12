var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");

function inputLength() {
	return input.value.length;
}

function createListElement() {
	var li = document.createElement("li");
	var spn = document.createElement("span");
	var btn = document.createElement("button");
	btn.append("x");
	btn.addEventListener("click",removeItemAfterClick);
	spn.append(document.createTextNode(input.value));
	li.append(spn, btn);
	li.addEventListener("click",addClassAfterClick);
	ul.appendChild(li);
	input.value = "";
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {	
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);


//-------------------

function addClassAfterClick(event){
	if(event.target.toggleAttribute("a")){
		event.target.classList.add("done");
	}
	else {
	 	event.target.classList.remove("done");
	}
}
function removeItemAfterClick(event){
	event.target.parentElement.remove();
}

//Add event listeners to list items
for(var i = 0;i<document.querySelectorAll("li").length;i++){
	document.querySelectorAll("li")[i].addEventListener("click", addClassAfterClick);
}

//Add event listeners to button items
for(var i = 0;i<document.querySelectorAll("button").length-1;i++){
	document.querySelectorAll("button")[i].addEventListener("click", removeItemAfterClick);
}

//disable text selection inside list
document.querySelector("ul").setAttribute("onmousedown", "return false");
document.querySelector("ul").setAttribute("onselectstart","return false");
