let links;

/* ---------- Secure random ---------- */
function rand() {
    return crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
}

/* ---------- Skewed human-like delay generator ---------- */
function humanDelay() {
    const r = rand();

    // Rare long pause (~1 min)
    if (r < 0.12) {                 // ~12% chance
        return 30 + rand() * 30;    // 30–60s
    }

    // Main distribution: 20–30s (log-normal-ish)
    let u = 0, v = 0;
    while (u === 0) u = rand();
    while (v === 0) v = rand();

    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    // Normalize to 0–1, heavily centered
    z = (z + 2.2) / 4.4;
    z = Math.min(Math.max(z, 0), 1);

    let delay = 20 + z * 10; // 20–30s

    // Short burst behavior (human quick actions)
    if (rand() < 0.18) {
        delay *= 0.6 + rand() * 0.6; // 60–120%
    }

    return delay;
}

/* ---------- Random unique index generator ---------- */
function generateRandomIndexes(range) {
    const count = Math.floor(rand() * (60 - 35)) + 35;
    document.getElementById("total_tabs").innerHTML = "Total Tabs: " + count;

    const indexes = new Set();
    while (indexes.size < count) {
        indexes.add(Math.floor(rand() * range));
    }

    return [...indexes];
}

/* ---------- Main logic ---------- */
function getLinks() {
    fetch("./links.json")
        .then(res => res.json())
        .then(data => {
            links = data;

            const linkIndexes = generateRandomIndexes(links.links.length);
            let cumulativeDelay = 0;

            linkIndexes.forEach((i, index) => {
                const delay = humanDelay();
                cumulativeDelay += delay;

                setTimeout(() => {
                    window.open(links.links[i], "_blank");

                    document.getElementById("tabcount").innerHTML =
                        "Tabs opened till now: " + (index + 1);

                    document.getElementById("time").innerHTML =
                        "Estimated Time: " + Math.round(cumulativeDelay / 60) + " Min...";
                }, cumulativeDelay * 1000);
            });
        });
}

getLinks();
