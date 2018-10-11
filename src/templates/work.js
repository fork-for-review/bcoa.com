import React, {Component} from "react";
import Link from "gatsby-link";
import Img from 'gatsby-image';
import ProjectFilter from '../components/ProjectFilter';
import SEO from "../components/SEO";

export default class Work extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: 'all'
    }
  }

  filterProjects(project) {
    if(this.state.filterValue === 'all') {return true;}
    return project.frontmatter.type === this.state.filterValue;
  }

  renderFilterTransition = (filterValue) => {
    this.setState({inTransition: true});
    setTimeout(() => this.setState({filterValue: filterValue}), 250);
    setTimeout(() => this.setState({ inTransition: false }), 500);
  }

  render() {
    const page = this.props.data.page.frontmatter;
    const projects = this.props.data.projects.edges;
    const projectOrder = page.projects;
    // creates user defined order of projects from page frontmatter
    const orderedProjects = projectOrder.map((title) => {
      return projects.find(({node: project}) => {
        return project.frontmatter.title === title.project
      })
    }).filter(({node: project}) => project.frontmatter.isPublished)

    return (
      <div className="container
                      marginBottom-11
                      bp-1_marginBottom-3
                      bp-2_marginBottom-9"
      >
        <SEO
          postImage={page.seo.image && page.seo.image.childImageSharp.sizes.src}
          postData={page}
        />
        <div className="flex
                        justifySpaceBetween
                        marginTop-7 marginBottom-6
                        bp-1_marginTop-10
                        bp-2_marginTop-17 bp-2_marginBottom-12"
        >
          <h1 className="f-page-title">
            { page.title }
          </h1>
          <ProjectFilter isWindowLarge={ this.props.isWindowLarge } onChange={(val) => this.renderFilterTransition(val)}/>
        </div>
        <ul className={`${this.state.inTransition ? 'inTransition' : '' } bp-1_grid-3col bp-2_grid-4col`}>
          { projects &&
            orderedProjects.filter(({ node: project }) => this.filterProjects(project)).map(({ node: project }, i) => {
              return (
                <li key={i}>
                  <article className="workProject">
                    <Link to={ project.fields.slug }>
                      {project.frontmatter.previewImage.image && 
                        <Img
                          sizes={ project.frontmatter.previewImage.image.childImageSharp.sizes }
                          className="marginBottom-3"
                          alt={project.frontmatter.previewImage.alt}
                        />
                      }
                      <h1 className="f-subhead">{ project.frontmatter.title }</h1>
                      <h2 className=" f-subhead
                                      marginBottom-9
                                      bp-2_marginBottom-21"
                      >
                      </h2>
                    </Link>
                  </article>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
    
};

export const query = graphql`
  query WorkQuery($slug: String!) {
    projects: allMarkdownRemark(
      filter: {
        frontmatter: { 
        	templateKey: { regex: "/project-page/" },
          isPublished: {eq: true}
      	} 
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            isPublished
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
            workDescription
            type
            previewImage {
              image {
                childImageSharp {
                  sizes(maxWidth: 768, quality: 80) {
                    ...GatsbyImageSharpSizes_withWebp
                  }
                }
              }
              alt
            }
          }
          fields {
            slug
          }
        }
      }
    }
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
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
        projects {
          project
        }
      }
    }
  }
`;
