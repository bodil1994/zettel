import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toggle"
export default class extends Controller {
  static targets = [ "searchBar", "magnifier", "newNoteFrame"]

  connect() {
    console.log("toggle controller connected")
  }

  showTree() {
    console.log("showTree started")
    const frame = document.getElementById('notes');
    console.log(frame);
    frame.src = "/test";
    frame.reload();
    console.log("frame reloaded");

    console.log("TEEEEEESSSTTT")
    this.searchBarTarget.classList.add("d-none")
    // console.log(this.searchBarTarget.classList.add("d-none"))
  }

  showNotes() {
    console.log("showNotes started")
    const frame = document.getElementById('notes');
    console.log(frame)
    frame.src = "/"
    frame.reload();
    console.log("frame reloaded")
    this.magnifierTarget.setAttribute('height', '20')
    this.searchBarTarget.classList.remove("d-none")
  }

  showNewNote() {
    console.log("showNewNotes started")
    this.newNoteFrameTarget.src="/notes/new"
    // console.log(this.newNoteFrameTarget.src)
  }
}
