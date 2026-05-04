
// General body options to avoid problems - DONE
document.body.style.backgroundColor = "gray";
document.body.style.width = "100%";
document.body.style.height = "100%";
document.body.style.boxSizing = "border-box";
document.body.style.padding = "0px";
document.body.style.margin = "0px";

// Main container - DONE
let mainContainer = document.querySelector("#main-container");
mainContainer.style.display = "flex";
mainContainer.style.flexDirection = "column-reverse";
mainContainer.style.alignItems = "center";
mainContainer.style.width = "100%";
mainContainer.style.height = "100%";


// Creacion de la barra de botones, los botones, y el contenedor de 
// la funcion que creara el grid.

let btnReset, btnCanvasSize, btnDrawMode, canvasContainer;

// grid container - DONE

canvasContainer = document.createElement("div");
mainContainer.appendChild(canvasContainer);
canvasContainer.style.display = "flex";
canvasContainer.style.flexWrap = "wrap";
canvasContainer.style.height = "500px";
canvasContainer.style.width = "500px";
canvasContainer.style.marginTop = "8px";
canvasContainer.style.outline = "3px solid black"
canvasContainer.style.boxSizing = "border-box";

// Function to make every item on canvasContainer (every item of the grid)
function createCanvasSize(alto, ancho){
    canvasContainer.replaceChildren();
    for(let i = 0; i < alto*ancho; i++) {
        if(alto > 100 || ancho > 100){
            return alert("PLEASE DONT USE MORE THAN 100!, you pc can explode!");
        } else if (typeof alto !== "number" || typeof ancho !== "number"){
            return alert("Please use only numbers");
        }
    let canvasSquare = document.createElement("div");
    canvasSquare.style.width = `calc(100% / ${ancho})`; 
    canvasSquare.style.height = `calc(100% / ${alto})`;
    canvasSquare.style.boxSizing = "border-box";
    canvasSquare.classList.toggle("outlined");
    canvasSquare.classList.add("cnvSquare")
    canvasContainer.appendChild(canvasSquare);
}   
    
    }

// BUTTONS CONTAINER - DONE
let btnContainer = document.createElement("div");
mainContainer.appendChild(btnContainer);
btnContainer.style.display = "flex";
btnContainer.style.height = "5vh";
btnContainer.style.width = "100vw";
btnContainer.style.justifyContent = "center";
btnContainer.style.gap = "8px";
btnContainer.style.marginTop = "8px";

// BUTTON TO CLEAN GRID - DONE
btnReset = document.createElement("button");
btnReset.textContent = "Reset grid";
btnReset.setAttribute("id", "resetCanva");
Array.from(canvasContainer.children).forEach((nodo) => {
    nodo.style.backgroundColor = "";
    nodo.style.opacity = "";
});

btnContainer.appendChild(btnReset);

// BUTTON GRID SIZE - DONE
btnCanvasSize = document.createElement("button");
btnCanvasSize.textContent = "Change grid size";
btnCanvasSize.setAttribute("id", "canvasSize");
btnCanvasSize.addEventListener("click", (e) => {
    createCanvasSize(prompt("canvas height"), prompt("canvas width"));

})
btnContainer.appendChild(btnCanvasSize);

// Random Color generator:

function randomColor(){
    let rcolor = [0, 0, 0];
    rcolor.forEach((cv, index) => {
        return rcolor[index] = Math.floor(Math.random() * 255) + 1;
    })
    return rcolor;
}

// BUTTON COLOR MODE - Done

let btnColor = document.createElement("button");
let colorChoice;
btnColor.textContent = `Color:`;


btnColor.addEventListener("click", (e) => {
    colorChoice = prompt(`Enter a Color to Use (RGB format Allowed) or nothing to random color`);
    btnColor.textContent = `Color: ${colorChoice}`;
    itemColorChoice.style.backgroundColor = `${colorChoice}`;
})
btnContainer.appendChild(btnColor);

//Color choice Indicator by RGB:
let itemColorChoice = document.createElement("div");
                itemColorChoice.style.width = "20px";
                itemColorChoice.style.height = "50%";
                itemColorChoice.style.backgroundColor = `${colorChoice}`;
                itemColorChoice.style.alignSelf = "center";
                btnContainer.appendChild(itemColorChoice);

// BUTTON TO HIDE OR SHOW BORDER OF GRID ELEMENTS - DONE

let btnOutline = document.createElement("button");
btnOutline.textContent = "Show grid border";
btnOutline.addEventListener("click", (e) => {
    let elements = document.querySelectorAll(".cnvSquare");
    elements.forEach(element => {
        element.classList.toggle("outlined");
    })
});

btnContainer.appendChild(btnOutline);

// DRAW CODE




// BUTTON MOUSE MODE
btnDrawMode = document.createElement("button");
btnDrawMode.value = "click";
btnDrawMode.textContent = `Draw Mode`;
btnDrawMode.setAttribute("id", "drawMode");
btnDrawMode.addEventListener("click", drawMode);
btnContainer.appendChild(btnDrawMode);



// Function to DRAW.

function drawMode(e){
    if (btnDrawMode.value === "click"){
        canvasContainer.removeEventListener("click", drawingHandler);

        canvasContainer.addEventListener("mouseover", drawingHandler);
        btnDrawMode.value = "mouseover";
        btnDrawMode.textContent = `Draw Mode MOUSEOVER`;
    } else if (btnDrawMode.value === "mouseover"){
        canvasContainer.removeEventListener("mouseover", drawingHandler);

        canvasContainer.addEventListener("click", drawingHandler); 
        btnDrawMode.value = "click";   
        btnDrawMode.textContent = `Draw Mode CLICK`;    
    }
};
canvasContainer.addEventListener("click", drawingHandler);
// Funcion para dibujar


function drawingHandler(e){
    drawing(e, colorChoice);
}
// Window get computed is better than target.style.background color 
            //because return a rgb value and not an string "black" }
            //value


function drawing(e, colorC){
    let target = e.target;
    if(target === canvasContainer){
        undefined;
    }else{
        // if color is not defined
        if(target.style.backgroundColor === "" && (colorChoice === undefined || colorChoice === "" || colorChoice === null)){
            target.style.backgroundColor = `RGB(${randomColor().join(",")}, 0.1)`;
        // if color is defined
        } else if (colorChoice){
            if(target.style.backgroundColor === ""){
                target.style.backgroundColor = colorChoice;
                let colOpac = window.getComputedStyle(target).backgroundColor.match(/-?\d+\.?\d*/g).map(Number);
                colOpac.push(0.1);
                target.style.backgroundColor = `RGB(${colOpac})`;
                
            } else if(!(target.style.backgroundColor === "")){
                // if the color is the same at colorChoice
                let cChoice = window.getComputedStyle(itemColorChoice).backgroundColor.match(/-?\d+\.?\d*/g).map(Number).join(" ");

                let targetColor = window.getComputedStyle(target).backgroundColor.match(/-?\d+\.?\d*/g).map(Number);
                targetColor.pop();
                targetColor = targetColor.join(" ");

                if(targetColor === cChoice){
                    let opacSum = window.getComputedStyle(target).backgroundColor.match(/-?\d+\.?\d*/g).map(Number);
                    console.log(opacSum);
                    if(opacSum[3] <= 1){
                opacSum[3] += 0.1;
                }
                target.style.backgroundColor = `RGB(${opacSum.join(",")})`
                } else if (targetColor !== cChoice){
                    let colOpac = window.getComputedStyle(itemColorChoice).backgroundColor.match(/-?\d+\.?\d*/g).map(Number);
                    colOpac.push(0.1);
                    target.style.backgroundColor = `RGB(${colOpac})`;
                }
                }
            
        // if item has a color and colorChoice is falsy
        } else if(target.style.backgroundColor !== ""){
            let colOpac = window.getComputedStyle(target).backgroundColor.match(/-?\d+\.?\d*/g).map(Number);
            if(colOpac[3] <= 1){
            colOpac[3] += 0.1;
            }
            target.style.backgroundColor = `RGB(${colOpac})`;
            console.log(target.style.backgroundColor);
            
        }
    }

        
};


