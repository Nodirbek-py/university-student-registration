import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

interface IParams {
  type: string;
}

const Students: React.FC = () => {
  const params: IParams = useParams();
  return <h1>Students List: {params.type}</h1>;
};

export default Students;
