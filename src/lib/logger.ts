type Level = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_ORDER: Record<Level, number> = { debug: 0, info: 1, warn: 2, error: 3 };

const envLevel = (process.env.EXPO_PUBLIC_LOG_LEVEL ?? '').toLowerCase() as Level | '';
const defaultLevel: Level = __DEV__ ? 'debug' : 'warn';
const minLevel: Level = envLevel in LEVEL_ORDER ? (envLevel as Level) : defaultLevel;

function shouldLog(level: Level) {
  return LEVEL_ORDER[level] >= LEVEL_ORDER[minLevel];
}

function format(scope: string | undefined, level: Level, args: unknown[]) {
  const tag = scope ? `[${scope}]` : '[app]';
  return [`${tag} ${level}`, ...args];
}

function log(scope: string | undefined, level: Level, args: unknown[]) {
  if (!shouldLog(level)) return;
  const formatted = format(scope, level, args);
  switch (level) {
    case 'debug':
      console.debug(...formatted);
      return;
    case 'info':
      console.info(...formatted);
      return;
    case 'warn':
      console.warn(...formatted);
      return;
    case 'error':
      console.error(...formatted);
  }
}

export type Logger = {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  child: (scope: string) => Logger;
};

function build(scope?: string): Logger {
  return {
    debug: (...args) => log(scope, 'debug', args),
    info: (...args) => log(scope, 'info', args),
    warn: (...args) => log(scope, 'warn', args),
    error: (...args) => log(scope, 'error', args),
    child: (child) => build(scope ? `${scope}:${child}` : child),
  };
}

export const logger = build();
