import { router } from 'expo-router';

import { useAuthStore } from '~/store/auth.store';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!BASE_URL) {
  console.warn('[api] EXPO_PUBLIC_API_URL is not defined; requests will fail.');
}

const DEFAULT_TIMEOUT_MS = 20_000;

export type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  params?: Record<string, string | number | boolean | null | undefined>;
  timeoutMs?: number;
  skipAuth?: boolean;
};

export class ApiError extends Error {
  readonly status: number;
  readonly data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

function buildUrl(path: string, params?: ApiRequestOptions['params']): string {
  const base = path.startsWith('http') ? path : `${BASE_URL ?? ''}${path}`;
  if (!params) return base;
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    search.append(key, String(value));
  }
  const qs = search.toString();
  return qs ? `${base}${base.includes('?') ? '&' : '?'}${qs}` : base;
}

function isFormData(value: unknown): value is FormData {
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

function buildInit(options: ApiRequestOptions, token: string | null): RequestInit {
  const { body, headers, skipAuth, timeoutMs: _t, params: _p, ...rest } = options;
  const finalHeaders = new Headers(headers);

  if (token && !skipAuth && !finalHeaders.has('Authorization')) {
    finalHeaders.set('Authorization', `Bearer ${token}`);
  }

  let finalBody: BodyInit | undefined;
  if (body !== undefined && body !== null) {
    if (isFormData(body) || typeof body === 'string') {
      finalBody = body as BodyInit;
    } else {
      if (!finalHeaders.has('Content-Type')) {
        finalHeaders.set('Content-Type', 'application/json');
      }
      finalBody = JSON.stringify(body);
    }
  }

  return { ...rest, headers: finalHeaders, body: finalBody };
}

async function parseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const text = await response.text();
    return text ? JSON.parse(text) : undefined;
  }
  const text = await response.text();
  return text.length ? text : undefined;
}

let refreshPromise: Promise<string | null> | null = null;

async function performRefresh(): Promise<string | null> {
  try {
    const res = await fetch(`${BASE_URL ?? ''}/api/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return null;
    const data = (await parseBody(res)) as { token?: string } | undefined;
    const next = data?.token;
    if (!next) return null;
    useAuthStore.getState().setToken(next);
    return next;
  } catch {
    return null;
  }
}

async function requestWithRetry<T>(
  path: string,
  options: ApiRequestOptions,
  retry: boolean,
): Promise<T> {
  const token = options.skipAuth ? null : useAuthStore.getState().token;
  const url = buildUrl(path, options.params);
  const init = buildInit(options, token);

  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const signal = options.signal
    ? mergeSignals(options.signal, controller.signal)
    : controller.signal;

  let response: Response;
  try {
    response = await fetch(url, { ...init, signal });
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 401 && retry && !options.skipAuth) {
    refreshPromise ??= performRefresh().finally(() => {
      refreshPromise = null;
    });
    const next = await refreshPromise;
    if (next) {
      return requestWithRetry<T>(path, options, false);
    }
    useAuthStore.getState().clearAuth();
    router.replace('/(auth)/sign-in' as never);
  }

  const data = await parseBody(response);

  if (!response.ok) {
    const message =
      (typeof data === 'object' && data && 'message' in data && String((data as { message: unknown }).message)) ||
      response.statusText ||
      `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

function mergeSignals(a: AbortSignal, b: AbortSignal): AbortSignal {
  if (a.aborted) return a;
  if (b.aborted) return b;
  const controller = new AbortController();
  const onAbort = (signal: AbortSignal) => () => controller.abort(signal.reason);
  a.addEventListener('abort', onAbort(a), { once: true });
  b.addEventListener('abort', onAbort(b), { once: true });
  return controller.signal;
}

function request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  return requestWithRetry<T>(path, options, true);
}

export const api = {
  request,
  get: <T>(path: string, options: Omit<ApiRequestOptions, 'body' | 'method'> = {}) =>
    request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options: Omit<ApiRequestOptions, 'body' | 'method'> = {}) =>
    request<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options: Omit<ApiRequestOptions, 'body' | 'method'> = {}) =>
    request<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown, options: Omit<ApiRequestOptions, 'body' | 'method'> = {}) =>
    request<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options: Omit<ApiRequestOptions, 'body' | 'method'> = {}) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};
