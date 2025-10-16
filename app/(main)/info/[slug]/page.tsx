import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    return {
      title: 'Página no encontrada',
    };
  }

  return {
    title: `${page.title}`,
    description: page.content.substring(0, 160),
    openGraph: {
      title: page.title,
      description: page.content.substring(0, 160),
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

  return data;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  if (!page || !page.is_active) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}

