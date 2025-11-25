const fetch = require('node-fetch');
const expect = require('chai').expect;

const BASE = process.env.TEST_BASE_URL || 'http://localhost:3000';

function rnd() { return Math.random().toString(36).slice(2,9); }

describe('TinyLink API', function(){
  this.timeout(10000);
  let code;
  const target = 'https://example.com/hello';

  it('GET /healthz returns 200', async ()=>{
    const r = await fetch(BASE + '/healthz');
    expect(r.status).to.equal(200);
    const j = await r.json();
    expect(j.ok).to.equal(true);
  });

  it('POST /api/links creates a link', async ()=>{
    code = rnd().slice(0,7);
    const r = await fetch(BASE + '/api/links', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ target_url: target, code })
    });
    expect(r.status).to.equal(201);
    const j = await r.json();
    expect(j.code).to.equal(code);
    expect(j.target_url).to.equal(target);
  });

  it('POST duplicate code returns 409', async ()=>{
    const r = await fetch(BASE + '/api/links', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ target_url: target, code }) });
    expect(r.status).to.equal(409);
  });

  it('GET /api/links/:code returns stats', async ()=>{
    const r = await fetch(BASE + '/api/links/' + code);
    expect(r.status).to.equal(200);
    const j = await r.json();
    expect(j.code).to.equal(code);
    expect(j.target_url).to.equal(target);
  });

  it('redirect /:code returns 302 and increments', async ()=>{
    // get before
    const before = await fetch(BASE + '/api/links/' + code).then(r=>r.json());
    const r = await fetch(BASE + '/' + code, { redirect: 'manual' });
    expect(r.status).to.equal(302);
    expect(r.headers.get('location')).to.equal(target);
    const after = await fetch(BASE + '/api/links/' + code).then(r=>r.json());
    // total_clicks increment by 1
    expect(after.total_clicks).to.equal(before.total_clicks + 1);
  });

  it('DELETE /api/links/:code deletes and redirect 404', async ()=>{
    const r = await fetch(BASE + '/api/links/' + code, { method: 'DELETE' });
    expect(r.status).to.equal(200);
    const r2 = await fetch(BASE + '/' + code, { redirect: 'manual' });
    // Many frameworks respond 404; ensure not 302
    expect(r2.status).to.not.equal(302);
  });

});
