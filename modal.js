class Modal extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode:"open"})
        
       
       

        this.shadowRoot.innerHTML = `
        <style>
            #backdrop{
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background-color: hsla(0,70%, 0%, 0.9);
                z-index: 9000000000;
                opacity:0;
                pointer-events:none;
                transition: 0.3s ease-out;

            }
            #modal{
                position: fixed;
                background-color: hsla(0,100%, 90%, 0.9);
                width: 70%;
                height: 300px;
                z-index: 9000000002;
                inset:0;
                margin:auto;
                border-radius:3px;
                padding:0.5rem;
                display: flex;
                flex-direction: column;
                justify-content:space-between;
                opacity:0;
                pointer-events:none;
                transition: 0.3s ease-out;
                transform:translateY(-100px);
            }
            :host([open]) #backdrop, :host([open]) #modal{
                opacity:1;
                pointer-events:all;
            }
            :host([open]) #modal{
                transform:translateY(0px);
            }
            header{
                padding: 1rem;
                border-bottom: 1px solid black;
            }
            ::slotted(h1){
                font-size: 1.5rem;
            }
            #actions{
                padding:1rem;
                border-top: 1px solid black;
                display: flex;
                
                justify-content:flex-end;
            }
            #actions button{
                margin: 0 1rem;
            }
        </style>
        <div id="backdrop"></div>
        <div id="modal">
            <header>
                
                <slot name="title">please confirm</slot>
            </header>
            <section id="main">
                <slot></slot>
            </section>
            <section id="actions">
                <button id="cancelBtn">Cancel</button>
                <button id="confirmBtn">Okay</button>
            </section>
        </div>
        `
        const slots = this.shadowRoot.querySelectorAll('slot')
        slots[1].addEventListener('slotchange', e=>{
            console.dir(slots[1].assignedNodes())
        })
        const backdrop = this.shadowRoot.querySelector('#backdrop')
        backdrop.addEventListener('click', this._cancel.bind(this))
      
        const cancelBtn = this.shadowRoot.querySelector('#cancelBtn')
        const confirmBtn = this.shadowRoot.querySelector('#confirmBtn')


        cancelBtn.addEventListener('click', this._cancel.bind(this))
        confirmBtn.addEventListener('click', this._confirm.bind(this))
    }

    //only change attribute - the change is taken care of by CSS rules abouve.
    open(){
        this.setAttribute('open', '')
    }
    close(){
        this.removeAttribute('open')
    }
    _cancel(event){
        this.close()
        //bubbles means it can go up the dom tree if the target is not the element that triggered it. composed means it can happen in SHADOW DOM which is the case so we need both!
        const cancelEvent = new Event('cancel',{bubbles:true, composed:true})
        event.target.dispatchEvent(cancelEvent)
    }
    _confirm(event){
        this.close()
        //can be simpler, the THIS element can also dispatch the event for us with no other options as it is already part of the light dom.
        const confirmEvent = new Event('confirm')
        this.dispatchEvent(confirmEvent)
    }
    
}
customElements.define('lkp-modal', Modal)


const modal = document.querySelector('lkp-modal')

//custom events: 
modal.addEventListener('confirm', e=>{
    console.log('confirmed....');
})
modal.addEventListener('cancel', e=>{
    console.log('canceleledelde....');

})
const trigger = document.querySelector("#confirm")
trigger.addEventListener('click', e=>{
    modal.open()
})