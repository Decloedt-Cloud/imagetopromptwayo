export function initCopy() {
  const btn = document.getElementById('copyBtn');
  const output = document.getElementById('output');

  btn.addEventListener('click', async () => {
    if (!output.value) return;

    const originalContent = btn.innerHTML;
    try {
      await navigator.clipboard.writeText(output.value);
      btn.innerHTML = "copied";
      setTimeout(() => btn.innerHTML = originalContent, 1200);
    } catch {
      output.select();
      document.execCommand('copy');
      btn.innerHTML = "copied";
      setTimeout(() => btn.innerHTML = originalContent, 1200);
    }
  });
}