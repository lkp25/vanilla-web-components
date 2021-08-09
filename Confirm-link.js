class ConfirmLink extends HTMLAnchorElement{
    connectedCallback(){
        this.addEventListener('click', e=>{
            //on click prompt window shows up asking. if no is clicked, prevent default behavior of link clicked
            if(!confirm('do you want to leave this page?')){
                e.preventDefault()
            }
        })
    }
}
customElements.define('lkp-anchor', ConfirmLink, {extends: "a"})