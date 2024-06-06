import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarCharts from "./BarCharts";
import AreaCharts from "./AreaCharts";

function ChartsContainer({ data }) {
  const [chart, setChart] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setChart(!chart)}>
        {chart ? "Area Chart" : "Bar Chart"}
      </button>
      {chart ? <AreaCharts data={data} /> : <BarCharts data={data} />}
    </Wrapper>
  );
}

export default ChartsContainer;
