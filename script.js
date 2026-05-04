/* 
Hay que hacer un lienzo de 16x16 o lo que el 
usuario elija, (maximo 100x100). Cuando el 
mouse pase por encima de cada cuadrito que el
cuadro obtenga +10% de opacidad + cambie o 
mantenga el mismo color (prefiero el mismo, pero
si el proyecto pide otra cosa esta bien).

Ahora, quiero varias cosas: 
- Boton Cuadricula: Tamano del lienzo "n*n"
- Boton Reset, CanvasSize, y tipo de dibujo.
- Propiedades iniciales y de cambio.
- Control de cada cuadro pa formar 100x100
bien hecho ( no se como hacer eso aun xd)
- 

El Grid esta listo, faltan los events listeners:
Uno para cambiar el grid y el tamano (listo)
Uno para cada boton:
- Reset (listo)
- Color (random por cada intento o elegido)
- Borde (quitar y poner el borde al grid)
- MouseOver o click para dibujo
En parte todos estos son propiedades del grid principal.
Por lo cual, que cada uno tenga la mania de agregar y quitar event listener no seria una locura pero seria muy pesado.
*/

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
btnReset.addEventListener("click", (e) => {
    canvasContainer.replaceChildren();
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
    colorChoice = prompt(`Enter a Color to Use (RGB format Allowed) or type "random" or nothing to random color`);
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
    } else if (btnDrawMode.value === "mouseover"){
        canvasContainer.removeEventListener("mouseover", drawingHandler);

        canvasContainer.addEventListener("click", drawingHandler); 
        btnDrawMode.value = "click";       
    }
    /* old
    target = e.type;
    if(target === "click"){
        canvasContainer.removeEventListener("click",(target) =>{
    targ = target.target; drawing(targ, colorChoice); });

    canvasContainer.addEventListener("mouseover",(target) =>{
    targ = target.target; drawing(targ, colorChoice); });

    } else if(target === "mouseover") {
        canvasContainer.removeEventListener("mouseover",(target) =>{
    targ = target.target; drawing(targ, colorChoice); });

        canvasContainer.addEventListener("click",(target) =>{
    targ = target.target; drawing(targ, colorChoice); });
    btnDrawMode.value = "click";
    } */
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
    target = e.target;
    if(target === canvasContainer){
        undefined;
    }else{
        // if color is not defined
        if(target.style.backgroundColor === "" && colorChoice === undefined){
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

        //let opac = Number(e.target.style.opacity) + 0.1;
        // let bC = target.style.backgroundColor;
        // Console to debug: console.log(opac);
        /*if(Number(target.style.opacity) > 0){
            target.style.opacity = `${opac}`;
        } else if(Number(target.style.opacity) === 0)
            target.style.opacity = "0.1";
            if(colorChoice){
                target.style.backgroundColor = colorC;
            }else if(target.style.background){
            target.style.backgroundColor = `RGB(${randomColor().join(",")})`;
            }
            
}
            */
};

/*


canvasContainer.addEventListener("click", (e) => {
    let target = e.target;
    drawing(target, colorChoice);
});



// BUTTON MOUSE MODE
btnDrawMode = document.createElement("button");
let mouseToggle = "click";
btnDrawMode.textContent = `Draw Mode`;
btnDrawMode.setAttribute("id", "drawMode");
btnDrawMode.addEventListener("click", (e) => {
    let canvType = document.querySelector("canvasContainer");
    drawMode(e, mouseToggle)
})
btnContainer.appendChild(btnDrawMode);

// Funcion para reemplazar listener click por mouseover

function drawMode(e, mouseMode){
    if(mouseMode === "click"){
        canvasContainer.removeEventListener("click", drawing(targ, colorChoice));
    canvasContainer.addEventListener("mouseover", drawing(targ, colorChoice));
    mouseToggle = "mouseover"
    } else if (mouseMode === "mouseover"){
        canvasContainer.removeEventListener("mouseover", drawing(targ, colorChoice));
        canvasContainer.addEventListener("click", drawing(targ, colorChoice));
        mouseToggle = "click";
    }
};

// Funcion para dibujar 
function drawing(targ, colorC){
    if(targ === canvasContainer){
        undefined;
    }else{
        targ.style.backgroundColor = colorC;
    }
    
};
/*


function drawMode(e, mouseMode){
    target = e.target;

    if(target.type === "click"){
        canvasContainer.removeEventListener("click", drawing(e, colorChoice));
    canvasContainer.addEventListener("mouseover", drawing(e, colorChoice));
    } else if (mouseMode === "mouseover"){
        canvasContainer.removeEventListener("mouseover", drawing(e, colorChoice));
        canvasContainer.addEventListener("click", drawing(e, colorChoice));
    }
};


// Draw on the selected node. - DONE








/* Old Code for Now

// BUTTON MOUSE MODE
btnDrawMode = document.createElement("button");
let mouseToggle = "click";
btnDrawMode.textContent = `Draw Mode: ${mouseToggle}`;
btnDrawMode.setAttribute("id", "drawMode");
btnDrawMode.addEventListener("click", (e) => {
})
// toggle MOuse Functions

// Mouse Draw Mode

function drawMode(e, mouseMode){
    if(canvasContainer.e.type === "click"){
        canvasContainer.removeEventListener("click", drawing(e, color, opacity));
        canvasContainer.addEventListener("mouseover", drawing(e, color, opacity));
    } else if (mouseMode === "mouseover"){
        canvasContainer.removeEventListener("mouseover", drawing(e, color, opacity));
        canvasContainer.addEventListener("click", drawing(e, color, opacity));
    }
};
// Draw on the selected node.
function drawing(e, color, opacity){
    target = e.target;
    if(target === canvasContainer){
        undefined;
    }else{
        target.style.backgroundColor(color);
    }
    
};
btnContainer.appendChild(btnDrawMode);



//

canvasContainer.addEventListener(mouseToggle, (e) =>{
    trg = e.target;
    if(trg === canvasContainer){
        undefined;
    }else{
        e.target.style.backgroundColor = "red";
    }
})

//button to change color

let btnColor = document.createElement("button");
btnColor.textContent = "Change Color";
btnColor.addEventListener("click", () => {
    
})

//Button to show or hide borders:

let btnShowBorders = document.createElement("button");
btnShowBorders.textContent = "Show Borders";
btnShowBorders.addEventListener("click", (e) => {
    let canvasSquares = document.querySelectorAll("canvasContainer > div");
    canvasSquares.forEach((e) => {
        
        canvasSquares.classList.toggle("outline");
    })
})
btnContainer.appendChild(btnShowBorders);
*/





// ALL ELEMENT STYLE:
/* COMMENT THIS FOR USE OLD CODE LATER
document.body.style.width = "100%";
document.body.style.height = "100%";






*/
