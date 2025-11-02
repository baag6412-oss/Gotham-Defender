let currentDoor = { joker: null, batman: null };
let score = 0;
let isGameOver = false;

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");

    for (let i = 0; i < 9; i++) {
        const door = document.createElement("div");
        door.id = i.toString();
        door.addEventListener("click", selectDoor);
        board.appendChild(door);
    }

    setCharacter("batman");

    setInterval(() => setCharacter("joker"), 1500);
    setInterval(() => setCharacter("batman"), 2000);
});

const getRandomDoorId = () => Math.floor(Math.random() * 9).toString();
const setCharacter = (character) => {
    if (isGameOver) return;
    const randomDoorId = getRandomDoorId();

    if (isDoorOccupied(randomDoorId)) return;
    const randomDoor = document.getElementById(randomDoorId);
    console.log(randomDoor);
    const img = document.createElement("img");
    img.src = `./images/${character}.png`;
    randomDoor.appendChild(img);

    currentDoor[character] = randomDoor;
    setTimeout(() => clearDoor(character), 1000);
};
const isDoorOccupied = (randomDoorId) =>
    currentDoor.joker?.id === randomDoorId ||
    currentDoor.batman?.id === randomDoorId;

const clearDoor = (character) => {
    if (currentDoor[character]) {
        currentDoor[character].innerHTML = "";
    }
};
const selectDoor = (e) => {
    const selectedDoor = e.target;
    if (selectedDoor.children.length === 0) return;
    if (selectedDoor === currentDoor.joker) {
        updateScore();
        clearDoor("joker");
    }
    if (selectedDoor === currentDoor.batman) {
        isGameOver = true;
        const scoreText = document.getElementById("score");
        scoreText.textContent = `GAME OVER: ${score}`;

        showRestartButton();
    }
};
const updateScore = () => {
    score += 10;
    const scoreText = document.getElementById("score");
    scoreText.textContent = score.toString();
};
const showRestartButton = () => {
    const restart = document.getElementById("restart");
    restart.classList.add("active");
    restart.addEventListener("click", restartGame);
};
const restartGame = () => {
    isGameOver = false;
    score = 0;
    const scoreText = document.getElementById("score");
    scoreText.textContent = score.toString();
    const restart = document.getElementById("restart");
    restart.classList.remove("active");
};
