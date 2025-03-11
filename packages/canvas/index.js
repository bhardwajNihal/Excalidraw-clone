
const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");                // initializing the canvas instance
console.log(ctx);

//setting up the canvas dimension to fully occupy the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// setting up common styles
ctx.fillStyle = "red";                // the color of the shapes
ctx.strokeStyle = "yellow"            // the color of the border of the shapes
ctx.lineWidth = 5                      // always to set line-width before calling stroke()


// maintaining the canvas dimensions on resize
window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // rectangle - here to avoid distortion on window resize
        // ctx.fillStyle = "yellow";           
        // ctx.fillRect(10,10,500,600)        
})



// drawing a rectangle
    // ctx.fillRect(10,10,500,600)            //takes initial coordinates and width and height as arguments


// // circle 
//     ctx.beginPath();                        // tell js to begin to draw
//     ctx.arc(100,100,50,0,Math.PI*2);        //(initial coordinates,radius,start angle, end angle), best practice to use math.pi
//     // ctx.fill()                           // for solid shape
//     ctx.stroke()                            // for shape outline
    // console.log(ctx);
    




// Adding mouse events 

    // defining a global mouse object to track coordinates
    const mouse ={
        x : undefined,
        y : undefined
    }

// adding a click event listener
    // canvas.addEventListener("click",(event) =>{  
    //     mouse.x = event.x
    //     mouse.y = event.y
    //     console.log(mouse);
    //     drawCircle(mouse.x,mouse.y)         // calling to draw circle on dynamic coordinates
    // })

    // adding a mousemove eventlistener
    canvas.addEventListener("mousemove",(event) => {
        mouse.x = event.x
        mouse.y = event.y
        drawCircle(mouse.x,mouse.y)         // seems to be drawing in the canvas
    })




//wrapping function to draw circle inside a function
    function drawCircle(x,y){
        ctx.beginPath();
        ctx.arc(x,y,10,0,Math.PI*2);
        ctx.fill();
    }