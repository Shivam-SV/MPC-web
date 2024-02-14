import { useState } from "react";
import { WebMidi } from "webmidi";
import MPC from "./MPC";
import NoConnection from "./NoConnection";
function App() {
  const [outputs, setOutputs] = useState([]);
  WebMidi.enable().then(function(){
    setOutputs(WebMidi?.outputs[0] || []);
  });
  if(outputs.length == 0){
    return <NoConnection />
  }else{
    return <MPC outputs={outputs} midi={WebMidi} />
  }
}

export default App
