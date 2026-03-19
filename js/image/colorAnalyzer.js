export function analyzeColors(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const size = 64;
  canvas.width = size;
  canvas.height = size;

  ctx.drawImage(img, 0, 0, size, size);

  const data = ctx.getImageData(0, 0, size, size).data;

  let r=0,g=0,b=0,count=0;

  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i]+data[i+1]+data[i+2])/3;

    if (brightness > 20 && brightness < 235) {
      r += data[i];
      g += data[i+1];
      b += data[i+2];
      count++;
    }
  }

  const avg = {
    r: Math.round(r/count),
    g: Math.round(g/count),
    b: Math.round(b/count)
  };

  const hex = `#${avg.r.toString(16).padStart(2,'0')}${avg.g.toString(16).padStart(2,'0')}${avg.b.toString(16).padStart(2,'0')}`;

  const warmScore = avg.r - avg.b;

  return {
    ...avg,
    hex,
    paletteName: warmScore > 15 ? 'tons chauds'
      : warmScore < -15 ? 'tons froids'
      : 'palette neutre'
  };
}