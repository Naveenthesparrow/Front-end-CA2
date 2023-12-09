// JavaScript object to store player information
const playerInfo = {
  name: "",
  nickname: "",
};
function startGame(event) {
  event.preventDefault();

  // Get the player's name and nickname from the input fields
  const playerNameInput = document.getElementById("playerName");
  const playerNicknameInput = document.getElementById("playerNickname");

  localStorage.setItem("playerName", playerNameInput.value);
  localStorage.setItem("playerNickname", playerNicknameInput.value);

  // Redirect to the instruction page
  window.location.href = "instructionpg.html";

  console.log(localStorage.getItem("playerName"));
  console.log(localStorage.getItem("playerNickname"));
}

/* Handler for the button click event.*/
function onButtonClick() {
  alert("Button clicked!");
}

const button = document.querySelector("button");

button.addEventListener("click", function () {
  // Redirect to the instruction page
  location.href = "./instructionpg.html";
});
