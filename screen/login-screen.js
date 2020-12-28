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
    box-shadow: 0px 0px 25px #ac0c00;
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
    font-size: 50px;
}
.login-container{
    text-align:center;
}
.login-container button{
    width:50%;
    height:40px;
}
.btn-5 {
    margin-top:2vh;
    border: 0 solid;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
    outline: 1px solid;
    outline-color: rgba(255, 255, 255, .5);
    outline-offset: 0px;
    text-shadow: none;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
    background-color: red;
    cursor: pointer;
    cursor: pointer;font-family: 'Langar', cursive;
    font-size: 22px;
    color:yellow;
  } 
  
  .btn-5:hover {
    border: 1px solid;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
    outline-color: rgba(255, 255, 255, 0);
    outline-offset: 15px;
    text-shadow: 1px 1px 2px #427388;
    border-radius: 10px;
  }
.input{
    text-align:center;
    padding:20px;
    
}
#redirect{
    color: yellow;
    cursor: pointer;
    cursor: pointer;font-family: 'Langar', cursive;
    font-size: 20px;
}
</style>`
import '../component/inputWrapper.js'
import {getDatas,saveToLocalStorage} from '../ultis.js'
export class LoginScreen extends HTMLElement{
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.shadowDom.innerHTML=`
        ${style}
        <div class="home">
            <div class="title">Game For Fun</div>
            <div id="main">
                <div id="img">
                    CI PROJECT
                </div>
                <div class="login-container">
                    <form id="login-form">
                        <input-wrapper class="input" id="gmail" type="text" placeholder="User Gmail"></input-wrapper>
                        <input-wrapper class="input" id="password" type="password" placeholder="User password"></input-wrapper>
                
                        <button class="btn btn-5">Login</button>
                        <br>
                        <br>
                        <a id="redirect">Already have not an account? Register</a>
                    </form>
                </div>
            </div>
        </div>
        `
        this.shadowDom.getElementById('login-form').addEventListener('submit',async (e)=>{
            e.preventDefault()
            let ok=true;
            const gmail=this.shadowDom.getElementById('gmail').value
            const password=this.shadowDom.getElementById('password').value
            if(gmail.trim()===''){
                this.setError('gmail','must not be left blank')
                ok=false
            }else this.setError('gmail','')
            if(password.trim()===''){
                this.setError('password','must not be left blank')
                ok=false
            }else this.setError('password','')
            if(ok){
                const check=await this.checkGmail(gmail,password)
                const user=await firebase.firestore().collection('user').where('gmail','==',gmail).where('password','==',password).get()
                if(!check){
                    saveToLocalStorage('currentUser',getDatas(user)[0])
                    router.navigate('main')
                }else alert('Gmail or Password is not correct')
            }
        })
        this.shadowDom.getElementById('redirect').addEventListener('click',()=>{
            router.navigate('register')
        })
    }
    setError(id,message){
        this.shadowDom.getElementById(id).setAttribute('error',message)
    }
    async checkGmail(gmailClient,passwordClient){
        const res=await firebase.firestore().collection('user').where('gmail','==',gmailClient).where('password','==',passwordClient).get()
        return res.empty
    }
}


window.customElements.define('login-screen',LoginScreen)