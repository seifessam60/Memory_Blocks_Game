document.querySelector(".control-buttons span").onclick=function(){
    let yourName=prompt("What Is Your Name");
    if (yourName==null||yourName=="") {
        document.querySelector(".name span").innerHTML="Unkown";
    }else{
        document.querySelector(".name span").innerHTML=yourName;
    }
    document.querySelector(".control-buttons").remove()
}

let duration=1000;

let blockContainer=document.querySelector(".game-container")

let blocks=Array.from(blockContainer.children);
let orderRange=Array.from(Array(blocks.length).keys());
shuffle(orderRange);
blocks.forEach((i,n)=>{
    i.style.order=orderRange[n]
    i.addEventListener('click',function(){
        flipBlock(i)
    })
})
//Flip Function
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('flipped')
    // count flipped blocks
    let flipBlocks=blocks.filter((i)=>i.classList.contains('flipped'))

    // if flipped == 2
    if (flipBlocks.length===2) {
        stopClick();
        
        chechMatched(flipBlocks[0],flipBlocks[1]);
    }
}

//Check matched
function chechMatched(first,second){
    let triesElement=document.querySelector(".score span");
    if (first.dataset.person===second.dataset.person) {
        first.classList.remove('flipped')
        second.classList.remove('flipped')
        first.classList.add('matched')
        second.classList.add('matched')
        document.getElementById('success').play();
    }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML)+1;
        setTimeout(()=>{
            first.classList.remove('flipped');
            second.classList.remove('flipped');
        },duration)
        document.getElementById('fail').play();
    }
}



// Stop clicking Function
let stopClick=function(){
    blockContainer.classList.add("no-click")
    setTimeout(()=>blockContainer.classList.remove("no-click"),duration)
}


//Shuffle Function
function shuffle(arr) {
    let current = arr.length,
    temp,
    random;

    while (current>0) {
        random=Math.floor(Math.random()*current)
        current--

        [arr[current],arr[random]]=[arr[random],arr[current]]
    }
    return arr
}
