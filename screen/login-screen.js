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
#img{
    margin-bottom:100px;
}

.login-container{
    text-align:center;
}
.login-container button{
    width:50%;
    height:40px;
}
.input{
    text-align:center;
    padding:20px;
    
}
</style>`
import '../component/inputWrapper.js'
import {getDatas} from '../ultis.js'
export class LoginScreen extends HTMLElement{
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
            <div class="login-container">
                <form id="login-form">
                <input-wrapper class="input" id="name" type="text" placeholder="User name"></input-wrapper>
                <input-wrapper class="input" id="password" type="password" placeholder="User password"></input-wrapper>
                
                <button id="button">Login</button>
                <br>
                <a id="redirect">Already have not an account? Register</a>
                </form>
            </div>
        </div>
        `
        this.shadowDom.getElementById('login-form').addEventListener('submit',(e)=>{
            e.preventDefault()
            router.navigate('main')
        })
        this.shadowDom.getElementById('redirect').addEventListener('click',()=>{
            router.navigate('register')
        })
    }
    
}
async function getMany(){
    const res =await firebase.firestore().collection('user').get()
    const user=getDatas(res)
   
    console.log(user);
}
getMany()
window.customElements.define('login-screen',LoginScreen)