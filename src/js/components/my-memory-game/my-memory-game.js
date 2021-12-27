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

     #button-alternatives {
       cursor: pointer;
       margin-bottom: 10px;
     }

   </style>
   <div class="container">
     <div id="button-alternatives">
       <button class="button-mode" id="easy-button">Easy</button>
       <button class="button-mode" id="medium-button">Medium</button>
       <button class="button-mode" id="hard-button">Hard</button>
     </div>
     <form id="memory-form"></form>
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

      // this.quantityCards = 4

      // Images from URL below.
      // https://www.freepik.com/free-vector/isolated-fashion-style-icon-set_5753992.htm#query=90%20s%20icons&position=0&from_view=search
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
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/2.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/2.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/3.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/3.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/4.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/4.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/5.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/5.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/6.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/6.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/7.png'
        },
        {
          img: 'js/components/my-memory-game-flipping-card/images/7.png'
        }
      ]
      this.memoryLevel = 0
      this.memoryCards.sort(() => 0.5 - Math.random())
      this.card = ''
      this.cardFrontFace = ''
      this.memoryForm = this.shadowRoot.querySelector('#memory-form')
      this.cardsPicked = []

      this.easyButton = this.shadowRoot.querySelector('#easy-button')
      this.easyButton.addEventListener('click', (event) => {
        this.memoryForm.innerHTML = ''
        this.memoryLevel = 4
        this.fillMemoryBoard(this.memoryLevel)
      })

      this.mediumButton = this.shadowRoot.querySelector('#medium-button')
      this.mediumButton.addEventListener('click', (event) => {
        this.memoryForm.innerHTML = ''
        this.memoryLevel = 8
        this.fillMemoryBoard(this.memoryLevel)
      })

      this.hardButton = this.shadowRoot.querySelector('#hard-button')
      this.hardButton.addEventListener('click', (event) => {
        this.memoryForm.innerHTML = ''
        this.memoryLevel = 16
        this.fillMemoryBoard(this.memoryLevel)
      })

      // this.card.addEventListener('click', (event) => {
      //   this.matchCards()
      // })
    }

    fillMemoryBoard (memoryLevel) {
      for (let i = 0; i < memoryLevel; i++) {
        // console.log(this.memoryCards[i].img)
        // console.log('-----------', this.memoryCards.sort(() => 0.5 - Math.random()))
        this.card = document.createElement('my-memory-game-flipping-card')
        this.cardFrontFace = this.card.shadowRoot.querySelector('.flip-card-front')
        this.cardFrontFace.style.backgroundImage = `url('${this.memoryCards[i].img}')`
        // cardFrontFace.style.backgroundColor = 'red'
        // this.memoryForm = this.shadowRoot.querySelector('#memory-form')
        // const image = document.createElement('img')
        // image.setAttribute('src', this.memoryCards[i].img)
        // cardFrontFace.append(image)
        this.memoryForm.appendChild(this.card)
        // console.log(card.shadowRoot.lastElementChild.lastElementChild.lastElementChild)
        // document.body.style.backgroundImage = "url('img_tree.png')";
        // this.matchCards()
        // console.log(memoryForm)
      }

      // this.cardsPicked.push(cardFrontFace.style.backgroundImage)
      // console.log(cardFrontFace.style.backgroundImage)
      console.log(this.cardsPicked)
    }

    // matchCards (event) {
    // //   const cardsPicked = document.querySelectorAll('button')
    // //   console.log(cardsPicked.length)
    // //   // const cardImage = cardsPicked.shadowRoot.querySelector('.flip-card-front')
    //   console.log('Event', event)
    //   this.cardsPicked.push(this.cardFrontFace.style.backgroundImage)
    //   console.log(this.cardsPicked)
    // }
  }
)

// Todo list------------------
// Kolla om korten matchar och göm dem.
// Om brädan är tom så är spelet över, börja om-knapp.
// Spelet ska kunna köras i tre olika svårighetsgrader. 2x2, 4x2, 4x4.
// Extrafunktion: Sätta en timer för att ta tid på spelet.

// Done ----------------------
// Slumpa fram korten.
// Ta fram 8 bilder till memory.
// Vänd tillbaka korten efter några sekunder.
