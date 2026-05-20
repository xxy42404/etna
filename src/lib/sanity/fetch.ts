import { getClient } from './client';
import type { QueryParams } from 'next-sanity';

const isPlaceholder =
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'placeholder';

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  preview = false,
}: {
  query: string;
  params?: QueryParams;
  preview?: boolean;
}): Promise<QueryResponse | null> {
  if (isPlaceholder) return null;

  try {
    const client = getClient(preview);
    return await client.fetch<QueryResponse>(query, params, {
      next: { revalidate: 3600 },
    });
  } catch {
    return null;
  }
}
