import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DatePicker.scss';

const DateTime = ({dateValue}) => {
    const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    dateValue(startDate);
  }, []);

  const handleChange = (date) => {
    setStartDate(date);
    dateValue(date);
  };

  return (
      <DatePicker selected={startDate} onChange={handleChange} showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" isClearable={true} />
  );
};

export default DateTime;
