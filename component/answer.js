const style=`<style>
    .game-answer{
        border: 2px solid black;
        width:25%;
        height:5vw;
        
        
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
        this.shadowDom.innerHTML=`
        ${style}
            <div class="game-answer">
                <div class="answer">
                    hhhh
                </div>
            </div>
        `
    }

}
window.customElements.define('game-answer',Answer)