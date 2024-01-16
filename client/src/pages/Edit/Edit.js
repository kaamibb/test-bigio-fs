import React from "react";
import { useNavigate } from "react-router";
import EditForm from "../../components/EditForm";

const EditPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <EditForm navigate={navigate} />
    </div>
  );
};

export default EditPage;
