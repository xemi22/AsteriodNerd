import React from "react";
import DateCmp from "./date";
import { HiSearchCircle } from "react-icons/hi";
import { useState } from "react";
const AsteroidControl = ({
  setAsteroidRequestState,
  setStartDate,
  setEndDate,
}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [error,setError]=useState("")
  const [sDate, eDate] = dateRange;
  const formatDate = (date) => {
    let d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };
  const handleAsteroidRequest = (e) => {
    e.preventDefault();
    if (eDate.getDate() - sDate.getDate()<= 6) {
      let startDate = formatDate(sDate);
      let endDate = formatDate(eDate);
      setError("")
      setStartDate(startDate);
      setEndDate(endDate);
      setAsteroidRequestState(true);
    }
    else {
      setError("Date must be set within 7 days");
    }
  };
  return (
    <div className="asteroid_ctrl">
      <DateCmp setDateRange={setDateRange} startDate={sDate} endDate={eDate} />
      <button onClick={handleAsteroidRequest}>
        <HiSearchCircle size={"25px"} />
      </button>
      {error ?(<div className="error">&nbsp;&nbsp;{error}</div>):null}
    </div>
  );
};
export default AsteroidControl;
