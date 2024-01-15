let links

function generateRandomNumbers(range) {
    const indexs= []
    while(indexs.length!=Math.floor(Math.random()*(50-30))+30){
        const index = Math.floor(Math.random()* (range  + 1)) ;

        if(!indexs.includes(index)){
            indexs.push(index)
        }
    }
    return indexs
}

function timer(index){
    let a= Math.random();
    let b= Math.random()
    let time=index+a+b
    // console.log(time)
    return time
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
                                                                      }, timer(index)*10000)
                                                     })    
                    })
}   


getLiks()

