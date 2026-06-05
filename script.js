const tones = [
  {
    number: '01',
    title: 'Basuri Test 1',
    file: 'assets/audio/Terajana-OKDJ-36Not.mp3'
  },
  {
    number: '02',
    title: 'Basuri Test 2',
    file: 'assets/audio/Aku-Suges-OKDJ-36Not.mp3'
  },
  {
    number: '03',
    title: 'Basuri Test 3',
    file: 'assets/audio/nada3.mp3'
  }
];

let currentIndex = 0;
let moduleActive = false;
let currentAudio = null;

const toneTitle = document.getElementById('toneTitle');
const moduleInfo = document.getElementById('moduleInfo');
const statusEl = document.getElementById('status');

const btnUp = document.getElementById('btnUp');
const btnDown = document.getElementById('btnDown');
const btnPlay = document.getElementById('btnPlay');
const btnStop = document.getElementById('btnStop');
const btnOn = document.getElementById('btnOn');
const btnOff = document.getElementById('btnOff');

function updateDisplay() {
  const tone = tones[currentIndex];
  toneTitle.textContent = `${tone.number} - ${tone.title}`;
  moduleInfo.textContent = moduleActive ? 'Modul aktif, siap dimainkan' : 'Modul belum aktif';
  statusEl.textContent = moduleActive ? 'ON' : 'OFF';
  statusEl.className = moduleActive ? 'status on' : 'status off';
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}

function playAudio() {
  if (!moduleActive) {
    moduleInfo.textContent = 'Aktifkan modul dulu dengan tombol ON';
    return;
  }

  stopAudio();

  const tone = tones[currentIndex];
  currentAudio = new Audio(tone.file);

  currentAudio.play().catch(() => {
    moduleInfo.textContent = 'File audio belum ada. Masukkan nada1.mp3, nada2.mp3, nada3.mp3 ke folder assets/audio/';
  });
}

btnUp.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= tones.length) currentIndex = 0;
  updateDisplay();
});

btnDown.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) currentIndex = tones.length - 1;
  updateDisplay();
});

btnPlay.addEventListener('click', playAudio);

btnStop.addEventListener('click', () => {
  stopAudio();
  moduleInfo.textContent = 'Audio dihentikan';
});

btnOn.addEventListener('click', () => {
  moduleActive = true;
  updateDisplay();
});

btnOff.addEventListener('click', () => {
  moduleActive = false;
  stopAudio();
  updateDisplay();
});

updateDisplay();
