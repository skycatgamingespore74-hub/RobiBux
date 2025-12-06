require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Stockage des utilisateurs (JSON simple)
const usersFile = 'users.json';
let users = {};
if (fs.existsSync(usersFile)) {
  users = JSON.parse(fs.readFileSync(usersFile));
  }

  // Sauvegarde des utilisateurs
  function saveUsers() {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    }

    // Route principale
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'));
      });

      // Ajouter / mettre à jour un utilisateur
      app.post('/user', async (req, res) => {
        const { robloxUsername } = req.body;
          if (!robloxUsername) return res.status(400).json({ error: 'Pseudo manquant' });

            try {
                // Récupérer avatar Roblox
                    const avatarRes = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${robloxUsername}&size=150x150&format=Png&isCircular=false`);
                        const avatarUrl = avatarRes.data.data[0]?.imageUrl || '';

                            if (!users[robloxUsername]) {
                                  users[robloxUsername] = { robux: 0, avatar: avatarUrl };
                                        saveUsers();
                                            } else {
                                                  users[robloxUsername].avatar = avatarUrl;
                                                        saveUsers();
                                                            }

                                                                res.json({ success: true, avatar: avatarUrl, robux: users[robloxUsername].robux });
                                                                  } catch (err) {
                                                                      res.status(500).json({ error: 'Impossible de récupérer avatar Roblox' });
                                                                        }
                                                                        });

                                                                        // Ajouter Robux (via BitLabs ou simulation)
                                                                        app.post('/add-robux', (req, res) => {
                                                                          const { robloxUsername, amount } = req.body;
                                                                            if (!robloxUsername || !amount) return res.status(400).json({ error: 'Données manquantes' });

                                                                              if (!users[robloxUsername]) users[robloxUsername] = { robux: 0, avatar: '' };
                                                                                users[robloxUsername].robux += parseInt(amount);
                                                                                  saveUsers();
                                                                                    res.json({ success: true, robux: users[robloxUsername].robux });
                                                                                    });

                                                                                    // Retrait Robux (notification admin)
                                                                                    app.post('/withdraw', (req, res) => {
                                                                                      const { robloxUsername, amount } = req.body;
                                                                                        if (!robloxUsername || !amount) return res.status(400).json({ error: 'Données manquantes' });

                                                                                          if (!users[robloxUsername] || users[robloxUsername].robux < amount) {
                                                                                              return res.status(400).json({ error: 'Solde insuffisant' });
                                                                                                }

                                                                                                  users[robloxUsername].robux -= parseInt(amount);
                                                                                                    saveUsers();

                                                                                                      // Ici tu peux connecter ton système Please Donate ou email notification
                                                                                                        console.log(`Retrait demandé : ${amount} Robux pour ${robloxUsername}`);

                                                                                                          res.json({ success: true, robux: users[robloxUsername].robux });
                                                                                                          });

                                                                                                          // Lancer le serveur
                                                                                                          app.listen(PORT, () => {
                                                                                                            console.log(`RobiBux running on http://localhost:${PORT}`);
                                                                                                            });