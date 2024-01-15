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
                                                                        // var a = Math.random() ;
                                                                        // var b = Math.random() ;
                                                                        // console.log(index+a+b, "this time is sec: ", (index+a+b)*10000)
                                                                      }, (index+a+b)*10000)
                                                     })    
                    })
}   


getLiks()

