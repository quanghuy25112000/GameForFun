const style=`<style>
    .game-question{
        border: 2px solid black;
        width:25%;
        height:5vw;
        margin:auto;
        
        
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