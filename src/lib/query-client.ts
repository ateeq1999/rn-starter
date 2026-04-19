import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

import { ApiError } from '~/api/client';
import { logger } from '~/lib/logger';

const log = logger.child('query');

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 4 * 60 * 1000, // 4 minutes
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status === 401) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      log.error(`query ${JSON.stringify(query.queryKey)} failed`, error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _vars, _ctx, mutation) => {
      const key = mutation.options.mutationKey ? JSON.stringify(mutation.options.mutationKey) : 'anonymous';
      log.error(`mutation ${key} failed`, error);
    },
  }),
});
