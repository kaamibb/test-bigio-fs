import React from "react";
import { useNavigate } from "react-router";
import Form from "../../components/FormAdd";

const FormPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Form navigate={navigate} />
    </div>
  );
};

export default FormPage;
