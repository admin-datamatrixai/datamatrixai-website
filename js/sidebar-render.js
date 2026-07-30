// js/sidebar-render.js
function renderGlobalSidebar() {
    const nav = document.getElementById('sidebarNav');
    if (!nav) return;

    // Detect active page based on URL parameters or file name
    const currentPath = window.location.pathname.split('/').pop();
    const urlParams = new URLSearchParams(window.location.search);
    const currentId = parseInt(urlParams.get('id'));

    nav.innerHTML = caseStudies.map(cs => {
        // Highlight logic: checks if ID matches OR if the filename matches pageUrl
        const isActive = (currentId && cs.id === currentId) || currentPath === cs.pageUrl;
        
        return `
            <a href="${cs.pageUrl}" class="sidebar-item ${isActive ? 'active' : ''}">
                <span class="sidebar-item-title">${cs.title}</span>
                <span class="sidebar-item-date">${cs.date}</span>
            </a>
        `;
    }).join('');
}

// Automatically render sidebar when DOM loads
document.addEventListener('DOMContentLoaded', renderGlobalSidebar);