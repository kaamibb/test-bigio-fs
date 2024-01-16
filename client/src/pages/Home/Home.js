import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../services/posts";
import { Container, Grow } from "@material-ui/core";
import DataList from "../../components/DataList";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container style={{ width: "100%" }}>
        <DataList setCurrentId={setCurrentId} />
      </Container>
    </Grow>
  );
};
export default Home;
