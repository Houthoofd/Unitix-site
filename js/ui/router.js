export function setupRouter() {
    const navItems = document.querySelectorAll('#sidebar-nav .nav-item[data-view]');
    const viewSections = document.querySelectorAll('.view-section');
    const sidebar = document.getElementById('sidebar');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetViewId = item.getAttribute('data-view');
            
            // 1. Mettre à jour les liens de la sidebar
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // 2. Mettre à jour les vues
            viewSections.forEach(section => {
                section.classList.remove('active-view');
                section.classList.add('hidden-view');
            });
            
            const targetSection = document.getElementById(`view-${targetViewId}`);
            if (targetSection) {
                targetSection.classList.remove('hidden-view');
                targetSection.classList.add('active-view');
            }
            
            // 3. Fermer la sidebar sur mobile ou après clic (facultatif, améliore l'UX)
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('expanded');
            }
        });
    });
}
