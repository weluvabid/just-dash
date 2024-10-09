import { suite } from 'uvu';
import assert from 'uvu/assert';

import debounce from './debounce';

// Create the suite
const debounceSuite = suite('debounce');

debounceSuite('should debounce calls with a specified delay', async () => {
  let count = 0;
  const fn = debounce(() => count++, 100);

  fn();
  fn();
  fn();

  // Wait for 150ms
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.is(count, 1); // Only one call should go through after delay
});

debounceSuite('should execute immediately if leading is true', async () => {
  let count = 0;
  const fn = debounce(() => count++, { delay: 100, leading: true });

  fn();
  assert.is(count, 1); // Leading call should execute immediately

  fn();
  fn();

  // Wait for 50ms
  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.is(count, 1); // No additional call during delay period
});

debounceSuite('should delay trailing calls when trailing is true', async () => {
  let count = 0;
  const fn = debounce(() => count++, { delay: 100, trailing: true });

  fn();
  fn();
  
  // Wait for 50ms
  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.is(count, 0); // No leading call

  // Wait for 150ms
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.is(count, 1); // Only one trailing call should execute after delay
});

debounceSuite('should cancel pending executions', async () => {
  let count = 0;
  const fn = debounce(() => count++, 100);

  fn();
  fn();
  fn.cancel(); // Cancel the pending debounce

  // Wait for 150ms
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.is(count, 0); // No call should be made after cancel
});

debounceSuite('should respect maxDelay option', async () => {
  let count = 0;
  const fn = debounce(() => count++, { delay: 200, maxDelay: 100 });

  fn(); // First call
  fn(); // Second call (debounces the first one)

  // Wait for 150ms (exceeds maxDelay of 100ms, but less than delay)
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.is(count, 1); // MaxDelay should trigger the function

  // Wait another 50ms (total 200ms)
  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.is(count, 1); // No additional calls should happen
});

debounceSuite('should handle maxDelay and trailing option together', async () => {
  let count = 0;
  const fn = debounce(() => count++, { delay: 100, maxDelay: 200, trailing: true });

  fn(); // First call
  fn(); // Second call (debounces the first one)

  // Wait for 150ms (exceeds the delay, should call trailing)
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.is(count, 1); // Trailing call executed

  // Wait for 250ms (exceeds maxDelay)
  await new Promise((resolve) => setTimeout(resolve, 100));
  assert.is(count, 1); // No additional calls should happen
});

debounceSuite('should debounce with default delay if none provided', async () => {
  let count = 0;
  const fn = debounce(() => count++, 0);

  fn();
  fn();
  
  // Wait for 50ms
  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.is(count, 1); // Debounced execution with default delay
});

debounceSuite('should debounce multiple arguments', async () => {
  let result = 0;
  const fn = debounce((a, b) => result = a + b, 100);

  fn(1, 2);
  fn(3, 4);

  // Wait for 150ms
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.is(result, 7); // The second call's arguments should be used
});

debounceSuite('should execute immediately with multiple calls when leading is true', async () => {
  let count = 0;
  const fn = debounce(() => count++, { delay: 100, leading: true });

  fn();
  fn();
  fn();

  // Wait for 50ms
  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.is(count, 1); // Leading call should execute immediately

  // Wait for another 100ms
  await new Promise((resolve) => setTimeout(resolve, 100));
  assert.is(count, 2); // No additional calls should happen
});

debounceSuite('should execute immediately with zero delay', async () => {
  let count = 0;
  const fn = debounce(() => count++, 0);

  fn();
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.is(count, 1); // Should execute immediately

  fn();
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.is(count, 2); // Should execute immediately again
});

debounceSuite('should preserve context when debounced', async () => {
  const obj = {
    value: 0,
    increment() {
      this.value++;
    },
  };
  const fn = debounce(obj.increment.bind(obj), 100);

  fn();
  fn();

  // Wait for 150ms
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.is(obj.value, 1); // Should execute once
});

debounceSuite('should handle multiple calls before timeout', async () => {
  let count = 0;
  const fn = debounce(() => count++, 100);

  fn();
  fn();
  fn();

  // Wait for 150ms
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.is(count, 1); // Only one call should go through
});

debounceSuite('should handle undefined arguments', async () => {
  let result;
  const fn = debounce((a) => result = a, 100);

  fn(undefined);

  // Wait for 150ms
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.is(result, undefined); // Should handle undefined correctly
});

debounceSuite('should not execute if canceled right before execution', async () => {
  let count = 0;
  const fn = debounce(() => count++, 100);

  fn();

  // Cancel right before it would execute
  await new Promise((resolve) => setTimeout(() => {
    fn.cancel();
    resolve();
  }, 90));

  // Wait for 150ms
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.is(count, 0); // Should not execute after cancel
});

debounceSuite('should do nothing if never invoked', async () => {
  let count = 0;
  // eslint-disable-next-line no-unused-vars
  const fn = debounce(() => count++, 100);

  // Wait for 150ms without calling the function
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.is(count, 0); // Should not have executed
});

// Run the suite
debounceSuite.run();
