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
       cursor: pointer;
       -webkit-transition: all 0.1s ease-in-out;
       -o-transition: all 0.1s ease-in-out;
       transition: all 0.1s ease-in-out;
     }
     .app:hover {
       box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.4);
     }

     .tooltip {
       position: relative;
       display: inline-block;
       border-bottom: 1px dotted black;
      }
      
      .tooltip .tooltiptext {
        position: absolute;
        z-index: 9999;
        /* visibility: hidden; */
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

      .tooltip:hover .tooltiptext {
        /* visibility: visible; */
        opacity: 1;
      }

     #folow-the-white-rabbit {
       position: absolute;
       top: 0;
       left: 0;
     }
   </style>

   <div class="my-desktop">
     <canvas id="folow-the-white-rabbit"></canvas>
     <div class="app-bar">
       <div class="app tooltip" id="memory-app"><span class="tooltiptext">Memory Game</span></div>
       <div class="app tooltip" id="chat-app"><span class="tooltiptext">Chat App</span></div>
       <div class="app tooltip" id="mystery-app"><span class="tooltiptext">Mystery App</span></div>
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

      // this.myAppWindowHeader = this.shadowRoot.querySelector('#my-app-window-header')

      this.myMemoryApp = this.shadowRoot.querySelector('#memory-app')
      this.myMemoryApp.addEventListener('click', (event) => {
        console.log('KLICK PÅ MEMORY APP')
        console.log(this.myAppWindowHeader)
        this.openAppWindow('Memory Game')
      })

      this.myChatApp = this.shadowRoot.querySelector('#chat-app')
      this.myChatApp.addEventListener('click', (event) => {
        console.log('KLICK PÅ CHAT APP')
        this.openAppWindow('Chat App')
      })

      this.myMysteryApp = this.shadowRoot.querySelector('#mystery-app')
      this.myMysteryApp.addEventListener('click', (event) => {
        console.log('KLICK PÅ MYSTERY APP')
        this.openAppWindow('Mystery App')
        // this.whiteRabbit()
      })

      this.multipleAppWindow = []
    }

    openAppWindow (title) {
      console.log('NU ÄR DU INNE I OPEN APP!')
      const appWindow = document.createElement('my-app-window')
      const heading = appWindow.shadowRoot.querySelector('#my-app-window-header')
      heading.textContent = title
      this.myDesktop.append(appWindow)
      this.multipleAppWindow.push(appWindow)
    }

    // Fallow The White Rabbit: this.whiteRabbit()
    // Source: https://codepen.io/wefiy/pen/WPpEwo by Boujjou Achraf
    whiteRabbit () {
      const c = this.shadowRoot.getElementById('folow-the-white-rabbit')
      const ctx = c.getContext('2d')

      // Making the canvas full screen
      c.height = window.innerHeight
      c.width = window.innerWidth

      // Chinese characters - taken from the unicode charset
      let matrix = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}'
      // Converting the string into an array of single characters
      matrix = matrix.split('')

      const fontSize = 14
      const columns = c.width / fontSize // Number of columns for the rain
      // An array of drops - one per column
      const drops = []
      
      // x below is the x coordinate
      // 1 = y co-ordinate of the drop (same for every drop initially)
      for (let x = 0; x < columns; x++) {
        drops[x] = 1
      }

      // Drawing the characters
      function draw () {
        // Black BG for the canvas
        // Translucent BG to show trail
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
        ctx.fillRect(0, 0, c.width, c.height)

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
          if (drops[i] * fontSize > c.height && Math.random() > 0.975) {
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
