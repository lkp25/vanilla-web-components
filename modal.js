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
            }
        </style>
        <div id="backdrop"></div>
        <div id="modal">
            <header>
                <h1>Please Confirm</h1>
            </header>
            <section id="main">
                <slot></slot>
            </section>
            <section id="actions">
                <button>Cancel<button>
                <button>Okay<button>
            </section>
        </div>
        `
    }
}
customElements.define('lkp-modal', Modal)