import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import './DatePicker.scss';
import "react-datepicker/dist/react-datepicker.css";

const DateTime = (props) => {
  const { dateValue, value, ...rest } = props;
    const [startDate, setStartDate] = useState(value ? new Date(value) : new Date());

  useEffect(() => {
    dateValue(startDate);
  }, []);

  const handleChange = (date) => {
    setStartDate(date);
    dateValue(date);
  };

  return (
      <DatePicker selected={startDate} onChange={handleChange} showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" isClearable={true} minDate={new Date()}
      timeIntervals={5}
      />
  );
};

export default DateTime;