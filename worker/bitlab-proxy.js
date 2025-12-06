// bitlab-proxy.js - exemple minimal Worker
addEventListener('fetch', event => { event.respondWith(handle(event.request)) });

async function handle(req){
  const url = new URL(req.url);
    if(req.method === 'POST' && url.pathname === '/get-offerwall'){
        try{
              const body = await req.json();
                    const userId = body.userId || 'guest';
                          // Exemple : appeler l'API BitLab côté serveur (ici simulé)
                                // ---------------------------
                                      // IMPORTANT : tu dois configurer tes secrets dans Cloudflare:
                                            //   BITLAB_API_KEY, BITLAB_SECRET_KEY, BITLAB_SERVER_SECRET
                                                  //
                                                        // Exemple d'appel réel (décommenter / adapter selon BitLab doc) :
                                                              /*
                                                                    const resp = await fetch('https://api.bitlabs.ai/v1/client/get_offerwall', {
                                                                             method: 'POST',
                                                                                      headers: { 'Content-Type': 'application/json', 'x-api-key': BITLAB_API_KEY },
                                                                                               body: JSON.stringify({ userId, server_secret: BITLAB_SERVER_SECRET })
                                                                                                     });
                                                                                                           const data = await resp.json();
                                                                                                                 return new Response(JSON.stringify({ url: data.offerwall_url }), { headers: { 'Content-Type': 'application/json' } });
                                                                                                                       */
                                                                                                                             // ---------------------------
                                                                                                                                   // Pour l'exemple on retourne une URL générique (à remplacer)
                                                                                                                                         const fakeUrl = 'https://www.bitlab.com/'; // remplacer par data.offerwall_url réel
                                                                                                                                               return new Response(JSON.stringify({ url: fakeUrl }), { headers: { 'Content-Type': 'application/json' } });
                                                                                                                                                   } catch (e){
                                                                                                                                                         return new Response(JSON.stringify({ error: 'bad request' }), { status: 400, headers:{'Content-Type':'application/json'} });
                                                                                                                                                             }
                                                                                                                                                               }
                                                                                                                                                                 return new Response('Not Found', { status: 404 });
                                                                                                                                                                 }