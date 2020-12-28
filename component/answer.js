const style=`<style>
    .game-answer{
        border: 2px solid ;
        width:70%;
        height:7vw;
        margin:auto;
        font-family: 'Chakra Petch', sans-serif;
        cursor: pointer;
        color:#d0d007;
    }
    .answer{
        text-align:center;
        width:100%;
        height:100%;
        cursor:pointer; 
        font-family: 'Chakra Petch', sans-serif;
        color:yellow;
        background-color:black;
        border: 0 solid;
        box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
        outline: 1px solid;
        outline-color: rgba(255, 255, 255, .5);
        outline-offset: 0px;
        text-shadow: none;
        transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
        background-color: #790101;
        cursor: pointer;
        font-size: 28px;
        color:yellow;
    }
    .answer:hover {
        border: 1px solid;
        box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
        outline-color: rgba(255, 255, 255, 0);
        outline-offset: 15px;
        text-shadow: 1px 1px 2px #427388; 
      }
    .answer:focus {
        animation: pulse 1s;
        box-shadow: 0 0 0 2em rgba(#fff,0);  
    }
    
</style>`
export class Answer extends HTMLElement{
    
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.answer=this.getAttribute('answer')
        this.isTrue=this.getAttribute('isTrue')
        this.shadowDom.innerHTML=`
        ${style}
            <div class="game-answer">
                <button class="answer">
                    ${this.answer}
                </button>
            </div>
        `
    }
    // static get observedAttributes(){
    //     return ['answer']
    // }
    // attributeChangedCallback(name, oldName, newName){
    //     if(name==='answer'){
    //         this.shadowDom.querySelector('.answer').innerHTML=newName
    //     }
    // }

}
window.customElements.define('game-answer',Answer)