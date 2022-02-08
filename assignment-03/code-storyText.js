const intro_text = [
  "You awaken, your first sensation is a quick flash of pain jolting through your head, though this fleeting pain is quickly replaced by the sense of cold stony ground, and damp stagnant air.",
  "Slowly your senses return, and as your vision begins to clear, you notice the nearest source of light is coming from an opening across the room.",
  "It’s difficult to get a sense of your surroundings with so little light, but it’s obvious you’re in some sort of stone structure underground.",
  "You carefully stand yourself up, and as the last bits of haze clears itself from your mind, you remember who you are..."
];
const intro_choiceText = [
  "I am a <b>Royal Knight</b> who has pledged their life to serving my king and kingdom.",
  "I am a <b>Professor of Magic</b> who has dedicated themself to unraveling the mysteries of mana.",
  'I am a <b>Mercenary "Scout"</b> who grew up on the streets, and now sells their services to the highest bidder.'
];
const intro_choiceResults = [
  "kPath0",
  "pPath0",
  "sPath0",
];

const allPath0_text = [
  "As you recall who you are, memories of where you are also begin to surface.",
  "However, despite recalling where you are, you don’t remember how you ended up in this particular room." +
  "The last thing you recall is entering the Royal Catacombs after being briefed on the situation.",
  "Regardless, inaction isn’t likely to get you out of here, so you decide to..."
];


//--------------------------------------------------------------------------------------------------------------------------------|Knight Text
const kPath0_text = [
  allPath0_text[0],
  "You remember hearing about how undead abominations had begun wandering out of the Royal Catacombs, you even killed a few yourself while on guard duty. " +
  "And while the amount was by no means overwhelming, the kingdom obviously found this troubling. " +
  "It wasn’t long before a group was organized for an expedition into the Catacombs, and, as one of the kingdom’s best knights, you were selected to participate.",
  allPath0_text[1],
  allPath0_text[2]
];
const kPath0_choiceText = [
  "Go towards the archway where your only light is coming from.",
  "Search the current room."
];
const kPath0_choiceResults = [
  "kPath1",
  "kPath2"
];

kPath1_text = [
  "You approach the archway, and as your eyes adjust to the light you find a hallway lined with lit torches stretching some distance before making a sharp left turn. " +
  "Turning your attention to the torches lining the walls, you recognize the torches as the same kind found within the castle. " +
  "Evidently the torches are kept ablaze by the mana circuit running along the wall connecting them to some source of mana.",
  "Continuing down the hallway, as you draw nearer to the corner you end up accidentally triggering a pitfall trap, plummeting you into a dark room some ways down. The fall certainly hurt, but it was by no means far enough to be lethal. Shortly after you manage to get back on your feet a few magic torches flicker to life in the far corners of the room. The torches are dim, but more than enough for you to take notice of the large skeleton of some long dead beast, which explains the short fall..."
];
kPath1_choiceText = [
  "Continue"
];
kPath1_choiceResults = [
  "kPath1_cont"
];

kPath2_text = [
  "Examining the room, as best you can with so little light, you take notice of a peculiar portion of the wall. Figuring it to be a secret passage of some sort, and hoping to find some way to open it, you look around for anything else that seems out of place. But, after a few minutes, you give up your search, leaving you with only one option..."
];
kPath2_choiceText = [
  "Go towards the archway where your only light is coming from."
];
kPath2_choiceResults = [
  "kPath1"
];


//--------------------------------------------------------------------------------------------------------------------------------|Professor Text
const pPath0_text = [
  allPath0_text[0],
  "Between teaching classes and research, you vaguely remember hearing whisperings of undead wandering out of the Royal Catacombs, nonsensical rumors you thought. " +
  "However, these rumors were soon proven true when the kingdom contacted you, asking for your participation in an expedition into the Catacombs. " +
  "While hesitant at first, given your lack of practical combat experience, your curiosity got the better of you, and you agreed to participate.",
  allPath0_text[1],
  allPath0_text[2]
];
const pPath0_choiceText = [
  "Go towards the archway where your only light is coming from.",
  "Search the current room."
];
const pPath0_choiceResults = [
  "pPath1",
  "pPath2"
];

pPath1_text = [
  "You approach the archway, and as your eyes adjust to the light you find a hallway lined with lit torches stretching some distance before making a sharp left turn. " +
  "Turning your attention to the torches lining the walls, you immediately sense the mana flowing through the circuit on the wall, and being delivered to the torches. " +
  "Your academy uses a similar method, but despite the archaic design here, these torches are obviously more refined and mana efficient.",
  "Continuing down the hallway, as you draw nearer to the corner you end up accidentally triggering a pitfall trap, and almost immediately as you feel the floor give away, your brain goes to work thinking of solutions to this predicament..."
];
pPath1_choiceText = [
  "Use slow fall to slow your descent.",
  "Attempt your experimental flight magic."
];
pPath1_choiceResults = [
  "pPath1_1",
  "pPath1_2"
];

pPath1_1_text = [
  "Upon activating your slow fall spell you notice how it won't need to stay activated for long, as it's a relatively short fall. Once you reach the floor you notice the trap above you reseting just as a few magic torches flicker to life in the far corners of the room. The torches are dim, but more than enough for you to take notice of the unusually large cerberus skeleton, which explains the short fall..."
];
pPath1_1_choiceText = [
  "Continue"
];
pPath1_1_choiceResults = [
  "pPath1_1_cont"
];

pPath1_2_text = [
  "You've yet to have a test run of your flight magic that didn't end with some magical mishap or other, but, figuring whatever happens couldn't leave you any worse off than the pitfall, you activate your spell. And, while it would be a bit of a stretch to describe the result as flight, it does at least successfully shoot you over to the other side of the pit. As you dust yourself off and take mental notes of the impromptu experiment, you notice that the hallway splits into two seperate paths."
];
pPath1_2_choiceText = [
  //
];
pPath1_2_choiceResults = [
  //
];

pPath2_text = [
  "Examining the room, as best you can with so little light, you take notice of a peculiar portion of the wall. Figuring it to be a secret passage of some sort, and hoping to find some way to open it, you look around for anything else that seems out of place. But, after a few minutes, you give up your search, leaving you with only one option..."
];
pPath2_choiceText = [
  "Go towards the archway where your only light is coming from."
];
pPath2_choiceResults = [
  "pPath1"
];


//--------------------------------------------------------------------------------------------------------------------------------|Scout Text
const sPath0_text = [
  allPath0_text[0],
  "Information gathering is just one of your many skills, so you were one of the first people outside the castle to hear of undead wandering out from the Royal Catacombs. " +
  "And it wasn’t long after, that you caught wind of a contract put up by the kingdom. " +
  "While the contract was suitably vague, you had your suspicions, and though the risk seemed high, you had worked for the kingdom before. " +
  "You knew how well they paid, and you knew the kingdom’s knights were... competent enough meat shields, so you decided it was worth your time to participate.",
  allPath0_text[1],
  allPath0_text[2]
];
const sPath0_choiceText = [
  "Go towards the archway where your only light is coming from.",
  "Search the current room."
];
const sPath0_choiceResults = [
  "sPath1",
  "sPath2"
];

sPath1_text = [
  "You approach the archway, and as your eyes adjust to the light you find a hallway lined with lit torches stretching some distance before making a sharp left turn. " +
  "Turning your attention to the torches lining the walls, you wonder how they could possibly be lit. " +
  "You consider the possibility of someone having recently lit each one as they traversed this hallway, though decide it's more likely some sort of mage trick.",
  "Continuing down the hallway, as you draw nearer to the corner you notice a disguised pressure plate in the floor, scanning the surrounding area you assume it to be a trigger for a pitfall trap. You figure the obvious choice would be to avoid the trap, but you never can be sure with these sorts of dungeons. You ultimately decide the best course of action would be too..."
];
sPath1_choiceText = [
  "Tie a rope to a torch sconce, trigger the trap, and carefully descend.",
  "Avoid the trap. Obviously."
];
sPath1_choiceResults = [
  "sPath1_1",
  "sPath1_2"
];

sPath1_1_text = [
  "After preparing, you trigger the pressure plate, and, as expected, the floor gives way to a pit. To your surpire, the pit is shallow enough to make out the bottom. Deciding to give it a look, you carefullt decend down your rope into the pit. As you  begin to reach the bottom the trap resets itself, and while your rope dis stop the trap from fully closing, there is no feasable way to open it back up from where you are.",
  "Just as your regret begins to settle in a few magic torches flicker to life in the far corners of the room. The torches are dim, but more than enough for you to take notice of the large skeleton of some long dead beast, which explains the short fall..."
];
sPath1_1_choiceText = [
  "Continue"
];
sPath1_1_choiceResults = [
  "sPath1_1_cont"
];

sPath1_2_text = [
  "Making your way carefully around the trap you come to the halway corner, and notice the the path ahead of you splits into two seperate paths."
];
sPath1_2_choiceText = [
  //
];
sPath1_2_choiceResults = [
  //
];

sPath2_text = [
  "Examining the room, as best you can with so little light, you take notice of a peculiar portion of the wall. Looking closer you notice a collection of bricks in a vague archway shape have been worn slightly on the outer sides. And given the lack of skid marks on this side of the wall, you can tell this design pushes the other direction to open. You decide to not waste time looking for some switch or something, as the worn down bricks give you just enough room to mess with the mechanism and get it open. Once open, a staircase heading downward is revealed, and you decide to..."
];
sPath2_choiceText = [
  "Make your way down the dark staircase.",
  "Go towards the archway where your only light is coming from."
];
sPath2_choiceResults = [
  "sPath2_1",
  "sPath1"
];

sPath2_1_text = [
  "As you make you way to the bottom of the staircase a few magic torches flicker to life in the far corners of the room. The torches are dim, but more than enough for you to take notice of the large skeleton of some long dead beast."
];
sPath2_1_choiceText = [
  //
];
sPath2_1_choiceResults = [
  //
];
