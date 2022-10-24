import React from "react";
import DateCmp from "./date";
import {HiSearchCircle} from "react-icons/hi"
import { useState } from "react";
const AsteroidControl = ({setAsteroidRequestState,setLoading,setStartDate,setEndDate}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [sDate, eDate] = dateRange;
  const formatDate = (date) => {
    let d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };
  const handleAsteroidRequest=(e)=>{
        e.preventDefault()
        let startDate=formatDate(sDate);
        let endDate=formatDate(eDate)
        setStartDate(startDate)
        setEndDate(endDate)
        setAsteroidRequestState(true);
        
  }
  return (
    
    <div className="asteroid_ctrl">
      <DateCmp
        setDateRange={setDateRange}
        startDate={sDate}
        endDate={eDate}
      />
      <button onClick={handleAsteroidRequest}><HiSearchCircle size={"25px"}/></button>
    </div>
    
  );
};
export default AsteroidControl;
