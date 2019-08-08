import QUnit from 'qunit';
import { setApplication, waitUntil } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import Application from '../app';
import config from '../config/environment';

import 'ember-cli-testdouble-qunit';

setApplication(Application.create(config.APP));

start();

QUnit.extend(QUnit.assert, {
  async convergeOn(condition, message) {
    try {
      await waitUntil(condition);

      this.pushResult({ result: true, message });
    } catch (e) {
      if (e.message === 'waitUntil timed out') {
        this.pushResult({ result: false, message });
      } else {
        throw e;
      }
    }
  }
});
