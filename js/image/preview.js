export function renderPreview(img, container) {
  container.innerHTML = '';

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const ratio = Math.min(
    container.clientWidth / img.width,
    container.clientHeight / img.height
  );

  canvas.width = img.width * ratio;
  canvas.height = img.height * ratio;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  container.appendChild(canvas);
}