import React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="max-w-5xl mx-8 md:mx-auto my-8 sticky bottom-0 right-0 flex flex-row-reverse">
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.com">Gatsby</a>
    </footer>
  )
}

export default Footer
