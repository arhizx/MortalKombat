class Player {
  constructor(name, hp, img, weapon) {
    this.name = name;
    this.hp = hp;
    this.img = img;
    this.weapon = weapon;
  }

  attack() {
    console.log(`${this.name} Fight`);
  }
}

const createPlayer = (playerIndex, player) => {
  //this looks depressing, but i can`t develop any good solution now so it is what it is :(
  const playerDiv = document.createElement("div");
  const progressBar = document.createElement("div");
  const character = document.createElement("div");
  const life = document.createElement("div");
  const name = document.createElement("div");
  const img = document.createElement("img");
  const arena = document.querySelector(".arenas");

  playerDiv.classList.add(`${playerIndex}`);
  progressBar.classList.add("progressbar");
  character.classList.add("character");
  life.classList.add("life");
  name.classList.add("name");

  life.style.width = "100%";

  progressBar.appendChild(life);
  progressBar.appendChild(name);
  character.appendChild(img);
  playerDiv.appendChild(progressBar);
  playerDiv.appendChild(character);

  name.innerHTML = player.name;
  img.src = player.img;

  arena.appendChild(playerDiv);
};

const player1 = new Player(
  "Scorpion",
  100,
  "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  ["kunai", "fist"]
);

const player2 = new Player(
  "Kitana",
  100,
  "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  ["blade"]
);

createPlayer("player1", player1);
createPlayer("player2", player2);
