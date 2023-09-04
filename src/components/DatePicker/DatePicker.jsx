import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

import "./DatePicker.scss";
import "react-datepicker/dist/react-datepicker.css";

const DateTime = ({ dateValue, value }) => {
  const [startDate, setStartDate] = useState(value ? new Date(value) : new Date());

  useEffect(() => {
    dateValue(startDate);
  }, []);

  const handleChange = (date) => {
    setStartDate(date);
    dateValue(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      dateFormat='MMMM d, yyyy h:mm aa'
      isClearable={true}
      minDate={new Date()}
      showTimeInput
      timeInputLabel='Time:'
    />
  );
};

DateTime.propTypes = {
  dateValue: PropTypes.func,
  value: PropTypes.string
};

export default DateTime;
