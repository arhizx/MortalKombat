class Player {
  constructor(name, hp, img, weapon, player) {
    this.name = name;
    this.hp = hp;
    this.img = img;
    this.weapon = weapon;
    this.player = player;
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

const logs = {
  start:
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара [playerWins]: [playerLose] - труп",
    "[playerLose] погиб от удара бойца [playerWins]",
    "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "Ничья - это тоже победа!",
};
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

const arena = document.querySelector(".arenas");
const controlForm = document.querySelector(".control");
const attackButton = document.querySelector(".button");
const chat = document.querySelector(".chat");
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
    generateLogs("draw");
    return arena.appendChild(resultText("Draw"));
  }

  if (player1.hp > 0 && player2.hp === 0) {
    generateLogs("end", player1, player2);
    arena.appendChild(resultText(player1.name));
  }
  if (player2.hp > 0 && player1.hp === 0) {
    generateLogs("end", player2, player1);
    arena.appendChild(resultText(player2.name));
  }
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

const playerAttacks = () => {
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
  return attacks;
};

const generateLogs = (type, player1, player2) => {
  let text = "";
  let time = new Date().toLocaleTimeString();
  switch (type) {
    case "start":
      text = logs[type]
        .replace("[time]", time)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
      break;
    case "hit":
      text = `${time} ${logs[type][random(logs[type].length - 1)]
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name)} ${player2.name} ${
        player2.hp
      }/100`;
      break;
    case "defence":
      text = `${time} ${logs[type][random(logs[type].length - 1)]}`
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      break;
    case "draw":
      text = logs[type];
      break;
    case "end":
      text = logs[type][random(logs[type].length - 1)]
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name);
      break;
  }

  const el = `<p>${text}</p>`;
  chat.insertAdjacentHTML("afterbegin", el);
};

document.onload = generateLogs("start", player1, player2);

controlForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const enemy = enemyAttack();
  const attacks = playerAttacks();
  if (attacks.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    generateLogs("hit", player2, player1);
  }
  if (enemy.defence !== attacks.hit) {
    player2.changeHP(attacks.value);
    generateLogs("hit", player1, player2);
  }
  if (attacks.hit === enemy.defence) {
    generateLogs("defence", player1, player2);
  }
  if (enemy.hit === attacks.defence) {
    generateLogs("defence", player2, player1);
  }

  player1.renderHP();
  player2.renderHP();
  checkWin(player1, player2);
});
