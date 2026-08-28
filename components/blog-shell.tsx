import Image from 'next/image';
import Link from 'next/link';
import { blogPostFromPath, postsForLocale, type BlogPost } from '@/lib/blog-data';
import { business, whatsappUrl, type PageContent } from '@/lib/site-data';
import { ContactBars } from './contact-bars';
import { IconWhatsApp } from './icons';
import { JsonLd } from './json-ld';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { TrackedLink } from './tracked-link';

function absolute(path: string) {
  return new URL(path, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').toString();
}

function formatDate(value: string, english: boolean) {
  return new Intl.DateTimeFormat(english ? 'en-GB' : 'tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <Link className="blog-card__media" href={post.path}>
        <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" />
      </Link>
      <div className="blog-card__body">
        <p className="blog-card__meta">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, post.locale === 'en')}</time>
          <span>{post.readingMinutes} min</span>
        </p>
        <h2>
          <Link href={post.path}>{post.title}</Link>
        </h2>
        <p>{post.intro}</p>
        <div className="blog-card__tags">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Link className="text-link text-link--dark" href={post.path}>
          {post.locale === 'en' ? 'Read article' : 'Yazıyı oku'} <span>↗</span>
        </Link>
      </div>
    </article>
  );
}

function BlogIndex({ page }: { page: PageContent }) {
  const english = page.locale === 'en';
  const posts = postsForLocale(page.locale);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="blog-hero">
          <div className="shell blog-hero__inner">
            <nav className="breadcrumbs" aria-label={english ? 'Breadcrumb' : 'Sayfa yolu'}>
              <Link href={english ? '/en' : '/'}>{english ? 'Home' : 'Ana Sayfa'}</Link>
              <span>
                <i>—</i>
                <span aria-current="page">Blog</span>
              </span>
            </nav>
            <p className="eyebrow">{page.kicker}</p>
            <h1>{page.title}</h1>
            <p className="blog-hero__lead">{page.intro}</p>
          </div>
        </section>

        <section className="section shell" aria-labelledby="blog-list-title">
          <div className="section-heading">
            <p className="eyebrow">{english ? 'Latest articles' : 'Son yazılar'}</p>
            <h2 id="blog-list-title">
              {english ? 'Terracotta, wholesale and local production' : 'Terracotta, toptan tedarik ve yerel üretim'}
            </h2>
          </div>
          <div className="blog-grid">{posts.map((item) => <BlogCard key={item.path} post={item} />)}</div>
        </section>

        <section className="blog-cta shell">
          <p className="eyebrow">{english ? 'Need a quote?' : 'Teklif mi lazım?'}</p>
          <h2>{english ? 'Talk to the workshop directly' : 'Atölyeyle doğrudan görüşün'}</h2>
          <p>
            {english
              ? 'Share product type, quantity and destination for a focused terracotta supply conversation.'
              : 'Ürün grubu, adet ve teslimat bilgisini paylaşın; terracotta tedarik görüşmesini başlatalım.'}
          </p>
          <TrackedLink
            className="button button--whatsapp"
            href={whatsappUrl('default', undefined, english)}
            target="_blank"
            rel="noreferrer"
            eventName="whatsapp_click"
            eventData={{ location: 'blog_index' }}
          >
            <IconWhatsApp />
            {english ? 'WhatsApp quote' : 'WhatsApp’tan teklif'}
          </TrackedLink>
        </section>
      </main>
      <SiteFooter english={english} />
      <ContactBars english={english} />
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: page.title,
            description: page.seoDescription,
            url: absolute(page.path),
            inLanguage: english ? 'en' : 'tr-TR',
            publisher: { '@id': `${absolute('/')}#organization` },
            blogPost: posts.map((item) => ({
              '@type': 'BlogPosting',
              headline: item.title,
              datePublished: item.publishedAt,
              url: absolute(item.path),
              image: absolute(item.image),
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: english ? 'Home' : 'Ana Sayfa',
                item: absolute(english ? '/en' : '/'),
              },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: absolute(page.path) },
            ],
          },
        ]}
      />
    </>
  );
}

function BlogArticle({ post }: { post: BlogPost }) {
  const english = post.locale === 'en';
  const related = postsForLocale(post.locale).filter((item) => item.path !== post.path).slice(0, 3);
  const wa = whatsappUrl('default', undefined, english);

  return (
    <>
      <SiteHeader />
      <main>
        <article className="blog-article">
          <header className="blog-article__hero">
            <div className="shell blog-article__hero-inner">
              <nav className="breadcrumbs" aria-label={english ? 'Breadcrumb' : 'Sayfa yolu'}>
                <Link href={english ? '/en' : '/'}>{english ? 'Home' : 'Ana Sayfa'}</Link>
                <span>
                  <i>—</i>
                  <Link href={english ? '/en/blog' : '/blog'}>Blog</Link>
                </span>
                <span>
                  <i>—</i>
                  <span aria-current="page">{post.kicker}</span>
                </span>
              </nav>
              <p className="eyebrow">{post.kicker}</p>
              <h1>{post.title}</h1>
              <p className="blog-article__intro">{post.intro}</p>
              <div className="blog-article__meta">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, english)}</time>
                <span>{post.readingMinutes} min</span>
                <span>{business.name}</span>
              </div>
              <div className="blog-article__tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </header>

          <figure className="blog-article__cover shell">
            <Image src={post.image} alt={post.imageAlt} width={1320} height={720} priority sizes="(max-width: 900px) 100vw, 1320px" />
          </figure>

          <div className="shell blog-article__content">
            {post.blocks.map((block, index) => (
              <section key={block.title} className="blog-block">
                <span className="blog-block__number">0{index + 1}</span>
                <h2>{block.title}</h2>
                <p>{block.body}</p>
                {block.bullets && (
                  <ul>
                    {block.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {block.link && (
                  <Link className="text-link text-link--dark" href={block.link.href}>
                    {block.link.label} <span>↗</span>
                  </Link>
                )}
              </section>
            ))}
          </div>

          <aside className="shell blog-article__aside">
            <div className="blog-aside-card">
              <p className="eyebrow">{english ? 'Direct contact' : 'Doğrudan iletişim'}</p>
              <h2>{english ? 'Request terracotta supply' : 'Terracotta tedarik teklifi alın'}</h2>
              <p>
                {english
                  ? 'Share product type, quantity and destination on WhatsApp.'
                  : 'Ürün grubu, adet ve teslimat noktasını WhatsApp’tan paylaşın.'}
              </p>
              <TrackedLink
                className="button button--whatsapp"
                href={wa}
                target="_blank"
                rel="noreferrer"
                eventName="whatsapp_click"
                eventData={{ location: 'blog_article' }}
              >
                <IconWhatsApp />
                {english ? 'WhatsApp quote' : 'WhatsApp’tan teklif'}
              </TrackedLink>
            </div>
          </aside>

          {related.length > 0 && (
            <section className="section shell" aria-labelledby="related-posts">
              <div className="section-heading">
                <p className="eyebrow">{english ? 'Keep reading' : 'Okumaya devam'}</p>
                <h2 id="related-posts">{english ? 'Related articles' : 'İlgili yazılar'}</h2>
              </div>
              <div className="blog-grid blog-grid--compact">{related.map((item) => <BlogCard key={item.path} post={item} />)}</div>
            </section>
          )}
        </article>
      </main>
      <SiteFooter english={english} />
      <ContactBars english={english} />
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.seoDescription,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            inLanguage: english ? 'en' : 'tr-TR',
            url: absolute(post.path),
            image: [absolute(post.image)],
            keywords: post.tags.join(', '),
            author: { '@type': 'Organization', name: business.name, url: absolute('/') },
            publisher: {
              '@type': 'Organization',
              name: business.name,
              logo: { '@type': 'ImageObject', url: absolute('/og.png') },
            },
            mainEntityOfPage: absolute(post.path),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: english ? 'Home' : 'Ana Sayfa',
                item: absolute(english ? '/en' : '/'),
              },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: absolute(english ? '/en/blog' : '/blog') },
              { '@type': 'ListItem', position: 3, name: post.title, item: absolute(post.path) },
            ],
          },
        ]}
      />
    </>
  );
}

export function BlogShell({ page }: { page: PageContent }) {
  if (page.path === '/blog' || page.path === '/en/blog') {
    return <BlogIndex page={page} />;
  }

  const post = blogPostFromPath(page.path);
  if (!post) return null;
  return <BlogArticle post={post} />;
}
