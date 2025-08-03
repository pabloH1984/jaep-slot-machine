let credits = 100;
let bet = 10;

function updateDisplay() {
  document.getElementById("credits").innerText = credits;
  document.getElementById("bet").innerText = bet;
}

function decreaseBet() {
  if (bet > 1) {
    bet -= 1;
    updateDisplay();
  }
}

function increaseBet() {
  if (bet < credits) {
    bet += 1;
    updateDisplay();
  }
}

function spin() {
  if (credits >= bet) {
    credits -= bet;
    const winnings = Math.floor(Math.random() * bet * 2); // random win
    credits += winnings;
    document.getElementById("winnings").innerText = winnings;
    updateDisplay();
  }
}

updateDisplay();
