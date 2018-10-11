const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

const { fmImagesToRelative } = require('gatsby-remark-relative-images');


exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  fmImagesToRelative(node);
  const { createNodeField } = boundActionCreators;
  
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: "pages" });
    createNodeField({
      node,
      name: "slug",
      value: slug
    });
  }
};
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                templateKey
              }
            }
          }
        }
      }
    `).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          if (node.frontmatter.templateKey === "about-page") {
            createPage({
              path: node.fields.slug,
              component: path.resolve("./src/templates/about.js"),
              context: {
                // Data passed to context is available in page queries as GraphQL variables.
                slug: node.fields.slug
              }
            });
          } else if (node.frontmatter.templateKey === "work-page") {
            createPage({
              path: node.fields.slug,
              component: path.resolve("./src/templates/work.js"),
              context: {
                // Data passed to context is available in page queries as GraphQL variables.
                slug: node.fields.slug
              }
            });
          } else if (node.frontmatter.templateKey === "news-page") {
            createPage({
              path: node.fields.slug,
              component: path.resolve("./src/templates/news.js"),
              context: {
                // Data passed to context is available in page queries as GraphQL variables.
                slug: node.fields.slug
              }
            });
          } else if (node.frontmatter.templateKey === "contact-page") {
            createPage({
              path: node.fields.slug,
              component: path.resolve("./src/templates/contact.js"),
              context: {
                // Data passed to context is available in page queries as GraphQL variables.
                slug: node.fields.slug
              }
            });
          } else if (node.frontmatter.templateKey === "project-page") {
            createPage({
              path: node.fields.slug,
              component: path.resolve("./src/templates/project.js"),
              context: {
                // Data passed to context is available in page queries as GraphQL variables.
                slug: node.fields.slug
              }
            });
          } else if (node.frontmatter.templateKey === "featured-page") {
            createPage({
              path: node.fields.slug,
              component: path.resolve("./src/templates/index.js"),
              context: {
                // Data passed to context is available in page queries as GraphQL variables.
                slug: node.fields.slug
              }
            });
          }
        });
        resolve();
      });
  });
};
