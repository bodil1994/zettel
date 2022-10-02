import { Controller } from "@hotwired/stimulus";

export default class extends Controller {

  connect () {
    this.next();
  }

  next () {

    let inputs = this.element.querySelectorAll('[id^="note"],[id*=" note"]');

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      // lastinput not really needed as textelement default of enter is not submit
      let lastinput = (input === inputs[inputs.length - 1])

      const enter = function(event) {
        if (event.keyCode === 13 && !lastinput) {
          event.preventDefault();
          inputs[i+1].focus();
        }
      }
      input.addEventListener('keyup', enter, false)
      input.addEventListener('keypress', enter, false)
      input.addEventListener('keydown', enter, false)
    }
  }
}
