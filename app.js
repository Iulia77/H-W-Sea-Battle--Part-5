//Array of objects

//H-W1 Add explosion property to each layer
// and using if render the explosion only when torpedo is layer as the ship

let layers = [
    {
        ship: false,
        torpedo: false,
        explosion: false
    },
    {
        ship: false,
        torpedo: false,
        explosion: false
    },
    {
        ship: false,
        torpedo: false,
        explosion: false
    },
    {
        ship: false,
        torpedo: false,
        explosion: false
    },
    {
        ship: false,
        torpedo: false,
        explosion: false
    },
    {
        ship: false,
        torpedo: false,
        explosion: false
    },
    {
        ship: false,
        torpedo: false,
        explosion: false
    },
    {
        ship: false,
        torpedo: false,
        explosion: false
    },
    {
        ship: false,
        torpedo: false,
        explosion: false
    },
    {
        ship: false,
        torpedo: false,
        explosion: false
    },
    
]

let score = 0


let ship = {
    x: -600,
    layer: 0,
    dir: 1
}
let explosion = {
    x: 0,
    layer: 0
}

let scope = {
    x: 0
}

let torpedo = {
    x: 0,
    layer: 0,
    shot: false
}

let timerShip
let timerTorpedo

// HW1:
//add explosion to the render

const render = () => {
    let seaDiv = document.querySelector('.sea')
    seaDiv.innerHTML = ``

for(let i=0; i<=9; i++) {

    let objects = ``

    if (layers[i].ship) {
        objects += `
        <div class="ship" style="left: ${ship.x}px">
                <div class="main"></div>
                <div class="middle">
                </div>
                <div class="top"></div>
                <div class="top-1"></div>
                <div class="top-2"></div>
                <div class="mast">
                    <div class="mast-1"></div>
                </div>
                
            </div>
        `
    }
    if (layers[i].torpedo) {
        objects += `
        <div class="torpedo reverse"
        style="left: ${torpedo.x}px">
        <div class="head center">    
        </div>
        <div class="body center">
        </div>
        <div class="tail-h center"></div>
        <div class="tail-v center"></div>
        <div class="tail center"></div>
        </div>
        `
    }
    if (layers[i].explosion) {
        objects += `
        <div class="explosion"
        style="left: ${explosion.x}px">
        <div class="fire-bottom-sm"></div>
        <div class="fire-bottom-md"></div>
        </div>
        `
    }


    seaDiv.innerHTML += `
    <div class="layer"> <!--layer ${i} 0-->
    ${objects}

    <div class="wave"></div>
   </div>`
}

seaDiv.innerHTML += `<div class="scope"
                      style="left: ${scope.x}px"
                      >
                     <div class="mid">+</div>
                     <div class="h">--</div>
                    <div class="v">--</div>
                    </div>`


}

const moveScope = (e) => {
    scope.x = e.clientX - 100
}

const shoot = (e) => {
    if(e.code == "Space" && !torpedo.shot) {
        torpedo.shot = true
        torpedo.layer = 0
        layers[torpedo.layer].torpedo = true
        torpedo.x = scope.x + 445
        console.log(e)
        console.log(layers)

        
        timerTorpedo = setInterval(()=>{
             if(torpedo.layer == 9) {
                clearInterval(timerTorpedo)
                torpedo.shot = false
                layers[torpedo.layer].torpedo = false
                // HW4: each time torpedo misses 
                // decrease the score
             } else {
                 layers[torpedo.layer].torpedo = false
                 torpedo.layer ++
                 layers[torpedo.layer].torpedo = true

                 if( 
                    torpedo.layer == ship.layer
                    &&
                    torpedo.x > ship.x - 10
                    &&
                    torpedo.x < ship.x - 310
                  ) {
                    alert("Yee!")

                    //Hw2: update the explosion layer
                    // increase score 
                    //reset the ship
                    //HW3: create a function that render the score in the footer

                 }
             }
             
        }, 500)
    }
    
}






const resetShip = () => {
    for(let i = 0; i<layers.length; i++) {
        layers[i].ship = false
    }
    let ridx = Math.floor(Math.random() * 10)
    ship.layer = ridx
    layers[ridx].ship = true


    let rand = Math.random()

    if( rand >= 0.5) {
        ship.x = -600
        ship.dir = 1
    } else {
        ship.x = innerWidth+600
        ship.dir = -1
    }

    clearInterval(timerShip)
    timerShip = setInterval(() => {
        ship.x += ship.dir

        if(ship.dir == 1 && ship.x > innerWidth+600) {
            resetShip()
        }
        if(ship.dir == -1 && ship.x < -600) {
            resetShip()
        }

        render()
    }, 10)
}





//  timerShips
// setTimeout (f, delay)
// setInterval(f, delay)

resetShip()
render()