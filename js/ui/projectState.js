import { startTutorial } from './tutorial.js';

export function setupProjectState() {
    const uploadZone = document.getElementById('project-upload-zone');
    const loader = document.querySelector('.analysis-loader');
    const stepText = document.getElementById('analysis-step-text');
    const userProfileBtn = document.getElementById('user-profile-btn');
    const profileStatus = document.getElementById('profile-status');
    const viewOnboarding = document.getElementById('view-onboarding');
    const viewDashboard = document.getElementById('view-dashboard');
    const sidebarNavItems = document.querySelectorAll('#sidebar-nav .nav-item');
    
    // Nouveaux éléments du selecteur
    const projectSelectorWrapper = document.getElementById('project-selector-wrapper');
    const projectSelector = document.getElementById('project-selector');

    if (!uploadZone) return;

    uploadZone.addEventListener('click', () => {
        loader.classList.remove('hidden');
        
        setTimeout(() => {
            stepText.textContent = "Détection du framework...";
        }, 800);

        setTimeout(() => {
            stepText.textContent = "Génération de l'arborescence...";
        }, 1600);

        setTimeout(() => {
            // Fin de l'analyse, déverrouillage
            loader.classList.add('hidden');
            stepText.textContent = "Lecture des fichiers..."; // Reset pour la prochaine fois
            
            viewOnboarding.classList.remove('active-view');
            viewOnboarding.classList.add('hidden-view');
            
            viewDashboard.classList.remove('hidden-view');
            viewDashboard.classList.add('active-view');
            
            userProfileBtn.classList.remove('locked');
            profileStatus.innerHTML = `Développeur`;
            
            // Afficher le sélecteur de projets
            if (projectSelectorWrapper) {
                projectSelectorWrapper.classList.remove('hidden');
                // Réinitialiser la valeur du selecteur au premier projet
                projectSelector.value = "ecommerce";
                updateDashboardTitle("E-commerce App");
            }
            
            sidebarNavItems.forEach(nav => nav.classList.remove('active'));
            const dashboardNav = document.querySelector('#sidebar-nav .nav-item[data-view="dashboard"]');
            if (dashboardNav) dashboardNav.classList.add('active');

            // Lancer le tutoriel
            setTimeout(() => {
                startTutorial();
            }, 300);

        }, 2400);
    });

    // Logique du Selecteur de Projet
    if (projectSelector) {
        projectSelector.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            const selectedText = e.target.options[e.target.selectedIndex].text;

            if (selectedValue === "new") {
                // Retour à l'état initial (Onboarding)
                projectSelectorWrapper.classList.add('hidden');
                
                userProfileBtn.classList.add('locked');
                profileStatus.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" style="vertical-align: middle; margin-right: 4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>Verrouillé`;
                
                // Cacher toutes les vues et afficher l'onboarding
                document.querySelectorAll('.view-section').forEach(section => {
                    section.classList.remove('active-view');
                    section.classList.add('hidden-view');
                });
                viewOnboarding.classList.remove('hidden-view');
                viewOnboarding.classList.add('active-view');
                
            } else {
                // Mise à jour factice pour le projet sélectionné
                updateDashboardTitle(selectedText);
                
                // On peut aussi basculer automatiquement sur le dashboard si on était ailleurs
                document.querySelectorAll('.view-section').forEach(section => {
                    section.classList.remove('active-view');
                    section.classList.add('hidden-view');
                });
                viewDashboard.classList.remove('hidden-view');
                viewDashboard.classList.add('active-view');
                
                sidebarNavItems.forEach(nav => nav.classList.remove('active'));
                const dashboardNav = document.querySelector('#sidebar-nav .nav-item[data-view="dashboard"]');
                if (dashboardNav) dashboardNav.classList.add('active');
            }
        });
    }
}

function updateDashboardTitle(projectName) {
    const dashboardTitle = document.querySelector('#view-dashboard h2');
    if (dashboardTitle) {
        dashboardTitle.innerHTML = `Vue d'ensemble <span style="color:var(--neon-cyan); font-weight: 400; font-size: 1.1rem; margin-left: 0.5rem;">— ${projectName}</span>`;
    }
}
