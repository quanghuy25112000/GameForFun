const style=`<style>
    .home{
        width: 100vw;
        height: 100vh;
        background: url('https://f20-zpc.zdn.vn/1405777170906197418/e7a3d86d16d5e78bbec4.jpg');
        background-size: cover;
        background-repeat: no-repeat;
    }
    .title{
        font-family: 'Sancreek', cursive;
        color: #fd0000;
        font-size: 100px;
        text-align: center;
    }
    .form{
        box-shadow: 0 0 10px red;
        width: 50vw;
        height: 70vh;
        margin: auto;
        margin-top: 6vh;
        background-color: #272525;
    }
    
    #question{
        padding:50px;
        line-height: 6.5vh;
    }
    #all-answer{
        
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 40px; 
         
    }
    #game-question{
        box-shadow: 0 0 70px red;
    }
    #score{
        color:yellow;
        margin-top:10vh;
        padding:25px 0 0 25px;
    }
    
</style>`
import {getDatas,getItemLocalStorage} from '../ultis.js'
export class Gameplay1 extends HTMLElement{
    listQues1
    order
    score
    ok
    constructor(){
        super()
        this.listQues1= []
        this.score=0
        this.order=0
        this.ok=1;
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    async connectedCallback(){
        
        //<div id="question-answer"></div>

        this.shadowDom.innerHTML=`
        ${style}
        <div id="all">
        <div id="question-answer">
            
        `
        // lay du lieu ve
        this.listQues1 = await this.getMany(1)
        
        this.showQuestion(this.order) 

    }
    async getMany(i){
        const res =await firebase.firestore().collection('questions').where('group','==',i).get()
        const questions=getDatas(res)
        return questions   
    }
    showQuestion(index){
        const question = this.listQues1[index]
        this.shadowDom.querySelector('#question-answer').innerHTML = `
            <div class="home">
                <div class="title">Game For Fun</div>
                <div class="form">
                <div id="score">Point: 0</div>
                    <div id="question">
                        <game-question id="game-question" question="${question.question}"></game-question>
                    </div>
                    <div id="all-answer">
                        <game-answer id="a1" answer="${question.answers[0].content}" isTrue="${question.answers[0].isTrue}"></game-answer>
                        <game-answer id="a2" answer="${question.answers[1].content}" isTrue="${question.answers[1].isTrue}"></game-answer>
                        <game-answer id="a3" answer="${question.answers[2].content}" isTrue="${question.answers[2].isTrue}"></game-answer>
                        <game-answer id="a4" answer="${question.answers[3].content}" isTrue="${question.answers[3].isTrue}"></game-answer> 
                    </div>
                         
                </div>
            </div>
            
        `
        
        this.shadowDom.querySelector('#all-answer').addEventListener('click',(e) => {        
           const id=e.target.id
                setTimeout(()=>{if(this.order<this.listQues1.length-1){  
                if(this.shadowDom.querySelector('#'+id).getAttribute('isTrue')==1) {
                    this.order++
                    this.loop()
                    
                   
                 }
                 else if(this.shadowDom.querySelector('#' + e.target.id).getAttribute('isTrue')==0){
                    this.shadowDom.querySelector('#all').innerHTML=`<end-screen point="${this.score}"></end-screen>`
                    if(this.score>getItemLocalStorage('currentUser').point) this.updatePoint(getItemLocalStorage('currentUser').gmail,this.score)
                    // console.log(this.score);
                    // console.log(getItemLocalStorage('currentUser').id);
                    // let a=await this.updatePoint(getItemLocalStorage('currentUser').gmail);
                    // console.log(a);
                    
                 }
             }
             else{
                this.shadowDom.querySelector('#all').innerHTML=`<end-screen point="${this.score+1}"></end-screen>`
                alert('end')
                            
             }},3000)
            
         })
         
        
    }
    loop(){
        
         this.showQuestion(this.order)
         
         this.score++
         this.shadowDom.getElementById('score').innerHTML=`Point: ${this.score}`
         console.log(this.listQues1);
    }
    async updatePoint(gmail,point){
        const res=await firebase.firestore().collection('user').where('gmail','==',gmail).get()
        const user=getDatas(res)
        firebase.firestore().collection('user').doc(user[0].id).update({'point':point})
    }

}

window.customElements.define('gameplay1-screen',Gameplay1)