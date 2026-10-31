(() => {
  const mount = () => {
    const note = document.createElement('aside');
    note.setAttribute('aria-label','Demonstration privacy notice');
    note.style.cssText='position:relative;z-index:10000;display:block;padding:12px 18px;background:#123d34;color:#fff;font:14px/1.5 system-ui;text-align:center;';
    const label=document.createElement('span');
    label.textContent=window.DEMO_MESSAGE || 'Portfolio demo · Fictional data · Changes stay in this browser. Do not enter real personal information.';
    note.append(label);
    if (window.DEMO_PROJECT) {
      const reset=document.createElement('button');
      reset.type='button'; reset.textContent='Reset demo';
      reset.style.cssText='margin-left:12px;padding:4px 9px;border:1px solid white;border-radius:5px;background:transparent;color:white;font:inherit;cursor:pointer;';
      reset.onclick=()=>{sessionStorage.removeItem(`portfolio-demo-v1:${window.DEMO_PROJECT}`);location.reload();};
      note.append(reset);
    }
    document.body.prepend(note);
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();
})();
