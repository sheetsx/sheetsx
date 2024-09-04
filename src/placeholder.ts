type PlaceholderFunction = () => void;

const REPOSITORY_URL = 'https://github.com/sheetsx/sheetsx';
const EXPECTED_RELEASE = 'Q4 2024';

const createPlaceholderMessage = (): string => `
Thank you for your interest in sheetsx! 🎉

We're working hard to bring you an amazing framework for Google Sheets.
While we're not quite ready for prime time, here's what you can do:

1. 🌟 Star our repository: ${REPOSITORY_URL}
   (This helps us gauge interest and notifies you of updates)

2. 📆 Expected release: ${EXPECTED_RELEASE} (subject to change)

3. 🛠️ Want to contribute? Check our GitHub issues!

We appreciate your enthusiasm and can't wait to revolutionize
spreadsheets with you soon! 💪

For now, this package will throw an error to prevent unintended usage.
`;

const placeholder: PlaceholderFunction = () => {
  console.log(createPlaceholderMessage());
  if (process.env.NODE_ENV !== 'test') {
    throw new Error(
      'sheetsx is not yet ready for use. Please check back soon!',
    );
  }
};

const createWarning = (action: string, detail: string = ''): void => {
  console.warn(`Attempted to ${action} sheetsx${detail ? `: ${detail}` : ''}`);
};

const handler: ProxyHandler<PlaceholderFunction> = {
  get(target: PlaceholderFunction, prop: string | symbol): any {
    createWarning('access property', String(prop));
    return placeholder;
  },
  set(target: PlaceholderFunction, prop: string | symbol, value: any): boolean {
    createWarning('set property', String(prop));
    placeholder();
    return true;
  },
  apply(target: PlaceholderFunction, thisArg: any, argumentsList: any[]): void {
    createWarning('call as a function');
    return placeholder();
  },
  construct(target: PlaceholderFunction, args: any[]): object {
    createWarning('use as a constructor');
    placeholder();
    return new Proxy(placeholder, handler);
  },
};

export const sheetsx = new Proxy(placeholder, handler);
