class Summon extends HTMLElement{
    constructor(){
        super()
        this.controlButton = document.querySelector('.sometext')        
        //attach shadowDOM
        this.attachShadow({mode: "open"})
        
        this.shadowRoot.innerHTML = `
            <style>
                
                p{
                    
                    color:white;
                    background-color:black;
                    display:none;
                }
            </style>
            
            <p>some info being displayed here if it is visible</p>
        `
    }
    
    

    connectedCallback(){
        this.rootParagraph = this.shadowRoot.querySelector('p')
         this.controlButton.addEventListener('click', e=>{
            if(!this.rootParagraph.hasAttribute('visible')){
               return this.showParagraph()
            }
            if(this.rootParagraph.hasAttribute('visible')){
               return this.hideParagraph()
            }
         })
  
    }
    showParagraph(){
        this.rootParagraph.setAttribute('visible', 'vis')
        this.rootParagraph.style.display = "block"
    }
    hideParagraph(){
        this.rootParagraph.removeAttribute('visible')
        this.rootParagraph.style.display = "none"

    }
   
}
customElements.define('lkp-summon', Summon)