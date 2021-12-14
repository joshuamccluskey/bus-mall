'use strict';

console.log('hello world!');

//Global variables to be used
const imgArr = [];


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



// As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

//Functions:
// Constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image defaulted extension to jpg
// Times the image has been shown
// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.

function Item(name, ext = 'jpg') {
  this.name = name;
  this.ext = ext;
  this.src = `img/${name}.${ext}`;
  this.views = 0;
  this.clicks = 0;
  imgArr.push(this);

}

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




//Random number generator helper function

function randomGenerator() {
  return Math.floor(Math.random() * imgArr.length); //The maximum is exclusive and the minimum is inclusive
}



// For each of the three images, increment its property of times it has been shown by one. Build while loop

// change img src and alt
//Render function for the images


function render() {

  let newNumArr = [];

  // let itemOne = randomGenerator();
  // let itemTwo = randomGenerator();
  // let itemThree = randomGenerator();

  // Validation function to make sure images are not the same
  // Credit: Audrey Patterson's Solution shown during code review for getting three different numbers with no repeats.
  while (newNumArr.length < 3) {
    let newNum = randomGenerator();
    while(!newNumArr.includes(newNum)){
      newNumArr.push(newNum);
    }
  }

  let itemOne = newNumArr[0];
  let itemTwo = newNumArr[1];
  let itemThree = newNumArr[2];


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

//Stop the clicking when reach 25


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
  }

}

// Listener for the click event on button to show results
function handleButtonClicks() {
  // Display all the results for click with number of click, views and the percentage it was clicked when it was viewed.
  let seeResults = document.getElementById('see-results');
  if (likes === ROUNDS) {
    for (let i = 0; i < imgArr.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${imgArr[i].name} viewed ${imgArr[i].views} times and liked ${imgArr[i].clicks} times`;
      seeResults.appendChild(li);
    }
  }
}

mainCanvas.addEventListener('click', handleItemClicks);


viewResults.addEventListener('click', handleButtonClicks);



// Add a button with the text View Results, which when clicked displays the list of all the products followed by the votes received, and number of times seen for each. Example: banana had 3 votes, and was seen 5 times.

// NOTE: Displayed product names should match the file name for the product. Example: the product represented with dog-duck.jpg should be displayed to the user as exactly “dog-duck” when the results are shown.
