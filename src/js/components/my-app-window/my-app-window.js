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

     #my-app-window {
       display: block;
       position: absolute;
       z-index: 9;
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

     #my-app-window-header {
       background-color: rgba(0, 0, 0, 0.4);
       -webkit-backdrop-filter: blur(50px);
       backdrop-filter: blur(50px);
       border-radius: 7px 7px 0 0;
       display: block;
       z-index: 10;
       padding: 10px 0;
       width: 100%;
       font-size: 0.8em;
       color: rgba(255, 255, 255, 0.7);
       cursor: move;
     }

     .close-button {
       position: relative;
       float: right;
       top: 3px;
       right: 10px;
       margin-left: -20px;
       background-color: #fc615d;
       border: none;
       border-radius: 50%;
       width: 17px;
       height: 17px;
       font-size: 0.6em;
       color: rgba(0, 0, 0, 0);
     }

     .close-button:hover {
       color: rgba(0, 0, 0, 0.6);
     }

     .window-content {
       background-color: #fff;
       width: 100%;
       height: 100%;
       border-radius: 0 0 7px 7px;
       color: #1d1d1d;
     }
   </style>

   <div id="my-app-window">
     <div id="my-app-window-header">
       My application Window
      <button class="close-button">X</button>
     </div>
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
      // this._onSubmit = this._onSubmit.bind(this)
      // this._formElement.addEventListener('submit', this._onSubmit)

      // this.element = this.shadowRoot.querySelector('my-app-window')
      this.dragElement(this.shadowRoot.querySelector('#my-app-window'))
      // this.dragElement() = document.getElementsByClassName('my-app-window')
    }

    // Code source https://www.w3schools.com/howto/howto_js_draggable.asp
    // Make the DIV element draggable:
    dragElement (elment) {
      console.log('HEJ HEJ')
      console.log(elment.id + '-header')
      let pos1 = 0
      let pos2 = 0
      let pos3 = 0
      let pos4 = 0
      if (this.shadowRoot.querySelector('#' + elment.id + '-header')) {
      // if present, the header is where you move the DIV from:
        this.shadowRoot.querySelector('#' + elment.id + '-header').onmousedown = dragMouseDown
      } else {
      // otherwise, move the DIV from anywhere inside the DIV:
        elment.onmousedown = dragMouseDown
      }

      function dragMouseDown(e) {
        e = e || window.event
        e.preventDefault()
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
      }

      function elementDrag(e) {
        e = e || window.event
        e.preventDefault()
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        // set the element's new position:
        elment.style.top = (elment.offsetTop - pos2) + 'px'
        elment.style.left = (elment.offsetLeft - pos1) + 'px'
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null
        document.onmousemove = null
      }
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

    // /**
    // * Called when observed attribute(s) changes.
    // *
    // * @param {string} name - The attribute's name.
    // * @param {*} oldValue - The old value.
    // * @param {*} newValue - The new value.
    // */
    // attributeChangedCallback (name, oldValue, newValue) {
    //   if (name === 'message') {
    //     this._messageBoard.textContent = newValue
    //   }
    // }

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
