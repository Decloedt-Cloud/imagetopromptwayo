import { state } from './core/state.js';
import { initDropdown } from './ui/dropdown.js';
import { initMobileMenu } from './ui/mobileMenu.js';
import { initStyleSelector } from './ui/styleSelector.js';
import { initDropzone } from './upload/dropzone.js';
import { validateFile } from './upload/fileHandler.js';
import { renderPreview } from './image/preview.js';
import { initGenerate } from './actions/generate.js';
import { initCopy } from './actions/copy.js';
import { initNav } from './ui/nav.js';
import { initTheme } from './ui/themeManager.js';

const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const status = document.getElementById('status');

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTheme();

  // other init...
});

function handleFile(file) {
  const error = validateFile(file);
  if (error) {
    status.textContent = error;
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();

    img.onload = () => {
      state.currentImage = img;
      renderPreview(img, preview);
    };

    img.src = reader.result;
  };

  reader.readAsDataURL(file);
}

fileInput.addEventListener('change', e => {
  const file = e.target.files?.[0];
  if (file) handleFile(file);
});


initStyleSelector();
initDropzone(handleFile);
initGenerate();
initCopy();