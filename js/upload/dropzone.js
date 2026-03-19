export function initDropzone(onFile) {
  const dropzone = document.getElementById('dropzone');

  ['dragenter','dragover'].forEach(ev => {
    dropzone.addEventListener(ev, e => {
      e.preventDefault();
      dropzone.classList.add('border-cyan-400/60');
    });
  });

  ['dragleave','drop'].forEach(ev => {
    dropzone.addEventListener(ev, e => {
      e.preventDefault();
      dropzone.classList.remove('border-cyan-400/60');
    });
  });

  dropzone.addEventListener('drop', e => {
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  });
}