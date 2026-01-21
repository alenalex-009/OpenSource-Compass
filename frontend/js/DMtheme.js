/* theme.js - Modular Dark Mode Logic */

document.addEventListener('DOMContentLoaded', () => {
    const themeStorageKey = 'selectedTheme';
    const darkThemeClass = 'dark-mode';

    // 1. Check for saved preference immediately on load
    const savedTheme = localStorage.getItem(themeStorageKey);
    if (savedTheme === 'dark') {
        document.body.classList.add(darkThemeClass);
        updateIcons(true);
    }

    // 2. Global Event Listener (Works for dynamically loaded navbars)
    document.addEventListener('click', (event) => {
        // Check if the clicked element is our toggle button (or icon inside it)
        const toggleBtn = event.target.closest('#theme-toggle, #theme-icon');
        
        if (toggleBtn) {
            event.preventDefault(); // Stop default link action
            
            // Toggle the class on the body
            document.body.classList.toggle(darkThemeClass);
            const isDark = document.body.classList.contains(darkThemeClass);

            // Save the user's preference
            localStorage.setItem(themeStorageKey, isDark ? 'dark' : 'light');

            // Update the icon (Moon <-> Sun)
            updateIcons(isDark);
        }
    });

    // Helper function to swap icons
    function updateIcons(isDark) {
        // Find all theme icons on the page (mobile & desktop)
        const icons = document.querySelectorAll('.fa-moon, .fa-sun');
        
        icons.forEach(icon => {
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
});