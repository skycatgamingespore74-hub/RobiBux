// ui.js - actions frontend (withdraw, history)
(function(){
  // Retrait simulé
    document.getElementById('withdrawDo')?.addEventListener('click', ()=>{
        const input = document.getElementById('withdrawInput');
            const msg = document.getElementById('withdrawResult');
                let amount = parseInt(input.value||'0',10);
                    if(!amount || amount <= 0){ msg.textContent = 'Montant invalide'; return; }
                        let points = parseInt(localStorage.getItem('mr_points')||'0',10);
                            if(amount > points){ msg.textContent = "Pas assez de points"; return; }
                                points -= amount;
                                    localStorage.setItem('mr_points', String(points));
                                        msg.textContent = `Retrait simulé : ${amount} points. Nouveau solde : ${points}`;
                                            // ajouter au history
                                                const hist = JSON.parse(localStorage.getItem('mr_history')||'[]');
                                                    hist.unshift({ type:'withdraw', amount: amount, date: new Date().toISOString() });
                                                        localStorage.setItem('mr_history', JSON.stringify(hist));
                                                            // mettre à jour affichages
                                                                document.getElementById('profilePoints')?.innerText = points;
                                                                    document.getElementById('myPoints')?.innerText = points;
                                                                        document.getElementById('withdrawAvailable')?.innerText = points;
                                                                          });

                                                                            // Afficher historique sur profil
                                                                              document.addEventListener('DOMContentLoaded', ()=>{
                                                                                  const list = document.getElementById('profileHistory');
                                                                                      if(!list) return;
                                                                                          const hist = JSON.parse(localStorage.getItem('mr_history')||'[]');
                                                                                              if(hist.length === 0) list.innerHTML = '<li class="muted">Aucune action pour l\'instant</li>';
                                                                                                  else hist.forEach(h=>{
                                                                                                        const li = document.createElement('li');
                                                                                                              li.textContent = `${h.type} ${h.amount||''} ${h.date ? ' — '+(new Date(h.date).toLocaleString()) : ''}`;
                                                                                                                    list.appendChild(li);
                                                                                                                        });
                                                                                                                          });
                                                                                                                          })();