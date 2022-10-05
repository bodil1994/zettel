import { Controller } from "@hotwired/stimulus"
import * as d3 from "d3"
// Connects to data-controller="test"
export default class extends Controller {
  connect() {
    console.log("hello")
    d3.select("body").append("svg").attr("width", 50).attr("height", 50).append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple");
  }
}
