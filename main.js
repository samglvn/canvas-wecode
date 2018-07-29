const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d") 
ctx.fillStyle = "purple" //cambia el color del pincel
//ctx.fillRect(0,0,512,512)//funcion de pincel que recibe la x en donde la dibuje y la y, del html width y heigth

/*//variables
let marioLink = "https://bit.ly/2v3FTX5"// se copio el link de la imagen de mario de la pag del material
let imagen = new Image ()//se crea una imagen a partir de algo ya hecho es lo mismo que la etiqueta img html
imagen.src = marioLink // nuevo valor para imagen
//callbacks, esta funcion usala cuando termines de cargar en esta caso carga la imagen
imagen.onload = ()=> {
    ctx.drawImage(imagen,0,0,50,50)//herramienta que dibujara imagen nombre de la img, x,y,alto y ancho
}
let x = 0;
setInterval( () => {
    ctx.clearRect(0,0,canvas.width,canvas.height)//que borra el arrastre de la imagen
    ctx.drawImage(imagen,x,0,50,50) // donde lo pinta el ancho y el alto
    x++
    if (x>canvas.width) x=0//condicionamos para que solo este dentro del ancho del canvas
},1000/60)// aqui se indicaque hacer y cada cuanto*/



//canvas



//variables
let intervalo
let enemies = [];
let frames= 0 ;



//constructores
//
function Background(){
    //this representa al objeto creado a partir de una plantilla
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.imagen = new Image()
    this.imagen.src = "https://bit.ly/2LA87TH"
    this.imagen.onload = function(){
        this.draw()//aqui le dices que el this correcto es el que mandas a llamar abajo
    }.bind(this)
    
    this.draw = function(){
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
    }
}
function Mario () {
    this.x = canvas.width / 3
    this.y = canvas.height -50
    this.width = 50
    this.height = 50
    this.imagen = new Image()
    this.imagen.src = "https://bit.ly/2v3FTX5"
    this.imagen.onload = function(){
        this.draw()//aqui le dices que el this correcto es el que mandas a llamar abajo
    }.bind(this)
    
    this.draw = function(){
        if (this.x<0) this.x = 0
        if(this.x>canvas.width)this.x=canvas.width-8
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
    }
    this.checkIfTouch = function(enemy){//aqui es donde se ve cuando mario toca un hongo
        return (this.x < enemy.x + enemy.width) &&
                (this.x + this.width > enemy.x) &&
                (this.y < enemy.y + enemy.height) &&
                (this.y + this.height > enemy.y);
        }

}
//termina mario

//****** Enemigo/
function Enemy(x){
    this.x = x
    this.y = 0
    this.width = 50
    this.height = 50
    this.imagen = new Image()
    this.imagen.src = "https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_77b05ce5bdfb069e316ba875cb672888.png"
    this.imagen.onload = function(){
        this.draw()
    }.bind(this)
    
    this.draw = function(){
        //Cada 60 veces/segundo le pido al enemigo que baje un px
        this.y++
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
    }
}



//instancias
//objetos creados a partir de clases = instancias
 let board = new Background();
 let mario = new Mario()
//enemigo (goomba)
var enemy1 = new Enemy(100)



//main functions
const update = () => {//funcion donde se pintan las imagenes 
    ctx.clearRect(0,0,canvas.width,canvas.height)
    //frames ayuda a saber cuántas veces hemos dibujado
    frames ++ 
    board.draw();
    mario.draw();
    enemy1.draw ();
    generateEnemy ();
    drawEnemies ();
    checkCollition();
    //gameOver();
}

const start = () => {
interval = setInterval(update,1000/60)
}

const gameOver = () => { 
    clearInterval(interval) // detiene lo de la variable interval 
    ctx.font = "50px Avenir"//tamaño de la fuente y nombre
    ctx.fillStyle = "blue"//color
    ctx.fillText('GAME OVER',100,100)// texto que aparecera

}


//aux functions

const generateEnemy = () =>{
    if (frames % 100 === 0){
    let x =Math.floor(Math.random () * 512)//genera un numero entero entre el 0 y el 512
    enemies.push(new Enemy (x))// se crea un enemigo dentro del arreglo
}
}
const drawEnemies = ()=>{
    enemies.forEach((enemy) => {//recorre el arreglo enemies
    enemy.draw()//aqui se dibuja
    });
    
} 
function checkCollition(){
    enemies.forEach((enemy) => {
        if(mario.checkIfTouch(enemy)){//mario checa si lo toca un enemigo
            gameOver()
        }
    })
}
//listeners

addEventListener("keydown",(event) => {
   if (event.keyCode === 37 && mario.x > 0)mario.x -= 50// se le indica que avanza 8px a la izquierda por lo que se pone -
   if (event.keyCode === 39 && mario.x - 50 < canvas.width) mario.x += 50 // va hacia la derecha 
})

start()