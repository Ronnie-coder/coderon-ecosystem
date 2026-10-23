import { NextResponse } from 'next/server';
import { getNotionFileUrl } from '@/lib/notionJournal';

// Notion file URLs expire after an hour, so journal images point here and we redirect
// to a fresh URL each time. Only Notion block/page IDs are accepted.
const ID = /^[0-9a-f-]{32,36}$/i;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const block = searchParams.get('block') ?? undefined;
  const page = searchParams.get('page') ?? undefined;
  if ((block && !ID.test(block)) || (page && !ID.test(page)) || (!block && !page)) {
    return new NextResponse('Bad request', { status: 400 });
  }
  try {
    const url = await getNotionFileUrl({ block, page });
    if (!url) return new NextResponse('Not found', { status: 404 });
    return NextResponse.redirect(url, { status: 307, headers: { 'Cache-Control': 'public, max-age=1800' } });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
