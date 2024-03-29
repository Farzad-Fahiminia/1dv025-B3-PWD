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
       background-color: #ffffff;
       border: none;
       border-radius: 10px;
       margin: 0 5px;
       width: 60px;
       height: 60px;
       cursor: pointer;
       -webkit-transition: all 0.1s ease-in-out;
       -o-transition: all 0.1s ease-in-out;
       transition: all 0.1s ease-in-out;
     }
     .app:hover {
       box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.4);
     }

     #memory-app {
      position: relative;
      background-size: 60%;
      background: linear-gradient(90deg, rgba(114,196,191,1) 0%, rgba(137,104,238,1) 100%);
     }

    #memory-app:before {
      display: block;
      content: ' ';
      background-image: url('js/components/my-desktop/images/x-diamond-fill.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 40px 40px;
      filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 1));
      height: 40px;
      width: 40px;
      position: absolute;
      top: 0; bottom: 0; left: 0; right: 0;
      margin: auto;
    }

     #chat-app {
      position: relative;
      background-size: 60%;
      background: #9ebd13;
     }

     #chat-app:before {
      display: block;
      content: ' ';
      background-image: url('js/components/my-desktop/images/chat-left-dots.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 40px 40px;
      filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.7));
      height: 40px;
      width: 40px;
      position: absolute;
      top: 0; bottom: 0; left: 0; right: 0;
      margin: auto;
    }

    #my-custom-app {
      position: relative;
      background-size: 60%;
      background: linear-gradient(180deg, rgba(169,114,196,1) 0%, rgba(137,104,238,1) 100%);
     }

     #my-custom-app:before {
      display: block;
      content: ' ';
      background-image: url('js/components/my-desktop/images/emoji-laughing-fill.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 40px 40px;
      filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.8));
      height: 40px;
      width: 40px;
      position: absolute;
      top: 0; bottom: 0; left: 0; right: 0;
      margin: auto;
    }

    .tooltip {
       position: relative;
       display: inline-block;
       border-bottom: 1px dotted black;
    }
      
      .tooltip .tooltiptext {
        position: absolute;
        z-index: 9999;
        opacity: 0;
        top: -100%;
        left: -65%;
        width: 120px;
        background-color: rgba(0, 0, 0, 0.4);
       -webkit-backdrop-filter: blur(50px);
        color: #fff;
        font-size: 0.8em;
        text-align: center;
        border-radius: 4px;
        padding: 7px 10px;
        -webkit-transition: opacity 0.05s ease-out;
       -o-transition: opacity 0.05s ease-out;
       transition: opacity 0.05s ease-out;
      }

      .tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.4) transparent transparent transparent;
      }

      .tooltip:hover .tooltiptext {
        opacity: 1;
      }

      #followTheWhiteRabbit {
        z-index: 9999;
        position: relative;
        background-size: 60%;
        float: right;
        margin-top: 0px;
        margin-right: 20px;
        cursor: pointer;
     }

     #followTheWhiteRabbit:before {
       display: block;
       content: ' ';
       background-image: url('js/components/my-desktop/images/terminal.svg');
       background-position: center;
       background-repeat: no-repeat;
       background-size: 20px 20px;
       height: 20px;
       width: 20px;
       position: absolute;
       top: 0; bottom: 0; left: 0; right: 0;
    }

     #folow-the-white-rabbit {
       position: absolute;
       top: 0;
       left: 0;
     }

   </style>

   <div class="my-desktop">
     <div id="followTheWhiteRabbit"></div>
     <div class="app-bar">
       <button class="app tooltip" id="memory-app"><span class="tooltiptext">Memory Game</span></button>
       <button class="app tooltip" id="chat-app"><span class="tooltiptext">Chat App</span></button>
       <button class="app tooltip" id="my-custom-app"><span class="tooltiptext">Joke of the Day</span></button>
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

      this.myDesktop = this.shadowRoot.querySelector('.my-desktop')

      this.myMemoryApp = this.shadowRoot.querySelector('#memory-app')
      this.myMemoryApp.addEventListener('click', (event) => {
        this.openAppWindow('Memory Game')
      })

      this.myChatApp = this.shadowRoot.querySelector('#chat-app')
      this.myChatApp.addEventListener('click', (event) => {
        this.openAppWindow('Chat App')
      })

      this.myCustomApp = this.shadowRoot.querySelector('#my-custom-app')
      this.myCustomApp.addEventListener('click', (event) => {
        this.openAppWindow('Joke of the Day')
      })

      this.multipleAppWindow = []

      this.followTheWhiteRabbit = this.shadowRoot.querySelector('#followTheWhiteRabbit')
      this.followTheWhiteRabbit.addEventListener('click', (event) => {
        this.flipMatrixOnClick()
      })
    }

    /**
     * Creates application and window.
     *
     * @param {string} title - Name of application.
     */
    openAppWindow (title) {
      const appWindow = document.createElement('my-app-window')
      const myAppWindow = appWindow.shadowRoot.querySelector('#my-app-window')
      const heading = appWindow.shadowRoot.querySelector('#my-app-window-header')
      heading.textContent = title

      if (title === 'Memory Game') {
        const memoryGame = document.createElement('my-memory-game')
        appWindow.shadowRoot.lastElementChild.lastElementChild.append(memoryGame)
      }

      if (title === 'Chat App') {
        const chatApp = document.createElement('my-chat-app')
        appWindow.shadowRoot.lastElementChild.lastElementChild.style.width = '400px'
        myAppWindow.style.width = '400px'
        myAppWindow.style.height = '640px'
        appWindow.shadowRoot.lastElementChild.lastElementChild.append(chatApp)
      }

      if (title === 'Joke of the Day') {
        const myCustomApp = document.createElement('my-custom-app')
        appWindow.shadowRoot.lastElementChild.lastElementChild.append(myCustomApp)
      }

      this.myDesktop.append(appWindow)
      this.multipleAppWindow.push(appWindow)

      appWindow.addEventListener('mousedown', (event) => {
        this.multipleAppWindow.forEach(window => {
          if (window === event.target) {
            window.changeZIndex('201')
          } else {
            window.changeZIndex('199')
          }
        })
      })
    }

    /**
     * This will set the whole desktop background to Matrix mode.
     * Easter egg.
     *
     */
    flipMatrixOnClick () {
      if (this.myDesktop.firstElementChild.id === 'followTheWhiteRabbit') {
        const canvas = document.createElement('canvas')
        canvas.setAttribute('id', 'folow-the-white-rabbit')
        this.myDesktop.insertBefore(canvas, this.myDesktop.firstElementChild)
        this.theCode = this.shadowRoot.querySelector('#folow-the-white-rabbit')
        this.whiteRabbit()
      } else {
        this.theCode.remove()
      }
    }

    /**
     * Fallow The White Rabbit.
     * Source: https://codepen.io/wefiy/pen/WPpEwo by Boujjou Achraf.
     * Easter egg.
     */
    whiteRabbit () {
      const canvas = this.shadowRoot.getElementById('folow-the-white-rabbit')
      const ctx = canvas.getContext('2d')

      // Making the canvas full screen
      canvas.height = window.innerHeight
      canvas.width = window.innerWidth

      // Chinese characters - taken from the unicode charset
      let matrix = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}'
      // Converting the string into an array of single characters
      matrix = matrix.split('')

      const fontSize = 16
      const columns = canvas.width / fontSize // Number of columns for the rain
      // An array of drops - one per column
      const drops = []

      // x below is the x coordinate
      // 1 = y co-ordinate of the drop (same for every drop initially)
      for (let x = 0; x < columns; x++) {
        drops[x] = 1
      }

      /**
       * Drawing the characters.
       *
       */
      function draw () {
        // Black BG for the canvas
        // Translucent BG to show trail
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#00ff00' // Green text
        ctx.font = fontSize + 'px arial'

        // Looping over drops
        for (let i = 0; i < drops.length; i++) {
          // A random chinese character to print
          const text = matrix[Math.floor(Math.random() * matrix.length)]
          // x = i * font_size, y = value of drops[i] * font_size
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)

          // Sending the drop back to the top randomly after it has crossed the screen
          // Adding a randomness to the reset to make the drops scattered on the Y axis
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          } else {
            // Incrementing Y coordinate
            drops[i]++
          }
        }
      }
      setInterval(draw, 35)
    }
  }
)
