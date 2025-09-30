document.addEventListener('DOMContentLoaded', () => {
  OCA.Dashboard.register('talkdash', (el) => {
    el.innerHTML = '<div id="td-root">Loading rooms…</div>';
    const root = el.querySelector('#td-root');
    const api = (path, opts={}) => fetch(OC.generateUrl('/ocs/v2.php'+path), {
      method: opts.method||'GET',
      headers: {'OCS-APIRequest':'true','Accept':'application/json','requesttoken':OC.requestToken},
      body: opts.body
    }).then(r => r.json());
    const render = (rooms=[]) => {
      if(!rooms.length){ root.innerHTML='<div>No rooms yet.</div>'; return; }
      root.innerHTML = rooms.map(r => `
        <div style="display:flex;gap:.5rem;align-items:center">
          <div style="flex:1"><strong>${(r.displayName||r.token)}</strong></div>
          <button class="td-open" data-link="${(r.links?.html||'#')}">Open</button>
          <button class="td-send" data-token="${r.token}">Quick message</button>
        </div>`).join('');
    };
    const loadRooms = async () => {
      const res = await api('/apps/spreed/api/v4/room?includeStatus=true');
      render(res?.ocs?.data || []);
    };
    el.addEventListener('click', async (e) => {
      if(e.target.matches('.td-open')) location.href = e.target.dataset.link;
      if(e.target.matches('.td-send')){
        const token = e.target.dataset.token;
        const text = prompt('Message:');
        if(!text) return;
        const body = new URLSearchParams({message:text});
        await api('/apps/spreed/api/v1/chat/'+token, {method:'POST', body});
        alert('Message sent (if allowed).');
      }
    });
    loadRooms();
  });
});