var pageTotal = 5;
var totalResults = 496;
var currentPage = 0;
var pageNumber = 1;
var load = 1; //video

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
	pageNumber = 1;
	console.log(size)
	pageTotal = size;
	var pageSelect = document.getElementById("page-select");
	console.log(pageSelect)
	pageSelect.innerHTML = size;
	readData();
	updatePage();
	checkButtons();
}

function nextPage(){
	pageNumber++;
	currentPage = currentPage + pageTotal;
	readData();
	updatePage();
	checkButtons();
}

function lastPage(){
	pageNumber--;
	currentPage = currentPage - pageTotal;
	readData();
	updatePage();
	checkButtons();
}

function updatePage(){
	var pageVisual = document.getElementById("current-page");
	pageVisual.innerHTML="Showing Page " + pageNumber +  " of " + (Math.ceil(totalResults/pageTotal));
}

function checkButtons(){
	if(Math.ceil(totalResults/pageTotal) == pageNumber){
		document.getElementById("next-button").hidden="true"
		document.getElementById("next-button-2").hidden="true"
	}
	else {
		document.getElementById("next-button").removeAttribute("hidden")
		document.getElementById("next-button-2").removeAttribute("hidden")
	}
	if(pageNumber == 1){
		document.getElementById("previous-button").hidden="true"
		document.getElementById("previous-button-2").hidden="true"
	}
	else {
		document.getElementById("previous-button").removeAttribute("hidden")
		document.getElementById("previous-button-2").removeAttribute("hidden")
	}
}


function changeLoad(val){
	for(let i=1; i<4; i++){
		var button = document.getElementById("media-" + i);
		console.log(button)
		if(i==val){
			button.setAttribute("class","btn btn-success btn-sm");
		}
		else {
			button.setAttribute("class","btn btn-danger btn-sm");
		}
	}
	if(val != load){
	load = val;
	readData();
	}
}

function onLoad(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		changeLoad(2);
		var searchBox = document.getElementById("searchBox");
		searchBox.style.transform = "translateY(0px)"
	}
	readData();
	checkButtons();
}

function readData()
{
	var tableBody = document.getElementById("table-body");
	tableBody.innerHTML ="";

	let indeces = sortWithIndeces(videoID).sortIndices;
	console.log(indeces)
	videoTitle = updateArray(videoTitle,indeces)
	thumbnailID = updateArray(thumbnailID,indeces)

	let currentCount = currentPage;
	for(ID in videoID){
		currentCount = currentCount + 1;
		if(videoID[currentCount-1]) {
		let row = tableBody.insertRow();
		row.className = "d-flex"
		let countCell = row.insertCell(0);
		countCell.className = "col-1"
		let text = document.createTextNode(currentCount);
		countCell.appendChild(text);

		let videoCell = row.insertCell(1);
		videoCell.className = "col-5"
		let div = document.createElement('div');

		if(load == 1){
			div.className = "videoWrapper";
			div.innerHTML = "<iframe width='560' height='315' src='https://www.youtube.com/embed/" + videoID[currentCount-1] + "'frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
		} else if(load == 2){
			div.innerHTML = '<a href=https://www.youtube.com/watch?v=' + videoID[currentCount-1] + '" target="_blank" rel="noopener noreferrer" >' + "<img style='width:100%; display:block;' src='" + thumbnailID[currentCount-1] + "'></a>"
		}
		else
			div.innerHTML = '<a href=https://www.youtube.com/watch?v=' + videoID[currentCount-1] + '" target="_blank" rel="noopener noreferrer" >youtube.com/watch?v=' + videoID[currentCount-1] + '</a>'
		
		videoCell.appendChild(div)

		let titleCell = row.insertCell(2)
		titleCell.className = "col-3"
		text = document.createTextNode(videoTitle[currentCount-1]);
		titleCell.append(text)


		console.log(videoID[ID])

		}

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
