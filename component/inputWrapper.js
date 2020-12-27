const style=`<style>
    .error{
        color:red;
    }
    input{
        border:3px solid black;
        width:60%;
        border-radius: 5px;
        padding:12px;
        margin-bottom:10px
        
    }
</style>`
export class InputWrapper extends HTMLElement{
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.type=this.getAttribute('type')
        this.placeholder=this.getAttribute('placeholder')
        this.error=this.getAttribute('error') || ''
        this.shadowDom.innerHTML=`
        ${style}
            <div>
                  <input id="input-main" type="${this.type}" placeholder="${this.placeholder}"> 
                  <div class="error">${this.error}</div>
            </div>
        `
    }
    static get observedAttributes(){
        return ['error']
    }
    attributeChangedCallback(name,oldName,newNname){
        if(name==='error'){
            this.shadowDom.querySelector(`.error`).innerHTML=newNname
        }
    }
    getValue(){
        const value=this.shadowDom.getElementById('input-main').value
        return value
    }
    // get value(){
    //     const value=this.shadowDom.getElementById("input-main").value
    //     return value
    // }
}
window.customElements.define('input-wrapper',InputWrapper)