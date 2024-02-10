class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = new CSSStyleSheet();
    style.replaceSync(MyComponent.style.ionic);
    this.shadowRoot.adoptedStyleSheets = [style];

    this.shadowRoot.innerHTML = `
      <p>Hello, World!</p>
    `;
  }
}

MyComponent.style = {};

const stylePromise = new Promise((resolve) => {
  if (MyComponent.style.ionic) {
    resolve();
    return;
  }
  import("./style.js").then(({ default: style }) => {
    MyComponent.style.ionic = style;
    resolve();
  });
});

const defineCustomElement = () => {
  return stylePromise.then(() => {
    customElements.define("my-component", MyComponent);
  });
};

export { defineCustomElement };
