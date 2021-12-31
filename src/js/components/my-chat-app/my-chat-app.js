/**
 * The memory game script file of the application.
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
       background-color: #ffffff;
     }

     .chat-content {
       display: block;
       clear: both;
       /* overflow-y: hidden; */
       margin-bottom: 40px;
       padding: 10px;
       background-color: #dfe9ed;
       height: 500px;
       position: relative;
       word-break: break-word;
       hyphens: auto;
     }

     .input-section {
      display: block;
      clear: both;
      position: absolute;
      top: 575px;
      /* bottom: 0; */
     }

     #text-field {
       width: 275px;
       height: 40px;
       border: none;
       font-size: 0.8em;
       margin-left: 15px;
     }

     #text-field:focus, input:focus {
       outline: none;
      }

     .button-send {
       cursor: pointer;
       background-color: #00a9de;
       color: #ffffff;
       font-size: 0.8em;
       padding: 13px 20px;
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

   </style>

   <div class="container">
     <div class ="chat-wrapper">
     <div class="chat-content"></div>
    <div class="input-section">
       <form>
        <input type="text" id="text-field" value="" placeholder="Type a message..." required autofocus></input>
        <button class="button-send" type="submit">Send</button>
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

      this.chatContent = this.shadowRoot.querySelector('.chat-content')
      this.chatContent.style.overflowY = 'scroll'
      this.message = this.shadowRoot.querySelector('#text-field')
      // this.pTag = document.createElement('p')
      // this.chatContent.appendChild(this.pTag)
      // this.pTag.appendChild(this.message.value)
      this.sendButton = this.shadowRoot.querySelector('.button-send')
      this.sendButton.addEventListener('click', (event) => {
        event.preventDefault()
        // this.chatContentMetod()
        this.message.focus()
        this.connectSocket()
        this.message.value = ''
      })

      this.websocket = new window.WebSocket('wss://courselab.lnu.se/message-app/socket', 'charcords')
      // this.websocket.addEventListener('message', (event) => {
      //   console.log(event.data)
      // })
      this.messageSocket()
    }

    connectSocket () {
      this.websocket = new window.WebSocket('wss://courselab.lnu.se/message-app/socket', 'charcords')
      const serverData = {
        type: 'message',
        data: `${this.message.value}`,
        username: 'TestName',
        channel: 'my, not so secret, channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }

      this.websocket.addEventListener('open', (event) => {
        this.websocket.send(JSON.stringify(serverData))
      })
    }

    messageSocket () {
      // const websocket = new window.WebSocket('wss://courselab.lnu.se/message-app/socket', 'charcords')
      // const serverData = {
      //   type: 'message',
      //   data: `${this.message.value}`,
      //   username: 'TestName',
      //   channel: 'my, not so secret, channel',
      //   key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      // }

      // websocket.addEventListener('open', (event) => {
      //   websocket.send(JSON.stringify(serverData))
      // })
      // this.websocket = new window.WebSocket('wss://courselab.lnu.se/message-app/socket', 'charcords')
      this.websocket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        // console.log(data.username)
        // console.log(data.data)
        console.log(event.data)

        if (data.data !== '' && data.username !== 'The Server' && data.username !== 'TestName') {
          const pTag = document.createElement('p')
          pTag.textContent = `${data.username}: ${data.data}`
          const divTag = document.createElement('div')
          divTag.appendChild(pTag)
          divTag.setAttribute('class', 'chat-bubbles')
          this.chatContent.appendChild(divTag)
        }

        if (data.data !== '' && data.username === 'TestName') {
          const pTag = document.createElement('p')
          pTag.textContent = `${data.username}: ${data.data}`
          const divTag = document.createElement('div')
          divTag.appendChild(pTag)
          divTag.setAttribute('class', 'chat-bubbles-me')
          this.chatContent.appendChild(divTag)
        }

        if (data.data !== '' && data.username === 'The Server') {
          const pTag = document.createElement('p')
          pTag.textContent = `${data.username}: ${data.data}`
          const divTag = document.createElement('div')
          divTag.appendChild(pTag)
          divTag.setAttribute('class', 'server')
          this.chatContent.appendChild(divTag)
        }
      })
    }
    
    // disconnectedCallBack () {
    //   this.websocket.close()
    // }

    // chatContentMetod () {
    //   // console.log(this.message.value)
    //   this.pTag = document.createElement('p')
    //   this.pTag.textContent = this.message.value
    //   // this.chatContent.appendChild(this.pTag)
    //   this.divTag = document.createElement('div')
    //   this.divTag.appendChild(this.pTag)
    //   this.divTag.setAttribute('class', 'chat-bubbles')
    //   this.chatContent.appendChild(this.divTag)
    // }
  }
)
