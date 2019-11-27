// eslint-disable-next-line import/prefer-default-export
export function setCameraSize(camera, width, height) {
  if (camera.isPerspectiveCamera) {
    Object.assign(camera, { aspect: width / height });
  } else if (camera.isOrthographicCamera) {
    Object.assign(camera, {
      left: -width / 2,
      right: width / 2,
      top: height / 2,
      bottom: -height / 2,
    });
  } else {
    throw new TypeError('Unknown camera type.');
  }
  camera.updateProjectionMatrix();
}
