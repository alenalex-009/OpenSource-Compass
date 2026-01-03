let programs = [];

/* ---------- Fetch Data ---------- */
fetch("../data/programs.json")
    .then(res => res.json())
    .then(data => {
        programs = data;
        renderPrograms();
    });

/* ---------- Render Programs ---------- */
function renderPrograms(filteredPrograms = programs) {
    const container = document.getElementById("programsContainer");

    if (!filteredPrograms.length) {
        container.innerHTML = `
            <div class="no-results">
                <h3>No programs found</h3>
                <p>Try adjusting your filters</p>
            </div>`;
        return;
    }

    container.innerHTML = filteredPrograms.map(p => `
        <div class="program-card" onclick="openModal(${p.id})">
            <div class="program-header">
                <h3>${p.name}</h3>
                <span class="program-status status-${p.status.toLowerCase()}">${p.status}</span>
            </div>

            <p class="program-description">${p.description}</p>

            <div class="program-details">
                <div class="detail-item">
                    <span class="detail-label">Timeline</span>
                    <span class="detail-value">${p.timeline}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Stipend</span>
                    <span class="detail-value">${p.stipend}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Contributors</span>
                    <span class="detail-value">${p.contributors}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Open Issues</span>
                    <span class="detail-value">${p.issues}</span>
                </div>
            </div>

            <div class="program-badges">
                <span class="badge difficulty-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
                <span class="badge">${p.organizations} Organizations</span>
            </div>

            <div class="program-actions">
                <button class="btn btn-primary" onclick="event.stopPropagation(); openModal(${p.id})">View Details</button>
                <button class="btn btn-secondary" onclick="event.stopPropagation(); viewIssues(${p.id})">View Issues</button>
            </div>
        </div>
    `).join("");
}

/* ---------- Modal ---------- */
function openModal(id) {
    const p = programs.find(x => x.id === id);
    document.getElementById("modalBody").innerHTML = `
        <h2>${p.name}</h2>
        <p>${p.description}</p>
    `;
    document.getElementById("programModal").style.display = "block";
}

document.querySelector(".close-btn").onclick = () =>
    document.getElementById("programModal").style.display = "none";

/* ---------- Filters ---------- */
function filterPrograms() {
    const d = difficultyFilter.value;
    const s = statusFilter.value;
    const q = searchBox.value.toLowerCase();

    renderPrograms(programs.filter(p =>
        (!d || p.difficulty === d) &&
        (!s || p.status === s) &&
        (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    ));
}

difficultyFilter.onchange = statusFilter.onchange = searchBox.oninput = filterPrograms;
