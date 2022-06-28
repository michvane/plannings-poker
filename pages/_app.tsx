import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Main from 'Layouts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Main>
      <Component {...pageProps} />
    </Main>
  );
}

export default MyApp;
