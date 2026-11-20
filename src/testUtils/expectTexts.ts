import { expect } from 'vitest';

export const expectTexts = (element: HTMLElement, texts: string[]): void => {
  texts.forEach((text) => expect(element).toHaveTextContent(text));
};
