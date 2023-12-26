let links
function getLiks() {
    fetch("./links.json")
    .then((res) => {
        return res.json();
    })
    .then((data) => {links = data; console.log(links) });
}

getLiks()