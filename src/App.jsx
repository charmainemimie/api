import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
function App() {
  //Method 1 of fetching data from an API

  // fetch("https://catfact.ninja/fact") //returns a promise
  // .then((response) => response.json()) //convert to javascript object
  // .then(data=>{ //data is the returned object
  //   console.log(data); //2 objects because a component mounts,unmounts and mounts
  // })

  //Method 2 of fetching data from an API
  //api 1
  const [catFact, setCatFact] = useState("");

  const fetchCatFact = () => {
    Axios.get("https://catfact.ninja/fact").then((response) => {
      setCatFact(response.data.fact);
    }); //data is the returned object
  };
  useEffect(() => {
    fetchCatFact;
  }, []);

  //api 2
  const [name, setName] = useState("");
  const [predictedAge, setPredictedAge] = useState(null);
  const fetchPrediction = () => {
    Axios.get(`https://api.agify.io/?name=${name}`).then((response) => {
      setPredictedAge(response.data);
    }); //data is the returned object
  };
  useEffect(() => {
    fetchPrediction;
  }, []);

  // api 3 
  
  const [generatedExcuse,setGeneratedExcuse]=useState(null)
   
const fetchExcuse=(excuse) =>{
  Axios.get(`https://excuser-three.vercel.app/v1/excuse/${excuse} `)
  .then((response) => {
    setGeneratedExcuse(response.data[0].excuse)
   })
  }

  useEffect(() => {
      fetchExcuse
  },[]);

  return (
    <div className="App">
      {/* api 1 */}
      <div>
        {" "}
        <button
          onClick={fetchCatFact}
          className="border px-2 rounded-lg hover:bg-gray-100"
        >
          Generate Cat Fact
        </button>
        <p className="pb-8">{catFact}</p>
      </div>
      <hr />

      {/* api 2 */}
      <div>
        {" "}
        <div className="flex items-center justify-center gap-6 py-4">
          <div>
            <input
              type="text"
              placeholder="Name eg...Pedro"
              className="border py-2 px-2 rounded-lg"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>

          <div>
            <button
              onClick={fetchPrediction}
              className="border px-2 py-2 bg-gray-100 rounded-lg hover:bg-gray-100"
            >
              Predict Age
            </button>
          </div>
        </div>
        <h1>Name: {predictedAge?.name}</h1>{" "}
        {/* use ?. so that the project doesnt break if the oblect is null  */}
        <h1>Predicted age: {predictedAge?.age}</h1>
      </div>

      <hr />
      {/* api 3 */}
      <div className=" pt-4">
        {" "}
        <h1>Generate An Excuse</h1>
        <div className="flex items-center justify-center gap-6">
          {" "}
          <button onClick={()=>fetchExcuse('party')} className="border px-2 py-2 rounded-lg bg-gray-100">Party</button>
          <button onClick={()=>fetchExcuse('party')} className="border px-2 py-2 rounded-lg bg-gray-100">Family</button>
          <button onClick={()=>fetchExcuse('party')}  className="border px-2 py-2 rounded-lg bg-gray-100">Office</button>
        </div>

        <h1>   {generatedExcuse}</h1>
      </div>
    </div>
  );
}

export default App;
