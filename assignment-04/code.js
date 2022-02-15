//--------------------------------------------------------------------------------------------------------------------------------|Function Section
function clearArray(array) {
  /*array.forEach((item, i) => {
    item.remove();
  });*/
  while (array.length>0) {
    array[0].remove();
    array.splice(0, 1);
  }
}

function btnChoice(stageDictObj) {
  if (!pause) {
    updateTxt(stageDictObj);
  }
}

function updateTxt(stageDictObj) {
  clearArray(txtArray);
  clearArray(btnArray);
  stageDictObj.displayTxt();
  stageDictObj.displayBtn();
}

function updateStyle() {
  div_input = document.getElementById("div-input");
  if (inputMethod == "text") {
    document.getElementById("div-text").style.height = "81.4%";
    document.getElementById("separator").style.top = "82%";
    div_input.style.top = "84%";
    div_input.style.height = "15.7%";
  } else {
    document.getElementById("div-text").style.height = "51.4%";
    document.getElementById("separator").style.top = "52%";
    div_input.style.top = "53.2%";
    div_input.style.height = "46.66%";
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Menu Section
function toggleMenu() {
  pause = !pause;
  if (pause) {
    document.getElementById("menu").style.visibility = "visible";
  } else {
    document.getElementById("menu").style.visibility = "hidden";
  }
}

function toggleBlur() {
  elementBlur = !elementBlur;
  if (!elementBlur) {
    document.getElementById("menu").style["backdrop-filter"] = "";
    document.getElementById("menu").style.background = "#101111f6";
    document.getElementById("btn-menu-blur").style["box-shadow"] = "inset 0 0 30px 5px #44080cd0";
  } else {
    document.getElementById("menu").style["backdrop-filter"] = "blur(3px)";
    document.getElementById("menu").style.background = "#10111288";
    document.getElementById("btn-menu-blur").style["box-shadow"] = "0 0 16px 4px #084414cc";
  }
}
toggleBlur();

var canvasBg = false;
function toggleBackground() {
  canvasBg = !canvasBg;
  if (!canvasBg) {
    document.getElementById("btn-menu-bg").style["box-shadow"] = "inset 0 0 30px 5px #44080cd0";
    clearInterval(animationInterval);
    clearScreen();
    canvas.style.visibility = "hidden";
    points = [];
  } else {
    document.getElementById("btn-menu-bg").style["box-shadow"] = "0 0 16px 4px #084414cc";
    animationInterval = setInterval(animationLoop, tick);
    canvas.style.visibility = "visible";
    generatePointsArray(currentShape);
  }
}
toggleBackground();

function toggleInputMethod() {
  if (inputMethod == "button") {
    inputMethod = "text";
  } else {
    inputMethod = "button";
  }
  updateStyle();
}


//--------------------------------------------------------------------------------------------------------------------------------|Event Listener
document.addEventListener("keyup", (e) => {
  if (e.key == "Escape") {
    toggleMenu();
  } else if (e.key == "`") {
    //toggleBackground();
  }
});


//--------------------------------------------------------------------------------------------------------------------------------|Setup
function startAdventure() {
  if (!pause) {
    document.getElementById('btn-choice-start').remove();
    txtDiv.innerHTML = "";
    updateTxt(stageDict.intro);
  }
}
