import { setupGenerator } from './ui/generator.js';
import { setupRouter } from './ui/router.js';
import { setupProjectState } from './ui/projectState.js';

console.log("Unitix App Initialized.");
setupGenerator();
setupRouter();
setupProjectState();

// Sidebar logic
const sidebar = document.getElementById('sidebar');
const userProfileBtn = document.querySelector('.user-profile');
const closeSidebarBtn = document.getElementById('close-sidebar');
const appLogoBtn = document.getElementById('app-logo-btn');

if (userProfileBtn && sidebar) {
    userProfileBtn.addEventListener('click', () => {
        if (!userProfileBtn.classList.contains('locked')) {
            sidebar.classList.toggle('expanded');
            sidebar.classList.remove('mini');
        }
    });
}

if (closeSidebarBtn && sidebar) {
    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('expanded');
        sidebar.classList.remove('mini');
    });
}

if (appLogoBtn && sidebar) {
    appLogoBtn.addEventListener('click', () => {
        // Optionnel : empêcher l'ouverture si on est bloqué sur l'onboarding
        if (!userProfileBtn.classList.contains('locked')) {
            sidebar.classList.toggle('mini');
            sidebar.classList.remove('expanded');
        }
    });
}
