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
       <div class="app" id="memory-app"></div>
       <div class="app" id="chat-app"></div>
       <div class="app" id="mystery-app"></div>
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
        console.log('KLICK PÅ MEMORY APP')
        this.openAppWindow(event)
      })

      this.myChatApp = this.shadowRoot.querySelector('#chat-app')
      this.myChatApp.addEventListener('click', (event) => {
        console.log('KLICK PÅ CHAT APP')
        this.openAppWindow(event)
      })

      this.myMysteryApp = this.shadowRoot.querySelector('#mystery-app')
      this.myMysteryApp.addEventListener('click', (event) => {
        console.log('KLICK PÅ MYSTERY APP')
        this.openAppWindow(event)
      })
    }

    openAppWindow () {
      console.log('NU ÄR DU INNE I OPEN APP!')
      const appWindow = document.createElement('my-app-window')
      console.log(appWindow)
      console.log(this.myDesktop)
      this.myDesktop.append(appWindow)
    }
  }
)
