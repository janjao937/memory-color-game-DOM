const tileContainer = document.querySelector(".tiles");

const colors = [
    "aqua",
    "aquamarine",
    "crimson",
    "blue",
    "dodgerblue",
    "gold",
    "pink",
    "greenyellow"        
];
const colorsPickList = [...colors,...colors];
const tileCount = colorsPickList.length;

//Game State
let revealedCount = 0;
let activeTile = null;
let awaitingEndMove = false;

//build tile
const createTile =(color)=>{
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color",color);
    element.setAttribute("data-revealed","false");

    element.addEventListener("click",()=>{
        const revealed = element.getAttribute("data-revealed");

        if(awaitingEndMove || revealed==="true"||element === activeTile){
            return;
        }
        element.style.backgroundColor = color;
        if(!activeTile){
            activeTile = element;
            return;
        }

        const colorMatch = activeTile.getAttribute("data-color");

        if(colorMatch === color)
        {
            activeTile.setAttribute("data-revealed","true");
            element.setAttribute("data-revealed","true");
            awaitingEndMove=false;
            activeTile=null;
            revealedCount+=2;

            if(revealedCount===tileCount){
                alert("you win");
            }
            return;
        }
        awaitingEndMove = true;
        setTimeout(()=>{
           
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;
            awaitingEndMove=false;
            activeTile = null;

        },1000);
    })
    return element;
}

//create tile

for(let i = 0;i<tileCount;i++){

    const randomIndex = Math.floor(Math.random()*colorsPickList.length)// (0.1-1)*16
    const color = colorsPickList[randomIndex];
    colorsPickList.splice(randomIndex,1);
    const tile = createTile(color);
    
    // console.log(color);
    tileContainer.appendChild(tile)

}