function toggleModal(closeId, openId) {
    document.getElementById(closeId).style.display = "none";
    document.getElementById(openId).style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// image Preview
function previewImage(event) {
    const file = event.target.files[0];

    // Vérifie si le fichier est une image
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const imagePreview = document.getElementById("imagePreview");

            // Remplace l'image existante par l'image téléchargée
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Aperçu de l'image">`;
        };

        reader.readAsDataURL(file);
    } else {
        alert("Veuillez sélectionner un fichier d'image valide.");
    }
}

// Ouvrir le sélecteur de fichier lorsque l'utilisateur clique sur l'aperçu
document.getElementById("imagePreview").addEventListener("click", function () {
    document.getElementById("fileInput").click();
});

//formulaire d'upload d'un nouveau travail
function submitFormAddWork() {
    const token = localStorage.getItem("authToken");
    const form = document.getElementById("addWork");
    const formData = new FormData(form);
    // Afficher le contenu de formData pour vérifier
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    // Envoyer le formulaire avec fetch
    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Succès:', data);
            addImageToGallery(data.imageUrl);
        })
        .catch(error => {
            console.log('Erreurs:', error);
        });

    //Ajoute le travail dans la gallerie
    function addImageToGallery(imageUrl) {
        const gallery = document.querySelector(".gallery");

        // Crée un nouvel élément d'image
        const img = document.createElement("img");
        img.src = imageUrl; // Assignez l'URL de l'image reçue
        img.alt = "Nouvelle photo"; // Texte alternatif, peut être personnalisé

        // Ajoute l'image à la galerie
        gallery.appendChild(img);
    }
}