import cssText from "data-text:~/style.css"
import { useEffect, useState } from "react"

import type { WikiMessage, WikiTldr } from "~background"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function IndexPopup() {
  const [dictionary, setDictionary] = useState("WORD")
  const [definition,setDefinition]= useState("definition")
  const [phonetics,setPhonetics]= useState("phonetics")
  const [pos,setPos]=useState("partofspeech")
  useEffect(() => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${dictionary}`)
      .then(response => response.json())
       .then(data => {
        // Parse the data and update the state with the definition
        const firstDefinition = data[0].meanings[0].partOfSpeech;
        console.log(firstDefinition+"first");
        setPos(firstDefinition);
        const def = data[0].meanings[0].definitions[0].definition;
        const phon= data[0].phonetic;
        console.log("phon"+phon);
        console.log(def+"def");
        setDefinition(def);
        setPhonetics(phon);
      console.log(data)})
      .catch(error => console.log(error));
  });
  useEffect(() => {
    chrome.runtime.onMessage.addListener(function ({
      type,
      text
    }: WikiMessage) {
      setDictionary(text)
      return true
    })
  } )

  return (
    <div
    className="body1"
   >
    <div className="header">
      
      <h1>Simplify</h1>
      <h2>A tool to simplify your space</h2>
    </div>
    <div className="dict">
      <h2 className="dictname">{dictionary}</h2>
      <h2 className="phon">{phonetics}</h2>
      <h2 className="pos">{pos}</h2>
      
      <p>{definition}</p>
    </div>
    <div className="dict">
      <h3>Dictionary</h3>
    </div>
</div>
  )
}

export default IndexPopup
