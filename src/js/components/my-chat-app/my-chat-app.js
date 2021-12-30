/**
 * The memory game script file of the application.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
   <style>
     .container {
       margin: auto;
       padding: 10px;
       max-width: 400px;
       height: 600px;
       font-size: 1em;
       background-color: orange;
       color: #fff;
     }

     .chat-content {
       display: block;
       clear: both;
       background-color: #fff;
       height: 600px;
     }

     .input-section {
      display: block;
      clear: both;
      background-color: red;
     }

     #text-field {
       width: 300px;
       height: 40px;
     }

     .button-send {
       cursor: pointer;
       padding: 13px 20px;
     }

   </style>

   <div class="container">
     <div class="chat-content"><div>
     <div class="input-section">
       <input type="text" id="text-field" value="Här kommer lite text som ska skickas." required></input>
       <button class="button-send">Send</button>
     </div>
   </div>
 `

/**
 * Define custom element.
 */
customElements.define('my-chat-app',
/**
 *
 */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.memoryForm = this.shadowRoot.querySelector('#memory-form')
    }

    fillMemoryBoard () {

    }
  }
)
