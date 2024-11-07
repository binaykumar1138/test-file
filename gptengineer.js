"use strict";(()=>{var b=Object.defineProperty,I=Object.defineProperties;var _=Object.getOwnPropertyDescriptors;var g=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var f=(o,s,e)=>s in o?b(o,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[s]=e,w=(o,s)=>{for(var e in s||(s={}))N.call(s,e)&&f(o,e,s[e]);if(g)for(var e of g(s))S.call(s,e)&&f(o,e,s[e]);return o},v=(o,s)=>I(o,_(s));var p=(o,s,e)=>new Promise((i,l)=>{var a=r=>{try{n(e.next(r))}catch(c){l(c)}},t=r=>{try{n(e.throw(r))}catch(c){l(c)}},n=r=>r.done?i(r.value):Promise.resolve(r.value).then(a,t);n((e=e.apply(o,s)).next())});var L=()=>{let o=()=>{let s=document.location.href,e=document.querySelector("body"),i=new MutationObserver(()=>{s!==document.location.href&&(s=document.location.href,window.top&&(window.top.postMessage({type:"URL_CHANGED",url:document.location.href},"https://gptengineer.app"),window.top.postMessage({type:"URL_CHANGED",url:document.location.href},"http://localhost:3000")))});e&&i.observe(e,{childList:!0,subtree:!0})};window.addEventListener("load",o)};var d=o=>{var s,e;(s=window.top)==null||s.postMessage(o,"https://gptengineer.app"),(e=window.top)==null||e.postMessage(o,"http://localhost:3000")};var M=o=>{let s=window.fetch;window.fetch=function(...e){return p(this,null,function*(){var i,l,a;try{let t=yield s(...e);if(!t.ok){let n=t!=null&&t.text?yield t.text():void 0;o("non_200_response",v(w({},t),{status:t.status,url:(e==null?void 0:e[0])||t.url,body:n,method:((i=e==null?void 0:e[1])==null?void 0:i.method)||"GET",origin:window.location.origin}))}return t}catch(t){if(t instanceof TypeError)o("fetch_error",{message:t==null?void 0:t.message,stack:t==null?void 0:t.stack,url:e==null?void 0:e[0],method:((l=e==null?void 0:e[1])==null?void 0:l.method)||"GET",origin:window.location.origin});else{let n={url:e==null?void 0:e[0],method:((a=e==null?void 0:e[1])==null?void 0:a.method)||"GET",origin:window.location.origin,message:"Unknown fetch error",stack:"Not available"};typeof t=="object"&&t!==null&&"message"in t&&typeof t.message=="string"&&(n.message=t.message),typeof t=="object"&&t!==null&&"stack"in t&&typeof t.stack=="string"&&(n.stack=t.stack),o("fetch_error",n)}throw t}})}},T=(()=>{let o=!1,s=({message:e,lineno:i,colno:l,filename:a,error:t})=>({message:e,lineno:i,colno:l,filename:a,stack:t==null?void 0:t.stack});return()=>{if(o)return;let e=new Set,i=n=>{let{lineno:r,colno:c,filename:m,message:u}=n;return`${u}|${m}|${r}|${c}`};M((n,r)=>p(void 0,null,function*(){n==="non_200_response"?d({type:"FETCH_ERROR",error:{message:`failed to call url ${r.url} with status ${r.status} and statusText ${r.statusText}`,status:r.status,statusText:r.statusText,url:r.url,body:r.body}}):n==="fetch_error"&&d({type:"FETCH_ERROR",error:r})}));let a=n=>e.has(n)?!0:(e.add(n),setTimeout(()=>e.delete(n),5e3),!1),t=n=>{let r=i(n);if(a(r))return;let c=s(n);d({type:"RUNTIME_ERROR",error:c})};window.addEventListener("error",t),window.addEventListener("unhandledrejection",n=>{var m,u,h,E,y;if(!((m=n.reason)!=null&&m.stack))return;let r=((u=n.reason)==null?void 0:u.stack)||((h=n.reason)==null?void 0:h.message)||String(n.reason);if(a(r))return;let c={message:((E=n.reason)==null?void 0:E.message)||"Unhandled promise rejection",stack:((y=n.reason)==null?void 0:y.stack)||String(n.reason)};d({type:"UNHANDLED_PROMISE_REJECTION",error:c})}),o=!0}})();var D={log:console.log,warn:console.warn,error:console.error},k={log:"info",warn:"warning",error:"error"},O=(()=>{let o=!1;return()=>{if(o)return;let s=e=>{console[e]=(...i)=>{D[e].apply(console,i),d({type:"CONSOLE_OUTPUT",level:k[e],message:i.map(l=>typeof l=="object"?JSON.stringify(l):String(l)).join(", "),logged_at:new Date().toISOString()})}};s("log"),s("warn"),s("error"),o=!0}})();var C=()=>{let o=document.createElement("script");o.textContent=`
   (() => {
    // Configuration
    const CONFIG = {
      HIGHLIGHT_COLOR: '#4282C1',
      HIGHLIGHT_BG: '#4285f41a',
      ALLOWED_ORIGINS: ['https://gptengineer.app', 'http://localhost:3000'],
      DEBOUNCE_DELAY: 10,
      Z_INDEX: 10000,
      TOOLTIP_OFFSET: 25,
    };
  
    // State management using a class
    class SelectorState {
      constructor() {
        this.hoveredElement = null;
        this.isActive = false;
        this.tooltip = null;
        this.scrollTimeout = null;
        this.mouseX = 0;
        this.mouseY = 0;
      }
  
      reset() {
        this.hoveredElement = null;
        this.scrollTimeout = null;
      }
    }
  
    const state = new SelectorState();
  
    // Utility functions
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };
    };
  
    const postMessageToParent = (message) => {
      CONFIG.ALLOWED_ORIGINS.forEach(origin => {
        try {
          // Check if we have access to parent window
          if (window.parent) {
            window.parent.postMessage(message, origin);
          }
        } catch (error) {
          console.error(\`Failed to send message to \${origin}:\`, error);
        }
      });
    };
  
    // DOM manipulation functions
    const createTooltip = () => {
      state.tooltip = document.createElement('div');
      state.tooltip.className = 'gpt-selector-tooltip';
      state.tooltip.setAttribute('role', 'tooltip');
      document.body.appendChild(state.tooltip);
  
      const style = document.createElement('style');
      style.textContent = \`
        .gpt-selector-tooltip {
          position: fixed;
          z-index: \${CONFIG.Z_INDEX};
          pointer-events: none;
          background-color: \${CONFIG.HIGHLIGHT_COLOR};
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: bold;
          line-height: 1;
          white-space: nowrap;
          display: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: opacity 0.2s ease-in-out;
        } 
      \`;
      document.head.appendChild(style);
    };
  
    const updateTooltip = (element) => {
      if (!state.tooltip || !element) return;

      try {
        const rect = element.getBoundingClientRect();
        const tagName = element.tagName.toLowerCase();
        
        state.tooltip.textContent = tagName;
        state.tooltip.style.left = \`\${Math.max(0, rect.left)}px\`;
        state.tooltip.style.top = \`\${Math.max(0, rect.top - state.tooltip.offsetHeight - CONFIG.TOOLTIP_OFFSET)}px\`;
      } catch (error) {
        console.error('Error updating tooltip:', error);
        hideTooltip();
      }
    };
  
    const highlightElement = (element) => {
      element.style.outline = \`2px dashed \${CONFIG.HIGHLIGHT_COLOR}\`;
      element.style.backgroundColor = CONFIG.HIGHLIGHT_BG;
      element.style.cursor = 'crosshair';
    };
  
    const unhighlightElement = (element) => {
      element.style.outline = '';
      element.style.backgroundColor = '';
      element.style.cursor = '';
    };
  
    // Event handlers
    const handleMouseOver = debounce((e) => {
      if (!state.isActive) return;
  
      if (state.hoveredElement) {
        unhighlightElement(state.hoveredElement);
      }
  
      state.hoveredElement = e.target;
      highlightElement(state.hoveredElement);
  
      updateTooltip(state.hoveredElement);
      state.tooltip.style.display = 'block';
      state.tooltip.style.opacity = '1';
    }, CONFIG.DEBOUNCE_DELAY);
  
    const getElementData = (element) => {
      const filePath = element.getAttribute('data-component-path') || null;
      const fileName = element.getAttribute('data-component-file') || null;
      const elementType = element.tagName.toLowerCase();
      const lineNumber = parseInt(element.getAttribute('data-component-line') || '0', 10);
      const content = element.getAttribute('data-component-content') || null;

      return {
        filePath,
        fileName,
        elementType,
        lineNumber,
        content
      };
    };
  
     const handleClick = (e) => {
        if (!state.isActive) return;
        e.preventDefault();
        e.stopPropagation();

        if (state.hoveredElement) {
        const elementData = getElementData(state.hoveredElement);
        postMessageToParent({
            type: 'ELEMENT_CLICKED',
            payload: elementData,
            isMultiSelect: e.metaKey || e.ctrlKey
        });
      }
    };
  
    const handleMouseOut = debounce(() => {
      if (!state.isActive) return;
      if (state.hoveredElement) {
        unhighlightElement(state.hoveredElement);
        state.hoveredElement = null;
      }
      hideTooltip();
    }, CONFIG.DEBOUNCE_DELAY);
  
    const hideTooltip = () => {
      state.tooltip.style.opacity = '0';
      state.tooltip.style.display = 'none';
    };
  
    const handleScroll = () => {
      if (state.scrollTimeout) {
        clearTimeout(state.scrollTimeout);
      }
      hideTooltip();
      if (state.hoveredElement) {
        unhighlightElement(state.hoveredElement);
      }
      state.scrollTimeout = setTimeout(() => {
        state.scrollTimeout = null;
      }, 420);
    };

    const handleMouseDown = (e) => {
      if (!state.isActive) return;
      
      if (e.target.tagName.toLowerCase() === 'input' ||
          e.target.tagName.toLowerCase() === 'textarea' ||
          e.target.tagName.toLowerCase() === 'select') {
          e.preventDefault();
      }
    };
  
    // Update addListeners to remove keydown from here since we handle it globally
    const addListeners = () => {
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);
      document.addEventListener('click', handleClick);
      window.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('mousedown', handleMouseDown, true);
      document.body.style.cursor = 'crosshair';

      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      document.body.style.msUserSelect = 'none';
      document.body.style.mozUserSelect = 'none';
    };

    // Update removeListeners to match addListeners (remove keydown handling)
    const removeListeners = () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      document.addEventListener('mousedown', handleMouseDown, true);
      document.body.style.cursor = '';

      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.msUserSelect = '';
      document.body.style.mozUserSelect = '';
  
      if (state.hoveredElement) {
        unhighlightElement(state.hoveredElement);
        state.hoveredElement = null;
      }
      hideTooltip();
    };

    const handleKeyDown = (e) => {
      // Only handle 'v' key when not in an input/textarea
      if (e.key && e.key.toLowerCase() === 'v' && 
          !(e.target instanceof HTMLInputElement) && 
          !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        e.stopPropagation();
        postMessageToParent({
          type: 'TOGGLE_PICK_AND_EDIT_REQUESTED',
          payload: null
        });
      }
    };

    const getElementFromPoint = (x, y) => {
      return document.elementFromPoint(x, y);
    };

    const handleMessage = (event) => {
      // Validate event origin and data before processing
      if (!event || !event.origin || !event.data || !event.data.type) return;

      if (CONFIG.ALLOWED_ORIGINS.includes(event.origin) && event.data.type === 'TOGGLE_SELECTOR') {
        state.isActive = !!event.data.payload;
        if (state.isActive) {
          const element = getElementFromPoint(state.mouseX, state.mouseY);
          if (element) {
            handleMouseOver({ target: element });
          }
          addListeners();
        } else {
          removeListeners();
          state.reset();
        }
      }
    };

    const trackMousePosition = (e) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
    };

    // Initialization
    const init = () => {
      try {
      createTooltip();
      window.addEventListener('message', handleMessage);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousemove', trackMousePosition);
      postMessageToParent({ type: 'SELECTOR_SCRIPT_LOADED' });
    } catch (error) {
      console.error('Failed to initialize selector script:', error);
    }
    };

    init();
  })();
    `,document.head.appendChild(o)};var x=()=>{window.top!==window.self&&(L(),T(),O(),C())};x();})();