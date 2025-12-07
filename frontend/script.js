async function checkLogin() {
        const res = await fetch("https://ton-backend.replit.com/me", { credentials: "include" });
            const data = await res.json();

                const loginBtn = document.getElementById("loginBtn");
                    const profileBtn = document.getElementById("profileBtn");

                        if (data.loggedIn) {
                                if (loginBtn) loginBtn.style.display = "none";
                                        if (profileBtn) profileBtn.style.display = "block";
                                            }
                                            }
                                            checkLogin();
