const style=`<style>
    .game-answer{
        border: 2px solid black;
        width:70%;
        height:7vw;
        margin:auto;
        
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