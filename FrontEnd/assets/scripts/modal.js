import { getWorks, getCategories } from "./api.js";
import { deleteWorkGallery, submitForm } from "./modalAction.js";

const token = localStorage.getItem("loginData");

const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

const modalGallery = document.querySelector('#modal-delete-gallery');
const modalForm = document.querySelector('#modal-form');

/*OPEN AND CLOSE MODAL*/

if (token) {

    openButton.addEventListener("click", () => {
        modal.showModal();
        returnToModalGallery()
    })

    closeButton.addEventListener("click", () => {
        modal.close()
    })

    modal.addEventListener("click", (e) => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close()
        }
    })
}

/*DELETE AND SHOW GALLERY WORK*/

async function showGalleryModal() {
    modalForm.classList.add('display-none');
    const deleteGallery = document.querySelector(".delete-gallery");
    deleteGallery.innerHTML = '';
    const worksData = await getWorks();

    worksData.forEach((work) => {
        const img = document.createElement("img");
        img.setAttribute('src', work.imageUrl);
        img.setAttribute('alt', work.title);

        const workElement = document.createElement("figure");
        workElement.setAttribute('data-work-id', work.id);
        workElement.appendChild(img);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can fa-sm"></i>';
        deleteButton.addEventListener('click', deleteWorkGallery);

        workElement.appendChild(deleteButton);

        deleteGallery.appendChild(workElement);
    }) 
}

const addButton = document.querySelector('.btn-add');
addButton.addEventListener('click', (e) => {
    e.stopPropagation();
    showAddFormModal()
});

/*SUBMIT AND SHOW FORM*/

const returnButton = document.querySelector(".btn-return");
returnButton.addEventListener('click', (e) => {
    e.stopPropagation();
    returnToModalGallery()
});

function showAddFormModal() {
    modalGallery.classList.add('display-none');
    modalForm.classList.remove('display-none');

    returnButton.classList.add('show-btn-return');
}

const submitButton = document.querySelector('.btn-submit');
const preview = document.querySelector('#preview');
const hideUploader = document.querySelector('.hide-uploader');

submitButton.addEventListener('click', (e) => {
    e.stopPropagation();
    submitForm();

    submitButton.setAttribute('disabled', 'disabled');
    submitButton.classList.remove('btn-submit-ok');

    hideUploader.classList.remove('hide-for-preview');
    preview.removeChild(preview.firstChild);
})

/*FORM and return functions*/

function returnToModalGallery() {
    returnButton.classList.remove('show-btn-return');

    modalGallery.classList.remove('display-none');
    modalForm.classList.add('display-none');

    showGalleryModal();
    getWorks(true)
}

const previewImage = document.querySelector('#image');
const maxFileSize = 4 * 1024 * 1024;
const acceptedFormats = ['image/jpeg', 'image/png'];

previewImage.addEventListener('change', function () {
    const file = this.files[0];
    const reader = new FileReader();

    if (file) {
        if (file.size > maxFileSize) {
            alert('Le fichier est trop volumineux. Veuillez sélectionner un fichier de moins de 4 Mo.');
            return;
        }

        if (!acceptedFormats.includes(file.type)) {
            alert('Format de fichier non pris en charge. Veuillez sélectionner un fichier au format JPG ou PNG.');
            return;
        }

        reader.onloadend = function () {
            const img = document.createElement('img');
            img.src = reader.result;
            preview.appendChild(img);
        };

        reader.readAsDataURL(file);

        hideUploader.classList.add('hide-for-preview');
    }
});

async function createFormCategory() {
    const categories = await getCategories();
    const categorySelect = document.getElementById('category');

    categories.forEach((category) => {
        const option = document.createElement('option');
        option.setAttribute('value', category.id);
        option.text = category.name;
        categorySelect.appendChild(option);
    });
}
createFormCategory()

document.addEventListener('DOMContentLoaded', function() {
    const modalForm = document.querySelector('#modal-form');

    modalForm.addEventListener('input', function() {
        let allFieldsFilled = true;
        const inputs = modalForm.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].value) {
                allFieldsFilled = false;
                break;
            }
        }

        if (allFieldsFilled) {
            submitButton.removeAttribute('disabled');
            submitButton.classList.add('btn-submit-ok')
        } else {
            submitButton.setAttribute('disabled', 'disabled');
            submitButton.classList.remove('btn-submit-ok')
        }
    });
});
