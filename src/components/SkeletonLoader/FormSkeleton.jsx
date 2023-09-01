import React from "react";
import ContentLoader from "react-content-loader";

const FormSkeleton = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={1200}
      height={150}
      viewBox='0 0 1200 150'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      {...props}
    >
      <rect x='25' y='15' rx='5' ry='5' width='172' height='8' />
      <rect x='22' y='45' rx='5' ry='5' width='171' height='7' />
      <rect x='219' y='15' rx='5' ry='5' width='180' height='8' />
      <rect x='220' y='44' rx='5' ry='5' width='185' height='8' />
      <rect x='415' y='14' rx='5' ry='5' width='180' height='8' />
      <rect x='414' y='44' rx='5' ry='5' width='185' height='8' />
      <rect x='22' y='78' rx='5' ry='5' width='171' height='7' />
      <rect x='220' y='77' rx='5' ry='5' width='185' height='8' />
      <rect x='414' y='77' rx='5' ry='5' width='185' height='8' />
    </ContentLoader>
  );
};

export default FormSkeleton;
