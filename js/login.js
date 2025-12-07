// login.js - popup login + storage + server login
(function(){
  const openBtn = document.getElementById('openLoginBtn');
    const openBtn2 = document.getElementById('openLoginBtn2');
      const modal = document.getElementById('loginModal');
        const closeModal = document.getElementById('closeModal');
          const cancelLogin = document.getElementById('cancelLogin');
            const submitLogin = document.getElementById('submitLogin');
              const robloxInput = document.getElementById('robloxIdInput');

                openBtn?.addEventListener('click', ()=> modal.classList.remove('hidden'));
                  openBtn2?.addEventListener('click', ()=> modal.classList.remove('hidden'));
                    closeModal?.addEventListener('click', ()=> modal.classList.add('hidden'));
                      cancelLogin?.addEventListener('click', ()=> modal.classList.add('hidden'));

                        submitLogin?.addEventListener('click', async ()=>{
                            const id = robloxInput.value?.trim();
                                if(!id){ alert('Entre un ID Roblox valide.'); return; }

                                    // call backend login (if you have a server), otherwise store locally
                                        const API = localStorage.getItem('rbx_api_url') || '';
                                            if(API){
                                                  try {
                                                          const resp = await fetch(API + '/api/login', {
                                                                    method: 'POST',
                                                                              headers: { 'Content-Type': 'application/json' },
                                                                                        body: JSON.stringify({ userId: id })
                                                                                                });
                                                                                                        const data = await resp.json();
                                                                                                                if(data?.success){
                                                                                                                          localStorage.setItem('rbx_userId', id);
                                                                                                                                    // store API if not stored
                                                                                                                                              localStorage.setItem('rbx_points', String(data.user.points || 100));
                                                                                                                                                        localStorage.setItem('rbx_history', JSON.stringify(data.user.history || []));
                                                                                                                                                                  window.location.href = 'home.html';
                                                                                                                                                                            return;
                                                                                                                                                                                    } else {
                                                                                                                                                                                              console.warn('Backend login failed', data);
                                                                                                                                                                                                      }
                                                                                                                                                                                                            } catch(e){
                                                                                                                                                                                                                    console.warn('Backend login error', e);
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                  // fallback: local only
                                                                                                                                                                                                                                      localStorage.setItem('rbx_userId', id);
                                                                                                                                                                                                                                          if(!localStorage.getItem('rbx_points')) localStorage.setItem('rbx_points', '100');
                                                                                                                                                                                                                                              if(!localStorage.getItem('rbx_history')) localStorage.setItem('rbx_history', JSON.stringify([]));
                                                                                                                                                                                                                                                  window.location.href = 'home.html';
                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                      // Prefill if exist
                                                                                                                                                                                                                                                        document.addEventListener('DOMContentLoaded', ()=>{
                                                                                                                                                                                                                                                            const id = localStorage.getItem('rbx_userId');
                                                                                                                                                                                                                                                                if(id) robloxInput.value = id;
                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                  })();