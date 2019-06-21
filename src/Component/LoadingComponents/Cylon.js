import React from "react";
import ReactLoading from "react-loading";
import { Section, Article, Prop } from "./generic";


const Cylon = () => (
  <Section>
      <Article key={"cylon"}>
        <ReactLoading type={"cylon"} color="#fff" />
        <Prop>{"Cargando"}</Prop>
      </Article>
  </Section>
);

export default Cylon;
