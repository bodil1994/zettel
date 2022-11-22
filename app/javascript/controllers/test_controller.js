import { Controller } from "@hotwired/stimulus"


// Connects to data-controller="test"
export default class extends Controller {
  connect() {
    console.log("hello")
    this.createTree()
  }

  createTree() {
    console.log("createTree")
    fetch("/tree_data")
    .then(response => response.json())
    .then((data) => {
      // do something with the json
      const dataSpec = {source: data, key: "title"}
      console.log(dataSpec)
      const myChart = d3.indentedTree(dataSpec);
      showChart(myChart);
      function showChart(_chart) {
        d3.select(".indented-tree")
          .append("div")
          .attr("class", "chart")
          .call(_chart);
      }
    })
  }
// These were just for fun testing to draw circles
  circles() {
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
