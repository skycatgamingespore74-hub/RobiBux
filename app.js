// Vérifier la connexion
if (document.getElementById("protection")) {
    if (!localStorage.getItem("robibux_user")) {
            window.location.href = "index.html";
                }
                }

                // Bouton commencer
                let start = document.getElementById("start-btn");
                if (start) {
                    start.onclick = () => {
                            let pseudo = prompt("Entre ton pseudo Roblox :");
                                    if (!pseudo) return;

                                            localStorage.setItem("robibux_user", pseudo);
                                                    window.location.href = "partenaires.html";
                                                        };
                                                        }

                                                        // Charger info du compte
                                                        if (window.location.pathname.includes("compte.html")) {
                                                            let pseudo = localStorage.getItem("robibux_user");
                                                                document.getElementById("user-info").innerHTML =
                                                                      `<h2>${pseudo}</h2><p>Robux : 0</p>`;
                                                                      }

                                                                      function logout() {
                                                                          localStorage.removeItem("robibux_user");
                                                                              window.location.href = "index.html";
                                                                              }

                                                                              // Ouvrir BitLab
                                                                              function openBitlab() {
                                                                                  window.location.href = "https://web.bitlabs.ai/?token=a51b41f7-b0bb-4f53-9be5-f2229db51e6d" + localStorage.getItem("robibux_user");
                                                                                  }

                                                                                  // FAUX live-feed (visuel)
                                                                                  let feed = document.getElementById("live-feed");
                                                                                  if (feed) {
                                                                                      let fakeNames = ["Lucas", "Eliott", "Mia", "Noah", "Léa", "Emma"];
                                                                                          setInterval(() => {
                                                                                                  let name = fakeNames[Math.floor(Math.random()*fakeNames.length)];
                                                                                                          let amount = Math.floor(Math.random()*20)+1;
                                                                                                                  feed.innerHTML = `<p>${name} vient de gagner ${amount} Robux</p>` + feed.innerHTML;
                                                                                                                      }, 2000);
                                                                                                                      }