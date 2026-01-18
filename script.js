let links;

/* ---------- Secure random (optional but recommended) ---------- */
function rand() {
    return crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
}

/* ---------- Log-normal random delay (human-like) ---------- */
function randomDelay(min, max) {
    let u = 0, v = 0;
    while (u === 0) u = rand();
    while (v === 0) v = rand();

    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    // normalize to 0–1
    num = (num + 3) / 6;
    num = Math.min(Math.max(num, 0), 1);

    return min + num * (max - min);
}

/* ---------- Behavioral state machine ---------- */
let state = "normal";

function nextDelay() {
    // Occasionally change behavior
    if (rand() < 0.08) {
        state = state === "normal" ? "pause" : "normal";
    }

    if (state === "pause") {
        return randomDelay(20, 60); // long pause
    }

    // bursts
    if (rand() < 0.25) {
        return randomDelay(1, 4); // fast clicking
    }

    return randomDelay(4, 15); // normal browsing
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
                const delay = nextDelay();
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