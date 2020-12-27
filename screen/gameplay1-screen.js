const style=`<style>
    #question-answer{
        margin:auto;
        
    }
    #question{
        padding:50px;
    }
    #all-answer{
        cursor:pointer; 
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 40px;   
    }
    
</style>`
import {getDatas} from '../ultis.js'
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
        
            this.shadowDom.innerHTML=`
        ${style}
        <div id="all">
        <div id="question-answer">
            
        </div>
        <div id="score">Point: 0</div>
        </div>
        `
        // lay du lieu ve
        this.listQues1 = await this.getMany(1)
        
        this.showQuestion(0) 
        
        
         
    }
    async getMany(i){
        const res =await firebase.firestore().collection('questions').where('group','==',i).get()
        const questions=getDatas(res)
        return questions   
    }
    showQuestion(index){
        const question = this.listQues1[index]
        this.shadowDom.querySelector('#question-answer').innerHTML = `
        <div id="question">
                <game-question id="game-question" question="${question.question}"></game-question>
            </div>
            <div id="all-answer">
                    <game-answer id="a1" answer="${question.answers[0].content}" isTrue="${question.answers[0].isTrue}"></game-answer>
                    <game-answer id="a2" answer="${question.answers[1].content}" isTrue="${question.answers[1].isTrue}"></game-answer>
                    <game-answer id="a3" answer="${question.answers[2].content}" isTrue="${question.answers[2].isTrue}"></game-answer>
                    <game-answer id="a4" answer="${question.answers[3].content}" isTrue="${question.answers[3].isTrue}"></game-answer> 
                
            </div>
            
        `
        this.shadowDom.querySelector('#all-answer').addEventListener('click', (e) => {        
             if(this.order<this.listQues1.length){
                if(this.shadowDom.querySelector('#' + e.target.id).getAttribute('isTrue')==1) {
                    this.loop()
                   
                 }
                 else if(this.shadowDom.querySelector('#' + e.target.id).getAttribute('isTrue')==0){
                    this.shadowDom.querySelector('#all').innerHTML=`<end-screen point="${this.score}"></end-screen>`
                    console.log(this.score);
                    alert('jj')
                 }
             }
             else{
                this.shadowDom.querySelector('#all').innerHTML=`<end-screen point="${this.score}"></end-screen>`
                alert('end')
                            
             }
            
         })
        
    }
    loop(){
         this.showQuestion(this.order+1)
         this.order++;
         this.score++
         this.shadowDom.getElementById('score').innerHTML=`Point: ${this.score}`
    }

}

window.customElements.define('gameplay1-screen',Gameplay1)