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
       /* opacity: 0.5; */
       visibility: hidden;
     }

     .faceUp {
       /* pointer-events: none; */
       transform: rotateY(180deg);
     }

     .faceDown {
       /* pointer-events: auto; */
       transform: rotateY(0deg);
     }

   </style>

   <div class="container">
     <div id="button-alternatives">
       <button class="button-mode" id="easy-button">Easy</button>
       <button class="button-mode" id="medium-button">Medium</button>
       <button class="button-mode" id="hard-button">Hard</button>
     </div>
     <div id="moves"></div>
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
        this.shuffleCards(2)
      })

      this.mediumButton = this.shadowRoot.querySelector('#medium-button')
      this.mediumButton.addEventListener('click', (event) => {
        this.memoryForm.innerHTML = ''
        this.shuffleCards(4)
      })

      this.hardButton = this.shadowRoot.querySelector('#hard-button')
      this.hardButton.addEventListener('click', (event) => {
        this.memoryForm.innerHTML = ''
        this.shuffleCards(8)
      })
    }

    fillMemoryBoard (doubleCards) {
      let myArray = []
      for (let i = 0; i < doubleCards.length; i++) {
        const card = document.createElement('my-memory-game-flipping-card')
        // const flipCardInner = card.shadowRoot.lastElementChild.lastElementChild
        const cardFrontFace = card.shadowRoot.querySelector('.flip-card-front')
        cardFrontFace.style.backgroundImage = `url('${doubleCards[i].img}')`
        card.classList.add(`${doubleCards[i].name}`)
        console.log(card)
        // const image = document.createElement('img')
        // image.setAttribute('src', this.memoryCards[i].img)
        // cardFrontFace.append(image)
        this.memoryForm.appendChild(card)
        card.addEventListener('click', (event) => {
          // console.log(event.target.classList.value)
          // console.log(event.target.shadowRoot.lastElementChild)
          // console.log(event.target.shadowRoot.lastElementChild.lastElementChild.lastElementChild.style.backgroundImage)
          // console.log(event.target.shadowRoot.lastElementChild.lastElementChild.lastElementChild.style.backgroundImage === `url("${doubleCards[i].img}")`)
          myArray.push(event.target)
          // console.log(myArray)
          // console.log(myArray[0].shadowRoot.lastElementChild.lastElementChild.lastElementChild)
          if (myArray.length === 2) {
            // console.log('2:an')
            this.gameOver()
            this.moves++
            this.movesDiv.textContent = `${this.moves} moves`
            this.memoryForm.style.pointerEvents = 'none'
            // myArray[0].shadowRoot.lastElementChild.lastElementChild.lastElementChild.style.pointerEvents = 'none'
            // myArray[1].shadowRoot.lastElementChild.lastElementChild.lastElementChild.style.pointerEvents = 'none'
            // flipCardInner.style.pointerEvents = 'auto'
            // this.memoryForm.style.pointerEvents = 'none'
            // återställ med this.memoryForm.style.pointerEvents = 'auto'
            // console.log('-------', myArray[0].classList.value)
            if (myArray[0].classList.value === myArray[1].classList.value) {
              // console.log('TRUE! Its a match!')
              this.memoryForm.style.pointerEvents = 'auto'
              myArray[0].classList.toggle('hidden')
              myArray[1].classList.toggle('hidden')
              myArray = []
            } else {
              setTimeout(() => {
                // console.log('SET TIMEOUT???')
                // console.log(myArray[0].shadowRoot.lastElementChild)
                myArray[0].removeFlip()
                myArray[1].removeFlip()
                // myArray[1].shadowRoot.lastElementChild.classList.toggle('flip')
                // console.log(myArray[0].shadowRoot.lastElementChild)
                // myArray[0].shadowRoot.lastElementChild.lastElementChild.style.transform = 'rotateY(0deg)'
                // myArray[1].shadowRoot.lastElementChild.lastElementChild.style.transform = 'rotateY(0deg)'
                // this.flipCardInner.style.transform = 'rotateY(0deg)'
                // flipCardInner.style.transform = 'rotateY(0deg)'
                this.memoryForm.style.pointerEvents = 'auto'
                myArray = []
              }, 1000)
            }
          }
        })
      }
    }

    shuffleCards (qtyCards) {
      this.memoryCards.sort(() => 0.5 - Math.random())
      const copyArr = this.memoryCards.slice(0, qtyCards)
      const doubleCards = copyArr.concat(copyArr)
      doubleCards.sort(() => 0.5 - Math.random())
      this.fillMemoryBoard(doubleCards)
    }

    gameOver () {
      // console.log('GAME OVER?')
      // console.log(this.memoryForm.childElementCount)
      // console.log(this.memoryForm.children)
      // console.log(this.memoryForm.children[0].classList.contains('hidden'))
      const h1Tag = document.createElement('h1')
      h1Tag.textContent = 'GAME OVER!'
      for (let i = 0; i < this.memoryForm.childElementCount; i++) {
        // console.log('Loop Loop')
        if (this.memoryForm.children[i].classList.contains('hidden')) {
          // console.log('SANT!!!')
          this.memoryForm.appendChild(h1Tag)
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

    // Timer
    // let second = 0
    // let minute = 0
    // let hour = 0
    // let timer = document.querySelector('.timer')
    // let interval
    // startTimer () {
    //   interval = setInterval(function(){
    //     timer.innerHTML = minute+ 'mins ' + second + 'secs'
    //     second++
    //     if (second == 60) {
    //       minute++
    //       second = 0
    //     }
    //     if (minute == 60 ) {
    //       hour++
    //       minute = 0
    //     }
    //   }, 1000)
    // }
  }
)

// Todo list------------------
// Om brädan är tom så är spelet över, börja om-knapp.
// Extrafunktion: Sätta en timer för att ta tid på spelet.

// Done ----------------------
// Slumpa fram korten.
// Ta fram 8 bilder till memory.
// Spelet ska kunna köras i tre olika svårighetsgrader. 2x2, 4x2, 4x4.
// Kolla om korten matchar och göm dem.
// Vänd tillbaka korten efter några sekunder.
// Räkna antal försök.
