export default function waitForRAF() {
  return new Promise(resolve => {
    requestAnimationFrame(resolve);
  });
}
