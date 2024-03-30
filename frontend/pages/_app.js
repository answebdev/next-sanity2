import Layout from '../components/Layout';
import { Source_Sans_Pro, Source_Serif_Pro } from 'next/font/google';
import '../styles/globals.css';
import '../styles/prism-material-dark.css';

const sans_pro = Source_Sans_Pro({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const serif_pro = Source_Serif_Pro({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <style jsx global>{`
      :root {
        --sans_pro-font: ${sans_pro.style.fontFamily};
        --serif_pro-font: ${serif_pro.style.fontFamily};
      }
    `}</style>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
