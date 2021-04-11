class Player {
  constructor(name, hp, img, weapon, player) {
    this.name = name;
    this.hp = hp;
    this.img = img;
    this.weapon = weapon;
    this.player = player;
  }

  attack() {
    console.log(`${this.name} Fight`);
  }
}

const arena = document.querySelector(".arenas");
const randomButton = document.querySelector(".button");

const changeHP = (player) => {
  const life = document.querySelector(`.player${player.player} .life`);

  player.hp = player.hp - random() > 0 ? player.hp - random() : 0;
  life.style.width = `${player.hp}%`;
};

const checkWin = (player1, player2) => {
  if (player1.hp > 0 && player2.hp > 0) return;
  player1.hp > 0 && player2.hp === 0
    ? console.log(`${player1.name} wins!`)
    : console.log(`${player2.name} wins`);
  randomButton.disabled = true;
};

randomButton.addEventListener("click", () => {
  changeHP(player1);
  changeHP(player2);
  checkWin(player1, player2);
});

const createElement = (tagName, className) => {
  const tag = document.createElement(tagName);
  if (className) {
    tag.classList.add(className);
  }
  return tag;
};

const createPlayer = (player) => {
  const playerDiv = createElement("div", `player${player.player}`);
  const progressBar = createElement("div", "progressbar");
  const character = createElement("div", "character");
  const life = createElement("div", "life");
  const name = createElement("div", "name");
  const img = createElement("img");

  life.style.width = `${player.hp}%`;

  progressBar.appendChild(life);
  progressBar.appendChild(name);
  character.appendChild(img);
  playerDiv.appendChild(progressBar);
  playerDiv.appendChild(character);

  name.innerHTML = player.name;
  img.src = player.img;

  return playerDiv;
};

const player1 = new Player(
  "Scorpion",
  100,
  "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  ["kunai", "fist"],
  1
);

const player2 = new Player(
  "Kitana",
  100,
  "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  ["blade"],
  2
);

const random = () => {
  return Math.ceil(Math.random() * 21);
};

arena.appendChild(createPlayer(player1));
arena.appendChild(createPlayer(player2));
