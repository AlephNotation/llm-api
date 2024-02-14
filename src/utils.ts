import { debug as mDebug } from 'debug';
import jsonic from 'jsonic';
import { jsonrepair } from 'jsonrepair';
import { JsonValue } from 'type-fest';

import {
  ChatContentPartial,
  ChatContentText,
  ChatRequestMessage,
} from './types';

const error = mDebug('llm-api:error');
const log = mDebug('llm-api:log');
// eslint-disable-next-line no-console
log.log = console.log.bind(console);

export const debug = {
  error,
  log,
  write: (t: string) =>
    process.env.DEBUG &&
    (process.env.DEBUG === '*' || 'llm-api:log'.match(process.env.DEBUG)) &&
    process.stdout.write(t),
};

export function sleep(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function parseUnsafeJson(json: string): JsonValue {
  return jsonic(jsonrepair(json));
}

export type MaybePromise<T> = Promise<T> | T;

export function getTextContent(
  message: ChatRequestMessage<ChatContentPartial[]>,
): string {
  const { content } = message;
  if (typeof content === 'string') {
    return content;
  } else if (Array.isArray(content)) {
    return content
      .filter((item): item is ChatContentText => item.type === 'text')
      .map((textContent) => textContent.text)
      .join(' ');
  } else {
    return ''; // Return an empty string or any other appropriate value for when content is undefined
  }
}
