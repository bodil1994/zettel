import { Controller } from "@hotwired/stimulus"
import * as d3 from "d3"
// Connects to data-controller="test"
export default class extends Controller {
  connect() {
    console.log("hello")
    const circleRadii = [40, 20, 10];
    const svgContainer = d3.select(".container")
      .append("svg")
      .attr("width", 200)
      .attr("height", 200);
    const circles = svgContainer.selectAll("circle")
      .data(circleRadii)
      .enter()
      .append("circle")
    const circAttributes = circles
      .attr("cx", 100)
      .attr("cy", 100)
      .attr("r", function (d) { return d; })
      .style("fill", function (d) {
        let color;
        if (d === 40) { color = "green";}
        else if (d === 20) { color = "purple";}
        else if (d === 20) { color = "purple";}
        return color;
      });

  }
}
