import { Link } from "gatsby"
import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  siteTitle: string
}

const Header: React.FC<Props> = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "convert.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <header className="bg-main sticky top-0">
      <div className="mx-auto my-0 p-4 max-w-5xl">
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <div className="flex justify-start">
              <Img
                className="h-8 w-8"
                fluid={data.placeholderImage.childImageSharp.fluid}
              />
              <div className="mx-4 my-auto font-black">{siteTitle}</div>
            </div>
          </Link>
        </h1>
      </div>
    </header>
  )
}

export default Header
