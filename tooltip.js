class Tooltip extends HTMLElement{
    constructor(){
        super()
        this._tooltipContainer
        this._tooltipIcon
        this._tooltipText = "some dummy text..."
        this._tooltipVisible = false
        //attach shadowDOM
        this.attachShadow({mode: "open"})
        this.shadowRoot.innerHTML = `
            <style>
                span{
                    position:relative;
                }
                div{
                    position:absolute;
                    color:white;
                    background-color:black;
                }
                ::slotted(span){
                    border: 2px solid red;
                }
                :host(.important){
                    border: 2px solid green;
                }
                
            </style>
            <slot></slot>
            <span>(?)</span>
        `
    }
    connectedCallback(){
        //get the text attr value for use in the custom tooltip:
        if(this.hasAttribute('text')){//only use the attr text if it was added (user might not add it!)
            this._tooltipText = this.getAttribute('text')
        }
        this.tooltipIcon = this.shadowRoot.querySelector('span')
       
        //hovering on element listener- bind this to the class instance (the HTMLELEMENT) and not to the mouseenter EVENT!
        this.tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        this.tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        
    }
    attributeChangedCallback(name, oldValue, newValue){
        if(oldValue === newValue){
            return //nothing really changed
        }
        if(name === "text"){
            this._tooltipText = newValue
        }
    }
    disconnectedCallback(){
        console.log('some logic for cleanup');
    }

    //needed static getter:
    static get observedAttributes(){
        //returns array with strings of names of the observed attributes
        return ['text']
    }
    render(){
        let tooltipContainer = this.shadowRoot.querySelector('div')
        if(this._tooltipVisible){
            this._tooltipContainer = document.createElement('div')
            this._tooltipContainer.innerText = this._tooltipText
            this.shadowRoot.appendChild(this._tooltipContainer)
        }else{
            if(tooltipContainer){
                this._tooltipContainer.remove()
                // this.shadowRoot.removeChild(this._tooltipContainer) -- same effect
            }
        }
    }
    //method to be called on hover
    _showTooltip(){
        this._tooltipVisible = true
        this.render()
        
    }
    _hideTooltip(){
        this._tooltipVisible = false
        this.render()

    }
}
customElements.define('lkp-tooltip', Tooltip)