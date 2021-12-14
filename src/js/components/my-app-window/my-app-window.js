/**
 * The desktop script file of the application.
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
     @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap');

     .my-app-window {
       display: block;
       /* background-color: #a8bfcb; */
       box-shadow: 0px 50px 50px rgba(0, 0, 0, 0.5);
       border-radius: 7px;
       width: 500px;
       height: 350px;
       margin: 0;
       padding: 0;
       font-size: 1em;
       color: #fff;
     }

     .window-top-bar {
       background-color: rgba(0, 0, 0, 0.5);
       -webkit-backdrop-filter: blur(50px);
       backdrop-filter: blur(50px);
       border-radius: 7px 7px 0 0;
       display: block;
       padding: 10px 0;
       width: 100%;
       font-size: 0.8em;
     }

     .window-content {
       background-color: #a8bfcb;
       width: 100%;
       height: 100%;
       border-radius: 0 0 7px 7px;
     }
   </style>

   <div class="my-app-window">
     <div class="window-top-bar">My application Window</div>
     <div class="window-content">Window content</div>
   </div>
 `

/**
 * Define custom element.
 */
customElements.define('my-app-window',
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

      // Bind event handlers of child elements.
      this._onSubmit = this._onSubmit.bind(this)
      this._formElement.addEventListener('submit', this._onSubmit)
    }

    /**
    * Attributes to monitor for changes.
    *
    * @returns {string[]} A string array of attributes to monitor.
    */
    static get observedAttributes () {
      return ['message']
    }

    /**
    * Called after the element is inserted into the DOM.
    */
    connectedCallback () {
      if (!this.hasAttribute('message')) {
        this.setAttribute('message', 'Prepare for the quiz"')
      }
      this._upgradeProperty('message')
    }

    /**
    * Called when observed attribute(s) changes.
    *
    * @param {string} name - The attribute's name.
    * @param {*} oldValue - The old value.
    * @param {*} newValue - The new value.
    */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'message') {
        this._messageBoard.textContent = newValue
      }
    }

    /**
    * Called after the element has been removed from the DOM.
    */
    disconnectedCallback () {
    }

    /**
    * Run the specified instance property
    * through the class setter.
    *
    * @param {string} prop - The property's name.
    */
    _upgradeProperty (prop) {
      if (Object.hasOwnProperty.call(this, prop)) {
        const value = this[prop]
        delete this[prop]
        this[prop] = value
      }
    }

    /**
    * Gets the message.
    *
    * @returns {string} The message value.
    */
    get message () {
      return this.getAttribute('message')
    }

    /**
    * Sets the message.
    *
    * @param {string} value - The message.
    */
    set message (value) {
      if (this.message !== value) {
        this.setAttribute('message', value)
      }
    }

    /**
    * Cleans the message board.
    */
    clean () {
      this._messageBoard.textContent = ''
    }
  }
)
