import { state } from '../core/state.js';
import { analyzeColors } from '../image/colorAnalyzer.js';
import { buildPrompt } from '../prompt/promptBuilder.js';

export function initGenerate() {
  const btn = document.getElementById('generateBtn');
  const output = document.getElementById('output');
  const status = document.getElementById('status');

  btn.addEventListener('click', () => {
    if (!state.currentImage) {
      status.textContent = "Sélectionnez une image.";
      return;
    }

    const colors = analyzeColors(state.currentImage);
    const prompt = buildPrompt(state.currentStyle, colors);

    output.value = prompt;
    status.textContent = "Prompt generated";
  });
}