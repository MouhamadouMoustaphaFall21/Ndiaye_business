// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si le formulaire existe avant d'ajouter l'event listener
    const whatsappForm = document.getElementById('whatsappForm');
    const confirmation = document.getElementById('confirmation');
    const whatsappLink = document.getElementById('whatsappLink');
    
    if (whatsappForm && confirmation && whatsappLink) {
        whatsappForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            try {
                // Récupérer les données du formulaire avec vérification
                const getValue = (id) => {
                    const element = document.getElementById(id);
                    return element ? element.value : '';
                };
                
                const nom = getValue('client_nom');
                const telephoneClient = getValue('telephone');
                const produit = getValue('produit');
                const quantite = getValue('quantite');
                const messageComplementaire = getValue('message');
                
                // Validation des champs requis
                if (!nom || !telephoneClient || !produit || !quantite) {
                    alert('Veuillez remplir tous les champs obligatoires');
                    return;
                }
                
                // Numéro WhatsApp du vendeur (format international sans +)
                const vendeurWhatsApp = '221771539501';
                
                // Création du message avec vérification des valeurs
                const message = `Nouvelle commande de *${nom.trim()}* (${telephoneClient.trim()}):
                
*Produit:* ${produit.trim()}
*Quantité:* ${quantite.trim()}

*Message:* ${messageComplementaire ? messageComplementaire.trim() : 'Aucun message supplémentaire'}

Merci de confirmer la disponibilité et le prix de ma commande.`;

                // Encodage du message pour l'URL
                const messageEncode = encodeURIComponent(message);
                
                // Création du lien WhatsApp sécurisé
                const whatsappUrl = `https://wa.me/${vendeurWhatsApp}?text=${messageEncode}`;
                
                // Afficher la confirmation
                whatsappForm.style.display = 'none';
                confirmation.style.display = 'block';
                
                // Mettre à jour le lien de secours
                whatsappLink.href = whatsappUrl;
                whatsappLink.textContent = whatsappUrl; // Ajout pour visibilité
                
                // Détection de l'appareil et ouverture appropriée
                const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                
                if (isMobile) {
                    // Tentative d'ouverture dans l'app native
                    window.location.href = `whatsapp://send?phone=${vendeurWhatsApp}&text=${messageEncode}`;
                    
                    // Fallback après 500ms
                    setTimeout(() => {
                        if (!document.hidden) { // Si toujours sur la page
                            window.open(whatsappUrl, '_blank');
                        }
                    }, 500);
                } else {
                    // Pour desktop
                    window.open(whatsappUrl, '_blank');
                }
            } catch (error) {
                console.error('Erreur lors de la soumission:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        });
    } else {
        console.error('Un ou plusieurs éléments du formulaire sont introuvables');
    }
});