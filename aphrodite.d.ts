
declare module 'aphrodite' {

  namespace StyleSheet {
    function create(sheetDefinition: Object): any;

    function rehydrate(renderedClassNames: string[]): void;
  }

  namespace StyleSheetServer {
    function renderStatic(renderFunc: Function): { html: string, css: string }
  }

  function css(...styleDefintions): string
}
