import Link from 'next/link';
import Head from 'next/head';
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import client from '../../client';
import { Code } from '../../components/Code';
import { format } from 'date-fns';
import styles from '../../styles/Post.module.css';

// Adding Image Caption and Attribution to API.js: https://www.sanity.io/answers/adding-image-caption-and-attribution-to-api-js
// Internal and external links with Portable Text: https://www.sanity.io/guides/portable-text-internal-and-external-links

function urlFor(source) {
    return imageUrlBuilder(client).image(source);
}

const ptComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <figure>
                        <img className={styles.pImage}
                            alt={value.alt || ' '}
                            loading='lazy'
                            src={urlFor(value).fit('max').auto('format')}
                        />
                        <figcaption className={styles.captionText}>{value.caption}</figcaption>
                    </figure>
                    <br />
                </div>
            );
        },
        code: (props) => {
            return (<Code language={props.value.language} code={props.value.code} highlightedLines={props.value.highlightedLines} />);
        },
    },
};

const Post = ({ post }) => {
    const {
        title = 'Missing title',
        name = 'Missing name',
        description,
        categories,
        authorImage,
        mainImage,
        publishedAt,
        body = [],
    } = post;

    const titleTag = `CoderGuides | ${title}`;

    return (
        <>
            <Head>
                <title>{titleTag}</title>
                <meta name="description" content="A blog of random content" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* HERO SECTION */}
            {/* <div
                className={styles.heroImage}
                style={{
                    backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${urlFor(
                        mainImage
                    ).url()})`,
                }}
            >
                <div className={styles.heroContainer}>
                    <h1 className={styles.heroHeader}>
                        <span className={styles.heroHeaderSpan}>{title}</span>
                    </h1>
                </div>
            </div> */}

            <article className={styles.container}>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4em', textAlign: 'center' }}>
                    <div className={styles.postTitleBox}>
                        <h1 className={styles.postTitle}>{title}</h1>

                        <div style={{ marginBottom: '50px', fontSize: '20px' }}>
                            <p className={styles.date}>{format(new Date(publishedAt), 'MMMM dd, yyyy')}</p>
                        </div>

                        {categories && (
                            <div>
                                {categories.map(
                                    (category, index) => (
                                        <span key={index} className={styles.tagBadge}>{category}</span>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.pText}>

                    {/* <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <img style={{ width: '80%', height: 'auto', textAlign: 'center' }}
                            src={urlFor(mainImage).url()}
                            alt={`${title}`}
                        />
                    </div>

                    <br /> */}

                    <p className={styles.description}>{description}</p>

                    <div className={styles.separator}></div>

                    <PortableText value={body} components={ptComponents} />

                    <br />

                    <Link style={{ color: 'tomato' }} href='/'>Home</Link>
                </div>
            </article>
        </>
    );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  description,
  publishedAt,
  mainImage,
  caption,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`;

export async function getStaticPaths() {
    const paths = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: 'blocking'
    };
}

export async function getStaticProps(context) {
    // It's important to default the slug so that it doesn't return "undefined"
    const { slug = '' } = context.params;
    const post = await client.fetch(query, { slug });
    return {
        props: {
            post,
        },
        revalidate: 20,
    };
}

export default Post;
