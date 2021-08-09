class Tooltip extends HTMLElement{
    constructor(){
        super()
        this._tooltipContainer
        this._tooltipText = "some dummy text..."
        
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
        const tooltipIcon = this.shadowRoot.querySelector('span')
       
        //hovering on element listener- bind this to the class instance (the HTMLELEMENT) and not to the mouseenter EVENT!
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this.shadowRoot.appendChild(tooltipIcon)
    }
    //method to be called on hover
    _showTooltip(){
        this._tooltipContainer = document.createElement('div')
        this._tooltipContainer.innerText = this._tooltipText
        this.shadowRoot.appendChild(this._tooltipContainer)
    }
    _hideTooltip(){
        this._tooltipContainer.remove()
        // this.shadowRoot.removeChild(this._tooltipContainer) -- same effect
    }
}
customElements.define('lkp-tooltip', Tooltip)