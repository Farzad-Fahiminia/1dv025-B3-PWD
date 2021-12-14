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

     .my-desktop {
       background-image: url("js/components/my-desktop/images/bg.jpg");
       background-position: center;
       background-repeat: no-repeat;
       background-size: cover;
       font-family: 'Manrope', sans-serif;
       /* background-color: #a8bfcb; */
       width: 100vw;
       height: 100vh;
       margin: 0;
       padding: 0;
       font-size: 1.2em;
       text-align: center;
       color: #fff;
     }

     .app-bar {
       display: block;
       z-index: 9999;
       background-color: rgba(0, 0, 0, 0.2);
       box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.4);
       border: solid 1px rgba(255, 255, 255, 0.1);
       position: absolute;
       left: 25%;
       display: block;
       margin: 20px auto;
       padding: 15px 0;
       bottom: 0;
       width: 50%;
       border-radius: 20px;
       -webkit-backdrop-filter: blur(50px);
       backdrop-filter: blur(50px);
     }

     .app {
       display: inline-block;
       background-color: #a8bfcb;
       border-radius: 10px;
       margin: 0 5px;
       width: 60px;
       height: 60px;
       -webkit-transition: all 0.1s ease-in-out;
       -o-transition: all 0.1s ease-in-out;
       transition: all 0.1s ease-in-out;
     }
     .app:hover {
       box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.4);
     }
   </style>

   <div class="my-desktop">
     <my-app-window></my-app-window>
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
