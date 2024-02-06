let links

function generateRandomNumbers(range) {
    const indexs= [];
    let tabs= Math.floor(Math.random()*(60-35))+35;
    document.getElementById("total_tabs").innerHTML="Total Tabs: " + tabs;
    while(indexs.length!=tabs){
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
    let time=index+(a*3.1)+(b*3.1)
    document.getElementById("time").innerHTML="Estimated Time: " + (time*10)/60 +" Min..."
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
                                                                        document.getElementById("tabcount").innerHTML= "Tabs oppened till now: " + (index + 1);                                                                        
                                                                      }, (timer(index))*10000)
                                                     })    
                    })
}   

getLiks()

