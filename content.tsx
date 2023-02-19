import cssText from "data-text:~/style.css"
import { useEffect, useState } from "react"
import logo from "data-base64:~assets/logologo.png"
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
  const [opai,setOpai]=useState("")



  
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
      generateText(text);
      return true
    })
  
  },[]);

  const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const key=process.env.OPENAI_API_KEY;
  const generateText = async (text) => {
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        prompt: `What is ${text} ?`,
        max_tokens: 50,
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    console.log(data);
    setOpai(data.choices[0].text);
  };

 






  return (
    <div
    className="body1"
   >
    <div className="header">
      <img src={logo} style={{ width: "27px", height: "30px" }}></img>
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
      <h3>GPT-ANSWERS</h3>
      <p> {}</p>
      <h2 className="opai">{opai}</h2>

    </div>
</div>
  )
}

export default IndexPopup
