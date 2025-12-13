function renderApps() {
    const apps = document.querySelectorAll('.app');
    apps.forEach((app, index) => {
        app.id = `app-${index + 1}`;
    });
    
};



document.addEventListener("DOMContentLoaded", () => {
    // Initialize clock
        updateClock();
        setInterval(updateClock, 1000);
});


// ===================
// Update clock function
// ===================
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('day').textContent = day;
    document.getElementById('month').textContent = month;
    document.getElementById('year').textContent = year;

    
}


// ===================
// Load storage.json
// ===================
async function loadStorage() {
    try {
        const response = await fetch('storage.json');
        const data = await response.json();
        return data; // { tasklist: [...], "crafting-queue": [...] }
    } catch (err) {
        console.error("Error reading storage.json", err);
    }
}

// ===================
// Load everything on page load
// ===================
document.addEventListener("DOMContentLoaded", async () => {
    const data = await loadStorage();
    if (data) {
        renderTasks(data.tasklist);
        renderQueue(data["crafting-queue"]);
    }
    
});

renderApps();