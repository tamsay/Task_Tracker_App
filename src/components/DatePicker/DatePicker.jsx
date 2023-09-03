/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

import "./DatePicker.scss";
import "react-datepicker/dist/react-datepicker.css";

const DateTime = (props) => {
  // eslint-disable-next-line no-unused-vars
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
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      showTimeSelect
      dateFormat='MMMM d, yyyy h:mm aa'
      isClearable={true}
      minDate={new Date()}
      timeIntervals={5}
    />
  );
};

DateTime.propTypes = {
  dateValue: PropTypes.func,
  value: PropTypes.string
};

export default DateTime;
