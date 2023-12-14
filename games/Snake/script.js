const CANVAS = document.querySelector('canvas')
const CANVAS_CTX = CANVAS.getContext('2d')

function setUp(){
    CANVAS.width = CANVAS_CTX.width = 310
    CANVAS.height = CANVAS_CTX.height = 310
}
setUp()

const CAMPO = {
    w : CANVAS.width,
    h : CANVAS.height,
    _gameOver : function(){
        CANVAS_CTX.fillStyle = 'red'
        CANVAS_CTX.fillRect(0, 0, this.w, this.h)
    },
    _draw : function(){
        CANVAS_CTX.fillStyle = '#222'
        CANVAS_CTX.fillRect(0, 0, this.w, this.h)
    }
}

const SETTINGS = {
    game_size : 7,
    game_speed : 1,
    _raiseGameSpeed : function(){
        this.game_speed *= 1.05
    },
    _spawn : function(){
        return [
            {x : SETTINGS.game_size * 15, y : SETTINGS.game_size * 20},
            {x : SETTINGS.game_size * 16, y : SETTINGS.game_size * 20},
            {x : SETTINGS.game_size * 17, y : SETTINGS.game_size * 20},
            {x : SETTINGS.game_size * 18, y : SETTINGS.game_size * 20}
        ]
    },
}

const COBRA = {
    w : SETTINGS.game_size,
    corpo : SETTINGS._spawn(),
    x : 1,
    y : 0,
    pos_neg : -1,
    _respawn : function(){
        this.corpo = SETTINGS._spawn()
        this.x = 1
        this.y = 0
        this.pos_neg = -1
    },
    _grow : function(){
        this.corpo.unshift({x : (this.corpo[0].x + this.w * this.pos_neg * this.x), y : (this.corpo[0].y + this.w * this.pos_neg * this.y)})
    },
    _colide : function (){
        for(let i=1; i<this.corpo.length; i++){
            if(this.corpo[0].x == this.corpo[i].x && this.corpo[0].y == this.corpo[i].y){
                return true
            }
        }
    },
    _checkPosition : function(){
        if((this.corpo[0].x < 0 || this.corpo[0].x > CAMPO.w)||(this.corpo[0].y < 0 || this.corpo[0].y > CAMPO.h)||(this._colide())){
            CAMPO._gameOver()
            this._respawn()
            PLACAR._reset()
            SETTINGS.game_speed = 1
        }
        if(this.corpo[0].x == COMIDA.x && this.corpo[0].y == COMIDA.y){
            COMIDA._respawn()
            this._grow()
            PLACAR._point()
            SETTINGS._raiseGameSpeed()
        }
    },
    _move : function(){
        this.corpo.pop()
        this._grow()
    },
    _draw : function(){
        for(let quadrado in this.corpo){
            CANVAS_CTX.fillStyle = 'white'
            CANVAS_CTX.fillRect(this.corpo[quadrado].x, this.corpo[quadrado].y, this.w, this.w)
        }
        this._checkPosition()
        this._move()
    }
}

const COMIDA = {
    w : COBRA.w,
    x : COBRA.w * 20,
    y : COBRA.w * 25,
    _respawn : function(){
        this.x = Math.round((Math.random() * (300 - 10) + 10) / COBRA.w) * COBRA.w
        this.y = Math.round((Math.random() * (300 - 10) + 10) / COBRA.w) * COBRA.w
    },
    _draw : function(){
        CANVAS_CTX.fillStyle = 'red'
        CANVAS_CTX.fillRect(this.x, this.y, this.w, this.w)
    }
}

const PLACAR = {
    pontos : 0,
    x : CAMPO.w/2,
    y : CAMPO.h/2,
    _point : function(){
        this.pontos++
    },
    _reset : function(){
        this.pontos = 0
    },
    _draw : function(){
        CANVAS_CTX.fillStyle = 'black'
        CANVAS_CTX.textAlign = 'center'
        CANVAS_CTX.font = 'bold 60px Monospace'
        CANVAS_CTX.textBaseline = 'middle'
        CANVAS_CTX.fillText(`${this.pontos}`, this.x, this.y)
        CANVAS_CTX.fillStyle = 'grey'
        CANVAS_CTX.font = 'bold 12px Monospace'
        CANVAS_CTX.textAlign = 'left'
        CANVAS_CTX.textBaseline = 'bottom'
        CANVAS_CTX.fillText(`Speed: ${SETTINGS.game_speed.toFixed(1)}`, 5, CAMPO.h - 3)
    }
}

function draw(){
    CAMPO._draw()
    PLACAR._draw()
    COMIDA._draw()
    COBRA._draw()
    setTimeout(draw,1000/(10 * SETTINGS.game_speed))
}

draw()

function controls(n, e = 0){
    if(e.key == 'ArrowUp' || e.key == 'ArrowDown' || n == 0 || n == 2){
        COBRA.y = 1
        COBRA.x = 0
        e.key == 'ArrowUp' || n == 0 ? COBRA.pos_neg = -1 : COBRA.pos_neg = 1
    }
    else if(e.key == 'ArrowRight' || e.key == 'ArrowLeft' || n == 1 || n == 3){
        COBRA.y = 0
        COBRA.x = 1
        e.key == 'ArrowRight' || n == 3 ? COBRA.pos_neg = 1 : COBRA.pos_neg = -1
    }
}

window.addEventListener("keydown", function(e) { if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) { e.preventDefault(); } }, false);

window.document.addEventListener('keydown',(e)=>{
    controls(null , e)
})

const KEYS = document.querySelectorAll('div.controls')

for(let i = 0; i < KEYS.length; i++){
    KEYS[i].addEventListener('touchstart', ()=> {controls(i)})
}
