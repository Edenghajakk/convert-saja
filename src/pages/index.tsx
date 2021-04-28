import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState, useRef, Fragment } from "react"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Listbox, Transition } from "@headlessui/react"
import { useCopyToClipboard } from "../util/useCopyToClipboard"
import {
  CheckIcon,
  SelectorIcon,
  ClipboardCopyIcon,
  MenuAlt4Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid"

const people = [
  {
    id: 1,
    name: "Padding",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Margin",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const IndexPage: React.FC = () => {
  const [unit, setUnit] = useState<"px" | "rem">("px")
  const [value, setValue] = useState<number>(0)
  const [calculatedValue, setCalculatedValue] = useState<number>(0)
  const [selected, setSelected] = useState(people[0])
  const [twClass, setTwClass] = useState<string | "">("")
  const [copied, copy] = useCopyToClipboard(twClass)
  const inputEl = useRef()

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

  useEffect(() => {
    let result: string
    if (value === 0) result = ""
    else result = "py-2" // @ts-ignore
    inputEl.current.value = result // @ts-ignore
    setTwClass(inputEl.current.value)
  }, [value])

  const { fluid } = data.placeholderImage.childImageSharp
  const { title } = data.site.siteMetadata

  const toggleUnit = () => {
    setUnit(unit === "px" ? "rem" : "px")
  }

  const handleValue = (e: any) => {
    console.log(typeof e.target.value)

    const val = parseInt(e.target.value)
    setValue(val)
  }

  const copyToClipboard = () => {
    // @ts-ignore
    copy()
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
                  <div className="block md:flex justify-evenly mt-2">
                    <div className="text-center font-base text-black my-auto">
                      Convert from{" "}
                      <strong>{unit === "px" ? "Pixel" : "Rem"}</strong> to{" "}
                      <strong>{unit === "px" ? "Rem" : "Pixel"}</strong>
                    </div>
                  </div>
                  <form className="mt-8">
                    <div className="mx-auto max-w-lg flex justify-center ">
                      <div className="mx-4">
                        <span className="px-1 text-sm text-gray-600">
                          {unit === "px" ? "Pixel" : "Rem"}
                        </span>
                        <input
                          value={value}
                          onChange={handleValue}
                          placeholder="Number"
                          type="number"
                          className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        />
                      </div>
                      <div className="bg-light-green rounded-lg border-2 m-auto">
                        {unit === "px" ? (
                          <ChevronRightIcon
                            className="h-auto w-10 text-gray-400 cursor-pointer"
                            aria-hidden="true"
                            onClick={toggleUnit}
                          />
                        ) : (
                          <ChevronLeftIcon
                            className="h-auto w-10 text-gray-400 cursor-pointer"
                            aria-hidden="true"
                            onClick={toggleUnit}
                          />
                        )}
                      </div>
                      {/* <MenuAlt4Icon
                        className="h-auto w-10 text-gray-400 cursor-pointer"
                        aria-hidden="true"
                        onClick={toggleUnit}
                      /> */}
                      <div className="mx-4">
                        <span className="px-1 text-sm text-gray-600">
                          {unit === "px" ? "Rem" : "Pixel"}
                        </span>
                        <input
                          value={calculatedValue}
                          disabled
                          type="number"
                          className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="mx-4 mt-2">
                      <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                            <Listbox.Label className="block text-sm font-medium text-gray-700">
                              Assigned to
                            </Listbox.Label>
                            <div className="mt-1 relative">
                              <Listbox.Button className="relative w-full bg-white border-2 border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none  focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span className="flex items-center">
                                  <img
                                    src={selected.avatar}
                                    alt=""
                                    className="flex-shrink-0 h-6 w-6 rounded-full"
                                  />
                                  <span className="ml-3 block truncate">
                                    {selected.name}
                                  </span>
                                </span>
                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                  <SelectorIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options
                                  static
                                  className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                >
                                  {people.map(person => (
                                    <Listbox.Option
                                      key={person.id}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "text-black bg-indigo-600"
                                            : "text-gray-900",
                                          "cursor-pointer select-none relative py-2 pl-3 pr-9"
                                        )
                                      }
                                      value={person}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <div className="flex items-center">
                                            <img
                                              src={person.avatar}
                                              alt=""
                                              className="flex-shrink-0 h-6 w-6 rounded-full"
                                            />
                                            <span
                                              className={classNames(
                                                selected
                                                  ? "font-semibold"
                                                  : "font-normal",
                                                "ml-3 block truncate"
                                              )}
                                            >
                                              {person.name}
                                            </span>
                                          </div>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? "text-black"
                                                  : "text-indigo-600",
                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                              )}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                  </form>
                  <div className="m-4 text-center">
                    <div className="font-bold text-xl mb-4">Results:</div>
                    <div className="flex justify-between p-2 border border-solid border-main bg-light-green rounded-lg">
                      <input
                        type="text"
                        value={twClass}
                        className="font-bold text-3xl w-5/6 bg-light-green italic text-center"
                        disabled
                        ref={inputEl}
                      />
                      <ClipboardCopyIcon
                        className={`h-5 w-1/6 text-gray-400 my-auto cursor-pointer ${
                          value ? "block" : "hidden"
                        }`}
                        aria-hidden="true"
                        onClick={copyToClipboard}
                      />
                      <p className="my-auto italic text-xs">
                        {copied && "Copied!"}
                      </p>
                    </div>
                  </div>
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
