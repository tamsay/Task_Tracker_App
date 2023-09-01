import React from "react";

const TaskList = ({data}) => {
  console.log(data, 'data')
  return <p style={{color: "black"}}>{data?.description}</p>;
};

export default TaskList;
