let links

function generateRandomNumbers(range) {
    const indexs= []
    while(indexs.length!=30){
        const index = Math.floor(Math.random()* (range  + 1)) ;

        if(!indexs.includes(index)){
            indexs.push(index)
        }
    }
    indexs.push("https://www.bing.com/search?q=stop+signe+image&cvid=e1b660696ea346d9acfe115da6c53afd&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEAAYQDIGCAcQABhAMgYICBAAGEDSAQg0NzE2ajBqOagCALACAA&FORM=ANAB01&PC=HCTS")
    return indexs
}

function getLiks() {
    fetch("./links.json")
    .then((res) => {
        return res.json();
    })
    .then((data) => {   links = data; 
                        const linkIndex=generateRandomNumbers(links.links.length)
                        linkIndex.forEach((i,index)=>{
                                                       setTimeout(()=>{window.open(links.links[i],'_blank')}, index*10000)
                                                     })
                    });
}


getLiks()