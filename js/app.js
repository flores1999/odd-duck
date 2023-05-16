'use strct';

// *** globals ***

let voteCount = 25;
let newProductArry = [];

// *** dom windows ***

let imgAll = document.getElementById('img-all');
let imgOne = document.getElementById('img-1');
let imgTwo = document.getElementById('img-2');
let imgThree = document.getElementById('img-3');
let resultsBtn = document.getElementById('get-results-bnt');
let resultsList = document.getElementById('results-containe');

// *** constructor function ***

function NewProducts(name, imageExtenstion = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${imageExtenstion}`;
  this.vote = 0;
  this.views = 0;

}

// *** helper fucctions/utilites ***
// To do : changne random to index 
function randomImg() {
  return Math.floor(Math.random() * newProductArry.length);
}

function renderImgs() {
  let imgOneIndex = randomImg();
  let imgTwoIndex = randomImg();
  let imgThreeIndex = randomImg();

  while (imgOneIndex === imgTwoIndex === imgThreeIndex) {
    imgTwoIndex = randomImg();
    imgThreeIndex = randomImg();
  }

  imgOne.src = newProductArry[imgOneIndex].image;
  imgOne.title = newProductArry[imgOneIndex].name;

  imgTwo.src = newProductArry[imgTwoIndex].image;
  imgTwo.title = newProductArry[imgTwoIndex].name;

  imgThree.src = newProductArry[imgThreeIndex].image;
  imgThree = newProductArry[imgThreeIndex].name;

  newProductArry[imgOneIndex].views++;
  newProductArry[imgTwoIndex].views++;
  newProductArry[imgThreeIndex].views++;


}

// *** event handlers ***

function imgClick(event) {
  let imgClicked = event.target.title;

  for (let i = 0; i < newProductArry.length; i++) {
    if (imgClicked === newProductArry[i].name) {
      newProductArry[i].vote++;
      voteCount--;
      renderImgs();
    }
  }
  if (voteCount === 0) {
    imgAll.removeEventListener('click', imgClick);
  }
}
function handleResultsList() {
  if (voteCount === 0) {
    for (let i = 0; i < newProductArry.lenrth; i++) {
      let productList = document.createElement('li');
      productList.textContent = `${newProductArry[i].name}-votes: ${newProductArry[i].vote} & views: ${newProductArry[i].views} `;

      resultsList.appendChild(productList);
    }
    resultsBtn.removeEventListener('click', handleResultsList);
  }
}

// *** executable  code ***
let sweep = new NewProducts('sweep', 'img/sweep.png');
let bag = new NewProducts('bag');
let banana = new NewProducts('banana');
let bathroom = new NewProducts('bathroom');
let boots = new NewProducts('boots');
let breakfast = new NewProducts('breakfast');
let bubbleGum = new NewProducts('bubbleGum');
let chair = new NewProducts('chair');
let cthulhu = new NewProducts('cthulhu');
let dogDuck = new NewProducts('dog-duck');
let dragon = new NewProducts('dragon');
let pen = new NewProducts('pen');
let petSweep = new NewProducts('pet-sweep');
let scissors = new NewProducts('scissors');
let shark = new NewProducts('shark');
let tauntaun = new NewProducts('tauntaun');
let unicorn = new NewProducts('unicorn');
let waterCan = new NewProducts('water-can');
let winGlass = new NewProducts('win-glass');





newProductArry.push(sweep, bag, banana, bathroom, boots, breakfast, bubbleGum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, tauntaun, unicorn, waterCan, winGlass);

renderImgs();

imgAll.addEventListener('click', imgClick);

resultsBtn.addEventListener('click', handleResultsList);
