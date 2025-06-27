const images = [
  'assets/img/reel-symbol1.png',
  'assets/img/reel-symbol2.jpg', // jackpot
  'assets/img/reel-symbol3.jpg',
  'assets/img/reel-symbol4.jpg',
  'assets/img/reel-symbol5.jpg',
  'assets/img/reel-symbol6.jpg'
];

let betAmount = 1;
let credits = 100;
let winnings = 0;
let spinCount = 0;

window.onload = () => {
  preloadStartupScreen();
  updateDisplay();
};

function preloadStartupScreen() {
  const ids = ['r1s1','r1s2','r1s3','r2s1','r2s2','r2s3','r3s1','r3s2','r3s3'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    el.style.backgroundImage = `url('${images[0]}')`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
  });
}

function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

function spin() {
  if (credits < betAmount) return alert("Not enough credits!");

  spinCount++;
  winnings = 0;
  credits -= betAmount;
  updateDisplay();
  clearWinningGlow();
  document.getElementById("win-effect-container").innerHTML = '';

  new Audio('assets/sfx/Spin_button_click.wav').play();
  const spinSound = new Audio('assets/sfx/reel_spinning_sound.wav');
  spinSound.play();

  const spinDuration = 2000;
  const spinInterval = 150;
  let elapsed = 0;

  const interval = setInterval(() => {
    elapsed += spinInterval;
    ['r1s1','r1s2','r1s3','r2s1','r2s2','r2s3','r3s1','r3s2','r3s3'].forEach(id => {
      const el = document.getElementById(id);
      el.style.backgroundImage = `url('${getRandomImage()}')`;
    });

    if (elapsed >= spinDuration) {
      clearInterval(interval);
      finalizeSpin();
    }
  }, spinInterval);
}

function finalizeSpin() {
  const grid = [];
  ['r1s','r2s','r3s'].forEach(col => {
    const column = ['1','2','3'].map(row => {
      const id = col + row;
      const el = document.getElementById(id);
      const img = getRandomImage();
      el.style.backgroundImage = `url('${img}')`;
      return { id, image: img };
    });
    grid.push(column);
  });

  let winningIds = [];

  // Horizontal wins
  for (let row = 0; row < 3; row++) {
    const img1 = grid[0][row].image;
    const img2 = grid[1][row].image;
    const img3 = grid[2][row].image;
    if (img1 === img2 && img2 === img3) {
      winnings += betAmount * 10;
      winningIds.push(grid[0][row].id, grid[1][row].id, grid[2][row].id);
    }
  }

  // Vertical wins
  for (let col = 0; col < 3; col++) {
    const img1 = grid[col][0].image;
    const img2 = grid[col][1].image;
    const img3 = grid[col][2].image;
    if (img1 === img2 && img2 === img3) {
      winnings += betAmount * 10;
      winningIds.push(grid[col][0].id, grid[col][1].id, grid[col][2].id);
    }
  }

  // Jackpot (all 9 are the jackpot symbol)
  const allIds = grid.flat();
  const isJackpot = allIds.every(cell => cell.image === images[1]);
  if (isJackpot) {
    winnings += betAmount * 100;
    document.getElementById('win-effect-container').innerHTML = `
      <div class="jackpot-glow"></div>
      <div class="confetti"></div>
    `;
    new Audio('assets/sfx/jackpot.mp3').play();
    winningIds = allIds.map(cell => cell.id);
  }

  if (winningIds.length > 0) {
    highlightWinningSymbols(winningIds);
    spawnMusicNotes(winningIds);
    new Audio('assets/sfx/ya-se-hizo.mp3').play();

    // ✅ Play happy scream sound when winning
    const winScream = new Audio('assets/sfx/mexican-scream.mp3');
    winScream.play();
  }

  credits += winnings;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('winnings').innerText = `$${winnings}`;
  document.getElementById('bet').innerText = `$${betAmount}`;
  document.getElementById('credits').innerText = `$${credits}`;
}

function increaseBet() {
  if (betAmount < credits) betAmount++;
  updateDisplay();
}

function decreaseBet() {
  if (betAmount > 1) betAmount--;
  updateDisplay();
}

function highlightWinningSymbols(ids) {
  ids.forEach(id => {
    const symbol = document.getElementById(id);
    if (symbol) symbol.classList.add('winning-glow');
  });
}

function clearWinningGlow() {
  document.querySelectorAll('.symbol.winning-glow').forEach(el => el.classList.remove('winning-glow'));
}

function spawnMusicNotes(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    for (let i = 0; i < 6; i++) {
      const note = document.createElement("div");
      note.classList.add("music-note");
      note.innerText = Math.random() > 0.5 ? "🎵" : "🎶";
      note.style.left = `${Math.random() * 100}%`;
      note.style.bottom = `${Math.random() * 10}px`;
      note.style.animationDelay = `${Math.random() * 1.2}s`;
      el.appendChild(note);
      setTimeout(() => note.remove(), 3500);
    }
  });
}
