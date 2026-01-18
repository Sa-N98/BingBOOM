let links;

/* ---------- Secure random ---------- */
function rand() {
    return crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
}

/* ---------- Skewed human-like delay generator ---------- */
function humanDelay() {
    // Rare very long pause
    if (rand() < 0.05) return 25 + rand() * 15; // 25–40s

    // Log-normal-ish distribution
    let u = 0, v = 0;
    while (u === 0) u = rand();
    while (v === 0) v = rand();

    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    // Shift & scale to favor 10–20s
    num = (num + 2.5) / 3;  // most values ~0.8
    num = Math.min(Math.max(num, 0), 1);

    // Map to 5–30s range
    let delay = 5 + num * 25;

    // Smooth burst behavior
    if (rand() < 0.15) {
        delay *= 0.5 + rand() * 0.7; // fast action bursts (~50–120% of normal)
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
