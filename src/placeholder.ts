/**
 * Placeholder function to indicate package development status.
 * This function provides a helpful message and guidance for early adopters.
 * @throws {Error} Throws an error with a detailed message about the package status.
 */
const placeholder = (): never => {
  console.warn('⚠️ sheetsx is currently under active development ⚠️');

  const message = `
  Thank you for your interest in sheetsx! 🎉
  
  We're working hard to bring you an amazing framework for Google Sheets.
  While we're not quite ready for prime time, here's what you can do:
  
  1. 🌟 Star our repository: https://github.com/your-username/sheetsx
     (This helps us gauge interest and notifies you of updates)
  
  2. 📆 Expected release: Q4 2024 (subject to change)
  
  3. 🛠️ Want to contribute? Check our GitHub issues!
  
  We appreciate your enthusiasm and can't wait to revolutionize
  spreadsheets with you soon! 💪
  
  For now, this package will throw an error to prevent unintended usage.
  `;

  console.log(message);
  throw new Error('sheetsx is not yet ready for use. Please check back soon!');
};

export const sheetsx = new Proxy({} as Record<string | symbol, any>, {
  get: (target, prop: string | symbol) => {
    if (prop === 'placeholder') {
      return placeholder;
    }
    return (...args: any[]): never => {
      console.warn(`Attempted to call non-existent method: ${String(prop)}`);
      return placeholder();
    };
  },
  set: (): never => {
    console.warn('Attempted to set a property on sheetsx');
    return placeholder();
  },
  apply: (): never => {
    console.warn('Attempted to call sheetsx as a function');
    return placeholder();
  },
  construct: (): never => {
    console.warn('Attempted to use sheetsx as a constructor');
    return placeholder();
  },
});
