async function loadProjects() {
    try {
        const res = await fetch('data/projects.json');
        if (!res.ok) throw new Error();
        const projects = await res.json();
        const container = document.getElementById('projects-container');
        container.innerHTML = '';
        projects.forEach(p => {
            container.innerHTML += `
                <div class="project-card">
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    <p><strong>Technologies:</strong> ${p.technologies}</p>
                    <p><strong>Role:</strong> ${p.role}</p>
                </div>
            `;
        });
    } catch {
        document.getElementById('projects-container').innerHTML = '<p style="color:var(--gray-600);">Unable to load projects.</p>';
    }
}

async function fetchGitHubRepos() {
    const username = 'yourusername';
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
        if (!res.ok) throw new Error();
        const repos = await res.json();
        const container = document.getElementById('github-repos');
        container.innerHTML = '';
        repos.forEach(r => {
            container.innerHTML += `<p style="margin-bottom: 0.5rem;">📂 <a href="${r.html_url}" target="_blank">${r.name}</a> — ${r.language || '—'}</p>`;
        });
    } catch {
        document.getElementById('github-repos').innerHTML = '<p style="color:var(--gray-600);">GitHub repositories unavailable.</p>';
    }
}

const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('form-status');

    if (!name || !email || !message) {
        status.textContent = '⚠️ Please fill in all fields.';
        status.style.color = '#8b0000';
        return;
    }
    if (!email.includes('@')) {
        status.textContent = '⚠️ Please enter a valid email address.';
        status.style.color = '#8b0000';
        return;
    }

    status.textContent = '✅ Thank you! Your message has been sent successfully.';
    status.style.color = '#006400';
    form.reset();
    setTimeout(() => status.textContent = '', 5000);
});

const backTopBtn = document.getElementById('back-top-btn');
window.addEventListener('scroll', () => {
    backTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});
backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

loadProjects();
fetchGitHubRepos();
