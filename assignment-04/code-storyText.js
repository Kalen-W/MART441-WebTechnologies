//--------------------------------------------------------------------------------------------------------------------------------|Variable Section
var pause = false;

//var inputMethod = "button";
var inputMethod = "text";
var elementBlur = false;

const txtDiv = document.getElementById("div-text");
var txtArray = [];

const btnDiv = document.getElementById("div-input");
var btnArray = [];


//--------------------------------------------------------------------------------------------------------------------------------|Class / Function Section
class stageData {
  constructor(textArray = "", choicesArray = []) {
    this.text = textArray;
    this.choices = choicesArray;
  }

  displayTxt() {
    this.text.forEach((item, i) => {
      txtArray[i] = document.createElement("p");
      txtArray[i].innerHTML = item;
      txtArray[i].id = "txtP-" + i;
      txtDiv.appendChild(txtArray[i]);
    });

    if (inputMethod == "text") {
      txtArray.push(document.createElement("p"));
      txtArray[txtArray.length-1].innerHTML = "<hr />";
      txtArray[txtArray.length-1].id = "txtP-";
      txtDiv.appendChild(txtArray[txtArray.length-1]);

      this.choices.forEach((item, i) => {
        txtArray.push(document.createElement("p"));
        txtArray[txtArray.length-1].innerHTML = (i+1) + " - " + item[0];
        txtArray[txtArray.length-1].id = "txtP-choice-";
        txtDiv.appendChild(txtArray[txtArray.length-1]);
      });
    }
  }

  displayBtn() {
    if (inputMethod == "button") {
      this.choices.forEach((item, i) => {
        btnArray[i] = document.createElement("button");
        btnArray[i].innerHTML = item[0];
        btnArray[i].id = "btn-choice-" + i;
        if (elementBlur) {btnArray[i].style["backdrop-filter"] = "blur(3px)";}

        btnArray[i].addEventListener("click", function(){btnChoice(item[1]);}); // It took me far too long to find this solution...
        btnDiv.appendChild(btnArray[i]);
      });
    } else if (inputMethod == "text") {
      btnArray[0] = document.createElement("input");
      btnArray[0].setAttribute("type", "text");
      btnArray[0].placeholder = "Type Your Response Here"
      btnArray[0].id = "btn-choice-text-" + 0;
      if (elementBlur) {btnArray[0].style["backdrop-filter"] = "blur(3px)";}

      //btnArray[0].addEventListener("input", function(){ console.log(btnArray[0].value);; });

      btnArray[0].addEventListener("keyup", (e) => {
        if (e.key == "Enter") {
          var validInput;
          //console.log("input: " + btnArray[0].value.toLowerCase());
          this.choices.forEach((item, i) => {
            //console.log(item[0]);
            if (item[2].includes(btnArray[0].value.toLowerCase()) || item[0].toLowerCase==btnArray[0].value.toLowerCase() || "1 - "+item[0].toLowerCase==btnArray[0].value.toLowerCase()) {
              btnChoice(item[1]);
              validInput = true;
            }
          });

          if (validInput != true) {
            console.log("invalid input");
            btnArray[0].style["border-color"] = "#64303484";
            btnArray[0].style["background-color"] = "#160a0a38";
          }
        }
      });

      btnDiv.appendChild(btnArray[0]);
      btnArray[0].focus();
    }
  }
}

class textInputOption {
  constructor(stageId) {
    this.stageId = stageId;
  }

  validInputCheck() {
    console.log(this);
  }
}

const stageDict = {
  na: new stageData(),
  deathTemp: new stageData(),
  intro: new stageData(),

  kPath0: new stageData(),
  kPath1: new stageData(),
  kPath2: new stageData(),

  pPath0: new stageData(),
  pPath1: new stageData(),
  pPath1_1: new stageData(),
  pPath1_2: new stageData(),
  pPath2: new stageData(),

  sPath0: new stageData(),
  sPath1: new stageData(),
  sPath1_1: new stageData(),
  sPath1_2: new stageData(),
  sPath2: new stageData(),
  sPath2_1: new stageData(),
};


//--------------------------------------------------------------------------------------------------------------------------------|Misc Text
stageDict.na.text = ["Not Available - Under Construction"];
stageDict.na.choices = [
  ["Restart", stageDict.intro, ["go", "continue", "cont", "restart", "start", "try again", "again", "retry", "", "1"]]
];

stageDict.deathTemp.text = ["It would appear you've managed to die.", "Would you like to try again?"];
stageDict.deathTemp.choices = [
  ["Restart", stageDict.intro, ["go", "continue", "cont", "restart", "start", "try again", "again", "retry", "", "1"]]
];

stageDict.intro.text = [
  "You awaken, your first sensation is a quick flash of pain jolting through your head, though this fleeting pain is quickly replaced by the sense of cold stony ground, and damp stagnant air.",
  "Slowly your senses return, and as your vision begins to clear, you notice the nearest source of light is coming from an opening across the room.",
  "It’s difficult to get a sense of your surroundings with so little light, but it’s obvious you’re in some sort of stone structure underground.",
  "You carefully stand yourself up, and as the last bits of haze clears itself from your mind, you remember who you are..."
];
stageDict.intro.choices = [
  ["I am a <b>Royal Knight</b> who has pledged their life to serving my king and kingdom.", stageDict.kPath0, ["royal knight", "knight", "1"]],
  ["I am a <b>Professor of Magic</b> who has dedicated themself to unraveling the mysteries of mana.", stageDict.pPath0, ["professor of magic", "magic professor", "professor", "mage", "magician", "wizard", "2"]],
  ['I am a <b>Mercenary "Scout"</b> who grew up on the streets, and now sells their services to the highest bidder.', stageDict.sPath0, ["mercenary scout", "mercenary 'scout'", 'mercenary "scout"', "mercenary", "scout", "merc", "rogue", "thief", "3"]]
];

/*stageDictRef = [
  stageDict.intro,
  stageDict.kPath0,
  stageDict.pPath0,
  stageDict.sPath0,
];*/


//--------------------------------------------------------------------------------------------------------------------------------|Knight Text
stageDict.kPath0.text = [
  "As you recall who you are, memories of where you are also begin to surface.",
  "You remember hearing about how undead abominations had begun wandering out of the Royal Catacombs, you even killed a few yourself while on guard duty. " +
  "And while the amount was by no means overwhelming, the kingdom obviously found this troubling. " +
  "It wasn’t long before a group was organized for an expedition into the Catacombs, and, as one of the kingdom’s best knights, you were selected to participate.",
  "However, despite recalling where you are, you don’t remember how you ended up in this particular room." +
  "The last thing you recall is entering the Royal Catacombs after being briefed on the situation.",
  "Regardless, inaction isn’t likely to get you out of here, so you decide to..."
];
stageDict.kPath0.choices = [
  ["Go towards the archway where your only light is coming from.", stageDict.kPath1, ["go", "1"]],
  ["Search the current room.", stageDict.kPath2, ["search", "2"]]
];

stageDict.kPath1.text = [
  "You approach the archway, and as your eyes adjust to the light you find a hallway lined with lit torches stretching some distance before making a sharp left turn. " +
  "Turning your attention to the torches lining the walls, you recognize the torches as the same kind found within the castle. " +
  "Evidently the torches are kept ablaze by the mana circuit running along the wall connecting them to some source of mana.",
  "Continuing down the hallway, as you draw nearer to the corner you end up accidentally triggering a pitfall trap, plummeting you into a dark room some ways down. The fall certainly hurt, but it was by no means far enough to be lethal. Shortly after you manage to get back on your feet a few magic torches flicker to life in the far corners of the room. The torches are dim, but more than enough for you to take notice of the large skeleton of some long dead beast, which explains the short fall..."
];
stageDict.kPath1.choices = [
  //["Continue", stageDict.kPath1_cont]
  ["Continue", stageDict.na, ["go", "continue", "cont", "", "1"]]
];

stageDict.kPath2.text = [
  "Examining the room, as best you can with so little light, you take notice of a peculiar portion of the wall. Figuring it to be a secret passage of some sort, and hoping to find some way to open it, you look around for anything else that seems out of place. But, after a few minutes, you give up your search, leaving you with only one option..."
];
stageDict.kPath2.choices = [
  ["Go towards the archway where your only light is coming from.", stageDict.kPath1, ["go", "continue", "cont", "", "1"]]
];


//--------------------------------------------------------------------------------------------------------------------------------|Professor Text
stageDict.pPath0.text = [
  "As you recall who you are, memories of where you are also begin to surface.",
  "Between teaching classes and research, you vaguely remember hearing whisperings of undead wandering out of the Royal Catacombs, nonsensical rumors you thought. " +
  "However, these rumors were soon proven true when the kingdom contacted you, asking for your participation in an expedition into the Catacombs. " +
  "While hesitant at first, given your lack of practical combat experience, your curiosity got the better of you, and you agreed to participate.",
  "However, despite recalling where you are, you don’t remember how you ended up in this particular room." +
  "The last thing you recall is entering the Royal Catacombs after being briefed on the situation.",
  "Regardless, inaction isn’t likely to get you out of here, so you decide to..."
];
stageDict.pPath0.choices = [
  ["Go towards the archway where your only light is coming from.", stageDict.pPath1, ["go", "1"]],
  ["Search the current room.", stageDict.pPath2, ["search", "2"]]
];

stageDict.pPath1.text = [
  "You approach the archway, and as your eyes adjust to the light you find a hallway lined with lit torches stretching some distance before making a sharp left turn. " +
  "Turning your attention to the torches lining the walls, you immediately sense the mana flowing through the circuit on the wall, and being delivered to the torches. " +
  "Your academy uses a similar method, but despite the archaic design here, these torches are obviously more refined and mana efficient.",
  "Continuing down the hallway, as you draw nearer to the corner you end up accidentally triggering a pitfall trap, and almost immediately as you feel the floor give away, your brain goes to work thinking of solutions to this predicament..."
];
stageDict.pPath1.choices = [
  ["Use slow fall to slow your descent.", stageDict.pPath1_1, ["slow fall", "use slow fall", "the slow fall", "use the slow fall", "slowfall", "use slowfall", "the slowfall", "use the slowfall", "slow", "fall", "1"]],
  ["Attempt your experimental flight magic.", stageDict.pPath1_2, ["flight magic", "use flight magic", "the flight magic", "use the flight magic", "flight", "use flight", "fly", "use fly", "experimental magic", "use experimental magic", "the experimental magic", "use the experimental magic", "experimental", "experiment", "2"]]
];

stageDict.pPath1_1.text = [
  "Upon activating your slow fall spell you notice how it won't need to stay activated for long, as it's a relatively short fall. Once you reach the floor you notice the trap above you reseting just as a few magic torches flicker to life in the far corners of the room. The torches are dim, but more than enough for you to take notice of the unusually large cerberus skeleton, which explains the short fall..."
];
stageDict.pPath1_1.choices = [
  //["Continue", stageDict.pPath1_1_cont]
  ["Continue", stageDict.na, ["go", "continue", "cont", "", "1"]]
];

stageDict.pPath1_2.text = [
  "You've yet to have a test run of your flight magic that didn't end with some magical mishap or other, but, figuring whatever happens couldn't leave you any worse off than the pitfall, you activate your spell. And, while it would be a bit of a stretch to describe the result as flight, it does at least successfully shoot you over to the other side of the pit. As you dust yourself off and take mental notes of the impromptu experiment, you notice that the hallway splits into two seperate paths."
];
stageDict.pPath1_2.choices = [
  ["You decide the path left looks most inviting.", stageDict.na, ["left", "left path", "the left path", "go left", "go to the left", "go to left", "go to the left path", "go to left path", "1"]],
  ["You decide the path right looks most inviting.", stageDict.na, ["right", "right path", "the right path", "go right", "go to the right", "go to right", "go to the right path", "go to right path", "2"]]
];

stageDict.pPath2.text = [
  "Examining the room, as best you can with so little light, you take notice of a peculiar portion of the wall. Figuring it to be a secret passage of some sort, and hoping to find some way to open it, you look around for anything else that seems out of place. But, after a few minutes, you give up your search, leaving you with only one option..."
];
stageDict.pPath2.choices = [
  ["Go towards the archway where your only light is coming from.", stageDict.pPath1, ["go", "continue", "cont", "", "1"]]
];


//--------------------------------------------------------------------------------------------------------------------------------|Scout Text
stageDict.sPath0.text = [
  "As you recall who you are, memories of where you are also begin to surface.",
  "Information gathering is just one of your many skills, so you were one of the first people outside the castle to hear of undead wandering out from the Royal Catacombs. " +
  "And it wasn’t long after, that you caught wind of a contract put up by the kingdom. " +
  "While the contract was suitably vague, you had your suspicions, and though the risk seemed high, you had worked for the kingdom before. " +
  "You knew how well they paid, and you knew the kingdom’s knights were... competent enough meat shields, so you decided it was worth your time to participate.",
  "However, despite recalling where you are, you don’t remember how you ended up in this particular room." +
  "The last thing you recall is entering the Royal Catacombs after being briefed on the situation.",
  "Regardless, inaction isn’t likely to get you out of here, so you decide to..."
];
stageDict.sPath0.choices = [
  ["Go towards the archway where your only light is coming from.", stageDict.sPath1, ["go", "1"]],
  ["Search the current room.", stageDict.sPath2, ["search", "2"]]
];

stageDict.sPath1.text = [
  "You approach the archway, and as your eyes adjust to the light you find a hallway lined with lit torches stretching some distance before making a sharp left turn. " +
  "Turning your attention to the torches lining the walls, you wonder how they could possibly be lit. " +
  "You consider the possibility of someone having recently lit each one as they traversed this hallway, though decide it's more likely some sort of mage trick.",
  "Continuing down the hallway, as you draw nearer to the corner you notice a disguised pressure plate in the floor, scanning the surrounding area you assume it to be a trigger for a pitfall trap. You figure the obvious choice would be to avoid the trap, but you never can be sure with these sorts of dungeons. You ultimately decide the best course of action would be too..."
];
stageDict.sPath1.choices = [
  ["Tie a rope to a torch sconce, trigger the trap, and carefully descend.", stageDict.sPath1_1, ["tie a rope", "rope", "torch", "tie a rope to the torch sconce", "tie a rope to the torch", "tie a rope to torch", "tie a rope to torch sconce", "tie rope to the torch sconce", "tie rope to the torch", "tie rope to torch", "tie rope to torch sconce", "descend", "trigger", "trigger trap", "trigger the trap", "1"]],
  ["Avoid the trap. Obviously.", stageDict.sPath1_2, ["avoid the trap", "avoid trap", "avoid", "go around", "2"]]
];

stageDict.sPath1_1.text = [
  "After preparing, you trigger the pressure plate, and, as expected, the floor gives way to a pit. To your surpire, the pit is shallow enough to make out the bottom. Deciding to give it a look, you carefullt decend down your rope into the pit. As you  begin to reach the bottom the trap resets itself, and while your rope dis stop the trap from fully closing, there is no feasable way to open it back up from where you are.",
  "Just as your regret begins to settle in a few magic torches flicker to life in the far corners of the room. The torches are dim, but more than enough for you to take notice of the large skeleton of some long dead beast, which explains the short fall..."
];
stageDict.sPath1_1.choices = [
  //["Continue", stageDict.sPath1_1_cont]
  ["Continue", stageDict.na, ["go", "continue", "cont", "", "1"]]
];

stageDict.sPath1_2.text = [
  "Making your way carefully around the trap you come to the halway corner, and notice the the path ahead of you splits into two seperate paths."
];
stageDict.sPath1_2.choices = [
  ["You decide the path left looks most inviting.", stageDict.na, ["left", "left path", "the left path", "go left", "go to the left", "go to left", "go to the left path", "go to left path", "1"]],
  ["You decide the path right looks most inviting.", stageDict.na, ["right", "right path", "the right path", "go right", "go to the right", "go to right", "go to the right path", "go to right path", "2"]]
];

stageDict.sPath2.text = [
  "Examining the room, as best you can with so little light, you take notice of a peculiar portion of the wall. Looking closer you notice a collection of bricks in a vague archway shape have been worn slightly on the outer sides. And given the lack of skid marks on this side of the wall, you can tell this design pushes the other direction to open. You decide to not waste time looking for some switch or something, as the worn down bricks give you just enough room to mess with the mechanism and get it open. Once open, a staircase heading downward is revealed, and you decide to..."
];
stageDict.sPath2.choices = [
  ["Make your way down the dark staircase.", stageDict.sPath2_1, ["stairs", "staircase", "down", "go down", "go down stairs", "go down staircase", "go down the stairs", "go down the staircase", "dark stairs", "the dark stairs", "dark staircase", "the dark staircase", "1"]],
  ["Go towards the archway where your only light is coming from.", stageDict.sPath1, ["go", "2"]]
];

stageDict.sPath2_1.text = [
  "As you make you way to the bottom of the staircase a few magic torches flicker to life in the far corners of the room. The torches are dim, but more than enough for you to take notice of the large skeleton of some long dead beast."
];
stageDict.sPath2_1.choices = [
  ["Continue", stageDict.na, ["go", "continue", "cont", "", "1"]]
];
