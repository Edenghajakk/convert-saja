import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage: React.FC = () => {
  const [unit, setUnit] = useState<"px" | "rem">("px")
  const [value, setValue] = useState<number>(0)
  const [calculatedValue, setCalculatedValue] = useState<number>(0)

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      placeholderImage: file(relativePath: { eq: "convert.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  useEffect(() => {
    if (unit === "px") {
      setCalculatedValue(value / 16)
    } else {
      setCalculatedValue(value * 16)
    }
  }, [value, unit])

  const { fluid } = data.placeholderImage.childImageSharp
  const { title } = data.site.siteMetadata

  const toggleUnit = () => {
    setUnit(unit === "px" ? "rem" : "px")
  }

  const handleValue = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div className="container mx-auto">
        <div className="container max-w-full mx-auto md:py-24 px-6">
          <div className="max-w-sm mx-auto px-6">
            <div className="relative flex flex-wrap">
              <div className="w-full relative">
                <div className="md:mt-6">
                  <Img className="h-12 w-12 mx-auto my-4" fluid={fluid} />
                  <div className="text-center font-semibold text-black">
                    {title || `Title`}
                  </div>
                  <div className="block md:flex justify-evenly">
                    <div className="text-center font-base text-black my-auto">
                      Convert from{" "}
                      <strong>{unit === "px" ? "Pixel" : "Rem"}</strong> to{" "}
                      <strong>{unit === "px" ? "Rem" : "Pixel"}</strong>
                    </div>
                    <div
                      className="flex h-10 rounded-lg m-4 md:mx-4 bg-light-green border-2 cursor-pointer hover:shadow-lg"
                      onClick={toggleUnit}
                    >
                      <div className="m-auto px-4">Change</div>
                    </div>
                  </div>

                  <form className="mt-8">
                    <div className="mx-auto max-w-lg flex justify-center ">
                      <div className="py-1 mx-4">
                        <span className="px-1 text-sm text-gray-600">
                          {unit === "px" ? "Pixel" : "Rem"}
                        </span>
                        <input
                          value={value}
                          onChange={handleValue}
                          placeholder="Number"
                          type="text"
                          className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        />
                      </div>
                      <div className="py-1 mx-4">
                        <span className="px-1 text-sm text-gray-600">
                          {unit === "px" ? "Rem" : "Pixel"}
                        </span>
                        <input
                          value={calculatedValue}
                          disabled
                          // placeholder="Number"
                          type="text"
                          className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
