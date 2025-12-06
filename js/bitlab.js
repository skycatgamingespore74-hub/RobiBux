// bitlab.js - ouvre BitLab via proxy (Cloudflare Worker URL)
// CHANGE cette URL par l'URL de ton Worker (après déploiement)
const WORKER_URL = 'https://TON_WORKER_SUBDOMAIN.workers.dev';

// Vérifier que l'URL est configurée
if(WORKER_URL.includes('TON_WORKER_SUBDOMAIN')){
  console.warn('ATTENTION: WORKER_URL n\'est pas configurée. Remplace TON_WORKER_SUBDOMAIN par l\'URL réelle de ton Cloudflare Worker.');
}

document.getElementById('openBitlab')?.addEventListener('click', async ()=> {
  const msg = document.getElementById('bitlabMsg');
    msg.textContent = 'Préparation de BitLab…';
      try {
          // Exemple d'appel : demander une URL d'offerwall signée par le Worker
              const resp = await fetch(WORKER_URL + '/get-offerwall', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ userId: localStorage.getItem('mr_userId') }) });
                  if(!resp.ok) throw new Error('Erreur proxy');
                      const data = await resp.json();
                          // data.url contient l'URL sûre vers BitLab (selon implémentation Worker)
                              if(data && data.url){
                                    document.getElementById('bitlabFrame').src = data.url;
                                          document.getElementById('bitlabFrame').style.display = 'block';
                                                msg.textContent = 'BitLab chargé dans l’iframe.';
                                                    } else {
                                                          msg.textContent = 'Impossible d’obtenir l’URL BitLab.';
                                                              }
                                                                } catch(e){
                                                                    console.error(e);
                                                                        msg.textContent = 'Erreur lors de l’ouverture de BitLab.';
                                                                          }
                                                                          });