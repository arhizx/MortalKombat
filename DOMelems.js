export const resultText = (name) => {
  if (!name) return;
  const loseTitle = createElement("div", "loseTitle");
  loseTitle.innerText = name !== "Draw" ? `${name} wins!` : `${name}`;
  return loseTitle;
};

export const createReloadButton = () => {
  const reloadWrap = createElement("div", "reloadWrap");
  const reloadButton = createElement("button", "button");
  reloadButton.innerText = "Restart";
  reloadWrap.appendChild(reloadButton);
  reloadButton.addEventListener(
    "click",
    () => (window.location.pathname = "SelectPlayer/index.html")
  );
  return reloadWrap;
};

export const createElement = (tagName, className) => {
  const tag = document.createElement(tagName);
  if (className) {
    tag.classList.add(className);
  }
  return tag;
};
