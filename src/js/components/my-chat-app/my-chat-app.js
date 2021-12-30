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
       overflow-y: visibility;
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
      /* background-color: red; */
      position: absolute;
      top: 540px;
      /* bottom: 0; */
     }

     #text-field {
       width: 290px;
       height: 40px;
       border: none;
       font-size: 1em;
     }

     #text-field:focus, input:focus {
       outline: none;
      }

     .button-send {
       cursor: pointer;
       /* background-color: #111111; */
       font-size: 1em;
       padding: 13px 20px;
       border-radius: 10px;
       border: none;
     }

     .chat-bubbles {
       background-color: #111111;
       color: #ffffff;
       width: fit-content;
       padding: 0.5px 20px 0.5px 20px;
       border-radius: 20px;
       line-height: 0.8em;
       margin-bottom: 3px;
     }

   </style>

   <div class="container">
     <div class="chat-content">
       <p>Fungerar detta?</p>
       <p>Vem är det som skriver? sdjfghkdjsfhgskjdhfgkljsdhfgkjlsdhfkjghklsdjfgkjsdhfkjlsdfh</p>
       <div>
     <div class="input-section">
       <input type="text" id="text-field" value="" placeholder="Type a message..." required autofocus></input>
       <button class="button-send" type="submit">Send</button>
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
      this.message = this.shadowRoot.querySelector('#text-field')
      // this.pTag = document.createElement('p')
      // this.chatContent.appendChild(this.pTag)
      // this.pTag.appendChild(this.message.value)
      this.sendButton = this.shadowRoot.querySelector('.button-send')
      this.sendButton.addEventListener('click', (event) => {
        event.preventDefault()
        this.chatContentMetod()
        this.message.value = ''
        this.message.focus()
      })
    }

    chatContentMetod () {
      // console.log(this.message.value)
      this.pTag = document.createElement('p')
      this.pTag.textContent = this.message.value
      // this.chatContent.appendChild(this.pTag)
      this.divTag = document.createElement('div')
      this.divTag.appendChild(this.pTag)
      this.divTag.setAttribute('class', 'chat-bubbles')
      this.chatContent.appendChild(this.divTag)
    }
  }
)
