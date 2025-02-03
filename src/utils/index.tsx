export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

export const generateColors = (targetColor: string) => {
  const colors = [targetColor];
  while (colors.length < 6) {
    const newColor = getRandomColor();
    if (!colors.includes(newColor)) {
      colors.push(newColor);
    }
  }
  return colors.sort(() => Math.random() - 0.5);
};
