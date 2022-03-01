var information = {
  firstName: "Kalen",
  lastName: "Weinheimer",
  age: 20,
  attempts: 0
};

// localStorage.setItem('playerInfo', JSON.stringify(information));
//
// console.log(information.age);
// console.log(JSON.parse(localStorage.getItem('playerInfo')).firstName);


function submitUserInfo() {
  information.firstName = document.getElementById('firstName').value;
  information.lastName = document.getElementById('lastName').value;
  information.age = document.getElementById('age').value;
  //information.attempts = JSON.parse(localStorage.getItem('playerInfo')).attempts;

  localStorage.setItem('playerInfo', JSON.stringify(information));
  console.log(JSON.parse(localStorage.getItem('playerInfo')));

  window.location = "./game.html";
}
