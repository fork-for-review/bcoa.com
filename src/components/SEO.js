import path from 'path';
import React from 'react';
import Helmet from 'react-helmet';
import * as settings from '../_data/settings/settings.json';
import * as contact from '../_data/contact/contact.json';
// favicons
import faviconApple from '../favicon/apple-touch-icon.png';
import favicon32 from '../favicon/favicon-32x32.png';
import favicon16 from '../favicon/favicon-16x16.png';
// import manifest from '../favicon/site.webmanifest';
import safariPinned from '../favicon/safari-pinned-tab.svg';
import faviconICO from '../favicon/favicon.ico';
// import browserConfig from '../favicon/browserconfig.xml';

const getSchemaOrgJSONLD = ({
  url,
  title
}) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: settings.title,
    },
  ];

  return schemaOrgJSONLD;
};

const SEO = ({ postData, postImage }) => {
  const postMeta = postData || {};
  const title = postMeta.seo && postMeta.seo.title || settings.siteTitle;
  const description =
    postMeta.seo && postMeta.seo.description || settings.siteDescription;
  const image = postImage && `${settings.url}${postImage}` || settings.siteImage;
  const url = postMeta.slug
    ? `${settings.url}${postMeta.slug}`
    : settings.url;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    url,
    title
  });

  return (
    <Helmet>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="company" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="830" />
      <meta property="og:image:height" content="830" />
      <meta property="fb:app_id" content={305434379998344} />


      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={contact.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicon tags */}
      <link rel="apple-touch-icon" sizes="180x180" href={faviconApple} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
      <link rel="manifest" href="../favicon/site.webmanifest" />
      <link rel="mask-icon" href={safariPinned} color="#5bbad5" />
      <link rel="shortcut icon" href={faviconICO} />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  );
};

SEO.defaultProps = {
  postImage: null,
};

export default SEO;