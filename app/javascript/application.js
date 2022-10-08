// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "bootstrap"
import "trix"
import "@rails/actiontext"
import "./src/jquery"
import * as d3Base from "./src/d3"
import { indentedTree } from "./src/indentedTree"
import "./controllers"

const d3 = Object.assign(d3Base, { indentedTree })
