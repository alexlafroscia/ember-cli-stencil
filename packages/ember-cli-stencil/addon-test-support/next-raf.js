export default function nextRAF() {
  return new Promise(resolve => {
    requestAnimationFrame(resolve);
  });
}
