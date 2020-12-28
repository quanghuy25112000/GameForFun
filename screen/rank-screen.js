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
    height:500px;
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
    margin-top:10vh;
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
      font-size:20px;
      font-family: 'Langar', cursive;
  }
</style>`
import {getDatas,getItemLocalStorage} from '../ultis.js'
export class RankScreen extends HTMLElement{
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    async connectedCallback(){
        this.point=this.getAttribute('point')
        this.shadowDom.innerHTML=`
        ${style}
        <div class="home">
            <div class="title">Game For Fun</div>
            <div id="main">
                <div id="img">
                    TOP 10!
                </div>
                <div >
                    <table id="show-rank">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                        <th>Poin</th>
                        </tr>
                    </table>
                </div>
                <div id="report">
                    Your Point
                </div>
                <div id="point">
                   ${this.point}
                </div>
                <div class="bt"><button id="back-to-home" class="btn btn-5">Back To Home</button></div>
            </div>
        </div>
        `
        this.shadowDom.getElementById('back-to-home').addEventListener('click',()=>{
            router.navigate('main')
        })
        let user=await this.getRank()
        for(let i=0;i<4;i++){
            this.showRank(i+1,user[i].name,user[i].point)
        }
        
        this.shadowDom.getElementById('point').innerHTML=`${getItemLocalStorage('currentUser').point}`
    }
    showRank(a,b,c){
        
        this.shadowDom.getElementById('show-rank').innerHTML+=`
        <tt-dd rank=${a} name=${b} point=${c}></tt-dd>
        <br>
        `
    }
    async getRank(){
        const res=await firebase.firestore().collection('user').orderBy('point','desc').get()
        const user=getDatas(res)
        return user
    }
}

window.customElements.define('rank-screen',RankScreen)