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

  changeHP(num) {
    if (this.hp - num > 0) this.hp -= num;
    else this.hp = 0;
  }

  elHP() {
    return document.querySelector(`.player${this.player} .life`);
  }

  renderHP() {
    this.elHP().style.width = `${this.hp}%`;
  }
}

const arena = document.querySelector(".arenas");
const controlForm = document.querySelector(".control");
const attackButton = document.querySelector(".button");
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

const resultText = (name) => {
  if (!name) return;
  const loseTitle = createElement("div", "loseTitle");
  loseTitle.innerText = name !== "Draw" ? `${name} wins!` : `${name}`;
  return loseTitle;
};

const createReloadButton = () => {
  const reloadWrap = createElement("div", "reloadWrap");
  const reloadButton = createElement("button", "button");
  reloadButton.innerText = "Restart";
  reloadWrap.appendChild(reloadButton);
  reloadButton.addEventListener("click", () => location.reload());
  return reloadWrap;
};

const checkWin = (player1, player2) => {
  if (player1.hp > 0 && player2.hp > 0) return;
  if (player1.hp === 0 && player2.hp === 0) {
    attackButton.disabled = true;
    arena.appendChild(createReloadButton());
    return arena.appendChild(resultText("Draw"));
  }
  player1.hp > 0 && player2.hp === 0
    ? arena.appendChild(resultText(player1.name))
    : arena.appendChild(resultText(player2.name));
  attackButton.disabled = true;
  arena.appendChild(createReloadButton());
};

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

  name.innerText = player.name;
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

const random = (num) => {
  return Math.ceil(Math.random() * num);
};

arena.appendChild(createPlayer(player1));
arena.appendChild(createPlayer(player2));

const enemyAttack = () => {
  const hit = ATTACK[random(3) - 1];
  const defence = ATTACK[random(3) - 1];

  return {
    value: random(HIT[hit]),
    hit,
    defence,
  };
};

controlForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const enemy = enemyAttack();
  const attacks = {};

  for (let item of controlForm) {
    if (item.checked && item.name === "hit") {
      attacks.value = random(HIT[item.value]);
      attacks.hit = item.value;
    }
    if (item.checked && item.name === "defence") {
      attacks.defence = item.value;
    }
    item.checked = false;
  }

  if (attacks.defence !== enemy.hit) player1.changeHP(enemy.value);
  if (enemy.defence !== attacks.hit) player2.changeHP(attacks.value);

  player1.renderHP();
  player2.renderHP();
  checkWin(player1, player2);
});
