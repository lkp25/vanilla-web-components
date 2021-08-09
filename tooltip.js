class Tooltip extends HTMLElement{
    constructor(){
        super()
        this._tooltipContainer
        
    }
    connectedCallback(){
        const tooltipIcon = document.createElement('span')
        tooltipIcon.textContent = "(?)"
        //hovering on element listener- bind this to the class instance (the HTMLELEMENT) and not to the mouseenter EVENT!
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this.appendChild(tooltipIcon)
    }
    //method to be called on hover
    _showTooltip(){
        this._tooltipContainer = document.createElement('div')
        this._tooltipContainer.innerText = "this is a ext of tooltip"
        this.appendChild(this._tooltipContainer)
    }
    _hideTooltip(){
        this._tooltipContainer.remove()
    }
}
customElements.define('lkp-tooltip', Tooltip)