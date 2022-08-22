import Head from "next/head";

type SeoProps = {
  title: string
}

export default function Seo({ title }: SeoProps) {
  return (
    <Head>
      <title>{title} | Movies & TV</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="utf-8"></meta>
      <meta name="author" content="Jay"></meta>
    </Head>
  );
}
