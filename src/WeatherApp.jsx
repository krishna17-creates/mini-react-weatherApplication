import { useStepContext } from "@mui/material/Step"
import SearchBox from "./SearchBox"
import Infobox from "./infoBox"
import { useState } from "react"

export default function WeatherApp(){
    const [Report,setReport] = useState({
    city: "Mumbai",
    temperature: "24",
    tempMin: "18",
    tempMax: "30",
    humidity: "23",
    feelslike: "26",
    country: "IN",
    description: "broken clouds",
    })

    function updatededReport(result){
        setReport(result);
    }

    return(
        <div style={{textAlign:"center"}}>
        <SearchBox updatededReport={updatededReport}/>
        <Infobox info={Report} />
        </div>
    )
}