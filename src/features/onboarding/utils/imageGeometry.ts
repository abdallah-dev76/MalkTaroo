type Size = { width: number; height: number };

export const getOnboardingImageGeometry = (image: Size, viewport: Size) => {
  const scale = Math.max(
    viewport.width / image.width,
    viewport.height / image.height,
  );
  const renderedWidth = image.width * scale;
  const renderedHeight = image.height * scale;
  const croppedTop = (renderedHeight - viewport.height) / 2;
  const croppedLeft = (renderedWidth - viewport.width) / 2;
  return {
    renderedWidth,
    renderedHeight,
    croppedTop,
    croppedLeft,
    formTop: Math.max(0, renderedHeight * 0.3 - croppedTop),
  };
};
