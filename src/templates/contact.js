import React from "react";
import Image from "../components/Image";
import Img from 'gatsby-image';
import SEO from "../components/SEO";

export default ({ data }) => {
  const page       = data.page;
  const pageFields = page.frontmatter;
  const contact    = data.contact;
  return (
    <div className="container
                    marginBottom-15
                    bp-1_marginBottom-17">
      <SEO
        postImage={pageFields.seo.image ? pageFields.seo.image.childImageSharp.sizes.src : null}
        postData={pageFields}
      />
      <h1 className=" f-page-title
                      paddingTop-7 marginBottom-7
                      bp-1_paddingTop-11
                      bp-2_paddingTop-17 bp-2_marginBottom-12">
        { pageFields.title }
      </h1>
      {pageFields.heroImage.image && 
        <Img sizes={pageFields.heroImage.image.childImageSharp.sizes} alt={pageFields.heroImage.alt}/>
      }
      <div className="marginBottom-6
                      bp-1_marginBottom-8
                      bp-2_marginBottom-15"
          dangerouslySetInnerHTML={{ __html: page.html }} />
      <div className="f-display-copy
                      bp-1_grid-12col
                      bp-2_marginBottom-50">
        <p className="marginBottom-7
                      bp-1_colSpan-6
                      bp-2_offset-right-1">
          { pageFields.message }
        </p>
        <div className="bp-1_colSpan-6 bp-1_offset-left-1">
          <p>{ contact.address.street }</p>
          <p>{ contact.address.street2 }</p>
          <p>
            { contact.address.city }, { contact.address.state } { contact.address.zip }
          </p>
          <p>&#8212;</p>
          <a className="defaultLink" href={`mailto:${ contact.email }`}>{ contact.email }</a>
          <br/>
          <a className="defaultLink" href={`tel:${ contact.phone }`}>{ contact.phone }</a>
          <p>&#8212;</p>
          <a href="http://instagram.com/590bc" className="defaultLink">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  query ContactPageQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        seo {
          title
          description
          image {
            childImageSharp {
              sizes(maxWidth: 1200) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
        }
        message
        heroImage {
          image {
            childImageSharp {
              sizes(maxWidth: 3800, quality: 75) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
          alt
        }
      }
    }
    contact: contactJson {
      address {
        street
        street2
        city
        state
        zip
      }
      phone
      email
      instagram
    }
  }
`;
