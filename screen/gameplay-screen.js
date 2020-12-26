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
    game-answer{
        
        
    }
</style>`
import {getDatas} from '../ultis.js'
export class Gameplay extends HTMLElement{
    listQues1
    listQues2
    listQues3
    constructor(){
        super()
        this.listQues1= []
        this.listQues2= []
        this.listQues3= []
        this.shadowDom=this.attachShadow({mode:'open'})

    }
    async connectedCallback(){
        this.shadowDom.innerHTML=`
        ${style}
        <div id="question-answer">
            
        </div>
        `
        // lay du lieu ve
        this.listQues1 = await this.getMany(1)
        this.listQues2 = await this.getMany(2)
        this.listQues3 = await this.getMany(3)
        this.showQuestion(0)
       
    }
    async getMany(i){
        const res =await firebase.firestore().collection('questions').where('group','==',i).get()
        const user=getDatas(res)
        return user
        
    }
    showQuestion(index){
        const question = this.listQues1[index]
        this.shadowDom.querySelector('#question-answer').innerHTML = `
        <div id="question">
                <game-question id="game-question" question="${question.question}"></game-question>
            </div>
            <div id="all-answer">
                    <game-answer id="a1" answer="${question.answers[0].content}" ></game-answer>
                    <game-answer id="a2" answer="${question.answers[1].content}" ></game-answer>
                    <game-answer id="a3" answer="${question.answers[2].content}" ></game-answer>
                    <game-answer  id="a4" answer="${question.answers[3].content}"></game-answer> 
                
            </div>
        `
        // this.shadowDom.getElementById(id).setAttribute('question',question)
        this.shadowDom.querySelector('#all-answer').addEventListener('click', (e) => {
           console.log(this.shadowDom.querySelector('#' + e.target.id).getAttribute('answer'))
            // if(e.target.id=='a1')
        })
    }
    showAnswer(id,answer){
        this.shadowDom.getElementById(id).setAttribute('answer',answer)
    }
   
}



window.customElements.define('gameplay-screen',Gameplay)