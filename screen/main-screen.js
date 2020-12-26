const style=`<style>
    #main{
        border: 3px solid black outset;
        box-shadow: 5px 5px 5px #FA8525;
        height:500px;
        width:500px;
        margin:auto;
        padding:40px;
        border-radius:30px;
        background-image: linear-gradient(to right, #000000, #F78E2D); 
    }
    #img{
        margin-bottom:20vh;
    }
    .button{
        border:3px solid black;
        background-color:#F57125;
        width:200px;
        height:50px;
        
        font-size:20px;
        font-weight:bold;
        border-radius:10px;
        cursor:pointer;
        margin:auto;
        display:block;
        margin-top:20px;
    }
</style>`
import '../component/background.js'
export class MainScreen extends HTMLElement{
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
            <div>
                <button class="button">Start Game</button>
            </div>
            <div>
             <button class="button">Creat Room</button>
            </div>
            <div><button class="button">About Us</button></div>
        </div>
        `
    }
}
window.customElements.define('main-screen',MainScreen)