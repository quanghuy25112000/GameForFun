const style=`<style>
    .game-answer{
        border: 2px solid red;
        width:70%;
        height:7vw;
        margin:auto;
        font-family: 'Chakra Petch', sans-serif;
        box-shadow: 0 0 20px;
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
        
    }
    .answer:hover,
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