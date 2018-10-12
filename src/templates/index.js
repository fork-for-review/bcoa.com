import React, {Component} from "react";
import Link from "gatsby-link";
import Img from 'gatsby-image';
import Masonry from 'react-masonry-component';
import smoothscroll from 'smoothscroll-polyfill';
import Slider from '../components/Slider';
import SEO from "../components/SEO";

const FeaturedProjectImage = ({ image, className }) => {
  return (
    <Img
      sizes={ image }
      outerWrapperClassName={className}
    />
  )
}

const renderFeaturedProjects = (featuredProjects, projects) => {
  const featured = featuredProjects.map((title) => {
    return projects.find(({node: project}) => {
      return project.frontmatter.title === title.project
    })
  })
  return (
    featured.map(({node: project}, i) => {
      return (
        <li className='bp-1_masonry-child-2col' key={i}>
        <article className="featuredProject">
          <Link to={ project.fields.slug }>
          { project.frontmatter.featured.featuredImage.isPortrait ?
            <div className="nestedGrid-6-2">
              <div className="colSpan-1"></div>
              {project.frontmatter.featured.featuredImage.image && 
                <FeaturedProjectImage 
                  className="colSpan-4 marginBottom-5 bp-2_marginBottom-6" 
                  image={ project.frontmatter.featured.featuredImage.image.childImageSharp.sizes }
                  alt={project.frontmatter.featured.featuredImage.alt}
                />
              }
            </div>
          :
            project.frontmatter.featured.featuredImage.image && 
              <FeaturedProjectImage 
                className="marginBottom-5 bp-2_marginBottom-6"
                image={ project.frontmatter.featured.featuredImage.image.childImageSharp.sizes }
                alt={project.frontmatter.featured.featuredImage.alt} 
              />
          }
            <div className="featured-info">
              <h1 className=" f-headline-d
                              marginBottom-5
                              bp-2_marginBottom-10">
                { project.frontmatter.headline }&nbsp;&#8212;
              </h1>
              <div className="f-subhead
                              marginBottom-12
                              bp-1_marginBottom-14
                              bp-2_marginBottom-30"
                              >
                <p>{project.frontmatter.featured.featuredDescription}</p>
                <p className="underline">Read More</p>
              </div>
            </div>
          </Link>
        </article>
      </li>
    )})
  )
}

export default class Index extends Component {

  scrollToFeatured() {
    setTimeout(() => {
      this.content.scrollIntoView({ behavior: "smooth", block: "start", inline: 'nearest'});
    }, 100);
  }

  componentDidMount() {
    smoothscroll.polyfill();
    if (this.props.location.hash === "#featured") this.scrollToFeatured();
  }
  
  componentWillUpdate(nextProps) {
    if ((this.props.location.hash !== nextProps.location.hash) && nextProps.location.hash === "#featured") {
      this.scrollToFeatured();
    }
  }
  
  render() {
    const projects = this.props.data.projects.edges;
    const seo = this.props.data.page.frontmatter.seo;
    
    return (
      <div>
        <SEO
          postImage={seo.image && seo.image.childImageSharp.sizes.src}
          postData={this.props.data.page.frontmatter}
          />
        <Slider 
          className="hero" 
          slides={ this.props.data.page.frontmatter.carouselImages } 
          />
        <div ref={(el) => { if (el) { this.content = el } }} className="container overflow--hidden">
          <h2 className=" f-page-title
                          marginTop-8 marginBottom-7
                          bp-1_marginTop-10
                          bp-2_marginTop-17 bp-2_marginBottom-13">
            { this.props.data.page.frontmatter.title }
          </h2>
          {(this.props.isWindowLarge
            ?
              <Masonry
                className={'masonry'}
                elementType={'ul'}
                options={{ transitionDuration: 0 }}
              >
                { renderFeaturedProjects(this.props.data.page.frontmatter.featuredProjects,projects) }
              </Masonry>
            :
            renderFeaturedProjects(this.props.data.page.frontmatter.featuredProjects, projects)
          )}
        </div>
      </div>
    );
  }
};

export const query = graphql`
  query IndexQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
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
        title
        carouselImages {
          alt
          title
          subtitle
          project
          image {
            childImageSharp {
              sizes(maxWidth: 3400, quality: 80) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
          portraitImage {
            childImageSharp {
              sizes(maxWidth: 1500, quality: 80) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
        }
        featuredProjects {
          project
        }
      }
    }
    projects: allMarkdownRemark(
      filter: {
        frontmatter: { 
        	templateKey: { regex: "/project-page/" }
      	} 
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            templateKey
            title
            featured {
              isFeatured
              featuredImage {
                isPortrait
                image {
                  childImageSharp {
                    sizes(maxWidth: 1820, quality: 75) {
                      ...GatsbyImageSharpSizes_withWebp
                    }
                  }
                }
                alt
              }
              featuredDescription
            }
            headline
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
