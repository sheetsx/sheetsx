import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sheetsx } from '../placeholder';

describe('sheetsx', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  let processEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    processEnv = process.env;
    process.env = { ...process.env };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = processEnv;
  });

  it('should log the placeholder message when called', () => {
    sheetsx();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Thank you for your interest in sheetsx!'),
    );
  });

  it('should throw an error when not in test environment', () => {
    process.env.NODE_ENV = 'production';
    expect(() => sheetsx()).toThrow(
      'sheetsx is not yet ready for use. Please check back soon!',
    );
  });

  it('should not throw an error in test environment', () => {
    process.env.NODE_ENV = 'test';
    expect(() => sheetsx()).not.toThrow();
  });

  it('should warn when accessing a non-existent property', () => {
    (sheetsx as any).nonExistentProperty;
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Attempted to access property sheetsx: nonExistentProperty',
    );
  });

  it('should warn and call placeholder when setting a property', () => {
    (sheetsx as any).someProperty = 'value';
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Attempted to set property sheetsx: someProperty',
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Thank you for your interest in sheetsx!'),
    );
  });

  it('should warn when called as a function', () => {
    sheetsx();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Attempted to call as a function sheetsx',
    );
  });

  it('should return a function when accessing any property', () => {
    expect(typeof (sheetsx as any).anyProperty).toBe('function');
  });
});
