import getShadowRoot from './get-shadow-root';

export default async function findInShadowRoot(element, ...args) {
  const shadowRoot = await getShadowRoot(element);

  return shadowRoot.querySelector(...args);
}
