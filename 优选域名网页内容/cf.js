// 次元星域 · Cloudflare Worker（单文件版）
const CACHE_VERSION="20261126-17";
const ICON_HOSTS={baidu:"www.baidu.com",wechat:"weixin.qq.com",bilibili:"www.bilibili.com",bytedance:"www.bytedance.com",taobao:"www.taobao.com",netease:"music.163.com",jd:"www.jd.com",cloudflare:"www.cloudflare.com",google:"www.google.com",github:"github.com",jsdelivr:"cdn.jsdelivr.net",youtube:"www.youtube.com",x:"x.com",wikipedia:"www.wikipedia.org"};
const PAGE_GZIP_B64=[
  "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"
].join("");

let pagePromise;
async function getPage(){
  if(!pagePromise)pagePromise=(async()=>{
    const b=atob(PAGE_GZIP_B64),bytes=new Uint8Array(b.length);
    for(let i=0;i<b.length;i++)bytes[i]=b.charCodeAt(i);
    const stream=new Response(bytes).body.pipeThrough(new DecompressionStream("gzip"));
    return new Response(stream).text();
  })();
  return pagePromise;
}

function validIP(value){
  const ip=String(value||"").trim().replace(/^\[|\]$/g,"");
  if(/^(?:\d{1,3}\.){3}\d{1,3}$/.test(ip))return ip.split(".").every(x=>+x<=255);
  if(!ip.includes(":"))return false;
  try{return new URL("http://["+ip+"]/" ).hostname.length>0}catch{return false}
}
function json(data,status=200){
  return new Response(JSON.stringify(data),{status,headers:{
    "Content-Type":"application/json; charset=utf-8",
    "Cache-Control":"no-store, no-cache, must-revalidate, max-age=0",
    "CDN-Cache-Control":"no-store",
    "Cloudflare-CDN-Cache-Control":"no-store",
    "X-Content-Type-Options":"nosniff"
  }});
}
function traceResponse(request){
  const cf=request.cf||{},ip=request.headers.get("CF-Connecting-IP")||request.headers.get("True-Client-IP")||"";
  const rows={ip:validIP(ip)?ip:"",colo:cf.colo||"",loc:cf.country||"",asn:cf.asn||"",asOrganization:cf.asOrganization||"",city:cf.city||"",region:cf.region||""};
  return new Response(Object.entries(rows).map(([k,v])=>k+"="+String(v)).join("\n"),{headers:{
    "Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"
  }});
}
async function metaResponse(request){
  const cf=request.cf||{},headerIP=request.headers.get("CF-Connecting-IP")||request.headers.get("True-Client-IP")||"";
  return json({ip:validIP(headerIP)?headerIP:"",colo:cf.colo||"",city:cf.city||"",region:cf.region||"",country:cf.country||"",asn:cf.asn||"",asOrganization:cf.asOrganization||""});
}
async function iconResponse(request,id){
  const host=ICON_HOSTS[id];
  if(!host)return new Response("Not Found",{status:404});
  const cache=caches.default,key=new Request(new URL("/__cdn_cache/"+CACHE_VERSION+"/icon/"+id,request.url));
  const cached=await cache.match(key);if(cached)return cached;
  const urls=["https://icon.horse/icon/"+host,"https://icons.duckduckgo.com/ip3/"+host+".ico","https://www.google.com/s2/favicons?domain="+encodeURIComponent(host)+"&sz=64"];
  for(const url of urls)try{
    const r=await fetch(url,{headers:{Accept:"image/avif,image/webp,image/png,image/svg+xml,image/*,*/*;q=0.8"},cf:{cacheTtl:2592000,cacheEverything:true}});
    const type=r.headers.get("content-type")||"";
    if(!r.ok||!type.toLowerCase().startsWith("image/"))continue;
    const data=await r.arrayBuffer();if(data.byteLength<32)continue;
    const response=new Response(data,{headers:{
      "Content-Type":type,"Cache-Control":"public, max-age=2592000, stale-while-revalidate=604800",
      "CDN-Cache-Control":"public, max-age=2592000",
      "Cloudflare-CDN-Cache-Control":"public, max-age=2592000","X-Content-Type-Options":"nosniff"
    }});
    await cache.put(key,response.clone());return response;
  }catch{}
  return new Response("Icon Unavailable",{status:502,headers:{"Cache-Control":"public, max-age=60"}});
}
async function pageResponse(request){
  const cache=caches.default,key=new Request(new URL("/__cdn_cache/"+CACHE_VERSION+"/page/index.html",request.url));
  const cached=await cache.match(key),html=cached?await cached.text():await getPage();
  if(!cached)await cache.put(key,new Response(html,{headers:{
    "Content-Type":"text/html; charset=utf-8","Cache-Control":"public, max-age=3600"
  }}));
  return new Response(html,{headers:{
    "Content-Type":"text/html; charset=utf-8",
    "Cache-Control":"public, max-age=300, stale-while-revalidate=86400",
    "CDN-Cache-Control":"public, max-age=3600",
    "Cloudflare-CDN-Cache-Control":"public, max-age=3600",
    "X-Content-Type-Options":"nosniff",
    "Referrer-Policy":"strict-origin-when-cross-origin",
    "X-Frame-Options":"DENY"
  }});
}
export default{async fetch(request){
  const url=new URL(request.url),method=request.method,path=url.pathname;
  if(method!=="GET"&&method!=="HEAD")return new Response("Method Not Allowed",{status:405,headers:{Allow:"GET, HEAD"}});
  let response;
  if(path==="/"||path==="/index.html")response=await pageResponse(request);
  else if(path==="/api/meta")response=await metaResponse(request);
  else if(path==="/cdn-cgi/trace")response=traceResponse(request);
  else if(path.startsWith("/api/icon/"))response=await iconResponse(request,path.slice(10));
  else return new Response("Not Found",{status:404});
  return method==="HEAD"?new Response(null,{status:response.status,headers:response.headers}):response;
}};