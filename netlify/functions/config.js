// The public portfolio no longer reads or writes a production data store.
export default async () => new Response(JSON.stringify({error:"Retired endpoint. Use the browser-only demo."}), {status:410,headers:{"content-type":"application/json","cache-control":"no-store"}});
