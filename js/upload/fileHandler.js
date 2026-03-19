export function validateFile(file) {
  const MAX_SIZE = 20 * 1024 * 1024;

  if (!file.type.startsWith('image/')) {
    return "Veuillez sélectionner un fichier image.";
  }

  if (file.size > MAX_SIZE) {
    return "Fichier trop volumineux (max 20 Mo).";
  }

  return null;
}