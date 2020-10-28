/**
 * list of planet objects
 * @typedef {{Array<planet>}} planets
 */
const planets = [
  /**
  * @typedef {{isActive: bool, name: string, promptContent: object}} green
  */
  (green = {
    isActive: false,
    name: "green",
    /**
    * @typedef {{planetName: string, noBatteryText: string, noBatteryButton: string, batteryText: string, batteryButton: string}} promptContent
    */
    promptContent: {
      planetName: "Home",
      noBatteryText: "Go find the battery and get back here. Hurry!",
      noBatteryButton: "Ok",
      batteryText: "Great work! Replace the battery.",
      batteryButton: "Replace battery",
    },
  }),
  (blue = {
    /**
    * @typedef {{isActive: bool, name: string, promptContent: object}} blue
    */
    isActive: false,
    name: "blue",
    /**
    * @typedef {{planetName: string, noMiningPickText: string, noMiningPickButton: string, miningPickText: string, miningPickButton: string}} promptContent
    */
    promptContent: {
      planetName: "Water",
      noMiningPickText: "A planet mainly consisting of... yes you guessed it, water! Luckily you landed on a small island. A rather boring island. You do find a mining pick stuck in the sand.",
      noMiningPickButton: "Take mining pick",
      miningPickText: "Nothing to see here. You already found the mining pick.",
      miningPickButton: "Ok",
    },
  }),
  (brown = {
   /**
   * @typedef {{isActive: bool, name: string}} brown
   */
    isActive: false,
    name: "brown",
    /**
    * @typedef {{planetName: string, initialText: string, doors: object}} promptContent
    */
    promptContent: {
      planetName: "Military",
      initialText:
        "You land in the middle of an old military base. You seem to be alone. You enter one of the Barracks and are met by a long dark hallway with three doors. Enter:",
      /**
      * @typedef {{room1: object, room2: object, room3: object}} doors
      */
      doors: {
        /**
        * @typedef {{doorButton: string, lockedText: string, openText: string, button: string}} room1
        */
        room1: {
          doorButton: "first door",
          lockedText: "This door is locked. You need a keycard to open it",
          openText: "You open the door with the keycard. Inside you find a post-it note with the numbers: 5216",
          button: "Go back",
        },
        /**
        * @typedef {{doorButton: string, lockedText: string, openText: string, insideRoomHasNoKey: string, insideRoomHasKey: string, noKeyButton: string, KeyButton: string}} room2
        */
        room2: {
          doorButton: "second door",
          lockedText: "This door is locked. Write the correct pin code to open.",
          openText: "Correct pin! You open the door.",
          insideRoomHasNoKey: "Inside the room you find a chest but you need a key to open it.",
          insideRoomHasKey: "Inside the room you find a chest and you have the key to open it. Inside the chest you find a battery. Go and save your home planet!",
          noKeyButton: "Go back",
          keyButton: "Take battery",
        },
        room3: {
          /**
          * @typedef {{doorButton: string, text: string, button: string}} room3
          */
          doorButton: "third door",
          text: "The door is unlocked. You search the room and in a coat pocket you find a keycard.",
          button: "Take keycard",
        },
      },
    },
  }),
  /**
   * @typedef {{isActive: bool, name: string, promptContent: object}} lightblue
   */
  (lightblue = {
    isActive: false,
    name: "lightblue",
    /**
     * @typedef {{planetName: string, noMiningPickText: string, noMiningPickButton: string, miningPickText: string, miningPickButton: string}} promptContent
     */
    promptContent: {
      planetName: "Mining",
      noMiningPickText: "A desolate planet greets you. Nothing here except an abandoned diamond mine. You look closer and do find diamonds. You need some kind of tool to be able to gather them.",
      noMiningPickButton: "Ok",
      miningPickText: "A desolate planet greets you. Nothing here except an abandoned diamond mine. You look closer and do find diamonds. Use your mining pick to gather a diamond.",
      miningPickButton: "Gather diamond",
    },
  }),
  /**
  * @typedef {{isActive: bool, name: string, promptContent: object}} purple
  */
  (purple = {
    isActive: false,
    name: "purple",
    /**
    * @typedef {{planetName: string, noDiamondText: string, noDiamondButton: string, diamondText: string, diamondButton: string}} promptContent
    */
    promptContent: {
      planetName: "Big City",
      noDiamondText: "A never ending skyline emerges from the clouds. A bigger city have you never witnessed before. You enter a tavern and after a while you start talking to a man called The Keymaster: 'You're looking for a battery, huh? I do know there are chests scattered around this solar system. These chests can contain the battery you're looking for. If you get me a diamond I'll give you a key to open the chest.'",
      noDiamondButton: "Ok",
      diamondText: "A never ending skyline emerges from the clouds. A bigger city have you never witnessed before. You enter a tavern and after a while you start talking to a man called The Keymaster: 'You're looking for a battery, huh? I do know there are chests scattered around this solar system. These chests can contain the battery you're looking for. Trade me a diamond and I'll give you a key to open the chest.'",
      diamondButton: "Take the key",
    },
  }),
];

/**
 * Player state
 * @typedef {{name: string, haveMiningPick: boolean, haveBattery: boolean, haveKey: boolean, haveDiamond: boolean, haveKeycard: boolean, correctPin: boolean}} player
 */
const player = {
  name: "",
  haveMiningPick: false,
  haveBattery: false,
  haveKey: false,
  haveDiamond: false,
  haveKeycard: false,
  correctPin: false,
};

/**
 * Start menu. Only used when initializing game session (HTML element)
 */
const startMenu = document.getElementById("start-menu");
/**
 * Reusable prompt container (HTML element)
 */
const promptContainer = document.getElementById("prompt");
/**
 * button HTML element nested in #prompt (HTML element)
 */
const button = document.getElementById("prompt-button");
/**
 * Unique prompt for 'multiple choice' container (HTML element)
 */
const multipleChoicePromptContainer = document.getElementById("multiple-choice-prompt");
/**
 * Unique prompt if player wins (HTML element)
 */
const winPrompt = document.getElementById("win-prompt");

/**
 * Inits the game and closes the start menu
 */
function startGame() {
  startMenu.style.display = "none";
  planets[0].isActive = true;
  setCurrentPlanet("green");
}

/**
 * Handles planet click event
 * @param {string} planet name of clicked planet
 */
function clickedPlanet(planet) {
  if (
    /**
     * If any prompt window is displayed user can't travel to another planet
     */
    window.getComputedStyle(multipleChoicePromptContainer, null).display ==="none" &&
    window.getComputedStyle(promptContainer, null).display === "none"
  ) {
    /**
     * Makes sure player cannot travel to 'the sun'
     */
    if (planet != "sun") setCurrentPlanet(planet);
    renderPrompt(planet);
  }
}

/**
 * Sets the state of current planet
 * @param {string} planet
 */
function setCurrentPlanet(planet) {
  /**
   * remove graphics for planet user traveled from
   */
  const oldObjectIndex = planets.findIndex((prop) => prop.isActive === true);
  let oldId = planets[oldObjectIndex].name + "-circle";
  let oldPlanet = document.getElementById(oldId);
  oldPlanet.style.strokeWidth = "0";

  /**
   * reset isActive for planet user traveled from.
   */
  planets[oldObjectIndex].isActive = false;

  /**
   * sets isActive = true for planet user travels to
   */
  const newObjectIndex = planets.findIndex((prop) => prop.name === planet);
  planets[newObjectIndex].isActive = true;

  /**
   * Sets graphics for planet user travels to
   */
  let id = planet + "-circle";
  let clickedPlanet = document.getElementById(id);
  clickedPlanet.style.strokeWidth = "4";
  clickedPlanet.style.stroke = "white";
}

/**
 * Conditional rendering of prompt for each planet
 * @param {string} prompt condition for what prompt to display for the user
 */
function renderPrompt(prompt) {
  /**
   * Makes sure not multiple prompts are displayed at the same time
   */
  multipleChoicePromptContainer.style.display = "none";
  promptContainer.style.display = "block";

  switch (prompt) {
    case "green":
      /**
       * sets prompt header
       */
      promptContainer.childNodes[1].textContent = planets[0].promptContent.planetName + " planet";
      if (!player.haveBattery) {
        /**
         * sets prompt text and button content
         */
        promptContainer.childNodes[3].textContent = planets[0].promptContent.noBatteryText;
        promptContainer.childNodes[5].textContent = planets[0].promptContent.noBatteryButton;
      } else if (player.haveBattery) {
        promptContainer.childNodes[3].textContent = planets[0].promptContent.batteryText;
        promptContainer.childNodes[5].textContent = planets[0].promptContent.batteryButton;
      }
      break;
    case "blue":
      promptContainer.childNodes[1].textContent = planets[1].promptContent.planetName + " planet";
      if (!player.haveMiningPick) {
        promptContainer.childNodes[3].textContent = planets[1].promptContent.noMiningPickText;
        promptContainer.childNodes[5].textContent = planets[1].promptContent.noMiningPickButton;
        player.haveMiningPick = true;
      } else if (player.haveMiningPick) {
        promptContainer.childNodes[3].textContent = planets[1].promptContent.miningPickText;
        promptContainer.childNodes[5].textContent = planets[1].promptContent.miningPickButton;
      }
      break;
    case "lightblue":
      promptContainer.childNodes[1].textContent = planets[3].promptContent.planetName + " planet";
      if (!player.haveMiningPick) {
        promptContainer.childNodes[3].textContent = planets[3].promptContent.noMiningPickText;
        promptContainer.childNodes[5].textContent = planets[3].promptContent.noMiningPickButton;
      } else if (player.haveMiningPick) {
        promptContainer.childNodes[3].textContent = planets[3].promptContent.miningPickText;
        promptContainer.childNodes[5].textContent = planets[3].promptContent.miningPickButton;
        player.haveDiamond = true;
      }
      break;
    case "brown":
      renderMultipleChoicePrompt(prompt);
      break;
    case "purple":
      promptContainer.childNodes[1].textContent = planets[4].promptContent.planetName + " planet";
      if (!player.haveDiamond) {
        promptContainer.childNodes[3].textContent = planets[4].promptContent.noDiamondText;
        promptContainer.childNodes[5].textContent = planets[4].promptContent.noDiamondButton;
      } else if (player.haveDiamond) {
        promptContainer.childNodes[3].textContent = planets[4].promptContent.diamondText;
        promptContainer.childNodes[5].textContent = planets[4].promptContent.diamondButton;
        player.haveKey = true;
      }
      break;
    case "sun":
      promptContainer.childNodes[1].textContent = "The sun";
      promptContainer.childNodes[3].textContent = "The sun is a star. Stars are usually really hot. Go somewhere else.";
      promptContainer.childNodes[5].textContent = "Ok";
      break;
    case "room1":
      promptContainer.childNodes[1].textContent = "First room";
      if (player.haveKeycard) {
        promptContainer.childNodes[3].textContent = planets[2].promptContent.doors.room1.openText;
        promptContainer.childNodes[5].textContent = planets[2].promptContent.doors.room1.button;
      } else {
        promptContainer.childNodes[3].textContent = planets[2].promptContent.doors.room1.lockedText;
        promptContainer.childNodes[5].textContent = planets[2].promptContent.doors.room1.button;
      }
      break;
    case "room2":
      promptContainer.childNodes[1].textContent = "Second room";
      if (!player.correctPin) {
        /**
         * Input element (PIN code)
         */
        let input = document.createElement("input");
        /**
         * Button element unique for input element (PIN code)
         */
        let button = document.createElement("button");
        input.setAttribute("type", "number");
        input.setAttribute("id", "input");
        button.innerHTML = "PIN";
        button.setAttribute("onclick", "checkPin()");
        promptContainer.appendChild(button);
        promptContainer.appendChild(input);

        promptContainer.childNodes[3].textContent = planets[2].promptContent.doors.room2.lockedText;
        promptContainer.childNodes[5].textContent = planets[2].promptContent.doors.room1.button;
      } else {
        if (player.haveKey) {
          promptContainer.childNodes[3].textContent = planets[2].promptContent.doors.room2.insideRoomHasKey;
          promptContainer.childNodes[5].textContent = planets[2].promptContent.doors.room2.keyButton;
          player.haveBattery = true;
        } else {
          promptContainer.childNodes[3].textContent = planets[2].promptContent.doors.room2.insideRoomHasNoKey;
          promptContainer.childNodes[5].textContent = planets[2].promptContent.doors.room2.noKeyButton;
        }
      }
      break;
    case "room3":
      promptContainer.childNodes[1].textContent = "Second room";
      promptContainer.childNodes[3].textContent = planets[2].promptContent.doors.room3.text;
      promptContainer.childNodes[5].textContent = planets[2].promptContent.doors.room3.button;
      player.haveKeycard = true;
    default:
  }
}

/**
 * Separate logic for rendering 'multiple choice' prompt
 */
function renderMultipleChoicePrompt() {
  promptContainer.style.display = "none";
  multipleChoicePromptContainer.style.display = "block";

  /**
   * NodeList of buttons in multipleChoicePromptContainer
   */
  let buttons = multipleChoicePromptContainer.childNodes[5].childNodes;

  multipleChoicePromptContainer.childNodes[1].textContent = planets[2].promptContent.planetName + " planet";
  multipleChoicePromptContainer.childNodes[3].textContent = planets[2].promptContent.initialText;

  buttons[1].textContent = planets[2].promptContent.doors.room1.doorButton;
  buttons[3].textContent = planets[2].promptContent.doors.room2.doorButton;
  buttons[5].textContent = planets[2].promptContent.doors.room3.doorButton;
  buttons[7].textContent = "Leave";
}

/**
 * Checks if pin (user input) is correct
 */
function checkPin() {
  const input = document.getElementById("input");
  if (input.value === "5216") player.correctPin = true;
  promptContainer.childNodes[7].remove();
  promptContainer.childNodes[7].remove();
  renderPrompt("room2");
}

/**
 * Hides prompt on button click.
 */
function hidePrompt() {
  /**
   * if user clicks hidePrompt() on Pin code prompt PIN input and button will be removed from DOM
   */
  if (typeof(promptContainer.childNodes[7]) != 'undefined'){
    promptContainer.childNodes[7].remove();
    promptContainer.childNodes[7].remove();
  }

  promptContainer.style.display = "none";

  /**
   * conditional statement to call win prompt
   */
  if (button.textContent === "Replace battery") displayWinPrompt();
    /**
   * conditional statement to keep UI state in renderMultipleChoicePrompt
   */
  if (button.textContent === "Go back" || button.textContent === "Take keycard") {
    renderMultipleChoicePrompt();
  }
}

/**
 * Hides multipleChoicePrompt on button click
 */
function hideMultipleChoicePrompt() {
  multipleChoicePromptContainer.style.display = "none";
}

/**
 * Displays prompt when player wins
 */
function displayWinPrompt() {
  winPrompt.style.display = "block";
}

/**
 * Resets game on button click (after player wins)
 */
function resetGame() {
  winPrompt.style.display = "none";
  startMenu.style.display = "block";

  player.haveMiningPick = false;
  player.haveBattery = false;
  player.haveKey = false;
  player.haveDiamond = false;
  player.haveKeycard = false;
  player.correctPin = false;
}
