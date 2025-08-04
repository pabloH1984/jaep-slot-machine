const images = ["reel1.png", "reel2.png", "reel3.png", "reel4.png"];
let credits = 100;
let bet = 10;

const reelElements = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
];

function updateUI() {
  document.getElementById("credits").textContent = credits;
  document.getElementById("bet").textContent = bet;
  document.getElementById("winnings").textContent = 0;
}

function increaseBet() {
  if (bet + 10 <= credits) {
    bet += 10;
    updateUI();
  }
}

function decreaseBet() {
  if (bet - 10 >= 10) {
    bet -= 10;
    updateUI();
  }
}

function spin() {
  if (credits < bet) return;

  credits -= bet;

  const results = reelElements.map(reel => {
    const randIndex = Math.floor(Math.random() * images.length);
    const img = images[randIndex];
    reel.style.backgroundImage = `url('${img}')`;
    return img;
  });

  // Check for a win
  const isWin = results.every((val, i, arr) => val === arr[0]);
  if (isWin) {
    const winAmount = bet * 5;
    credits += winAmount;
    document.getElementById("winnings").textContent = winAmount;
    // Optionally play win sound
  } else {
    document.getElementById("winnings").textContent = 0;
  }

  updateUI();
}

// Initialize
updateUI();
