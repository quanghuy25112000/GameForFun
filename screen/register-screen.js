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
    margin-bottom:17px;
    font-family: 'Ewert', cursive;
    text-align:center;
    color: #fd0000;
    font-size: 50px;
}

.register-container{
    text-align:center;
}
.register-container button{
    width:50%;
    height:40px;
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
    font-size: 22px;
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
        <div class="home">
            <div class="title">Game For Fun</div>
            <div id="main">
                <div id="img">
                    CI PROJECT
                </div>
                <div class="register-container">
                    <form id="register-form">
                        <input-wrapper class="input" id="gmail" type="text" placeholder="User Gmail"></input-wrapper>
                        <input-wrapper class="input" id="name" type="text" placeholder="User Name"></input-wrapper>
                        <input-wrapper class="input" id="password" type="password" placeholder="User Password"></input-wrapper>
                        <input-wrapper class="input" id="confim-password" type="password" placeholder="Cofim Password"></input-wrapper>
                        <button class="btn btn-5">Register</button>
                        <br>
                        <br>
                        <a id="redirect">Already have an account? Login</a>
                    </form>
                </div>
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
            let isValid = true;
            if(gmail.trim()===''){
                isValid = false
                this.setError('gmail','Must Not Be Left Blank')
            }
            if(name.trim()===''){
                isValid = false
                this.setError('name','Must Not Be Left Blank')
            }
            if(password.trim()===''){
                isValid = false
                this.setError('password','Must Not Be Left Blank')
            }
            if(confimpass.trim()===''){
                isValid = false
                this.setError('confim-password','Must Not Be Left Blank')
            }
            if(confimpass!==password){
                isValid = false
                this.setError('confim-password','Password Incorrect')
            }
            if (!isValid) {
                return
            }
            const user = {
                fullName: name,
                gmail: gmail,
                password: CryptoJS.MD5(password).toString()
              }
              // nếu email đã tồn tại rồi thì trả ra true
              const check = await this.checkEmailExist(gmail)
              if (check) {
                alert('Email đã được đăng ký')
              } else {
                firebase.firestore().collection('users').add(user)
                alert('Đăng ký thành công')
                router.navigate('/login')
              }
        })
        this.shadowDom.getElementById('redirect').addEventListener('click',()=>{
            router.navigate('login')
        })
    }
    setError(id,message){
        this.shadowDom.getElementById(id).setAttribute('error',message)
    }
    async checkEmailExist(gmail) {
        const res = await firebase.firestore().collection('users')
         .where('email', '==' , gmail).get()
         return !res.empty
    }
}
// async function getMany(){
//     const res =await firebase.firestore().collection('user').get()
//     const user=getDatas(res)
   
 HEAD
   console.log(user);
 }
getMany()
=======
    console.log(user)
}


window.customElements.define('register-screen',RegisterScreen)