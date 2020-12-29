const style=`<style>
    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>`
export class TD extends HTMLElement{
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.rank=this.getAttribute('rank')
        this.name=this.getAttribute('name')
        this.point=this.getAttribute('point')
        this.shadowDom.innerHTML=`
        ${style}
                <tr>
                    <td class="td">${this.rank}</td>
                    <td class="td">${this.name}</td>
                    <td class="td>${this.point}</td>
                </tr>
        `
    }
}
window.customElements.define('tt-dd',TD)