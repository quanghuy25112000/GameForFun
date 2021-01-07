const style=`<style>
.home{
    width: 100vw;
    height: 100vh;
    background: url('https://f20-zpc.zdn.vn/1405777170906197418/e7a3d86d16d5e78bbec4.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}
#main{
    border: 2px solid black outset;
    box-shadow: 0px 0px 20px #ac0c00;
    height:66vh;
    width:25vw;
    margin:auto;
    padding:40px;
    border-radius:30px;
    background-color:#272525;
    margin-top: 2vh;
}
.title{
    font-family: 'Sancreek', cursive;
    color: #fd0000;
    font-size: 100px;
    text-align: center;
}
#img{
    margin-bottom:20px;
    font-family: 'Ewert', cursive;
    text-align:center;
    color: #fd0000;
    font-size: 40px;
    margin-bottom: 10vh;
}
.main button{
    margin: auto;
}
.btn-5 {
    border: 0 solid;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
    outline: 1px solid;
    outline-color: rgba(255, 255, 255, .5);
    outline-offset: 0px;
    text-shadow: none;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
    background-color: red;
    cursor: pointer;
    width: 18vw;
    height: 7vh;
    margin-bottom: 6.5vh;
    font-family: 'Langar', cursive;
    font-size: 27px;
    color:yellow;
    margin-top:20vh;
  } 
  
  .btn-5:hover {
    border: 1px solid;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
    outline-color: rgba(255, 255, 255, 0);
    outline-offset: 15px;
    text-shadow: 1px 1px 2px #427388; 
    border-radius: 10px;
  }
  .bt{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #report{
      color:yellow;
      font-family: 'Langar', cursive;
      font-size:25px;
      text-align:center;
  }
  #point{
      color:yellow;
      text-align:center;
      font-size:40px;
      font-family: 'Langar', cursive;
  }
</style>`
import '../component/background.js'
export class VictoryScreen extends HTMLElement{
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.point=this.getAttribute('point')
        this.shadowDom.innerHTML=`
        ${style}
        <div class="home">
            <div class="title">Game For Fun</div>
            <div id="main">
                <div id="img">
                    VICTORY!
                </div>
                <div id="report">
                    Your Point
                </div>
                <h1 id="point">
                   ${this.point}
                </h1>
                <div class="bt"><button id="back-to-home" class="btn btn-5">Try Diffirent Mode</button></div>
            </div>
        </div>
        `
        
        this.shadowDom.getElementById('back-to-home').addEventListener('click',()=>{
            this.shadowDom.getElementById('main').innerHTML+=`<audio control autoplay src="https://firebasestorage.googleapis.com/v0/b/ci-54-b1555.appspot.com/o/click.mp3?alt=media&fbclid=IwAR2kL_IHYu2isyWouvh-Xyu_y5OL9cm8VKhvO49Z5_vFB8Nmuc043XSrXSU"></audio>`
            setTimeout(()=>{
                router.navigate('mode')
            },300)
        })
    }
}

window.customElements.define('victory-screen',VictoryScreen)