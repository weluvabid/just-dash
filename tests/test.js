import { test } from 'uvu';
import * as assert from 'uvu/assert';

test('Hello World', () => {
    assert.ok(true);
    assert.is('Hello World', 'Hello World');
});

test.run();
