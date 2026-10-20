const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const crypto = require('node:crypto');
function storage() { const data = new Map(); return { getItem: k => data.get(k) ?? null, setItem: (k,v) => data.set(k,String(v)), removeItem: k => data.delete(k) }; }
function load(file, mocks, globals={}) {
  const module = {exports:{}};
  const source = ts.transpileModule(fs.readFileSync(file,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS, jsx:ts.JsxEmit.ReactJSX}}).outputText;
  vm.runInNewContext(source,{module,exports:module.exports,require:n=>n in mocks ? mocks[n] : require(n),console,Date,Set,JSON,clearTimeout:()=>{},...globals},{filename:file});
  return module.exports;
}
(async () => {
  let token = '', responseOK = true, requests = [];
  const localStorage = storage(), sessionStorage = storage();
  const location = {pathname:'/free-invoice',search:'?email=private@example.com'};
  const tracking = load('lib/user-tracking.ts',{'@/lib/api':{API_URL:'/api',getToken:()=>token}}, {
    localStorage,sessionStorage,location,crypto,setTimeout:()=>1,
    fetch:async (url, options)=>{ requests.push(JSON.parse(options.body));return {ok:responseOK,status:responseOK?204:503}; }
  });
  tracking.trackUserEvent('page_opened');
  const journey = crypto.randomUUID();
  tracking.trackUserEvent('invoice_started',journey,1,'business');
  await tracking.flushUserEvents();
  assert.equal(requests.length,0,'Guest events stay in this tab');
  token='user-one';localStorage.setItem('invoice_user',JSON.stringify({id:1}));
  responseOK=false;await tracking.flushUserEvents();
  const first=requests[0].events;
  assert.equal(first.length,2);
  assert.equal(first[0].page,'/free-invoice');
  assert(!JSON.stringify(first).includes('private@example.com'));
  responseOK=true;await tracking.flushUserEvents();
  assert.equal(requests[1].events[0].id,first[0].id,'Retries keep IDs for deduplication');
  tracking.trackUserEvent('invoice_step',journey,2,'items');
  localStorage.setItem('invoice_user',JSON.stringify({id:2}));token='user-two';
  tracking.trackUserEvent('page_opened');await tracking.flushUserEvents();
  assert(!requests[2].events.some(e=>e.journey===journey),'Account switches must not upload another user’s pending events');
  tracking.resetTracking();
  assert.equal(JSON.parse(sessionStorage.getItem('invoicewala-events-v1')).events.length,0);
  location.pathname='/admin';tracking.trackUserEvent('page_opened');
  await tracking.flushUserEvents();assert.equal(requests.length,3,'Admin reads excluded');

  let effects=[], emitted=[];
  const listeners = new Map();
  const hooks = load('hooks/useInvoiceJourney.ts',{
    react:{useRef:v=>({current:v}),useEffect:fn=>effects.push(fn)},
    '@/lib/user-tracking':{trackUserEvent:(...args)=>emitted.push(args),flushUserEvents:async()=>{}}
  },{crypto,location:{pathname:'/invoices/new'},sessionStorage,
    window:{setTimeout:fn=>{fn();return 1;},clearTimeout:()=>{},addEventListener:(n,fn)=>listeners.set(n,fn),removeEventListener:()=>{}},
    document:{hidden:false,addEventListener:(n,fn)=>listeners.set(n,fn),removeEventListener:()=>{}}});
  const j=hooks.useInvoiceJourney();const cleanup=effects[0]();
  j.change('business');j.change('business');j.change('items');
  assert.equal(emitted.filter(e=>e[0]==='invoice_started').length,1);
  assert.equal(emitted.filter(e=>e[0]==='invoice_changed').length,2,'No per-keystroke tracking');
  j.event('invoice_saved','save');j.change('business');
  assert.equal(emitted.filter(e=>e[0]==='invoice_changed').length,3,'Edits after save are unsaved again');
  j.event('auth_requested','signup');cleanup();
  const handoff=JSON.parse(sessionStorage.getItem('invoicewala-journey-handoff'));
  assert.equal(handoff.sequence,emitted.at(-1)[2],'Signup handoff includes exit sequence');
  assert.equal(emitted.at(-1)[0],'journey_left');
  assert(emitted.every(e=>e[4]==='/invoices/new'));
  const {journeyStatus}=load('components/UserJourneyInsights.tsx',{},{});
  assert.equal(journeyStatus({started:1,changed_sequence:2,saved_sequence:0,last_event:'journey_left'}),'Left with unsaved work');
  assert.equal(journeyStatus({started:1,changed_sequence:2,saved_sequence:4,last_event:'journey_left'}),'Saved');
  assert.equal(journeyStatus({started:1,changed_sequence:5,saved_sequence:4,last_event:'journey_left'}),'Left with unsaved work');
  assert.equal(journeyStatus({started:1,changed_sequence:2,download_sequence:3}),'PDF downloaded');
  assert.equal(journeyStatus({started:1,changed_sequence:2,last_at:'2020-01-01'}),'Inactive · unsaved work');
  console.log('Tracking queue, retries, account isolation, journey steps, handoff and drop-off status checks passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
