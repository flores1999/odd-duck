'use strct';

// *** globals ***

let voteCount = 25;
let newProductArray = [];

// *** dom windows ***

let imgAll = document.getElementById('img-all');
let imgOne = document.getElementById('img-1');
let imgTwo = document.getElementById('img-2');
let imgThree = document.getElementById('img-3');
let resultsBtn = document.getElementById('get-results-bnt');

// *** CANVAS ELEMENT ***
let ctx = document.getElementById('myChart');

// *** constructor function ***

function NewProducts(name, imageExtenstion = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${imageExtenstion}`;
  this.vote = 0;
  this.views = 0;

}

// *** helper fucctions/utilites ***

function index() {
  return Math.floor(Math.random() * newProductArray.length);
}



function renderImgs() {
  let indexArray = [];
  while (indexArray.length < 6) {
    let randomImg = index();
    if (!indexArray.includes(randomImg)) {
      indexArray.push(randomImg);
    }
  }
  let imgOneIndex = indexArray.pop();
  let imgTwoIndex = indexArray.pop();
  let imgThreeIndex = indexArray.pop();




  imgOne.src = newProductArray[imgOneIndex].image;
  imgOne.title = newProductArray[imgOneIndex].name;

  imgTwo.src = newProductArray[imgTwoIndex].image;
  imgTwo.title = newProductArray[imgTwoIndex].name;

  imgThree.src = newProductArray[imgThreeIndex].image;
  imgThree.title = newProductArray[imgThreeIndex].name;

  newProductArray[imgOneIndex].views++;
  newProductArray[imgTwoIndex].views++;
  newProductArray[imgThreeIndex].views++;
}

function renderChart() {
  let productNames = [];
  let productsViewed = [];
  let votedOn = [];

  for (let i = 0; i < newProductArray.length; i++) {
    productNames.push(newProductArray[i].name);
    votedOn.push(newProductArray[i].vote);
    productsViewed.push(newProductArray[i].views);

  }

  let chaertObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes',
        data: votedOn,
        borderWidth: 1
      },
      {
        label: 'views',
        data: productsViewed,
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
  };
  new Chart(ctx, chaertObj);

}

// *** event handlers ***

function imgClick(event) {
  let imgClicked = event.target.title;

  for (let i = 0; i < newProductArray.length; i++) {
    if (imgClicked === newProductArray[i].name) {
      newProductArray[i].vote++;
      voteCount--;
      renderImgs();
    }
  }
  if (voteCount === 0) {
    imgAll.removeEventListener('click', imgClick);
  }
  // *** storage ***
  let sringifProducts = JSON.stringify(newProductArray);

  localStorage.setItem('myProducts', sringifProducts);

}
function handleResultsList() {
  if (voteCount === 0) {
    renderChart();
    resultsBtn.removeEventListener('click', handleResultsList);
  }
}

// *** executable  code ***

let retrevedProducts = localStorage.getItem('myProducts');

if (retrevedProducts) {
  let parsedProducts = JSON.parse(retrevedProducts);
  newProductArray = parsedProducts;
} else {
  let sweep = new NewProducts('sweep', 'png');
  let bag = new NewProducts('bag');
  let banana = new NewProducts('banana');
  let bathroom = new NewProducts('bathroom');
  let boots = new NewProducts('boots');
  let breakfast = new NewProducts('breakfast');
  let bubbleGum = new NewProducts('bubblegum');
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
  let winGlass = new NewProducts('wine-glass');

  newProductArray.push(sweep, bag, banana, bathroom, boots, breakfast, bubbleGum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, tauntaun, unicorn, waterCan, winGlass);
}

renderImgs();

imgAll.addEventListener('click', imgClick);

resultsBtn.addEventListener('click', handleResultsList);
