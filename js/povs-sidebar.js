// js/povs-sidebar.js
function renderPovsSidebar() {
    const nav = document.getElementById('sidebarNav');
    if (!nav) return;

    const currentPath = window.location.pathname.split('/').pop();

    nav.innerHTML = povs.map(item => {
        const isActive = currentPath === item.pageUrl;
        return `
            <a href="${item.pageUrl}" class="sidebar-item ${isActive ? 'active' : ''}">
                <span class="sidebar-item-title">${item.title}</span>
                <span class="sidebar-item-date">${item.date}</span>
            </a>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', renderPovsSidebar);