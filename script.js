let links

function generateRandomNumbers(range) {
    const indexs= []
    while(indexs.length!=30){
        const index = Math.floor(Math.random()* (range  + 1)) ;

        if(!indexs.includes(index)){
            indexs.push(index)
        }
    }
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
                                                       setTimeout(()=>{
                                                                         window.open(links.links[i],'_blank');
                                                                        //  console.log(links.links[i],'\n',i,'\n',index)
                                                                         console.log((Math.random()*60)+10)
                                                                      }, ((Math.random()*60)+10)*1000)
                                                     })    
                    })
}   


getLiks()

