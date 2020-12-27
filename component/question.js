const style=`<style>
    .game-question{
        border: 2px solid red;
        width:70%;
        height:3.5vw;
        margin:auto;
        margin-bottom: 2.5vh;
        box-shadow: 0 0 20px;
        cursor: pointer;
        font-family: 'Chakra Petch', sans-serif;
        font-size: 22px;
        color:#d0d007;
    }
    .question{
        text-align:center;
        
    }
</style>`
export class Question extends HTMLElement{
    
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.question=this.getAttribute('question')
        this.shadowDom.innerHTML=`
        ${style}
            <div class="game-question">
                <div class="question">
                    ${this.question}
                </div>
            </div>
        `
    }
    // static get observedAttributes(){
    //     return ['question']
    // }
    // attributeChangedCallback(name, oldName, newName){
    //     if(name==='question'){
    //         this.shadowDom.querySelector('.question').innerHTML=newName
    //     }
    // }

}
window.customElements.define('game-question',Question)