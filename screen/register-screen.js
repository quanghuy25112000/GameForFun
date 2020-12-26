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
    margin-bottom:20px;
}

.register-container{
    text-align:center;
}
.register-container button{
    width:50%;
    height:40px;
}
.input{
    text-align:center;
    padding:20px;
    
}
</style>`
// import '../component/inputWrapper.js'

import {getDatas} from '../ultis.js'
export class RegisterScreen extends HTMLElement{
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
            <div class="register-container">
                <form id="register-form">
                    <input-wrapper class="input" id="gmail" type="text" placeholder="User gmail"></input-wrapper>
                    <input-wrapper class="input" id="name" type="text" placeholder="User name"></input-wrapper>
                    <input-wrapper class="input" id="password" type="password" placeholder="User password"></input-wrapper>
                    <input-wrapper class="input" id="confim-password" type="password" placeholder="Cofim Password"></input-wrapper>
                    <button class="button">Register</button>
                    <br>
                    <a id="redirect">Already have an account? Login</a>
                </form>
            </div>
        </div>
        `
        const registerForm=this.shadowDom.getElementById('register-form');
        registerForm.addEventListener('submit',async(e)=>{
            e.preventDefault()
            const gmail=this.shadowDom.getElementById('gmail').value
            const name=this.shadowDom.getElementById('name').value
            const password=this.shadowDom.getElementById('password').value
            
            const confimpass=this.shadowDom.getElementById('confim-password').value
            if(gmail.trim()===''){
                this.setError('gmail','must not be left blank')
            }
            else this.setError('gmail','')
            if(name.trim()===''){
                this.setError('name','must not be left blank')
            }
            else this.setError('name','')
            if(password.trim()===''){
                this.setError('password','must not be left blank')
            }
            else this.setError('password','')
            if(confimpass.trim()===''){
                this.setError('confim-password','must not be left blank')
            }
            else this.setError('confim-password','')
            if(confimpass!==password){
                this.setError('confim-password','password incorrect')
            }
            else this.setError('confim-pasword','')
            console.log(gmail);
        })
        this.shadowDom.getElementById('redirect').addEventListener('click',()=>{
            router.navigate('login')
        })
    }
    setError(id,message){
        this.shadowDom.getElementById(id).setAttribute('error',message)
    }
}
async function getMany(){
    const res =await firebase.firestore().collection('user').get()
    const user=getDatas(res)
   
    console.log(user);
}
getMany()
window.customElements.define('register-screen',RegisterScreen)