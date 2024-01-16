import React from "react";
import { useNavigate } from "react-router";
import DetailData from "../../components/DetailData";

const DetailPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <DetailData navigate={navigate} />
    </div>
  );
};

export default DetailPage;
