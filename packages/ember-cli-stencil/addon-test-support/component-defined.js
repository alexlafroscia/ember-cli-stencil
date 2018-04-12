import { waitUntil } from '@ember/test-helpers';

/**
 * Resolves when the component has been defined
 *
 * Created because Chrome has issues with trying to run tests before the element was actually
 * defined
 *
 * @param {string} name the component to wait for
 * @param {object} options
 * @param {CustomElementRegistry} options.registry the `customElements` registry to look for the component in
 * @param {number} options.timeout See `waitUntil` documentation
 * @param {number} options.count See `waitUntil` documentation
 */
export default function waitForComponentDefinition(
  name,
  { registry = customElements, timeout, count } = {}
) {
  if (registry.get(name)) {
    return Promise.resolve();
  }

  return waitUntil(() => registry.get(name), { timeout, count });
}
