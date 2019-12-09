import React from "react";
import ReactLoading from "react-loading";
import { Section, Article, Prop } from "./generic";


const Balls = () => (
  <Section>
      <Article key={"balls"}>
        <ReactLoading type={"balls"} color="#fff" />
        <Prop>{"Cargando"}</Prop>
      </Article>
  </Section>
);

export default Balls;
