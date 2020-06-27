var pageTotal = 5;
var currentPage = 0;

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
	currentPage = 0;
	console.log(size)
	pageTotal = size;
	var pageSelect = document.getElementById("page-select");
	console.log(pageSelect)
	pageSelect.innerHTML = size;
	readData();
}

function updatePage(){
	currentPage = currentPage + pageTotal;
	readData();
}

function readData()
{
	var tableBody = document.getElementById("table-body");
	tableBody.innerHTML ="";

	let indeces = sortWithIndeces(videoID).sortIndices;
	console.log(indeces)
	videoTitle = updateArray(videoTitle,indeces)

	let currentCount = currentPage;
	for(ID in videoID){
		currentCount = currentCount + 1;
		let row = tableBody.insertRow();
		row.className = "d-flex"
		let countCell = row.insertCell(0);
		countCell.className = "col-1"
		let text = document.createTextNode(currentCount);
		countCell.appendChild(text);

		let videoCell = row.insertCell(1);
		videoCell.className = "col-5"
		let div = document.createElement('div');
		div.className = "videoWrapper"
		div.innerHTML = "<iframe width='560' height='315' src='https://www.youtube.com/embed/" + videoID[currentCount] + "'frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
		videoCell.appendChild(div)

		let titleCell = row.insertCell(2)
		titleCell.className = "col-3"
		text = document.createTextNode(videoTitle[currentCount]);
		titleCell.append(text)


		console.log(videoID[ID])

		if(ID>pageTotal-2){
			break;
		}
	}
}

function sortWithIndeces(toSort) {
  for (var i = 0; i < toSort.length; i++) {
    toSort[i] = [toSort[i], i];
  }
  toSort.sort(function(left, right) {
    return left[0] < right[0] ? -1 : 1;
  });
  toSort.sortIndices = [];
  for (var j = 0; j < toSort.length; j++) {
    toSort.sortIndices.push(toSort[j][1]);
    toSort[j] = toSort[j][0];
  }
  return toSort;
}

function updateArray(toSort,idxArray){
	let newArray = new Array(idxArray.length)
	for(idx in toSort){
		newArray[idx]=toSort[idxArray[idx]]
	}
	return newArray
}
