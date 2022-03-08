const btn = document.getElementById('btn');
const theTitle = document.getElementById('theTitle');
const theDiv = document.getElementById('theDiv');
const theImg = document.getElementById('theImg');

class Base {
  constructor(title, imageRelLink, description, author, year) {
    this.title = title;
    this.imgLink = "./assets/" + imageRelLink;
    this.desc = description;
    this.author = author;
    this.year = year;
  }

  update() {
    theTitle.innerHTML = this.title;
    theDiv.innerHTML = this.desc + "<br />" + this.author + "<br />" + this.year;
    theImg.style.backgroundImage = "url('" + this.imgLink + "')";
    theImg.title = this.title;
  }
}

array = [
  new Base('Placeholder Title - 0', 'image0.jpg', 'Placeholder Description - 0', 'Placeholder Author - 0', 'Placeholder Year - 0'),
  new Base('Placeholder Title - 1', 'image1.jpg', 'Placeholder Description - 1', 'Placeholder Author - 1', 'Placeholder Year - 1'),
  new Base('Placeholder Title - 2', 'image2.jpg', 'Placeholder Description - 2', 'Placeholder Author - 2', 'Placeholder Year - 2'),
  new Base('Placeholder Title - 3', 'image3.jpg', 'Placeholder Description - 3', 'Placeholder Author - 3', 'Placeholder Year - 3'),
  new Base('Placeholder Title - 4', 'image4.jpg', 'Placeholder Description - 4', 'Placeholder Author - 4', 'Placeholder Year - 4'),
];

//var active;


/*function update() {
  theTitle.innerHTML = active.title;
  theDiv.innerHTML = active.desc + "<br />" + active.author + "<br />" + active.year;
  theImg.style.backgroundImage = "url('" + active.imgLink + "')";
  theImg.title = active.desc;
}*/


var previousNums = [];
function preventDuplicate(num) {
  var newNum = num;

  if (!previousNums.includes(num)) {
    previousNums.push(num);
    console.log(previousNums);
    return num;
  } else if (previousNums.length >= array.length) {
    while (newNum == previousNums[previousNums.length-1]) {
      newNum = Math.floor(Math.random() * array.length);
    }
    previousNums = [previousNums[previousNums.length-1]];
    console.log(previousNums);
    return newNum;
  }

  while (previousNums.includes(newNum)) {
    newNum = Math.floor(Math.random() * array.length);
  }
  if (previousNums.length < array.length) {
    previousNums.push(newNum);
  } else {
    previousNums = [previousNums[previousNums.length-1]];
  }
  console.log(previousNums);
  return newNum;
}


function btnClick() {
  var activeNum = Math.floor(Math.random() * array.length);
  //active = array[preventDuplicate(activeNum)];
  //update();
  array[preventDuplicate(activeNum)].update();
}


function init() {
  var activeNum = Math.floor(Math.random() * array.length);
  previousNums = [activeNum];
  //active = array[activeNum];
  //update();
  array[preventDuplicate(activeNum)].update();
}
