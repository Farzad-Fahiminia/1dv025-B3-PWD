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
      this.memoryCards.sort(() => 0.5 - Math.random())
      this.fillMemoryBoard()
    }

    fillMemoryBoard () {
      for (let i = 0; i < this.memoryCards.length; i++) {
        // console.log(this.memoryCards[i].img)
        // console.log('-----------', this.memoryCards.sort(() => 0.5 - Math.random()))
        const card = document.createElement('my-memory-game-flipping-card')
        const cardFrontFace = card.shadowRoot.querySelector('.flip-card-front')
        cardFrontFace.style.backgroundImage = `url('${this.memoryCards[i].img}')`
        // cardFrontFace.style.backgroundColor = 'red'
        const memoryForm = this.shadowRoot.querySelector('#memory-form')
        // const image = document.createElement('img')
        // image.setAttribute('src', this.memoryCards[i].img)
        // cardFrontFace.append(image)
        memoryForm.appendChild(card)
        // console.log(card.shadowRoot.lastElementChild.lastElementChild.lastElementChild)
        // document.body.style.backgroundImage = "url('img_tree.png')";
      }
    }
  }
)

// Todo list------------------
// Ta fram 8 bilder till memory.
// Kolla om korten matchar och göm dem.
// Om brädan är tom så är spelet över, börja om-knapp.
// Spelet ska kunna köras i tre olika svårighetsgrader.

// Done ----------------------
// Slumpa fram korten.
