import { waitUntil } from '@ember/test-helpers';

/**
 * Resolves to the `shadowRoot` of the element
 *
 * Created because sometimes the `shadowRoot` doesn't exist at the time
 * that the test tries to access it
 *
 * @param {Element} element the element to get the `shadowRoot` from
 */
export default async function getShadowRoot(element) {
  if (element.shadowRoot) {
    return element.shadowRoot;
  }

  await waitUntil(() => element.shadowRoot);

  return element.shadowRoot;
}
