import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../../services/prismic';
import styles from './post.module.scss';
import Header from '../../components/Header';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useRouter } from 'next/router';
import Comments from '../../components/Comments';
import Button from '../../components/Button';
import Link from 'next/link';

interface Post {
  uid: string;
  first_publication_date: string | null;
  last_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
  preview?: boolean;
  postNavigation: {
    previousPost: {
      uid: string;
      data: {
        title: string;
      };
    }[];
    nextPost: {
      uid: string;
      data: {
        title: string;
      };
    }[];
  };
}

export default function Post({ post, preview, postNavigation }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  const readTime = post.data.content.reduce((acc, content) => {
    const textBody = RichText.asText(content.body)
      .split(/<.+?>(.+?)<\/.+?>/g)
      .filter(t => t);

    const ar = [];
    textBody.forEach(fr => {
      fr.split(' ').forEach(pl => {
        ar.push(pl);
      });
    });

    const min = Math.ceil(ar.length / 200);
    return acc + min;
  }, 0);

  return (
    <>
      <Head>
        <title>{post.data.title} | Spacetraveling</title>
      </Head>

      <Header />

      <div className={styles.banner}>
        <img src={post.data.banner.url} alt={post.data.title} />
      </div>

      <main className={styles.container}>
        <article className={styles.post}>
          <div className={styles.postContent}>
            <h1>{post.data.title}</h1>

            <div className={styles.infoContainer}>
              <div>
                <FiCalendar />
                <time>
                  {format(
                    new Date(post.first_publication_date),
                    'dd MMM yyyy',
                    {
                      locale: ptBR,
                    }
                  )}
                </time>
              </div>
              <div>
                <FiUser />
                <span>{post.data.author}</span>
              </div>
              <div>
                <FiClock />
                <span>{readTime} min</span>
              </div>
            </div>

            {post.last_publication_date && (
              <div className={styles.updatePost}>
                {'* editado em ' +
                  format(new Date(post.last_publication_date), 'dd MMM yyyy', {
                    locale: ptBR,
                  })}
              </div>
            )}

            <div className={styles.content}>
              {post.data.content.map(contentBody => (
                <div key={contentBody.heading}>
                  <strong>{contentBody.heading}</strong>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: RichText.asHtml(contentBody.body),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </article>

        <footer className={`${styles.post} ${styles.footer}`}>
          <section className={styles.postNavigation}>
            {postNavigation?.previousPost.length > 0 && (
              <div>
                <p>{postNavigation.previousPost[0]?.data.title}</p>
                <Link href={`/post/${postNavigation.previousPost[0]?.uid}`}>
                  <a>Post anterior</a>
                </Link>
              </div>
            )}

            {postNavigation?.nextPost.length > 0 && (
              <div>
                <p>{postNavigation.nextPost[0]?.data.title}</p>
                <Link href={`/post/${postNavigation.nextPost[0]?.uid}`}>
                  <a>Proximo post</a>
                </Link>
              </div>
            )}
          </section>
          <Comments id={post.uid} />

          {preview && (
            <Button>
              <Link href="/api/exit-preview">
                <a>Sair do modo Preview</a>
              </Link>
            </Button>
          )}
        </footer>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.Predicates.at('document.type', 'p1')],
    {
      fetch: ['p1.uid'],
      pageSize: 100,
    }
  );

  const postsPaths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths: postsPaths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('p1', String(slug), {
    ref: previewData?.ref ?? null,
  });

  const previousPost = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
      after: response.id,
      orderings: '[document.first_publication_date]',
    }
  );
  const nextPost = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
      after: response.id,
      orderings: '[document.last_publication_date desc]',
    }
  );

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    last_publication_date: response.last_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
      preview,
      postNavigation: {
        previousPost: previousPost?.results,
        nextPost: nextPost?.results,
      },
    },
  };
};
