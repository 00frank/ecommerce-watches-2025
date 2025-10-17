import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const paramsResolved = await params;
  const page = await getPageBySlug(paramsResolved.slug);

  if (!page) {
    return {
      title: 'Página no encontrada',
    };
  }

  return {
    title: `${page.title}`,
    description: page.content?.substring(0, 160) || '',
    openGraph: {
      title: page.title,
      description: page.content?.substring(0, 160) || '',
      type: 'website',
    },
  };
}

async function getPageBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Error fetching page:', error);
    return null;
  }

  return data as {
    id: string;
    title: string;
    slug: string;
    content: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
}

export default async function Page({ params }: PageProps) {
  const paramsResolved = await params;
  const page = await getPageBySlug(paramsResolved.slug);

  if (!page || !page.is_active) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content || '' }}
        />
      </div>
    </div>
  );
}

