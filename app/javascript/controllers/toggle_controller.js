import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toggle"
export default class extends Controller {
  connect() {
    console.log("toggle controller connected")
  }

  showTree() {
    console.log("showTree started")
    const frame = document.getElementById('notes');
    console.log(frame)
    frame.src = "/test"
    frame.reload();
    console.log("frame reloaded")
  }

  showNotes() {
    console.log("showNotes started")
    const frame = document.getElementById('notes');
    console.log(frame)
    frame.src = "/"
    frame.reload();
    console.log("frame reloaded")
  }
}
