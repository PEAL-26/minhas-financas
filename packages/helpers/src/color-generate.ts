export function colorGenerate(transparency = 1) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const alpha = Math.min(1, Math.max(0, transparency));
  const rgb = `rgb(${r}, ${g}, ${b})`;
  const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;

  return {
    rgb,
    rgba,
  };
}
