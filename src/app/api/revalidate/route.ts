import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Missing _type' }, { status: 400 });
    }

    // Revalidate based on content type
    switch (body._type) {
      case 'siteSettings':
      case 'product':
      case 'productCategory':
      case 'caseStudy':
      case 'colorSwatch':
      case 'colorFamily':
      case 'page':
        revalidateTag('sanity');
        break;
      default:
        revalidateTag('sanity');
    }

    return NextResponse.json({ message: 'Revalidated', body });
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
