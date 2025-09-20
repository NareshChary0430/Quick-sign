const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const colorPicker = document.getElementById('colorPicker');
const canvaColor = document.getElementById('canvaColor');
const fontSize = document.getElementById('fontSize');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const retrieveButton = document.getElementById('retrieveButton');

let drawing = false;
let currentColor = colorPicker.value;
let currentSize = parseInt(fontSize.value);
let backgroundColor = canvaColor.value;

// Initialize background
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Event listeners
colorPicker.addEventListener('change', () => {
  currentColor = colorPicker.value;
});

canvaColor.addEventListener('change', () => {
  backgroundColor = canvaColor.value;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

fontSize.addEventListener('change', () => {
  currentSize = parseInt(fontSize.value);
});

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  draw(e);
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

clearButton.addEventListener('click', () => {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
  const dataURL = canvas.toDataURL();
  localStorage.setItem('savedSignature', dataURL);
  
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'signature.png';
  a.click();
});

retrieveButton.addEventListener('click', () => {
  const dataURL = localStorage.getItem('savedSignature');
  if (dataURL) {
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = dataURL;
  } else {
    alert("No saved signature found!");
  }
});

function draw(e) {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = currentSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}
