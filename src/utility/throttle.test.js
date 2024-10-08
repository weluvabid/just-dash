import { suite } from 'uvu';
import assert from 'uvu/assert';

import throttle from './throttle';

const throttleSuite = suite('throttle');

throttleSuite('throttle calls function after delay', async () => {
  let callCount = 0;
  const fn = () => callCount++;
  const throttledFn = throttle(fn, { delay: 100 });

  throttledFn();
  throttledFn();
  throttledFn();

  await new Promise((resolve) => setTimeout(resolve, 150)); // Wait longer than delay
  assert.is(callCount, 1); // Function should be called once
});

throttleSuite('leading execution works', async () => {
  let callCount = 0;
  const fn = () => callCount++;
  const throttledFn = throttle(fn, { delay: 100, leading: true, trailing: false });

  throttledFn();
  assert.is(callCount, 1); // Function should be called immediately
  await new Promise((resolve) => setTimeout(resolve, 150)); // Wait longer than delay
  assert.is(callCount, 1); // No additional calls should occur
});

throttleSuite('trailing execution works', async () => {
  let callCount = 0;
  const fn = () => callCount++;
  const throttledFn = throttle(fn, { delay: 100, trailing: true });

  throttledFn();
  throttledFn();
  throttledFn();

  await new Promise((resolve) => setTimeout(resolve, 150)); // Wait longer than delay
  assert.is(callCount, 1); // Function should be called once after delay
});

throttleSuite('leading and trailing both work correctly', async () => {
  let callCount = 0;
  const fn = () => callCount++;
  const throttledFn = throttle(fn, { delay: 100, leading: true, trailing: true });

  throttledFn(); // Leading call
  await new Promise((resolve) => setTimeout(resolve, 50)); // Wait a bit
  throttledFn(); // Trigger throttle
  await new Promise((resolve) => setTimeout(resolve, 150)); // Wait longer than delay

  assert.is(callCount, 2); // Function should be called once immediately and once after delay
});

throttleSuite('no leading or trailing execution', async () => {
  let callCount = 0;
  const fn = () => callCount++;
  const throttledFn = throttle(fn, { delay: 100, leading: false, trailing: false });

  throttledFn();
  throttledFn();
  await new Promise((resolve) => setTimeout(resolve, 150)); // Wait longer than delay

  assert.is(callCount, 0); // Function should not be called
});

throttleSuite('validates input options', () => {
  assert.throws(() => throttle(null, {}), {
    message: 'executor must be a function',
  });

  assert.throws(() => throttle(() => {}, 'invalid'), {
    message: 'options must be an object or a number',
  });

  assert.throws(() => throttle(() => {}, { delay: 'not a number' }), {
    message: 'options.delay must be a number',
  });

  assert.throws(() => throttle(() => {}, { leading: 'not a boolean' }), {
    message: 'options.leading must be a boolean',
  });

  assert.throws(() => throttle(() => {}, { trailing: 'not a boolean' }), {
    message: 'options.trailing must be a boolean',
  });

  assert.throws(() => throttle(() => {}, { callback: 'not a function' }), {
    message: 'options.callback must be a function',
  });
});

throttleSuite('cancel method prevents execution', async () => {
  let callCount = 0;
  const fn = () => callCount++;
  const throttledFn = throttle(fn, { delay: 100 });

  throttledFn(); // First call
  throttledFn(); // Second call
  throttledFn(); // Third call

  throttledFn.cancel(); // Cancel the throttled function

  await new Promise((resolve) => setTimeout(resolve, 150)); // Wait longer than delay

  assert.is(callCount, 0); // Function should not be called
});

throttleSuite('multiple calls do not exceed single execution', async () => {
  let callCount = 0;
  const fn = () => callCount++;
  const throttledFn = throttle(fn, { delay: 100 });

  throttledFn(); // Call 1
  throttledFn(); // Call 2
  throttledFn(); // Call 3

  await new Promise((resolve) => setTimeout(resolve, 150)); // Wait longer than delay
  assert.is(callCount, 1); // Function should be called once
});

throttleSuite('delay of zero behaves correctly', async () => {
  let callCount = 0;
  const fn = () => callCount++;
  const throttledFn = throttle(fn, { delay: 0 });

  throttledFn(); // Call immediately
  await new Promise((resolve) => setTimeout(resolve, 10)); // Wait a short time
  throttledFn(); // Call again
  await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the macro task to execute

  // Adding another timeout to ensure the second call has executed
  await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for any remaining macro tasks

  assert.is(callCount, 2); // Function should be called immediately twice
});

throttleSuite.run();
