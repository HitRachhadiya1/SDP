const ul = document.createElement("ul");
for (let i = 0; i < 5; i++) {
  const li = document.createElement("li");
  const liBTn = document.createElement("button");
  liBTn.innerText = "click me to delete - " + i;
  li.append(liBTn);
  li.style.listStyle = "none";
  li.style.marginBottom = "2rem";
  li.className = i;
  ul.appendChild(li);
}
document.body.append(ul);
document.addEventListener("click", (e) => {
  let target = e.target;
  let btnValue = target.innerText;
  let id = btnValue[btnValue.length - 1];
  let childNode = target.closest("li");
  let parant = target.closest("li").parentElement;
  parant.removeChild(childNode);
});
