import Link from 'next/link';
import Head from 'next/head';
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import client from '../../client';
import { Code } from '../../components/Code';
import styles from '../../styles/Home.module.css';

// const serializers = {
//     marks: {
//         link: ({ children, mark }) =>
//             mark.blank ? (
//                 <a href={mark.href} target='_blank'>
//                     {children}
//                 </a>
//             ) : (
//                 <a href={mark.href}>{children}</a>
//             )
//     }
// };

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
                <img
                    alt={value.alt || ' '}
                    loading='lazy'
                    src={urlFor(value).width(320).height(240).fit('max').auto('format')}
                />
            );
        },
        code: (props) => {
            return (<Code language={props.value.language} code={props.value.code} highlightedLines={props.value.highlightedLines} />);
        },
        // marks: {
        //     link: ({ children, mark }) => {
        //         mark.blank ? (
        //             <a href={mark.href} target='_blank' rel='noopener noreferrer'>
        //                 {children}
        //             </a>
        //         ) : (
        //             <a href={mark.href}>{children}</a>
        //         );
        //     },
        // }
    },
};

const Post = ({ post }) => {
    const {
        title = 'Missing title',
        name = 'Missing name',
        categories,
        authorImage,
        body = [],
    } = post;

    const titleTag = `Bacon Blog | ${title}`;

    return (
        <article style={{ padding: '4em' }}>
            <Head>
                <title>{titleTag}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>{title}</h1>
            <span>By {name}</span>
            {categories && (
                <ul style={{ listStyle: 'none' }}>
                    Posted in:
                    {categories.map(
                        (category) => (
                            <li key={category}>{category}</li>
                        )
                    )}
                </ul>
            )}
            {authorImage && (
                <div>
                    <img
                        src={urlFor(authorImage).width(300).url()}
                        alt={`${name}'s picture`}
                    />
                </div>
            )}

            <div className={styles.pText}>
                <PortableText value={body} components={ptComponents} />
            </div>

            <br />

            <Link style={{ color: 'tomato' }} href='/'>Home</Link>
        </article>
    );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
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
