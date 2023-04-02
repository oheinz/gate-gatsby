import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'


const DogRollTemplate = (props) => {
  
  const { edges: posts } = props.data.allMarkdownRemark;

  return (
    <div className="columns is-multiline">
      {posts &&
        posts.map(({ node: post }) => (
          <div className="is-parent column is-6" key={post.id}>
            <article
              className={`dog-list-item tile is-child box notification ${
                post.frontmatter.featuredpost ? 'is-featured' : ''
              }`}
            >
              <header>
                {post?.frontmatter?.featuredimage && (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        width:
                          post.frontmatter.featuredimage.childImageSharp
                            .gatsbyImageData.width,
                        height:
                          post.frontmatter.featuredimage.childImageSharp
                            .gatsbyImageData.height,
                      }}
                    />
                  </div>
                ) }
                <p className="post-meta">
                  <Link
                    className="title has-text-primary is-size-4"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
                  <span> &bull; </span>
                </p>
              </header>
              <p>
                {post.excerpt}
                <br />
                <br />
                <Link className="button" to={post.fields.slug}>
                  Continuați să citiți →
                </Link>
              </p>
            </article>
          </div>
        ))}
    </div>
  )
}

DogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default function DogRoll() {
  return (
    <StaticQuery
      query={graphql`
        query DogRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___title] }
            filter: { frontmatter: { templateKey: { eq: "dog-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  featuredpost
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: CONSTRAINED
                      )

                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <DogRollTemplate data={data} count={count} />}
    />
  );
}
