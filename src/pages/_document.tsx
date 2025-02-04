// src/pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add the link to the Google Fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600&display=swap"
            rel="stylesheet"
          />
          {/* Import Signature font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap"
            rel="stylesheet"
          />
          {/* Import Black Mango font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Black+Mango&display=swap"
            rel="stylesheet"
          />
          {/* Import JS Synjai font */}
          <link
            href="https://fonts.googleapis.com/css2?family=JS+Synjai&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
