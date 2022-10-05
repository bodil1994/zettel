import { Controller } from "@hotwired/stimulus"
import $ from 'jquery'

// Connects to data-controller="tagging"
export default class extends Controller {
  connect() {
   console.log("test")
   $
  }
}
