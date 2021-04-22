import { generateLogs } from "./logs.js";
import { arena } from "./DOMaccess.js";
import { resultText, createReloadButton } from "./DOMelems.js";
import { attackButton } from "./DOMaccess.js";

export const checkWin = (player1, player2) => {
  const { hp: hp1 } = player1;
  const { hp: hp2 } = player2;
  if (hp1 > 0 && hp2 > 0) return;
  if (hp1 === 0 && hp2 === 0) {
    attackButton.disabled = true;
    arena.appendChild(createReloadButton());
    generateLogs("draw");
    return arena.appendChild(resultText("Draw"));
  }

  if (hp1 > 0 && hp2 === 0) {
    generateLogs("end", player1, player2);
    arena.appendChild(resultText(player1.name));
  }
  if (hp2 > 0 && hp1 === 0) {
    generateLogs("end", player2, player1);
    arena.appendChild(resultText(player2.name));
  }
  attackButton.disabled = true;
  arena.appendChild(createReloadButton());
};
