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
     .my-desktop {
       background-color: #a8bfcb;
       width: 100vw;
       height: 100vh;
       /* box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.3); */
       margin: 0;
       padding: 0;
       font-size: 1.2em;
       text-align: center;
       color: #fff;
     }

     .app-bar {
       background-color: rgba(0, 0, 0, 0.2);
       position: absolute;
       left: 25%;
       display: block;
       margin: auto;
       padding: 10px 0;
       bottom: 0;
       width: 50%;
       border-radius: 10px;
       /* -webkit-filter: blur(5px);
      -moz-filter: blur(5px);
      -o-filter: blur(5px);
      -ms-filter: blur(5px);
      filter: blur(5px); */
     }

     .app {
       display: inline-block;
       background-color: black;
       border-radius: 10px;
       width: 70px;
       height: 70px;
     }
   </style>

   <div class="my-desktop">
     DESKTOP BACKGROUND IMAGE
     <div class="app-bar">
       <div class="app"></div>
       <div class="app"></div>
       <div class="app"></div>
     </div>
   </div>
 `

/**
 * Define custom element.
 */
customElements.define('my-desktop',
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
