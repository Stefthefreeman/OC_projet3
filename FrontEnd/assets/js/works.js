const reponse = await fetch('http://localhost:5678/api/works/');
const works = await reponse.json();
const cats = await fetch('http://localhost:5678/api/categories');
const categories = await cats.json();
console.log(categories);

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
        //console.log(galleryElement.id);
    }
    document.querySelectorAll('.deleteImg').forEach((i) => {
        i.addEventListener('click', async (event) => {
            const imageId = event.target.getAttribute('data-image');
            console.log(imageId);
            const token=localStorage.getItem("authToken");
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
                    console.log("Image supprimée avec succès.");
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
const buttons = new Set([
    {id: "btn-object", categoryId: 1},
    {id: "btn-appart", categoryId: 2},
    {id: "btn-hr", categoryId: 3},
    {id: "all", categoryId: null}
]);

buttons.forEach(button => {
    const btnElement = document.getElementById(button.id);

    btnElement.addEventListener("click", function () {
        const worksFilter = button.categoryId !== null
            ? works.filter(work => work.categoryId === button.categoryId)
            : works;

        document.querySelector(".gallery").innerHTML = "";
        showWorks(worksFilter);
    });
});
// Récupérer les éléments de la modale
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.querySelector(".close");

// Ouvrir la modale lors du clic sur le bouton
openModalBtn.onclick = function () {
    modal.style.display = "flex";
}

// Fermer la modale lors du clic sur le bouton de fermeture
closeModalBtn.onclick = function () {
    modal.style.display = "none";
}

// Fermer la modale lors du clic en dehors de la modale
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

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
function showLink(){
    const link = document.getElementById("dismiss");
   //localStorage.removeItem("authToken");
    if(localStorage.getItem("authToken") === null){
        link.style.display = "none";
    }
}
showLink();
function checkFields() {
    const form = document.getElementById('addWork');
    const submitButton = document.getElementById('submitButton');

// Fonction pour vérifier si tous les champs requis sont remplis
    function checkForm() {
        submitButton.disabled = !form.checkValidity();
    }

// Ajout de l'événement 'input' sur chaque champ du formulaire pour vérifier le formulaire à chaque modification
    form.addEventListener('input', checkForm);
}
checkFields();


const myModal = document.getElementById("modal2");
// Fermer la modal en cliquant à l'extérieur du contenu
window.addEventListener("click", (event) => {
    if (event.target === myModal) {
        myModal.style.display = "none";
    }
});

