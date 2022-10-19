import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DateCmp = ({ setDateRange,startDate,endDate }) => {
    

  return (
    <DatePicker
    dateFormat={'yyyy-MM-dd'}
    selectsRange={true}
    startDate={startDate}
    endDate={endDate}
    onChange={(update) => {
      setDateRange(update);
    }}
    withPortal
    closeOnScroll={true}
    placeholderText={"Input Date Range"}
  />
  
  );
};

export default DateCmp;
