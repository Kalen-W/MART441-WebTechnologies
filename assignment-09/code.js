//--------------------------------------------------------------------------------------------------------------------------------|Variable Section
var currentPkmnData;
const dexNumSelector = document.getElementById('dexNumSelector');


//--------------------------------------------------------------------------------------------------------------------------------|Data Retrieval Section
function getPkmnData(dexNum) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var pkmnData = JSON.parse(this.responseText);
      currentPkmnData = pkmnData;
      // currentPkmnData.species = getApiData(pkmnData.species.url);

      getSpeciesData(pkmnData.species);

      // document.getElementById('testDiv').innerHTML = this.responseText;

      console.log(pkmnData);
      setTimeout(updateDisplay, 40);
    }
  };

  xhttp.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + dexNum + '/', true)
  xhttp.send();
}

function getPkmnData_jQuery(dexNum) {
  // $('#hiddenDiv').load('https://pokeapi.co/api/v2/pokemon/' + dexNum + '/').responseJSON;
  // var obj = $.getJSON('https://pokeapi.co/api/v2/pokemon/' + dexNum + '/').responseJSON;
  // var obj = JSON.parse($('#hiddenDiv').text);
  // var obj = document.getElementById('hiddenDiv').innerHTML;

  console.log(document.getElementById('hiddenDiv').innerHTML);

  var pkmnData = {};
  $.getJSON('https://pokeapi.co/api/v2/pokemon/' + dexNum + '/', function(result) {
    // $('#testDiv').text = result;
    $('#testDiv').text = $.each(result);
    $.each(result, function(i, field) {
      $('#testDiv').append(field + " ");
    })
  });
  getSpeciesData(pkmnData.species);
  setTimeout(updateDisplay, 40);
}

/*function getApiData(dexNum) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = async function() {
    if (this.readyState == 4 && this.status == 200) {
      // await new Promise(resolve => this.addEventListener('load', () => resolve()));
      var obj = JSON.parse(this.responseText);

      // new Promise(function(resolve, reject) {
      //   setTimeout(function() {
      //     resolve(obj);
      //   }, 5);
      // });

      console.log(obj);
      return 'obj';
      setTimeout(function() {
          return obj;
        }, 5);
    }
  };

  xhttp.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + dexNum + '/', true)
  xhttp.send();
}

async function returnApiData(dexNum) {
  var obj = await getApiData(dexNum);
  return obj;
}*/

/*function getApiData(url) {
  var xhttp = new XMLHttpRequest();
  var data;

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      console.log(data);
    }
    return data;
  };
  // return data;

  xhttp.open('GET', url, true)
  xhttp.send();
}*/

// const returnApiData = async (url) => { await getApiData(url); }

/*function resolve2s() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await resolve2s();
  return 'test';
}*/




function getSpeciesData(initSpeciesData) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var speciesData = JSON.parse(this.responseText);
      currentPkmnData.species = speciesData;

      // document.getElementById('pkmnName').innerHTML = currentPkmnData.species.names[8].name;
      // console.log(speciesData);
    }
  };

  xhttp.open('GET', initSpeciesData.url, true)
  xhttp.send();
}


//--------------------------------------------------------------------------------------------------------------------------------|Update Display
function updateDisplay() {
  if (typeof currentPkmnData == 'undefined' || typeof currentPkmnData.species.names == 'undefined') {
    // Insures following code only runs if currentPkmnData and currentPkmnData.species.names are defined.
    setTimeout(updateDisplay, 40);
    return;
  }

  document.getElementById('pkmnSprite').src = currentPkmnData.sprites.front_default;

  document.getElementById('statDiv').innerHTML =
    currentPkmnData.stats[0].stat.name + " = " + currentPkmnData.stats[0].base_stat + "<br /><br />" +
    currentPkmnData.stats[1].stat.name + " = " + currentPkmnData.stats[1].base_stat + "<br /><br />" +
    currentPkmnData.stats[2].stat.name + " = " + currentPkmnData.stats[2].base_stat + "<br /><br />" +
    currentPkmnData.stats[3].stat.name + " = " + currentPkmnData.stats[3].base_stat + "<br /><br />" +
    currentPkmnData.stats[4].stat.name + " = " + currentPkmnData.stats[4].base_stat + "<br /><br />" +
    currentPkmnData.stats[5].stat.name + " = " + currentPkmnData.stats[5].base_stat;


  // document.getElementById('pkmnName').innerHTML = currentPkmnData.species.names[8].name;
  // for (var i=0; i<currentPkmnData.species.names.length; i++) {
  //   var nameData = currentPkmnData.species.names[i];
  //   // console.log(nameData.name);
  //   if (nameData.language.name == 'en') {
  //     document.getElementById('pkmnName').innerHTML = nameData.name;
  //     break;
  //   }
  // }
  $('#pkmnName').displayPkmnName();
}




$.fn.testPlugin = function() {
  this.css('background-color', 'blue');
};
// $('#testDiv').testPlugin();

$.fn.displayPkmnName = function() {
  for (var i=0; i<currentPkmnData.species.names.length; i++) {
    var nameData = currentPkmnData.species.names[i];
    // console.log(nameData.name);
    if (nameData.language.name == 'en') {
      // document.getElementById('pkmnName').innerHTML = nameData.name;
      this.text(nameData.name);
      break;
    }
  }
};



//--------------------------------------------------------------------------------------------------------------------------------|Event Listeners
/*document.addEventListener('keydown', (e) => {
  // if (e.key > 0 && e.key <= 9) {
  //   getPkmnData(e.key);
  // }

  if (e.key == 't') {
    // console.log(getApiData(1));
    // console.log(returnApiData(pkmnData.species.url));
    // console.log(asyncCall());
  } else if (e.key == 'y') {
    console.log(currentPkmnData);
  } else if (e.key == 'u') {
    // console.log(data);
  }
});*/


dexNumSelector.onwheel = (e) => {
  e.preventDefault();
  if (e.deltaY > 0 && (dexNumSelector.value*1) <= dexNumSelector.min) { return; }
  if (e.deltaY < 0 && (dexNumSelector.value*1) >= dexNumSelector.max) { return; }

  // Value is multiplied by one to convert it to an intiger, otherwise it concatenates.
  dexNumSelector.value = e.deltaY < 0
    ? (dexNumSelector.value * 1) + 1
    : (dexNumSelector.value * 1) - 1;

  changePkmn();
};
dexNumSelector.onchange = changePkmn;


// Helps prevent rapid sending of requests.
var pkmnChangeWait = 'unidentified';
function changePkmn() {
  if (typeof pkmnChangeWait != 'unidentifed') {
    clearTimeout(pkmnChangeWait);
    pkmnChangeWait = 'unidentified';
  }
  pkmnChangeWait = setTimeout(changePkmnDelay, 125);
}

function changePkmnDelay() {
  clearTimeout(pkmnChangeWait);
  pkmnChangeWait = 'unidentified';

  getPkmnData(dexNumSelector.value);
  // getPkmnData_jQuery(dexNumSelector.value);
}








var pkmnDataArray = [];
function initPkmnDataArray() {
  for (var i=1; i<=151; i++) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var pkmnData = JSON.parse(this.responseText);
        pkmnDataArray[i] = pkmnData;


        var xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var speciesData = JSON.parse(this.responseText);
            pkmnDataArray[i].species = speciesData;
          }
        };
        xhttp2.open('GET', pkmnData.species.url, true)
        xhttp2.send();


        // document.getElementById('testDiv').innerHTML = this.responseText;
        // console.log(pkmnData);
      }
    };

    xhttp.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + i + '/', true)
    xhttp.send();
  }

  setTimeout(() => {
    console.log(pkmnDataArray);
  }, 1000);
}
// initPkmnDataArray();
