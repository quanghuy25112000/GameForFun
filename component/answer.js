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
                <div class="answer">
                    ${this.answer}
                </div>
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