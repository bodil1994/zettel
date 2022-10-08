import * as d3Base from "d3"
import { indentedTree } from "./indentedTree"

const d3 = Object.assign(d3Base, { indentedTree })
window.d3 = d3
