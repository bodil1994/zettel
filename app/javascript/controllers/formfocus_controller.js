import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="formfocus"
export default class extends Controller {

  connect () {
    console.log('Connected');
    this.next();
  }


  next () {

    let inputs = this.element.querySelectorAll('[id^="note"],[id*=" note"]');
    console.log(inputs[1]);

    for (let i = 0; i < inputs.length; i++) {
      // next add function to change focus
      console.log(inputs[i]);
      let input = inputs[i];
      const enter = function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          console.log("enter pressed")
        } else {
          event.keyCode
        }
      }
      input.addEventListener('keyup', enter, false)
      input.addEventListener('keypress', enter, false)
      input.addEventListener('keydown', enter, false)
    }
  }

    // let inputKeyup = (event.target.parentElement.querySelector('input') !== null)
    // console.log(inputKeyup)
    // let textareaKeyup = (event.target.parentElement.querySelector('textarea') !== null)
    // console.log(textareaKeyup)
    // // is next
    // let relevantKeyup = (textareaKeyup || inputKeyup)
    // // // for value if null: let b = a ?? "test"; ?? means is nullish
    //  console.log(relevantKeyup)

    // if (relevantKeyup && event === 13 ) {


    // }
}
