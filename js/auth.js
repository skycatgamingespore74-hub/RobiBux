// auth.js - gestion simple côté client (localStorage)
(function(){
  const loginBtn = document.getElementById('loginBtn');
    const openLogin = document.getElementById('openLogin');
      const closeLogin = document.getElementById('closeLogin');

        openLogin?.addEventListener('click', ()=> document.getElementById('loginModal').classList.remove('hidden'));
          closeLogin?.addEventListener('click', ()=> document.getElementById('loginModal').classList.add('hidden'));

            loginBtn?.addEventListener('click', ()=>{
                const id = document.getElementById('robloxId').value?.trim();
                    if(!id){ alert('Entre un ID Roblox valide'); return; }
                        // stocker l'ID localement
                            localStorage.setItem('mr_userId', id);
                                // initialiser points/historique si pas present
                                    if(!localStorage.getItem('mr_points')) localStorage.setItem('mr_points', '100'); // départ
                                        if(!localStorage.getItem('mr_history')) localStorage.setItem('mr_history', JSON.stringify([]));
                                            location.href = 'home.html';
                                              });

                                                // logout
                                                  document.getElementById('logout')?.addEventListener('click', ()=>{
                                                      localStorage.removeItem('mr_userId');
                                                          // on garde points/historique localement
                                                              location.href = 'index.html';
                                                                });

                                                                  // Remplir infos sur toutes les pages (si connecté)
                                                                    document.addEventListener('DOMContentLoaded', ()=>{
                                                                        const id = localStorage.getItem('mr_userId');
                                                                            const points = localStorage.getItem('mr_points') || '0';
                                                                                const nameEls = document.querySelectorAll('#headerName,#headerName2,#welcomeName');
                                                                                    nameEls.forEach(el=>{ if(el) el.textContent = id ? `User ${id}` : 'Invité'; });

                                                                                        document.getElementById('myPoints')?.innerText = points;
                                                                                            document.getElementById('profilePoints')?.innerText = points;
                                                                                                document.getElementById('withdrawAvailable')?.innerText = points;
                                                                                                    document.getElementById('profileId')?.innerText = id || '—';
                                                                                                        // avatar placeholder (on peut remplacer par thumbnails API si veut)
                                                                                                            document.querySelectorAll('#headerAvatar,#headerAvatar2,#profileAvatar').forEach(img=>{
                                                                                                                  if(img) img.src = 'assets/images/default-avatar.png';
                                                                                                                      });
                                                                                                                        });
                                                                                                                        })();