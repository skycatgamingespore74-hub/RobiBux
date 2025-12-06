// partners.js - crée des cartes partenaires simples
(function(){
  const partners = [
      { id: 'bitlab', name: 'BitLab', logo: 'assets/images/bitlab-logo.png', url: 'partner-bitlab.html', desc: 'Sondages & offres' },
          // ajoute d'autres partenaires ici
            ];

              function render(){
                  const grid = document.getElementById('partnersGrid');
                      if(!grid) return;
                          partners.forEach(p=>{
                                const a = document.createElement('a'); a.href = p.url; a.className='partner-card';
                                      const img = document.createElement('img'); img.src = p.logo; img.style.width='80px'; img.style.height='80px';
                                            const name = document.createElement('p'); name.innerText = p.name;
                                                  a.appendChild(img); a.appendChild(name);
                                                        grid.appendChild(a);
                                                            });
                                                              }

                                                                // bannière leaderboard simplifiée sur home
                                                                  function renderLeaderboard(){
                                                                      const wrap = document.getElementById('scrollBanner');
                                                                          if(!wrap) return;
                                                                              for(let i=0;i<8;i++){
                                                                                    const d = document.createElement('div');
                                                                                          d.style.minWidth='140px'; d.style.padding='10px'; d.style.background='rgba(0,255,157,0.08)'; d.style.borderRadius='8px';
                                                                                                d.innerText = `Joueur${i+1} — ${Math.floor(Math.random()*800)} pts`;
                                                                                                      wrap.appendChild(d);
                                                                                                          }
                                                                                                            }

                                                                                                              document.addEventListener('DOMContentLoaded', ()=>{ render(); renderLeaderboard(); });
                                                                                                              })();