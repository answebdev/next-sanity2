import Head from 'next/head';
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import client from '../../client';
import { Code } from '../../components/Code';
import { format } from 'date-fns';
import ScrollUpButton from 'react-scroll-up-button';
import styles from '../../styles/Post.module.css';

function urlFor(source) {
    return imageUrlBuilder(client).image(source);
}

const ptComponents = {
    marks: {
        link: ({ value, children }) => {
            const { blank, href } = value;
            return blank ?
                <a href={href} target='_blank' rel='noopener noreferrer'>{children}</a>
                :
                <a href={href}>{children}</a>;
        }
    },
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <div className={styles.pImageContainer}>
                    <figure className={styles.figure}>
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
        title,
        description,
        categories,
        mainImage,
        publishedAt,
        body = [],
    } = post;

    const titleTag = `CoderGuides | ${title}`;

    return (
        <>
            <Head>
                <title>{titleTag}</title>
                <meta name="description" content="A site for coding tutorial guides." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <article className={styles.container}>
                <div className={styles.innerDiv}>
                    <div className={styles.postTitleBox}>
                        <h1 className={styles.postTitle}>{title}</h1>

                        <div className={styles.dateContainer}>
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
                    <p className={styles.description}>{description}</p>
                    <div className={styles.separator}></div>
                    <PortableText value={body} components={ptComponents} />
                    <br />
                </div>

                <div>
                    <ScrollUpButton
                        style={{
                            marginBottom: '45px',
                            marginRight: '-15px',
                            background: 'var(--mainButtonColor)',
                            borderRadius: '5px',
                        }}
                    />
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
  "categories": categories[]->title,
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
