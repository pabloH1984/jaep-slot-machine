const symbols = [
  'assets/symbol1.png',
  'assets/symbol2.png',
  'assets/symbol3.png',
  'assets/symbol4.png',
  'assets/symbol5.png'
];

const reels = [
  document.getElementById('reel1'),
  document.getElementById('reel2'),
  document.getElementById('reel3')
];

function spinReel(reel) {
  reel.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const img = document.createElement('img');
    img.src = symbols[Math.floor(Math.random() * symbols.length)];
    reel.appendChild(img);
  }
}

document.getElementById('spinButton').addEventListener('click', () => {
  reels.forEach(spinReel);
});
