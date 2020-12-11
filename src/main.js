import App from './App.svelte'

var app

if(document.location.origin === 'localhost') {
  app = new App({
    target: document.body,
    props: {
      name: 'world',
    },
  })
  
  // recreate the whole app if an HMR update touches this module
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      app.$destroy()
    })
    import.meta.hot.accept()
  }  
} else {
  /**
   * C.O.A. Gallery Custom Element v1 Component Class
   */
  class DeltaApp extends HTMLElement {
    /**
     * This defines the attributes to watch in the custom element to trigger the `attributeChangedCallback` method
     */
    static get observedAttributes() {
      return []; // ['example'];
    }

    /**
     * @see [https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements](Why the args?)
     * @param  {...any} args
     */
    constructor(...args) {
      super(...args);
    }

    /**
     * Grab props from the elements attributes to pass to the renderer
     */
    connectedCallback() {
      // const example = this.getAttribute('example');
      this.svelte = new App({
        target: this,
        props: {}
      });
    }

    // Invoked each time the custom element is disconnected from the document's DOM.
    disconnectedCallback() {
      this.svelte.$destroy()
    }

    /**
     * Invoked each time one of the custom element's attributes is added,
     * removed, or changed. Which attributes to notice change for is specified
     * in a static get observedAttributes method
     * @param {*} attrName Changed Attributes Name
     * @param {*} oldVal The older value
     * @param {*} newVal The newer value
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
      // Previous State
      const prev = this.svelte.$$.props;

      // Check if previous states still match
      if (prev[attrName] !== oldVal)
        throw new Error('Internal and External Prop Mismatch');

      // Merge previous prop and attribute value change
      const newProp = {
        ...prev,
        [String(attrName)]: newVal,
      };

      // Set svelte components state to the internal prop value
      this.svelte.$$set(newProp);
    }
  }

  // Alamo Botanicals COA Gallery
  customElements.define('delta-app', DeltaApp);
}


export default app