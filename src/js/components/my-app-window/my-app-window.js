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
       top: -28px;
       right: 10px;
       margin-left: -20px;
       background-color: #fc615d;
       border: none;
       border-radius: 50%;
       width: 17px;
       height: 17px;
       font-size: 0.7em;
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
      </div>
      <button class="close-button" type="reset">X</button>
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

      this.myAppWindow = this.shadowRoot.querySelector('#my-app-window')
      this.dragElement(this.myAppWindow)

      this.closeButton = this.shadowRoot.querySelector('.close-button')
      this.closeButton.addEventListener('click', (event) => {
        this.closeAppWindow(event)
      })
    }

    // Code source https://www.w3schools.com/howto/howto_js_draggable.asp
    // With additional solutions from https://stackoverflow.com/questions/48097791/how-to-keep-a-draggable-element-from-being-moved-outside-a-boundary
    // Make the DIV element draggable:
    dragElement (element) {
      const windowPadding = 0
      let rect
      const viewport = {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
      }

      let pos1 = 0
      let pos2 = 0
      let pos3 = 0
      let pos4 = 0
      if (this.shadowRoot.querySelector('#' + element.id + '-header')) {
      // if present, the header is where you move the DIV from:
        this.shadowRoot.querySelector('#' + element.id + '-header').onmousedown = dragMouseDown
      } else {
      // otherwise, move the DIV from anywhere inside the DIV:
        element.onmousedown = dragMouseDown
      }

      function dragMouseDown (e) {
        e = e || window.event
        e.preventDefault()
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY

        // store the current viewport and element dimensions when a drag starts
        rect = element.getBoundingClientRect()
        viewport.bottom = window.innerHeight - windowPadding
        viewport.left = windowPadding
        viewport.right = window.innerWidth - windowPadding
        viewport.top = windowPadding

        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
      }

      function elementDrag (e) {
        e = e || window.event
        e.preventDefault()
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        
        // check to make sure the element will be within our viewport boundary
        const newLeft = element.offsetLeft - pos1
        const newTop = element.offsetTop - pos2

        if (newLeft < viewport.left || newTop < viewport.top || newLeft + rect.width > viewport.right || newTop + rect.height > viewport.bottom) {
          // the element will hit the boundary, do nothing...
        } else {
          // set the element's new position:
          element.style.top = (element.offsetTop - pos2) + 'px'
          element.style.left = (element.offsetLeft - pos1) + 'px'
        }
      }

      function closeDragElement () {
        // stop moving when mouse button is released:
        document.onmouseup = null
        document.onmousemove = null
      }
    }

    closeAppWindow () {
      this.myAppWindow.remove()
    }
  }
)
