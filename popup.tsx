import { useState } from "react"

import "./popup.css"

import headingimg from "data-base64:~assets/abc.png"

function IndexPopup() {
  const [data, setData] = useState("")
  const [dictionary, setDictionary] = useState("Dictionary")
  const[phonetics, setPhonetics] = useState("Phonetics")
  const[para, setPara] = useState("Para")
  return (
    <div
      className="body"
      style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <div className="header">
        <img src={headingimg} style={{ width: "26px", height: "30px" }}></img>
        <h1>Simplify</h1>
        <h2>A tool to simplify your space</h2>
      </div>
      <div className="dict">
        <h2>{dictionary}</h2>
        <h3>{phonetics}</h3>
        <p>{para}</p>
      </div>
      <div className="dict">
        <h3>Dictionary</h3>
      </div>
    </div>
  )
}

export default IndexPopup
