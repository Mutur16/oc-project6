import { getWorks, getCategories, deleteWork, addWork } from "./api.js";
import { createWorksGallery } from "./gallery.js";

const token = localStorage.getItem("loginData");

const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

const modalGallery = document.querySelector('#modal-delete-gallery');
const modalForm = document.querySelector('#modal-form');

/*OPEN AND CLOSE MODAL*/

if (token) {
    openButton.addEventListener("click", () => {
        modal.showModal()
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

async function showDeleteGalleryModal() {
    modalForm.classList.add('display-none');
    const deleteGallery = document.querySelector(".delete-gallery");
    deleteGallery.innerHTML = '';
    const worksData = await getWorks();

    worksData.forEach((work) => {
        const img = document.createElement("img");
        img.setAttribute('src', work.imageUrl);
        img.setAttribute('alt', work.title);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can fa-sm"></i>';
        deleteButton.addEventListener('click', async () => {
            try {
                await deleteWork(work.id);
                workElement.remove();
                await getWorks(true)
                createWorksGallery();
            } catch (error) {
                console.error('Une erreur est survenue lors de la suppression :', error);
            }
        });

        const workElement = document.createElement("figure");
        workElement.appendChild(img);
        workElement.appendChild(deleteButton);

        deleteGallery.appendChild(workElement);
    }) 
}

const addButton = document.querySelector('.btn-add');
addButton.addEventListener('click', (e) => {
    e.stopPropagation();
    showAddFormModal();
});

showDeleteGalleryModal()

/*SUBMIT AND SHOW FORM*/

const returnButton = document.querySelector(".btn-return");
returnButton.addEventListener('click', (e) => {
    e.stopPropagation();
    returnButton.classList.remove('show-btn-return');

    modalGallery.classList.remove('display-none');
    modalForm.classList.add('display-none');

    showDeleteGalleryModal()
    getWorks(true)
    createWorksGallery();
});

async function showAddFormModal() {
    modalGallery.classList.add('display-none');
    modalForm.classList.remove('display-none');

    returnButton.classList.add('show-btn-return');
}

async function submitForm() {
    const image = document.querySelector('#image').files[0];
    const title = document.querySelector('#title').value;
    const category = document.querySelector('#category').value;
    document.querySelector('#modal-form').reset();
    await addWork(image, title, category);
    await getWorks(true)
    createWorksGallery();
}

const submitButton = document.querySelector('.btn-submit');
const preview = document.querySelector('#preview');
const hideUploader = document.querySelector('.hide-uploader')

submitButton.addEventListener('click', (e) => {
    e.stopPropagation()
    submitForm();

    submitButton.setAttribute('disabled', 'disabled');
    submitButton.classList.remove('btn-submit-ok');

    hideUploader.classList.remove('hide-for-preview');
    preview.remove('img');
})

/*FORM functions*/

document.getElementById('image').addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        const img = document.createElement('img');
        img.src = reader.result;
        preview.appendChild(img);
    }
    if (file) {
        hideUploader.classList.add('hide-for-preview');
        reader.readAsDataURL(file);
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
            submitButton.classList.add('btn-submit-ok');
        } else {
            submitButton.setAttribute('disabled', 'disabled');
            submitButton.classList.remove('btn-submit-ok');
        }
    });
});
