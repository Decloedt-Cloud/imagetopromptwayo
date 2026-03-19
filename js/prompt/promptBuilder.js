export function buildPrompt(style, colors) {
  const lighting =
    colors.paletteName === 'tons chauds' ? "lumière dorée"
    : colors.paletteName === 'tons froids' ? "lumière froide"
    : "lumière neutre";

  const styleMap = {
    cinema: "cinématographique",
    anime: "anime",
    pixar: "3D Pixar",
    photorealiste: "photoréaliste",
    realiste: "réaliste"
  };

  return [
    "une scène visuelle",
    lighting,
    styleMap[style] || "réaliste",
    `palette ${colors.paletteName}`,
    `couleur dominante ${colors.hex}`,
    "haute qualité"
  ].join(", ");
}