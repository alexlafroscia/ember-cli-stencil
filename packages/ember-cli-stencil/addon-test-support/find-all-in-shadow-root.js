import getShadowRoot from './get-shadow-root';

export default async function findAllInShadowRoot(element, ...args) {
  const shadowRoot = await getShadowRoot(element);

  return shadowRoot.querySelectorAll(...args);
}
