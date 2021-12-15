'use strict';

console.log('hello world!');

//Global variables to be used
let imgArr = [];


// Global counter for rounds
let ROUNDS = 25;

//Global Window into the DOM Canvas
let mainCanvas = document.getElementById('canvas');

//Global to count clicks
let likes = 0;

//Global window into the DOM for images to be rendered in main
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

//Get the button
let viewResults = document.getElementById('view-results');

//Global array for our foreach method to retrieve object properties
let newNumArr = [];

// As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

//Functions:
// Constructor function that creates an object associated with each product, and has the following properties:

function Item(name, ext = 'jpg') {
  this.name = name;
  this.ext = ext;
  this.src = `img/${name}.${ext}`;
  this.views = 0;
  this.clicks = 0;
  imgArr.push(this);

}
// Get the items to
let retrievedItem = localStorage.getItem('catalogItems');


//If data in local storage, get it.
if (retrievedItem) {
  let parsedItem = JSON.parse(retrievedItem);
  imgArr = parsedItem;
} else {
  //Instantiating each new instance of the object
  new Item('bag');
  new Item('banana');
  new Item('bathroom');
  new Item('boots');
  new Item('breakfast');
  new Item('bubblegum');
  new Item('chair');
  new Item('cthulhu');
  new Item('dog-duck');
  new Item('dragon');
  new Item('pen');
  new Item('pet-sweep');
  new Item('scissors');
  new Item('shark');
  new Item('sweep', 'png');
  new Item('tauntaun');
  new Item('unicorn');
  new Item('water-can');
  new Item('wine-glass');

}

//Random number generator helper function

function randomGenerator() {
  return Math.floor(Math.random() * imgArr.length); //The maximum is exclusive and the minimum is inclusive
}


//Render function for the images

function render() {
  // Validation function to make sure images are not the same
  // Credit: Audrey Patterson's Solution shown during code review for getting three different numbers with no repeats. Credit: Regan Hayes queue array idea from  code review, but instead I built my queue to do the inverse: Adds new numbers to the front of the array and pops the last part of the array.
  while (newNumArr.length < 6) {
    let newNum = randomGenerator();
    while (!newNumArr.includes(newNum)) {
      newNumArr.unshift(newNum);
    }
  }


  let itemOne = newNumArr.pop();
  let itemTwo = newNumArr.pop();
  let itemThree = newNumArr.pop();

  imgOne.src = imgArr[itemOne].src;
  imgOne.alt = imgArr[itemOne].name;
  imgArr[itemOne].views++;

  imgTwo.src = imgArr[itemTwo].src;
  imgTwo.alt = imgArr[itemTwo].name;
  imgArr[itemTwo].views++;

  imgThree.src = imgArr[itemThree].src;
  imgThree.alt = imgArr[itemThree].name;
  imgArr[itemThree].views++;
}

render();


//Handler function to take care of the clicks
function handleItemClicks(e) {
  likes++;
  let itemClicked = e.target.alt;
  console.log(itemClicked);

  for (let i = 0; i < imgArr.length; i++) {
    if (itemClicked === imgArr[i].name) {
      imgArr[i].clicks++;
    }
  }
  //Need to rerender images
  render();

  //Stop the clicks once it reaches 25
  if (likes === ROUNDS) {
    mainCanvas.removeEventListener('click', handleItemClicks);

    //Stingify the properties to be stored in local storage
    let stringifiedItem = JSON.stringify(imgArr);

    //Save to local storage
    localStorage.setItem('catalogItems', stringifiedItem);

  }


}

//  Render chart function creates a bar chart after rounds are complete
function renderChart() {
  const ctx = document.getElementById('chart').getContext('2d');
  //label arrays for the chart
  let itemNames = [];
  let itemClicks = [];
  let itemViews = [];
  for (let i = 0; i < imgArr.length; i++) {
    itemNames.push(imgArr[i].name);
    itemClicks.push(imgArr[i].clicks);
    itemViews.push(imgArr[i].views);
  }

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: itemNames,
      datasets: [{
        label: '# of clicks',
        data: itemClicks,
        backgroundColor: '#DEEB4D',
        borderColor: '#DEEB4D',
        borderWidth: 1
      },
      {
        label: '# of views',
        data: itemViews,
        backgroundColor: '#346B9E',
        borderColor: '#346B9E',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}

// Listener for the click event on button to show results
function handleButtonClicks() {

  if (likes === ROUNDS) {
    renderChart();
  }
}



//Event listeners for clicks:
mainCanvas.addEventListener('click', handleItemClicks);
viewResults.addEventListener('click', handleButtonClicks);
