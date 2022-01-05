/**
 * The chat app script file of the application.
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
     textarea {
      font-family: 'Manrope', sans-serif;
     }

     .container {
       margin: auto;
       padding: 0px;
       max-width: 400px;
       height: 600px;
       font-size: 1em;
       background-color: #ffffff;
     }

     .chat-nickname {
       position: relative;
       clear: both;
       background: linear-gradient(180deg, #9ebd13 0%, #008552 100%);
       height: 600px;
       z-index: 999;
     }

     .chat-nickname:before {
       display: block;
       content: ' ';
       background-image: url('js/components/my-chat-app/images/chat-dots-fill.svg');
       background-position: center;
       background-repeat: no-repeat;
       background-size: 80px 80px;
       filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.4));
       height: 80px;
       width: 80px;
       position: absolute;
       top: -260px; bottom: 0; left: 0; right: 0;
       margin: auto;
     }

     #nicknameForm {
       position: absolute;
       top: 45%;
       left: 65px;
     }

     #text-nickname {
       display: block;
       clear: both;
       padding: 20px 15px;
       width: 250px;
       text-align: center;
       font-size: 1em;
       margin-bottom: 10px;
       border-radius: 10px;
       border: none;
     }

     .chat-content {
       display: block;
       clear: both;
       padding: 10px;
       background-color: #dfe9ed;
       height: 459px;
       position: relative;
       word-break: break-word;
       hyphens: auto;
     }

     .input-section {
      display: block;
      clear: both;
      position: absolute;
      top: 520px;
      background-color: #ffffff;
      padding: 20px 15px 20px 11px;
     }

     #text-field {
       width: 245px;
       height: 60px;
       border: none;
       font-size: 0.8em;
       margin-left: 15px;
       resize: none;
     }

     #text-field:focus, input:focus {
       outline: none;
      }

     .button-send {
       cursor: pointer;
       background-color: #00a9de;
       color: #ffffff;
       font-size: 0.8em;
       padding: 13px 30px;
       border-radius: 25px;
       border: none;
     }

     .button-send:hover {
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
      -webkit-transition: all 0.1s;
       -o-transition: all 0.1s;
       transition: all 0.1s;
     }

     .chat-bubbles {
       display: block;
       clear: both;
       background-color: #ffffff;
       font-size: 0.8em;
       color: #111111;
       width: fit-content;
       max-width: 60%;
       padding: 0.5px 20px 0.5px 20px;
       border-radius: 20px;
       line-height: 1.2em;
       margin-bottom: 5px;
       margin-bottom: 5px;
       float: left;
       text-align: left;
     }

     .chat-bubbles-me {
       display: block;
       clear: both;
       background-color: #00a9de;
       font-size: 0.8em;
       color: #ffffff;
       width: fit-content;
       max-width: 60%;
       padding: 0.5px 20px 0.5px 20px;
       border-radius: 20px;
       line-height: 1.2em;
       margin-bottom: 5px;
       margin-bottom: 5px;
       float: right;
       text-align: left;
     }

     .server {
       display: block;
       clear: both;
       font-size: 0.75em;
       color: #8b8b8b;
       width: fit-content;
       padding: 0.5px 20px 0.5px 20px;
       line-height: 0.8em;
       margin-bottom: 3px;
       margin: 0 auto;
     }

     .date-stamp-left {
       display: block;
       clear: both;
       float: left;
       font-size: 0.8em;
       color: #ababab;
       margin-top: -3px;
     }

     .date-stamp-right {
       display: block;
       clear: both;
       float: right;
       font-size: 0.8em;
       color: #ababab;
       margin-top: -3px;
     }

     .hidden {
       display: none !important;
     }

   </style>

   <div class="container">
     <div class ="chat-wrapper">
      <div class="chat-nickname">
      <form id="nicknameForm">
        <input type="text" id="text-nickname" placeholder="Choose nickname" required>
        <button class="button-send" id="nickname-send" type="submit">Begin chatting</button>
      </form>
      </div>
      <div class="chat-content"></div>
      <div class="input-section">
       <form>
        <textarea id="text-field" value="" placeholder="Type a message..." required autofocus></textarea>
        <button class="button-send" id="button-submit" type="submit">Send</button>
       </form>
      </div>
     </div>
   </div>
 `

/**
 * Define custom element.
 */
customElements.define('my-chat-app',
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

      this.websocket = ''

      this.chatContent = this.shadowRoot.querySelector('.chat-content')
      this.chatContent.style.overflowY = 'scroll'
      this.message = this.shadowRoot.querySelector('#text-field')

      this.chatNickame = this.shadowRoot.querySelector('.chat-nickname')
      this.textNickname = this.shadowRoot.querySelector('#text-nickname')
      this.nicknameSend = this.shadowRoot.querySelector('#nickname-send')

      if (localStorage.getItem('chat_nickname') === null) {
        localStorage.setItem('chat_nickname', this.textNickname.value)
      } else {
        this.textNickname.value = localStorage.getItem('chat_nickname')
      }
      this.nicknameSend.addEventListener('click', (event) => {
        event.preventDefault()
        localStorage.setItem('chat_nickname', this.textNickname.value)
        this.chatNickame.setAttribute('class', 'hidden')
        this.connectSocket()
        this.socketMessages()
      })

      this.sendButton = this.shadowRoot.querySelector('#button-submit')
      this.sendButton.addEventListener('click', (event) => {
        event.preventDefault()
        this.message.focus()
        this.sendMessage()
        this.message.value = ''
      })
    }

    /**
     * Disconnects the webSocket when application is closed.
     *
     */
    disconnectedCallback () {
      this.websocket.close()
    }

    /**
     * This will establish connection to server.
     *
     */
    connectSocket () {
      this.websocket = new window.WebSocket('wss://courselab.lnu.se/message-app/socket', 'charcords')
    }

    /**
     * Sends messages to the websocket.
     *
     */
    sendMessage () {
      const serverData = {
        type: 'message',
        data: `${this.message.value}`,
        username: `${this.textNickname.value}`,
        channel: 'my, not so secret, channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }

      if (this.websocket.readyState === 1) {
        this.websocket.send(JSON.stringify(serverData))
      }
    }

    /**
     * This establish messages to be recieved.
     *
     */
    socketMessages () {
      this.websocket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)

        if (data.data !== '' && data.username !== 'The Server' && data.username !== this.textNickname.value) {
          this.messageTemplate(data, 'chat-bubbles', 'date-stamp-left')
        }

        if (data.data !== '' && data.username === this.textNickname.value) {
          this.messageTemplate(data, 'chat-bubbles-me', 'date-stamp-right')
        }

        const pTag = document.createElement('p')
        const divTag = document.createElement('div')
        divTag.appendChild(pTag)

        if (data.data !== '' && data.username === 'The Server') {
          pTag.textContent = `${data.username}: ${data.data}`
          divTag.setAttribute('class', 'server')
          this.chatContent.appendChild(divTag)
        }

        this.chatContent.scrollTop = this.chatContent.scrollHeight - this.chatContent.clientHeight
      })
    }

    /**
     * Creates messages in chat application.
     *
     * @param {object} data - Object recieved from websocket.
     * @param {string} divTagClass - Class name for the text message div element.
     * @param {string} dateTagClass - Class name for the date div element.
     */
    messageTemplate (data, divTagClass, dateTagClass) {
      // Source of code for date: https://pretagteam.com/question/javascript-change-gethours-to-2-digit-duplicate
      const date = new Date().toISOString().substr(0, 19).replace('T', ' ')
      const dateTag = document.createElement('p')

      const pTag = document.createElement('p')
      const divTag = document.createElement('div')
      divTag.appendChild(pTag)

      pTag.textContent = `${data.username}: ${data.data}`
      divTag.setAttribute('class', divTagClass)
      dateTag.textContent = `${date}`
      dateTag.setAttribute('class', dateTagClass)
      this.chatContent.appendChild(divTag)
      this.chatContent.append(dateTag)
    }
  }
)
