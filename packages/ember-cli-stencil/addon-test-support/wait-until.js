import { waitUntil } from '@ember/test-helpers';
import getShadowRoot from './get-shadow-root';

export default async function waitUntilInShadowRoot(element, ...args) {
  const shadowRoot = await getShadowRoot(element);

  return waitUntil(() => shadowRoot.querySelector(...args));
}
