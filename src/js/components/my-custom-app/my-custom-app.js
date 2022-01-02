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
       padding: 20px;
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
       position: relative;
       height: 600px;
     }

     .my-custom-wrapper:before {
       display: block;
       content: ' ';
       background-image: url('js/components/my-custom-app/images/emoji-laughing-fill.svg');
       background-position: center;
       background-repeat: no-repeat;
       background-size: 80px 80px;
       filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.4));
       height: 80px;
       width: 80px;
       position: absolute;
       top: -360px; bottom: 0; left: 0; right: 0;
       margin: auto;
     }

     .my-custom-question {
       position: absolute;
       width: 100%;
       top: 32%;
       text-align: center;
       font-size: 1.2em;
     }

     .show-answer-button {
       cursor: pointer;
       display: block;
       margin: 0 auto;
       margin-top: 40px;
       background-color: #ffffff;
       color: #111111;
       font-size: 0.8em;
       font-weight: 700;
       text-transform: uppercase;
       letter-spacing: 1px;
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

   </style>

   <div class="container">
     <div class ="my-custom-wrapper">
      <div class ="my-custom-question">
        <p id="joke"></p>
        <button class="show-answer-button" type="submit">Give me a new joke</button>
      </div>
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

      this.funnyJoke = this.shadowRoot.querySelector('#joke')
      this.showAnswerButton = this.shadowRoot.querySelector('.show-answer-button')

      this.showAnswerButton.addEventListener('click', (event) => {
        event.preventDefault()
        this.getJoke()
      })

      this.getJoke()
    }

    /**
     * Retrieve jokes from API.
     * https://icanhazdadjoke.com/api.
     *
     */
    async getJoke () {
      try {
        let data = await window.fetch('https://icanhazdadjoke.com/', {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        })
        data = await data.json()
        this.funnyJoke.textContent = data.joke
      } catch (error) {
        this.funnyJoke.textContent = 'Something went wrong... try again later!'
      }
    }
  }
)
