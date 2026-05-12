import { getMockTest } from '../mock/testTemplates.js';

export function setupGenerator() {
    const generateBtn = document.getElementById('generate-btn');
    const btnText = generateBtn.querySelector('.btn-text');
    const loader = generateBtn.querySelector('.loader');
    const outputCode = document.querySelector('#output-code code');
    const copyBtn = document.getElementById('copy-btn');
    
    const frameworkSelect = document.getElementById('framework-select');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // Setup Tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.editor-container').forEach(c => {
                // Keep classes but toggle hidden-tab
                c.classList.add('hidden-tab');
                c.classList.remove('active-tab');
            });
            
            // Add active class to clicked tab
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            targetEl.classList.remove('hidden-tab');
            targetEl.classList.add('active-tab');
        });
    });
    
    generateBtn.addEventListener('click', async () => {
        // Obtenir les valeurs sélectionnées
        const framework = frameworkSelect.value;
        const testType = document.querySelector('input[name="test-type"]:checked').value;
        
        // UI State: Loading
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
        generateBtn.style.pointerEvents = 'none';
        outputCode.innerHTML = '<span style="color: var(--text-muted)">// Analyse du code en cours...</span>';
        
        // Simuler un délai réseau/processing (1.5s)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Récupérer le mock
        const testCode = getMockTest(framework, testType);
        
        // UI State: Done
        outputCode.textContent = testCode;
        
        // Animation simple d'apparition
        outputCode.classList.remove('type-animation');
        void outputCode.offsetWidth; // Trigger reflow
        outputCode.classList.add('type-animation');
        
        // Reset bouton
        btnText.classList.remove('hidden');
        loader.classList.add('hidden');
        generateBtn.style.pointerEvents = 'all';
    });

    copyBtn.addEventListener('click', () => {
        const text = outputCode.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const icon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--neon-green)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
                copyBtn.innerHTML = icon;
            }, 2000);
        });
    });
}
