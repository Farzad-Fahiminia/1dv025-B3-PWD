/**
 * The flipping card script file of the application.
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
     /* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
    .flip-card {
      cursor: pointer;
      margin: 5px;
      padding: 0;
      background-color: transparent;
      width: 120px;
      height: 120px;
      border-radius: 10px;
      border: 1px solid #f1f1f1;
      perspective: 1000px; /* Remove this if you don't want the 3D effect */
    }

    /* This container is needed to position the front and back side */
    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: 0.8s;
      transform-style: preserve-3d;
    }

    /* Position the back and front side */
    .flip-card-back, .flip-card-front {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden; /* Safari */
      backface-visibility: hidden;
      border-radius: 10px;
    }

    /* Style the back side (fallback if image is missing) */
    .flip-card-back {
      background-color: #72c4bf;
      color: #000000;
      display: block;
      content: '';
      background-image: url('js/components/my-memory-game-flipping-card/images/back.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 90px auto;
      position: absolute;
      top: 0; bottom: 0; left: 0; right: 0;
      margin: auto;
    }

    /* Style the front side */
    .flip-card-front {
      background-color: #fff;
      color: #1d1d1d;
      display: block;
      content: '';
      background-image: url('js/components/my-memory-game-flipping-card/images/0.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 90px auto;
      position: absolute;
      top: 0; bottom: 0; left: 0; right: 0;
      margin: auto;
      transform: rotateY(180deg);
    }
   </style>
      
      <button class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-back"></div>
          <div class="flip-card-front"></div>
       </div>
      </button>
 `

/**
 * Define custom element.
 */
customElements.define('my-memory-game-flipping-card',
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

      this.flipCard = this.shadowRoot.querySelector('.flip-card')
      this.flipCardInner = this.shadowRoot.querySelector('.flip-card-inner')

      this.flipCard.addEventListener('click', (event) => {
        event.preventDefault()
        if (!this.flipCard.classList.contains('flip')) {
          this.flipCard.classList.add('flip')
        }
        this.flipCardOnClick()
      })
    }

    /**
     * Flip card on click.
     *
     */
    flipCardOnClick () {
      if (this.flipCard.classList.contains('flip')) {
        this.flipCardInner.style.transform = 'rotateY(180deg)'
      }
    }

    /**
     * Flip back card on demand.
     *
     */
    removeFlip () {
      this.flipCardInner.style.transform = 'rotateY(0deg)'
      this.flipCard.classList.remove('flip')
    }
  }
)
