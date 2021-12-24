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
       padding: 10px;
       max-width: 600px;
       height: 600px;
       font-size: 1em;
       background-color: #222;
       color: #fff;
     }

   </style>
   <div class="container">
     <form id="memory-form">
    </form>
   </div>
 `

/**
 * Define custom element.
 */
 customElements.define('my-memory-game',
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

      this.quantityCards = 4
      this.memoryCards = [
        {
          img: 'js/components/my-memory-game-flipping-card/images/0.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/0.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/1.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/1.png'
        }
      ]
      this.fillMemoryBoard()
    }

    fillMemoryBoard () {
      for (let i = 0; i < this.quantityCards; i++) {
        console.log(this.memoryCards[i].img)
        const card = document.createElement('my-memory-game-flipping-card')
        const cardFrontFace = card.shadowRoot.querySelector('.flip-card-front')
        cardFrontFace.style.backgroundImage = `url('${this.memoryCards[i].img}');`
        // cardFrontFace.style.backgroundColor = 'red;'
        const memoryForm = this.shadowRoot.querySelector('#memory-form')
        // const div = document.createElement('div')
        // div.append([i])
        // cardFrontFace.appendChild(div)
        // const element = `<img src="${this.memoryCards[i].img}">`
        const image = document.createElement('img')
        image.setAttribute('src', this.memoryCards[i].img)
        // cardFrontFace.append(image)
        memoryForm.appendChild(card)
        // console.log(card.shadowRoot.lastElementChild.lastElementChild.lastElementChild)
        // document.body.style.backgroundImage = "url('img_tree.png')";
        console.log(`url('${this.memoryCards[i].img}');`)
      }
    }
  }
)
