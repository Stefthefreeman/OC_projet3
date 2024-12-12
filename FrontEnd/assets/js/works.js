const reponse = await fetch('http://localhost:5678/api/works/');
const works = await reponse.json();
const cats = await fetch('http://localhost:5678/api/categories');
const categories = await cats.json();
console.log(categories);

//Affiche les travaux dans la gallerie
function showWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        const sectionGallery = document.querySelector(".gallery");
        const galleryElement = document.createElement("figure");
        const imgGallery = document.createElement("img");
        imgGallery.src = work.imageUrl;
        imgGallery.alt = work.title;
        const figCaption = document.createElement("figcaption");
        figCaption.innerText = work.title;
        sectionGallery.appendChild(galleryElement);
        galleryElement.appendChild(imgGallery);
        galleryElement.appendChild(figCaption);

    }
}

showWorks(works);

//Affiche les travaux dans la modale 1
function showWorksInModal(works) {
    let work;
    for (let i = 0; i < works.length; i++) {
        work = works[i];
        const sectionGallery = document.querySelector(".modal-gallery");
        const galleryElement = document.createElement("div");
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa', 'fa-trash', "deleteImg");
        const imgGallery = document.createElement("img");
        trashIcon.setAttribute("data-image", work.id);
        galleryElement.className = "image-container";
        galleryElement.id = "image-container";
        imgGallery.src = work.imageUrl;
        imgGallery.alt = work.title;
        sectionGallery.appendChild(galleryElement);
        galleryElement.appendChild(imgGallery);
        galleryElement.appendChild(trashIcon);
    }
    //supprimer un travail
    document.querySelectorAll('.deleteImg').forEach((i) => {
        i.addEventListener('click', async (event) => {
            const imageId = event.target.getAttribute('data-image');
            //console.log(imageId);
            const token = localStorage.getItem("authToken");
            try {
                const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if (response.ok) {
                    // Supprimer l'image du DOM si la suppression est réussie
                    const imageContainer = event.target.closest('#image-container');
                    imageContainer.remove();
                    console.log("Image " + work.id +" - "+ work.imageUrl + " supprimée avec succès.");
                } else {
                    console.error("Échec de la suppression de l'image.");
                }
            } catch (error) {
                console.error("Erreur de requête :", error);
            }
        });
    });
}

showWorksInModal(works);

//buttons
function createButton(categories) {
    const sectionButton = document.querySelector(".buttons");
    const buttonTous = document.createElement("button");
    buttonTous.className = "btn active";
    buttonTous.textContent = "Tous";
    buttonTous.id = "0";
    sectionButton.appendChild(buttonTous);
    for (let i = 0; i < categories.length; i++) {
        const button = document.createElement("button");
        button.className = "btn";
        button.textContent = categories[i].name;
        button.id = categories[i].id;
        sectionButton.appendChild(button);
    }
    if (localStorage.getItem("authToken") !== null) {
        sectionButton.style.display = "none";
        const gallery = document.querySelector(".gallery");
        gallery.style.marginTop = "80px";
    }
}

createButton(categories);


//Filtrer les travaux dans la galerie
function galleryFilter(categories) {
    // Crée un Set pour stocker les identifiants des boutons
    const buttons = new Set();
    buttons.add(0); // Ajoute un identifiant par défaut

// Remplit le Set avec les identifiants des catégories
    for (let i = 0; i < categories.length; i++) {
        buttons.add(categories[i].id);
    }

// Parcourt chaque bouton dans le Set
    buttons.forEach(buttonId => {
        const btnElement = document.getElementById(buttonId); // Récupère l'élément bouton par son ID
        if (!btnElement) return; // Vérifie si l'élément existe pour éviter les erreurs

        console.log(buttonId);

        // Ajoute un écouteur d'événements "click" au bouton
        btnElement.addEventListener("click", function () {
            // Supprime la classe 'active' de tous les boutons
            buttons.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove('active'); // Vérifie si l'élément existe avant de modifier sa classe
            });
            console.log("bouton click: " + btnElement.id);
            // Ajoute la classe 'active' au bouton cliqué
            btnElement.classList.add('active');

            // Filtre les œuvres selon la catégorie
            const worksFilter = buttonId !== 0
                ? works.filter(work => work.categoryId === buttonId)
                : works;

            // Met à jour la galerie avec les œuvres filtrées
            document.querySelector(".gallery").innerHTML = "";
            showWorks(worksFilter);
        });
    });

}

galleryFilter(categories);

//select via api
function selectInModal(categories) {
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const select = document.querySelector(".myCategories");
        const option = document.createElement("option");
        option.text = category.name;
        option.value = category.id;
        select.appendChild(option);
    }
}

selectInModal(categories);

//cache le lien modifier si non connecté
function showLink() {
    const link = document.getElementById("dismiss");
    if (localStorage.getItem("authToken") === null) {
        link.style.display = "none";
    }
}

showLink();

//verifie si les champs du formulaire d'upload sont bien remplis
function checkFields() {
    const form = document.getElementById('addWork');
    const submitButton = document.getElementById('submitButton');

    function checkForm() {
        submitButton.disabled = !form.checkValidity();
    }

    form.addEventListener('input', checkForm);
}

checkFields();

// Fermer la modale 2 en cliquant à l'extérieur du contenu
const myModal = document.getElementById("modal2");
window.addEventListener("click", (event) => {
    if (event.target === myModal) {
        myModal.style.display = "none";
    }
});

function handleLoginClick() {
    const loginLink = document.getElementById("loginLink");

    // Remplacer le contenu du lien
    if (localStorage.getItem("authToken") !== null) {
        loginLink.textContent = "logout";
        // Modifier l'action du clic pour déconnecter
        loginLink.setAttribute("href", "#");
        loginLink.onclick = handleLogoutClick; // Changer l'événement de clic
    }

}

handleLoginClick();

function handleLogoutClick() {
    localStorage.removeItem("authToken");
    location.reload();
}
