import React from "react";
import DateCmp from "./date";
import {HiSearchCircle} from "react-icons/hi"
import { useState } from "react";
const AsteriodControl = ({getAsteroids}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [sDate, eDate] = dateRange;
  const formatDate = (date) => {
    let d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };
  const handleAsteriodRequest=(e)=>{
        e.preventDefault()
        let startDate=formatDate(sDate);
        let endDate=formatDate(eDate)
    
        getAsteroids(startDate,endDate)
  }
  return (
    <div className="asteriod_ctrl">
      <DateCmp
        setDateRange={setDateRange}
        startDate={sDate}
        endDate={eDate}
      />
      <button onClick={handleAsteriodRequest}><HiSearchCircle size={"25px"}/></button>
    </div>
  );
};
export default AsteriodControl;
