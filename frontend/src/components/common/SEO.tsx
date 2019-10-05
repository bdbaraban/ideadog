import React, { FC } from 'react';
import Head from 'next/head';

// SEO component prop types
interface SEOProps {
  title: string; // Head title
  description: string; // Head description
  url: string; // Head URL
}

/**
 * Dynamic head component for search engine optimazation
 */
const SEO: FC<SEOProps> = ({ title, description, url }: SEOProps) => {
  const titleTemplate = `${title} / IdeaDog`;

  return (
    <Head>
      <title>{titleTemplate}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={titleTemplate} />
      <meta
        property="og:image"
        content={`${process.env.IDEADOG_DOMAIN}/images/logo1024.png`}
      />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${process.env.IDEADOG_DOMAIN}${url}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={titleTemplate} />
      <meta name="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content={`${process.env.IDEADOG_DOMAIN}/images/logo1024.png`}
      />
    </Head>
  );
};

export default SEO;
