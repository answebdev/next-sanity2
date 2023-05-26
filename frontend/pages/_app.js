// To NOT show layout on Error Page (i.e., do not show navbar, footer):
// Source: https://github.com/vercel/next.js/discussions/37311

import { useRouter } from "next/router";
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname === '/404') return <Component {...pageProps} />;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

// Regular:
// import Layout from '../components/Layout';
// import '../styles/globals.css';

// function MyApp({ Component, pageProps }) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }

// export default MyApp;
