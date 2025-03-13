document.addEventListener("DOMContentLoaded", function() {

    function getUsers() {
        let users = localStorage.getItem("users");
        return users ? users.split(";") : [];
    }

    function addUser(email, password) {
        let users = getUsers();
        for (let i = 0; i < users.length; i++) {
            let user = users[i].split(",");
            if (user[0] === email) {
                alert("This email is already taken.");
                return;
            }
        }
        users.push(email + "," + password);
        localStorage.setItem("users", users.join(";"));
        alert("You signed up successfully!");
        window.location.href = "dashboard.html";
    }

    function checkLogin(email, password) {
        let users = getUsers();
        for (let i = 0; i < users.length; i++) {
            let user = users[i].split(",");
            if (user[0] === email && user[1] === password) {
                return true;
            }
        }
        return false;
    }

    ddocument.addEventListener("DOMContentLoaded", function() {
        const signupForm = document.getElementById("signupForm");
        if (signupForm) {
            signupForm.addEventListener("submit", function(event) {
                event.preventDefault();
                const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value.trim();
                const confirmPassword = document.getElementById("confirm-password").value.trim();

                if (password !== confirmPassword) {
                    alert("Passwords don't match!");
                    return;
                }

                addUser(email, password);
            });
        }

        const loginForm = document.getElementById("loginForm");
        if (loginForm) {
            loginForm.addEventListener("submit", function(event) {
                event.preventDefault();
                const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value.trim();

                if (checkLogin(email, password)) {
                    alert("Login successful!");
                    window.location.href = "../Dashboard/dashboard.html";
                } else {
                    alert("Invalid email or password.");
                }
            });
        }

        const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
        if (forgotPasswordBtn) {
            forgotPasswordBtn.addEventListener("click", function() {
                const email = prompt("Enter your email to reset the password:");
                if (email) resetPassword(email.trim());
            });
        }
    });
});