export function startTutorial() {
    // Vérification LocalStorage
    if (localStorage.getItem('unitixTutorialDone') === 'true') {
        return;
    }

    const steps = [
        {
            target: '#sidebar',
            title: 'Menu de Navigation',
            desc: 'Naviguez facilement entre le tableau de bord, l\'historique et vos configurations.',
            placement: 'right'
        },
        {
            target: '#project-selector-wrapper',
            title: 'Sélecteur de Projet',
            desc: 'Passez d\'un projet à l\'autre en un clic sans avoir à recharger l\'application.',
            placement: 'bottom'
        },
        {
            target: '#view-dashboard',
            title: 'Le Dashboard',
            desc: 'Retrouvez ici la couverture de vos tests et vos dernières métriques d\'analyse.',
            placement: 'center'
        },
        {
            target: '.nav-item[data-view="generator"]',
            title: 'Le Générateur',
            desc: 'C\'est ici que la magie opère : glissez un fichier et générez vos tests instantanément.',
            placement: 'right'
        }
    ];

    let currentStep = 0;
    const overlay = document.getElementById('tutorial-overlay');
    const popover = document.getElementById('tutorial-popover');
    const titleEl = document.getElementById('tutorial-title');
    const descEl = document.getElementById('tutorial-desc');
    const stepEl = document.getElementById('tutorial-step');
    const btnNext = document.getElementById('tutorial-btn-next');
    const btnSkip = document.getElementById('tutorial-btn-skip');
    
    // Forcer l'ouverture de la sidebar pour que tous les éléments soient visibles
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.add('expanded');
        sidebar.classList.remove('mini');
    }

    function showStep(index) {
        // Nettoyer la cible ACTUELLE avant de passer à la suite
        if (currentStep < steps.length) {
            const oldTarget = document.querySelector(steps[currentStep].target);
            if (oldTarget) oldTarget.classList.remove('tutorial-highlight');
        }

        if (index >= steps.length) {
            endTutorial();
            return;
        }

        currentStep = index;
        const step = steps[index];
        const targetEl = document.querySelector(step.target);

        if (!targetEl) {
            console.warn("Tutorial target not found:", step.target);
            showStep(index + 1); // Skip if not found
            return;
        }

        // Highlight
        targetEl.classList.add('tutorial-highlight');

        // Mettre à jour les textes
        titleEl.textContent = step.title;
        descEl.textContent = step.desc;
        stepEl.textContent = `${index + 1}/${steps.length}`;
        
        if (index === steps.length - 1) {
            btnNext.textContent = "Terminer";
        } else {
            btnNext.textContent = "Suivant";
        }

        // Positionnement basique
        const rect = targetEl.getBoundingClientRect();
        
        // Reset styles
        popover.style.top = '';
        popover.style.left = '';
        popover.style.bottom = '';
        popover.style.right = '';
        popover.style.transform = '';

        if (step.placement === 'right') {
            popover.style.top = `${rect.top + (rect.height / 2) - 100}px`;
            popover.style.left = `${rect.right + 20}px`;
        } else if (step.placement === 'bottom') {
            popover.style.top = `${rect.bottom + 20}px`;
            popover.style.left = `${rect.left - 100}px`;
        } else if (step.placement === 'center') {
            popover.style.top = `50%`;
            popover.style.left = `50%`;
            popover.style.transform = `translate(-50%, -50%)`;
        }

        // Assurer que le popover ne sort pas de l'écran (très basique)
        if (parseInt(popover.style.left) < 0) popover.style.left = '20px';
    }

    function endTutorial() {
        document.body.classList.remove('tutorial-active');
        overlay.classList.add('hidden');
        popover.classList.add('hidden');
        
        // Nettoyer la dernière cible au cas où
        if (currentStep < steps.length) {
            const oldTarget = document.querySelector(steps[currentStep].target);
            if (oldTarget) oldTarget.classList.remove('tutorial-highlight');
        }
        
        // Marquer comme terminé
        localStorage.setItem('unitixTutorialDone', 'true');
    }

    // Event Listeners
    btnNext.addEventListener('click', () => showStep(currentStep + 1));
    btnSkip.addEventListener('click', endTutorial);

    // Démarrer
    document.body.classList.add('tutorial-active');
    overlay.classList.remove('hidden');
    popover.classList.remove('hidden');
    showStep(0);
}
