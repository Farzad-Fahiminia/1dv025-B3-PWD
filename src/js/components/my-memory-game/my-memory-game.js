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
       margin-bottom: 10px;
     }

     .button-mode {
       cursor: pointer;
       background-color: #ffffff;
       border-style: none;
       border-radius: 5px;
       padding: 5px 10px;
     }

     .hidden {
       visibility: hidden;
     }

   </style>

   <div class="container">
     <div id="button-alternatives">
       <button class="button-mode" id="easy-button">Easy</button>
       <button class="button-mode" id="medium-button">Medium</button>
       <button class="button-mode" id="hard-button">Hard</button>
     </div>
     <div id="moves"></div><div class="timer"></div>
     <form id="memory-form"><h1>Memory Game</h1><p>Choose a level to begin. Let's Play!</p></form>
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

      this.moves = 0
      this.movesDiv = this.shadowRoot.querySelector('#moves')

      // Images from URL below.
      // https://www.freepik.com/free-vector/isolated-fashion-style-icon-set_5753992.htm#query=90%20s%20icons&position=0&from_view=search
      this.memoryCards = [
        {
          name: 'gameboy',
          img: 'js/components/my-memory-game-flipping-card/images/0.png'
        },
        {
          name: 'mouth',
          img: 'js/components/my-memory-game-flipping-card/images/1.png'
        },
        {
          name: 'lightningbolt',
          img: 'js/components/my-memory-game-flipping-card/images/2.png'
        },
        {
          name: 'rubicscube',
          img: 'js/components/my-memory-game-flipping-card/images/3.png'
        },
        {
          name: 'rollerskate',
          img: 'js/components/my-memory-game-flipping-card/images/4.png'
        },
        {
          name: 'phone',
          img: 'js/components/my-memory-game-flipping-card/images/5.png'
        },
        {
          name: 'lollipop',
          img: 'js/components/my-memory-game-flipping-card/images/6.png'
        },
        {
          name: 'shoe',
          img: 'js/components/my-memory-game-flipping-card/images/7.png'
        }
      ]
      this.memoryForm = this.shadowRoot.querySelector('#memory-form')

      this.easyButton = this.shadowRoot.querySelector('#easy-button')
      this.easyButton.addEventListener('click', (event) => {
        this.memoryForm.innerHTML = ''
        this.moves = 0
        this.movesDiv.textContent = ''
        this.shuffleCards(2)
      })

      this.mediumButton = this.shadowRoot.querySelector('#medium-button')
      this.mediumButton.addEventListener('click', (event) => {
        this.memoryForm.innerHTML = ''
        this.moves = 0
        this.movesDiv.textContent = ''
        this.shuffleCards(4)
      })

      this.hardButton = this.shadowRoot.querySelector('#hard-button')
      this.hardButton.addEventListener('click', (event) => {
        this.memoryForm.innerHTML = ''
        this.moves = 0
        this.movesDiv.textContent = ''
        this.shuffleCards(8)
      })
    }

    /**
     * The main part of the memory game.
     *
     * @param {Array} doubleCards - Cards for memory game.
     */
    fillMemoryBoard (doubleCards) {
      let myArray = []
      this.startTimer()
      for (let i = 0; i < doubleCards.length; i++) {
        const card = document.createElement('my-memory-game-flipping-card')
        const cardFrontFace = card.shadowRoot.querySelector('.flip-card-front')
        cardFrontFace.style.backgroundImage = `url('${doubleCards[i].img}')`
        card.classList.add(`${doubleCards[i].name}`)
        // console.log(card)
        this.memoryForm.appendChild(card)
        card.addEventListener('click', (event) => {
          myArray.push(event.target)
          if (myArray.length === 2) {
            this.moves++
            this.memoryForm.style.pointerEvents = 'none'
            if (myArray[0].classList.value === myArray[1].classList.value) {
              myArray[0].classList.toggle('hidden')
              myArray[1].classList.toggle('hidden')
              this.memoryForm.style.pointerEvents = 'auto'
              myArray = []
            } else {
              setTimeout(() => {
                myArray[0].removeFlip()
                myArray[1].removeFlip()
                this.memoryForm.style.pointerEvents = 'auto'
                myArray = []
              }, 1000)
            }
          }
          this.gameOver()
        })
      }
    }

    /**
     * Shuffle and duplicate cards.
     *
     * @param {number} qtyCards - Number of cards.
     */
    shuffleCards (qtyCards) {
      this.memoryCards.sort(() => 0.5 - Math.random())
      const copyArr = this.memoryCards.slice(0, qtyCards)
      const doubleCards = copyArr.concat(copyArr)
      doubleCards.sort(() => 0.5 - Math.random())
      this.fillMemoryBoard(doubleCards)
    }

    /**
     * Checks if the game is over and presents results.
     *
     */
    gameOver () {
      // console.log('GAME OVER?')
      const h1Tag = document.createElement('h1')
      h1Tag.textContent = 'GAME OVER!'
      for (let i = 0; i < this.memoryForm.childElementCount; i++) {
        if (this.memoryForm.children[this.memoryForm.childElementCount - 1].classList.contains('hidden')) {
          setTimeout(() => {
            this.memoryForm.innerHTML = ''
            this.memoryForm.appendChild(h1Tag)
            this.endTimer()
          }, 1000)
        }
      }
    }

    // matchCards (event) {
    // //   const cardsPicked = document.querySelectorAll('button')
    // //   console.log(cardsPicked.length)
    // //   // const cardImage = cardsPicked.shadowRoot.querySelector('.flip-card-front')
    //   console.log('Event', event)
    //   this.cardsPicked.push(this.cardFrontFace.style.backgroundImage)
    //   console.log(this.cardsPicked)
    // }

    /**
     * Start timer clock.
     *
     */
    startTimer () {
      // Reference https://stackoverflow.com/questions/41632942/how-to-measure-time-elapsed-on-javascript/41633001
      this.startTime = new Date()
    }

    /**
     * End timer clock.
     *
     */
    endTimer () {
      // Reference https://stackoverflow.com/questions/41632942/how-to-measure-time-elapsed-on-javascript/41633001
      this.endTime = new Date()
      let timeDifference = this.endTime - this.startTime // in ms
      // strip the ms
      timeDifference /= 1000

      // get seconds
      const seconds = Math.round(timeDifference)

      const h3Tag = document.createElement('h3')
      h3Tag.textContent = 'You did it in ' + seconds + ' seconds and with ' + this.moves + ' moves!'
      this.memoryForm.appendChild(h3Tag)
    }
  }
)
