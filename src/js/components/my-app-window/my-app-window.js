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
       z-index: 202;
       box-shadow: 0px 50px 50px rgba(0, 0, 0, 0.5);
       border-radius: 7px;
       width: 600px;
       height: 620px;
       margin: 0;
       padding: 0;
       font-size: 1em;
       color: #fff;
       overflow: hidden;
     }

     #my-app-window-header {
       background-color: rgba(255, 255, 255, 0.4);
       -webkit-backdrop-filter: blur(50px);
       backdrop-filter: blur(50px);
       border-radius: 7px 7px 0 0;
       display: block;
       z-index: 10;
       padding: 10px 0;
       width: 100%;
       font-size: 0.8em;
       color: rgba(0, 0, 0, 0.7);
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
       cursor: pointer;
       font-size: 0.7em;
       color: rgba(0, 0, 0, 0);
     }

     .close-button:hover {
       color: rgba(0, 0, 0, 0.6);
     }

     .window-content {
       margin: 0;
       background-color: rgba(0, 0, 0, 0.2);
       -webkit-backdrop-filter: blur(50px);
       backdrop-filter: blur(50px);
       width: 100%;
       height: 100%;
       border-radius: 0 0 7px 7px;
       color: #1d1d1d;
       overflow: hidden;
     }
   </style>

   <div id="my-app-window">
     <div id="my-app-window-header">My application Window</div>
     <button class="close-button" type="reset">x</button>
     <div class="window-content"></div>
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

    /**
     * This makes the application window element draggable/moveable.
     * Code source https://www.w3schools.com/howto/howto_js_draggable.asp.
     * With additional solutions from https://stackoverflow.com/questions/48097791/how-to-keep-a-draggable-element-from-being-moved-outside-a-boundary.
     *
     * @param {object} element - The application window object.
     */
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
      // If present, the header is where you move the DIV from:
        this.shadowRoot.querySelector('#' + element.id + '-header').onmousedown = dragMouseDown
      } else {
      // Otherwise, move the DIV from anywhere inside the DIV:
        element.onmousedown = dragMouseDown
      }

      /**
       * This will get the cursor position at startup.
       *
       * @param {object} mouseEvent - Start position of mouse.
       */
      function dragMouseDown (mouseEvent) {
        mouseEvent = mouseEvent || window.event
        mouseEvent.preventDefault()
        // Get the mouse cursor position at startup:
        pos3 = mouseEvent.clientX
        pos4 = mouseEvent.clientY

        // Store the current viewport and element dimensions when a drag starts
        rect = element.getBoundingClientRect()
        viewport.bottom = window.innerHeight - windowPadding
        viewport.left = windowPadding
        viewport.right = window.innerWidth - windowPadding
        viewport.top = windowPadding

        document.onmouseup = closeDragElement
        // Call a function whenever the cursor moves:
        document.onmousemove = elementDrag
      }

      /**
       * This will calculate the position of the mouse.
       *
       * @param {object} mousePosition - Position of the mouse.
       */
      function elementDrag (mousePosition) {
        mousePosition = mousePosition || window.event
        mousePosition.preventDefault()
        // Calculate the new cursor position:
        pos1 = pos3 - mousePosition.clientX
        pos2 = pos4 - mousePosition.clientY
        pos3 = mousePosition.clientX
        pos4 = mousePosition.clientY

        // Check to make sure the element will be within our viewport boundary
        const newLeft = element.offsetLeft - pos1
        const newTop = element.offsetTop - pos2

        if (newLeft < viewport.left || newTop < viewport.top || newLeft + rect.width > viewport.right || newTop + rect.height > viewport.bottom) {
          // The element will hit the boundary, do nothing...
        } else {
          // Set the element's new position:
          element.style.top = (element.offsetTop - pos2) + 'px'
          element.style.left = (element.offsetLeft - pos1) + 'px'
        }
      }

      /**
       * This will stop moving when mouse is released.
       *
       */
      function closeDragElement () {
        document.onmouseup = null
        document.onmousemove = null
      }
    }

    /**
     * Method for changing z-index on windows.
     * This will help setting focus on clicked windows.
     *
     * @param {number} zIndex - Z-index number.
     */
    changeZIndex (zIndex) {
      this.myAppWindow.style.zIndex = zIndex
    }

    /**
     * This will close and remove window.
     *
     */
    closeAppWindow () {
      this.remove()
    }
  }
)
