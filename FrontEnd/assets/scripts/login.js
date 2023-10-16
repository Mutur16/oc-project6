const token = localStorage.getItem("loginData");

if (token) {
    const logged = document.querySelector(".logged");
    const editButton = createButton("fa-regular fa-pen-to-square fa-lg", "Modifier");
    editButton.setAttribute("data-open-modal", "");
    logged.appendChild(editButton);

    const body = document.querySelector("body");
    const mainContainer = document.querySelector(".main-container");
    const editBanner = createBanner("fa-regular fa-pen-to-square fa-lg", "Mode édition");
    body.insertBefore(editBanner, mainContainer);

    const logout = document.querySelector(".logout");
    configureLogoutLink(logout);
}

function createButton(iconClass, text) {
    const button = document.createElement("button");
    button.innerHTML = `<i class="${iconClass}"></i> ${text}`;
    return button;
}

function createBanner(iconClass, text) {
    const editBanner = document.createElement("div");
    editBanner.classList.add("edit-banner");
    editBanner.innerHTML = `<i class="${iconClass}"></i> ${text}`;
    return editBanner;
}

function configureLogoutLink(link) {
    link.innerHTML = "logout";
    link.href = "index.html";

    link.addEventListener("click", function () {
        localStorage.removeItem("loginData");
    });
}