function changeColor(name) {
	let button = document.getElementById(name);
	console.log(button.className)
	if(button.className == "btn btn-danger btn-sm"){
		button.setAttribute("class","btn btn-success btn-sm");
	}
	else {
		button.setAttribute("class","btn btn-danger btn-sm");
	}
}
