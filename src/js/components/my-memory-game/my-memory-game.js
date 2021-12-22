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
       max-width: 600px;
       height: 450px;
       font-size: 1em;
       background-color: #222;
       color: #fff;
     }

   </style>
   <div class="container">
     <form id="memory-form">
    </form>
   </div>
 `

/**
 * Define custom element.
 */
 customElements.define('my-memory-game',
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

      this.fillMemoryBoard()
    }

    fillMemoryBoard () {
      for (let i = 0; i < 8; i++) {
        const card = document.createElement('my-memory-game-flipping-card')
        const memoryForm = this.shadowRoot.querySelector('#memory-form')
        memoryForm.appendChild(card)
      }
    }
  }
)
