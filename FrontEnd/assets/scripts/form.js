const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formEmail = document.getElementById("email").value;
    const formPsw = document.getElementById("psw").value;
    
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email: formEmail, password: formPsw }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem("loginData", JSON.stringify(data));
            window.location.href = "../../index.html";
        } else {
            handleLoginError("Email et/ou mot de passe incorrect(s).", response.status);
        }
    } catch (error) {
        console.error("Une erreur s'est produite : " + error.message);
    }
});

function handleLoginError(errorMessage, status) {
    const errorMessageElement = document.getElementById("errorMessage");
    errorMessageElement.textContent = errorMessage;
    console.error("Erreur d'authentification : " + status);
}