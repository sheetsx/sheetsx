import { expect, test, vi } from 'vitest';
import sheetsx from '../index.js';

test('placeholder function', () => {
  const consoleWarnSpy = vi.spyOn(console, 'warn');
  const consoleLogSpy = vi.spyOn(console, 'log');

  expect(() => sheetsx.placeholder()).toThrow(
    'sheetsx is not yet ready for use. Please check back soon!',
  );

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    '⚠️ sheetsx is currently under active development ⚠️',
  );
  expect(consoleLogSpy).toHaveBeenCalledWith(
    expect.stringContaining('Thank you for your interest in sheetsx!'),
  );

  consoleWarnSpy.mockRestore();
  consoleLogSpy.mockRestore();
});

test('non-existent method call', () => {
  const consoleWarnSpy = vi.spyOn(console, 'warn');

  expect(() => sheetsx.nonExistentMethod()).toThrow(
    'sheetsx is not yet ready for use. Please check back soon!',
  );

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    'Attempted to call non-existent method: nonExistentMethod',
  );

  consoleWarnSpy.mockRestore();
});

test('property assignment', () => {
  const consoleWarnSpy = vi.spyOn(console, 'warn');

  expect(() => {
    sheetsx.someProperty = 'value';
  }).toThrow('sheetsx is not yet ready for use. Please check back soon!');

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    'Attempted to set a property on sheetsx',
  );

  consoleWarnSpy.mockRestore();
});

test('function call', () => {
  const consoleWarnSpy = vi.spyOn(console, 'warn');

  expect(() => (sheetsx as any)()).toThrow(
    'sheetsx is not yet ready for use. Please check back soon!',
  );

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    'Attempted to call sheetsx as a function',
  );

  consoleWarnSpy.mockRestore();
});

test('constructor call', () => {
  const consoleWarnSpy = vi.spyOn(console, 'warn');

  expect(() => new (sheetsx as any)()).toThrow(
    'sheetsx is not yet ready for use. Please check back soon!',
  );

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    'Attempted to use sheetsx as a constructor',
  );

  consoleWarnSpy.mockRestore();
});
