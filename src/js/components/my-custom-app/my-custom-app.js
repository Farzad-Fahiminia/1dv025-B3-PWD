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
       padding: 0px;
       max-width: 400px;
       height: 600px;
       font-size: 1em;
       background-color: #111111;
     }

     .show-answer-button {
       cursor: pointer;
       background-color: #00a9de;
       color: #ffffff;
       font-size: 0.8em;
       padding: 13px 30px;
       border-radius: 25px;
       border: none;
     }

     .show-answer-button:hover {
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
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

      this.chatContent = this.shadowRoot.querySelector('.chat-content')

      this.sendButton = this.shadowRoot.querySelector('#button-submit')
      this.sendButton.addEventListener('click', (event) => {
        event.preventDefault()
        // this.connectSocket(this.textNickname.value)
        // this.message.value = ''
      })

      this.messageSocket()
    }

    /**
     * This establish messages to be sent and recieved.
     *
     */
    messageSocket () {
      this.websocket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        // console.log(data.username)
        // console.log(data.data)
        console.log(event.data)

        const pTag = document.createElement('p')
        const divTag = document.createElement('div')
        divTag.appendChild(pTag)

        if (data.data !== '' && data.username !== 'The Server' && data.username !== this.textNickname.value) {
          pTag.textContent = `${data.username}: ${data.data}`
          divTag.setAttribute('class', 'chat-bubbles')
          this.chatContent.appendChild(divTag)
        }
      })
    }
  }
)
