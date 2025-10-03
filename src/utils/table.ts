import { regExpEscape } from '@li/regexp-escape-polyfill';

export type TransliterationTable = Record<string, string>;
export interface TransliterationSystem {
  name: string;
  table: TransliterationTable;
}
type Transliterator = (str: string) => string;

const escapeRegExp = RegExp.escape ?? regExpEscape;

export function cloneTable(table: Readonly<TransliterationTable>): TransliterationTable {
  return Object.assign(Object.create(null), table);
}

export function createTransliterationTableWithLowerCase(table: Readonly<TransliterationTable>): TransliterationTable {
  const newTable: TransliterationTable = cloneTable(table);
  for (const [orig, dest] of Object.entries(table)) {
    newTable[orig.toLowerCase()] = dest.toLowerCase();
  }
  return newTable;
}

export function createTransliterator(table: Readonly<TransliterationTable>): Transliterator {
  const copiedTable = cloneTable(table);
  const regexp = new RegExp(Object.keys(copiedTable).map(escapeRegExp).join('|'), 'g');
  return (str: string) => str.replaceAll(regexp, (char) => copiedTable[char]!);
}
