const style=`<style>
#main{
    border: 2px solid black outset;
    box-shadow: 5px 5px 5px #FA8525;
    height:500px;
    width:500px;
    margin:auto;
    padding:40px;
    border-radius:30px;
    background-image: linear-gradient(to right, #000000, #F78E2D); 
}
</style>`
export class Background extends HTMLElement{
    
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.shadowDom.innerHTML=`
        ${style}
        <div id="main">
        <div id="img">
                <img src="cooltext372357914665296.png" alt="logo">
            </div>
            
        </div>
        `
    }
}
window.customElements.define('game-background',Background)