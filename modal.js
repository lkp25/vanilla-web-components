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
            }
            :host([open]) #backdrop, :host([open]) #modal{
                opacity:1;
                pointer-events:all;
            }
            header{
                padding: 1rem;
            }
            header h1{
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
                
                <slot name="title"></slot>
            </header>
            <section id="main">
                <slot></slot>
            </section>
            <section id="actions">
                <button>Cancel</button>
                <button>Okay</button>
            </section>
        </div>
        `
        
    }

    //only change attribute - the change is taken care of by CSS rules abouve.
    open(){
        this.setAttribute('open', '')
    }
    close(){
        this.removeAttribute('open')
    }
    
}
customElements.define('lkp-modal', Modal)


const modal = document.querySelector('lkp-modal')
//all it takes to open and close the modal
// modal.setAttribute('open', '')
// modal.removeAttribute('open', '')