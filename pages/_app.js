import 'tailwindcss/tailwind.css'
import '../styles/style2.css'
import Head from "next/head";
// import '../styles/normalize.css'
// import '../styles/webflow.css'
function MyApp({ Component, pageProps }) {
  
  return (
    <>
    <Head>
    <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png"/>
    <meta property="og:title" content="RGB Punks" key="ogtitle" />
		<meta property="og:description" content="Most colorful punks for your PFP" key="ogdesc" />
		<meta property="og:type" content="website" key="ogtype" />
		<meta property="og:url" content="https://rgbpunks.io/" key="ogurl"/>
		<meta property="og:image" content="https://rgbpunks.io/images/600x400.jpg" key="ogimage"/>
		<meta property="og:site_name" content="rgbpunks" key="ogsitename" />

		<meta name="twitter:card" content="summary_large_image" key="twcard"/>
		<meta property="twitter:domain" content="https://rgbpunks.io" key="twdomain" />
		<meta property="twitter:url" content="https://rgbpunks.io/" key="twurl" />
		<meta name="twitter:title" content="RGB Punks" key="twtitle" />
		<meta name="twitter:description" content="Most colorful punks for your PFP" key="twdesc" />
		<meta name="twitter:image" content="https://rgbpunks.io/images/600x400.jpg" key="twimage" />
   </Head>

  <Component {...pageProps} />
  </>
  );
}

export default MyApp
