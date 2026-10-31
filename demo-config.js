window.DEMO_MESSAGE = 'Portfolio demo · Sample notices · Edits affect this browser only; no classroom service is connected.';
window.demoConfigRequest = async (_url, options = {}) => {
  const key = 'portfolio-demo-exam-config-v1';
  if (options.method === 'POST') {
    const config = JSON.parse(options.body).config;
    config.updatedAt = new Date().toISOString();
    localStorage.setItem(key, JSON.stringify(config));
    return new Response(JSON.stringify({ok:true,config}));
  }
  const value = localStorage.getItem(key);
  return new Response(JSON.stringify(value ? {config:JSON.parse(value)} : {}), {status:value?200:404});
};
