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
export class Gameplay2 extends HTMLElement{
    listQues2
    order
    score
    constructor(){
        super()
        this.listQues2= []
        this.score=0
        this.order=0
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    async connectedCallback(){
        this.shadowDom.innerHTML=`
        ${style}
        
        <div id="question-answer">
            
        </div>
        <div id="score">0</div>
        `
        // lay du lieu ve
        this.listQues2 = await this.getMany(2)
        
        this.showQuestion(0)  
        
         
    }
    async getMany(i){
        const res =await firebase.firestore().collection('questions').where('group','==',i).get()
        const questions=getDatas(res)
        return questions   
    }
    showQuestion(index){
        const question = this.listQues2[index]
        this.shadowDom.querySelector('#question-answer').innerHTML = `
        <div id="question">
                <game-question id="game-question" question="${question.question}"></game-question>
            </div>
            <div id="all-answer">
                    <game-answer id="a1" answer="${question.answers[0].content}" isTrue="${question.answers[0].isTrue}"></game-answer>
                    <game-answer id="a2" answer="${question.answers[1].content}" isTrue="${question.answers[1].isTrue}"></game-answer>
                    <game-answer id="a3" answer="${question.answers[2].content}" isTrue="${question.answers[2].isTrue}"></game-answer>
                    <game-answer  id="a4" answer="${question.answers[3].content}" isTrue="${question.answers[3].isTrue}"></game-answer> 
                
            </div>
        `
        this.shadowDom.querySelector('#all-answer').addEventListener('click', (e) => {
            console.log(this.shadowDom.querySelector('#' + e.target.id).getAttribute('isTrue'))
             if(this.shadowDom.querySelector('#' + e.target.id).getAttribute('isTrue')==1) {
                this.loop()
                
             }
            
         })
        
    }
    loop(){
         this.showQuestion(this.order+1)
         this.order++;
         this.score++
         this.shadowDom.getElementById('score').innerHTML=`${this.score}`
    }
}
window.customElements.define('gameplay2-screen',Gameplay2)