//--------------------------------------------------------------------------------------------------------------------------------|Variable Section
const txtDiv = document.getElementById("div-text");
const btnDiv = document.getElementById("div-dynamicBtns");
var txtStage;
var btnArray = [];
var txtArray = [];


//--------------------------------------------------------------------------------------------------------------------------------|Function Section
function testFunc() {
  var btnDivInner = document.createElement("div");
  btnArray[0] = document.createElement("button");
  btnArray[1] = document.createElement("button");
  btnArray[0].id = "btn-choice";
  btnArray[0].innerText = "added button";
  btnArray[1].innerText = "added button 2";
  btnArray[0].setAttribute("onclick", "clearArray(btnArray)");
  btnDiv.appendChild(btnArray[0]);
  btnDiv.appendChild(btnArray[1]);
}

function clearArray(array) {
  array.forEach((item, i) => {
    item.remove();
  });
}

function displayTxt(array) {
  array.forEach((item, i) => {
    txtArray[i] = document.createElement("p");
    txtArray[i].innerHTML = item;
    txtArray[i].id = "txtP-" + i;
    txtDiv.appendChild(txtArray[i]);
  });
}

function displayBtn(array, array2) {
  array.forEach((item, i) => {
    btnArray[i] = document.createElement("button");
    btnArray[i].innerHTML = item;
    btnArray[i].id = "btn-choice-" + i;
    btnArray[i].setAttribute("onclick", "btnChoice('" + array2[i] + "')");
    btnDiv.appendChild(btnArray[i]);
  });
}


function btnChoice(newStage) {
//   txtStage = newStage;
  updateTxt(newStage);
}


function updateTxt(stage) {
  clearArray(txtArray);
  clearArray(btnArray);
  switch (stage) {
    case "intro":
      displayTxt(intro_text);
      displayBtn(intro_choiceText, intro_choiceResults);
      break;

    case "kPath0":
      displayTxt(kPath0_text);
      displayBtn(kPath0_choiceText, kPath0_choiceResults);
      break;
    case "pPath0":
      displayTxt(pPath0_text);
      displayBtn(pPath0_choiceText, pPath0_choiceResults);
      break;
    case "sPath0":
      displayTxt(sPath0_text);
      displayBtn(sPath0_choiceText, sPath0_choiceResults);
      break;

    case "kPath1":
      displayTxt(kPath1_text);
      displayBtn(kPath1_choiceText, kPath1_choiceResults);
      break;

    case "pPath1":
      displayTxt(pPath1_text);
      displayBtn(pPath1_choiceText, pPath1_choiceResults);
      break;
    case "pPath1_1":
      displayTxt(pPath1_1_text);
      displayBtn(pPath1_1_choiceText, pPath1_1_choiceResults);
      break;
    case "pPath1_2":
      displayTxt(pPath1_2_text);
      displayBtn(pPath1_2_choiceText, pPath1_2_choiceResults);
      break;

    case "sPath1":
      displayTxt(sPath1_text);
      displayBtn(sPath1_choiceText, sPath1_choiceResults);
      break;
    case "sPath1_1":
      displayTxt(sPath1_1_text);
      displayBtn(sPath1_1_choiceText, sPath1_1_choiceResults);
      break;


    case "kPath2":
      displayTxt(kPath2_text);
      displayBtn(kPath2_choiceText, kPath2_choiceResults);
      break;

    case "pPath2":
      displayTxt(pPath2_text);
      displayBtn(pPath2_choiceText, pPath2_choiceResults);
      break;

    case "sPath2":
      displayTxt(sPath2_text);
      displayBtn(sPath2_choiceText, sPath2_choiceResults);
      break;
    case "sPath2_1":
      displayTxt(sPath2_1_text);
      displayBtn(sPath2_1_choiceText, sPath2_1_choiceResults);
      break;

    default:
      console.error("updateTxt switch defaulted");
      console.log(stage);
      break;
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Setup
function startAdventure() {
  document.getElementById('btn-choice-start').remove();
  txtDiv.innerHTML = "";
  //btnChoice("intro");
  btnChoice("intro");
}
