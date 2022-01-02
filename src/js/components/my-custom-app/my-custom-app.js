/**
 * The my custom app script file of the application.
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
       margin-top: -26px;
       padding: 0px;
       max-width: 600px;
       height: 600px;
       font-size: 1em;
       /* background-color: #111111; */
       	/* https://codepen.io/P1N2O/pen/pyBNzX */
       background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
       background-size: 400% 400%;
       animation: gradient 15s ease infinite;
     }

     /* https://codepen.io/P1N2O/pen/pyBNzX */
     @keyframes gradient {
       0% {background-position: 0% 50%;}
       50% {background-position: 100% 50%;}
       100% {background-position: 0% 50%;}
     }

     .my-custom-wrapper {
       text-align: center;
     }

     .show-answer-button {
       cursor: pointer;
       display: block;
       margin: 0 auto;
       background-color: #ffffff;
       color: #111111;
       font-size: 0.8em;
       padding: 13px 30px;
       border-radius: 5px;
       border: none;
     }

     .show-answer-button:hover {
      box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.4);
      -webkit-transition: all 0.1s;
       -o-transition: all 0.1s;
       transition: all 0.1s;
     }

     .hidden {
       display: none !important;
     }

   </style>

   <div class="container">
     <div class ="my-custom-wrapper">
       <h1>Joke of the Day</h1>
      <div class="my-custom-content"></div>
        <button class="show-answer-button" type="submit">Show answer</button>
     </div>
   </div>
 `

/**
 * Define custom element.
 */
customElements.define('my-custom-app',
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

      this.myCustomWrapper = this.shadowRoot.querySelector('.my-custom-wrapper')

      this.showAnswerButton = this.shadowRoot.querySelector('.show-answer-button')
      this.showAnswerButton.addEventListener('click', (event) => {
        event.preventDefault()
        // this.connectSocket(this.textNickname.value)
        // this.message.value = ''
      })

      // this.messageSocket()
    }

    /**
     * This establish messages to be sent and recieved.
     *
     */
    // messageSocket () {
    //   this.websocket.addEventListener('message', (event) => {
    //     const data = JSON.parse(event.data)
    //     // console.log(data.username)
    //     // console.log(data.data)
    //     console.log(event.data)

    //     const pTag = document.createElement('p')
    //     const divTag = document.createElement('div')
    //     divTag.appendChild(pTag)

    //     if (data.data !== '' && data.username !== 'The Server' && data.username !== this.textNickname.value) {
    //       pTag.textContent = `${data.username}: ${data.data}`
    //       divTag.setAttribute('class', 'chat-bubbles')
    //       this.chatContent.appendChild(divTag)
    //     }
    //   })
    // }
  }
)
