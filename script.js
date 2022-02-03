// function to create an array of numbers and use those numbers to
// make lines of differing heights on the screen
// assinging to a class called bar that can be passed to our sorting
// functions so they can do the work
function createArray(){

	$('.bar').remove();
	var data = $('#data');
	var arrayLength = $('input:text').val();
	var colour = "rebeccapurple";
	var barWidth = ((350 * 99 / 100) / arrayLength) + 'px';
	for (var i = 0; i < arrayLength; i++)
	{
		var barHeight = Math.floor(Math.random() * 500);
		$('<div/>', {
			'class': 'bar'
		  }).css({
			'height': barHeight + 'px',
			'width': barWidth,
			'background-color': colour,
			'margin-left': '3' + 'px',
		  }).appendTo(data);
	}
}

function quickSort(bars, left, right) {
	var index;

	setTimeout(function() {
		if (bars.length > 1) {
			index = indexing(bars, left, right);

			$(bars[left]).css({
				"background-color": "rebeccapurple",
			})
		
			$(bars[right]).css({
				"background-color": "rebeccapurple",
			})

			// put everything smaller than our pivot before it in the array
			if (left < (index - 1)) {
				quickSort(bars, left, (index - 1));
			}

			// put everything larger than our pivot ahead of it in the array
			if (index < right) {
				quickSort(bars, index, right);
			}
		}
		return bars;
	}, 300);
}

// Pass the array into the quicksort function
function showQuicksort(){
	var bars = $('.bar');
	var left = 0;
	var right = bars.length - 1;
	quickSort(bars, left, right);
}

// Function that gives us our pivot so we can then partition
// the array around that pivot. divide and conquer style.
// here, we are picking the median as the pivot, but there
// are other pivots that can be chosen
function indexing(bars, left, right) {
	var pivot = $(bars[Math.floor((right + left) / 2)]),
		i = left,
		j = right;
	while (i <= j) {
		// incrementing i until it finds an element greater than the pivot
		while ($(bars[i]).height() < pivot.height()) {
			i++
		}
		// decrement j until it finds an element less than the pivot
		while ($(bars[j]).height() > pivot.height()) {
			j--;
		}
		// if i and j haven't overlapped swap the numbers at their
		// respective positions
		if (i <= j) {

			$(bars[i]).css({
				"background-color": "red",
			})
		
			$(bars[j]).css({
				"background-color": "red",
			})

			swap(bars, i, j);
			i++;
			j--;
		}
	}
	return i;
}

// Function that swaps two values on screen
// Used in various of our sorting algorithms
function swap(bars, firstIndex, secondIndex) {
	var temp, barOnScreen;

	barOnScreen = bars[secondIndex];
	$(bars[firstIndex]).insertAfter($(bars[secondIndex]));
	$(barOnScreen).insertBefore($(bars[firstIndex + 1]));

	temp = bars[firstIndex];
	bars[firstIndex] = bars[secondIndex];
	bars[secondIndex] = temp;

}

// Attached to a button to display a new array on screen
function refreshArray(){
	createArray();
}

// Need to have this be async because of the for loop
async function bubbleSort(bars, n){
	var i;
	let isSwapped;
	do{
		isSwapped = false;
		for(i = 0; i < n - 1; i++){

			await new Promise(resolve => setTimeout(() =>{

				if($(bars[i]).height() > $(bars[i+1]).height()){
					var temp, barOnScreen;

					$(bars[i]).css({
						"background-color": "red",
					})

					barOnScreen = bars[i+1];
					$(bars[i]).insertAfter($(bars[i+1]));
					$(barOnScreen).insertBefore($(bars[i+1]));

					temp = bars[i];
					bars[i] = bars[i+1];
					bars[i+1] = temp;
					isSwapped = true;
				}
				$(bars[i]).css({
					"background-color": "rebeccapurple",
				})
				resolve();
			}, 5));
		}
		$(bars[i]).css({
			"background-color": "rebeccapurple",
		})
	}while(isSwapped);
	return bars;
}

// Pass the array into the bubble sort function
function showBubbleSort(){
	var bars = $('.bar');
	var length = bars.length;

	bubbleSort(bars, length);
}

// Once again need this function to be async because of the for loops
async function selectionSort(bars, length){
	var i,j;
	for(i=0; i<length; i++){
		var index = i
		for(j=i+1; j < length; j++){
			await new Promise(resolve => setTimeout(() =>{
				if($(bars[j]).height() < $(bars[index]).height()){
					index = j;
				}
				resolve();
			}, 50));
		}
		$(bars[i]).css({
			"background-color": "red",
		})
		swap(bars, i, index);
		$(bars[i]).css({
			"background-color": "rebeccapurple",
		})
	}
	return bars;
}

// pass the array into the selection sort function
function showSelectionSort(){
	var bars = $('.bar');
	var length = bars.length;

	selectionSort(bars, length);
}

async function insertionSort(bars, length){
	var i;
	for(i = 1; i < length + 1; i++){
		var j = i - 1;

		$(bars[j-1]).css({
			"background-color": "red",
		})

		await new Promise(resolve => setTimeout(() =>{

			while(j > -1 && $(bars[j]).height() < $(bars[j-1]).height()){
				var temp, barOnScreen;
				barOnScreen = bars[j-1];

				$(bars[j-1]).css({
					"background-color": "rebeccapurple",
				})

				$(bars[j]).insertAfter($(bars[j-1]));
				$(barOnScreen).insertBefore($(bars[j+1]));

				temp = bars[j];
				bars[j] = bars[j-1];
				bars[j-1] = temp;
				j--;

			}

			resolve();
		}, 40));
	}
	return bars;
}

function showInsertionSort(){
	var bars = $('.bar');
	var length = bars.length;

	insertionSort(bars, length);
}

// Could not get the visualization working for merge sort at the moment
// Will come back to it another time
function merge(left, right, bars) {
    let arr = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }
    return [...arr, ...left, ...right];
}

function mergeSort(array, bars) {

	const half = array.length / 2;
	
	if(array.length < 2){
	  return array;
	}
	
	const left = array.splice(0, half);
	return merge(mergeSort(left), mergeSort(array), bars);
}

function showMergeSort(){

	var bars = $('.bar');
	let colHeights = [];
	for (var i=0;i<bars.length;i++){
		colHeights.push($(bars[i]).height());
	}
	mergeSort(colHeights, bars);
}

// Initialise an array on screen when the user loads the page
createArray();