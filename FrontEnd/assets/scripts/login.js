import { login } from "./api.js";

const loginForm = document.querySelector('#login-form');
const token = localStorage.getItem('loginData');
if (loginForm && token) {
    window.location.href = "../../index.html";
}

/*LOGIN FORM*/

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const loginFormEmail = document.getElementById("email").value;
        const loginFormPassword = document.getElementById("password").value;
        
        try {
            const loginData = await login(loginFormEmail, loginFormPassword);
    
            if (loginData !== undefined) {
                localStorage.setItem("loginData", JSON.stringify(loginData));
                window.location.href = "../../index.html";
            } else {
                const errorMessageElement = document.getElementById("errorMessage");
                errorMessageElement.textContent = "Email et/ou mot de passe incorrect(s).";
            }
        } catch (error) {
            console.error("Une erreur s'est produite : " + error.message);
        }
    });
}

/*INDEX - LOGGED*/

if (token) {
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fa-regular fa-pen-to-square fa-lg"></i> Modifier`;
    editButton.setAttribute("data-open-modal", "");
    const logged = document.querySelector(".logged");
    logged.appendChild(editButton);

    const body = document.querySelector("body");
    const mainContainer = document.querySelector(".main-container");
    const editBanner = document.createElement("div");
    editBanner.classList.add("edit-banner");
    editBanner.innerHTML = `<i class="fa-regular fa-pen-to-square fa-lg"></i> Mode édition`;
    body.insertBefore(editBanner, mainContainer);

    const logout = document.querySelector(".logout");
    logout.innerHTML = "logout";
    logout.setAttribute("href", "index.html");

    logout.addEventListener("click", function () {
        localStorage.removeItem("loginData");
    });
}