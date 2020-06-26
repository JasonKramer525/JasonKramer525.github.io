
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

function setPageSize(size){
	var pageSelect = document.getElementById("page-select");
	console.log(pageSelect)
	pageSelect.innerHTML = size;
	readData();
}

async function readData()
{
	const response = await fetch('data.csv');
	const data = await response.text();

	  try {
    const response = await fetch(url);
    const data = await response.text();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}