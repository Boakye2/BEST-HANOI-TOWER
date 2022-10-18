

let canvas;
let block_img = document.querySelector("#block");
let pop_background = document.querySelector("#pop");
let socle_img = document.querySelector("#scleback");
let xhr = new XMLHttpRequest();
let interval;
let A = null;
let D = null;
let I = null;
wind = {
    w:800,
    h:480
}
function sycDelay(milliseconde){
    let start = new Date().getTime();
    let end = 0;
    while( (end-start) < milliseconde ){
        end = new Date().getTime();
    }
}
function refresh(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,wind.w,wind.h)
    //update regle 
    //sycDelay(5); 
    tableauSocle.forEach(element => {
        element.draw();
        sycDelay(2); 
    });
    parcourEvent(pile)
    sycDelay(200); 
}
function Hanoi(n,D,A,I){
    if(n!=0){
        Hanoi(n-1,D,I,A);
        (function(i){
            setTimeout(function(){
                A.place(D.sommet,false,true);
                refresh();
            },i*5)
            
        })(coup)
        
             
       // A.sommet.draw();
        sycDelay(50);
        Hanoi(n-1,I,A,D);
    }
}

let coup =0;
//tuile represente nos disque
class Tuile {
    /*
    - x: position sur laxe des abscice
    - y: position sur laxe des ordonner
    - w: la largeur du disque 
    - h: la hauteur du disque
    - s: la taille du disque par rapport au premier qui est de taille 1
    - color la couleur
    */ 
    constructor(x,y,w,h=25,s=30,color="#DBBA55")
    {
        this.x =x; 
        this.y =y; 
        this.s = s;
        this.w =w *this.s; 
        this.h =h;
        this.socle = null;
        this.b_x = this.x;
        this.b_y = this.y;
        this.up = null;//rectangle au dessu 
        this.down = null;// rectangle en dessou
        this.color = color ;
        this.isSommet = false;
        this.click = false;
        this.in = false;
        this.pos = false;
        this.self = false;
    }
    //dessine le disque
    draw(){
        //ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.drawImage(block_img,this.x,this.y,this.w,this.h)
    }
    //deplace le disque
    move(cx,cy){
        this.x = cx;
        this.y = cy;
    }
    //remet a la position anterieur
    roolback(){
        this.x = this.b_x;
        this.y = this.b_y;
    }
    //voir si cest le disque a deplacer
    logic(){ 
        if(this.self && this.isSommet){
            this.move(cx,cy)
        }
        
    }
    
}

//support des disque
class PileDisque{
    constructor(elem){
        this.head = this;
        this.elem = elem;
        this.next = null;
        this.hauteur = 0
        if(elem!=null)
            this.hauteur = 1;
    }
    add(elem){
        let tmp = PileDisque(elem);
        let tete = this.head;
        this.head = tmp;
        tmp.next = tete;

    }
}
class Socle {
    /**
     * 
     * @param {position abscice } x 
     * @param {position ordonner} y 
     * @param {la taille} s 
     * @param {la couleur} color 
     */
    constructor(x,y,block=4,s=50,color="#000000"){
        this.self = false;
        this.x = x;
        this.y = y;
        this.s = s;
        this.lx = x+s;
        this.ly = y -30*block;
        this.lh = 30*block;
        this.lw = 5;
        this.pile = 0;
        this.color = color;
        this.in = false;
        this.sommet  = null;
        this.tabSommet = [];
    }
    //verifie si le disque est dans le socle
    insocle(rect){
        if( ((this.lx <= rect.x+rect.w && this.lx >= rect.x) &&(rect.y>this.ly && rect.y < this.ly + this.lh))/*||
        (this.lx <= (rect.x+rect.h)+rect.w && this.lx >= (rect.x+rect.h)) &&( (rect.y+rect.h)>this.ly && (rect.y+rect.h) < this.ly + this.lh)*/)
        {
            this.in = true;
            
        }
        else{
            this.in = false;
           

        }
    }
    //dessine le socle
    draw(){
        let x = this.x;
        let y = this.y;
        let s = this.s;
        ctx.fillStyle = this.color;
        ctx.fillRect(x,y,s*2,5);
        let lx = this.lx;
        let ly = this.ly;
        let lh = this.lh
        let lw = this.lw;
        ctx.fillRect(lx,ly,lw,lh);

    }
    //met le disque dans le socle
    place(rect,init = false,algo=false){
        if(rect == null)
            return;
        if(this.sommet!=null){
            let rectSommet = this.sommet;
            if(rectSommet.s < rect.s)
            {
                return
            }
        }
        if((rect.click == false && (rect.self|| algo))|| init ){
            if(rect.socle != null){
                let ancienSocle = rect.socle;
                if(ancienSocle == this)
                    return;
                if(rect.socle != this){
                    ancienSocle.pile-=1;
                    ancienSocle.tabSommet.pop();
                    ancienSocle.sommet = ancienSocle.tabSommet[ancienSocle.tabSommet.length-1];
                    if(ancienSocle.sommet == undefined)
                        ancienSocle.sommet = null;
                    if(ancienSocle.tabSommet.length == 0)
                        ancienSocle.sommet = null;
                    if(ancienSocle.tabSommet.length > 0)
                        ancienSocle.tabSommet[ancienSocle.tabSommet.length-1].isSommet = true;
                    this.pile+=1;

                }
            }
            else{
                
                this.pile+=1;
            }
            let x = this.lx - (rect.w/2);
            let y = (this.ly+this.lh) - rect.h*this.pile;
            rect.b_x = x;
            rect.b_y = y;
            rect.socle = this;
            if(this.sommet != null){
                this.sommet.isSommet = false;
            }
            if(init || algo)
                rect.roolback()
            this.sommet = rect;
            this.tabSommet.push(this.sommet);
            rect.isSommet = true;
            coup++;
            console.log(coup-nb_Block)
                
        }
        //console.log(" x :"+rect.x + "bx "+rect.b_x);
    }
}

//la pile des evenement sur les disque
class PileEvent {
    constructor(elem,id)
    {
        this.h = this;
        this.id = id;
        this.elem = elem;
        this.next = null;
        this.select = false;
        this.rectSelected = null;

    }
    add(elem){
        if(elem !=null){
            let head = this.h;
            let tmp = new PileEvent(elem,head.id+1);
            this.h = tmp;
            tmp.next = head;
        }
    }
    clickdown(cx,cy){
        let ptr = this.h;
        while(ptr!=null){
            let rect = ptr.elem;
            if(!this.select){
                let x = rect.x;
                let y = rect.y;
                let w = rect.w;
                let h = rect.h;
                // console.log( (offy > y && offy < y+h) )
                if((cx>x && cx < x+w) && (cy > y && cy < y+h) )
                {
                    if(this.rectSelected != null){
                        this.rectSelected.self = false;
                        //this.rectSelected = null
                    }
                    rect.in = true;
                    rect.self = true;
                    this.rectSelected = rect;
                    rectSelect = this.rectSelected;
                    this.select = true;
                }
            }
            ptr = ptr.next;
        }
    }
    clickup(){
        this.select = false;
        if(this.rectSelected!=null){
            tableauSocle.forEach(element =>{
                if(rectSelect != null)
                    element.insocle(rectSelect);
                if(element.in){
                    element.place(rectSelect);
                }
            } );
            this.rectSelected.self =false;
            rectSelect = null; 
            
            this.rectSelected.roolback();
        }
            
    }

}
function parcourEvent(pile){
    if(pile == null){
        console.log("vide");
        return 0;
    }
    let id = 0;
    let active = false;
    let ptr = pile.h;
    while(ptr!=null){
        rect = ptr.elem;
        rect.draw();
        rect.logic();
        ptr = ptr.next;
    }
}

let cx = 0;
let cy = 0;
let rectSelect = null;
//let tableauSocle = [new Socle(25,400),new Socle(250,400),new Socle(450,400)]




//parcour(pile);

let nb_Block = 8;
//let tableau = [rect1,rect2,rect3,rect4]
let tableauSocle = [new Socle((wind.w/3)-175,400,nb_Block),new Socle((wind.w/3*2)-175,400,nb_Block),new Socle((wind.w/3*3)-175,400,nb_Block)]
let pile = null;
A = tableauSocle[2];
D = tableauSocle[0];
I = tableauSocle[1]; 

//fonction qui initialise le jeux 
let Game_init = function(tableauDisque) {
    let init = true;
    pile = null;
    let cheat = "";
    let over = false;
    document.body.addEventListener("keypress",function(e){
        //console.log(e)
        cheat+=e.key;
        if(cheat.length >=5 ){
            if(cheat =="serge" && !over)
            {
                Hanoi(nb_Block,D,A,I);
                over = true;
                cheat = "";
            }
            cheat = "";
        }
    });
    tableauDisque.forEach(element => {
        if(init){
            pile = new PileEvent(element,1);
            init = false;
        }else
            pile.add(element);
    })
    for(let i=tableauDisque.length-1;i>=0;i--){
        tableauSocle[0].place(tableauDisque[i],true);
    }
    //parcour(pile);

    //let tableau = [rect1,rect2,rect3,rect4]

     interval = setInterval(function(){

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0,0,wind.w,wind.h)
        //update regle 
        
        tableauSocle.forEach(element => {
            element.draw();
        });
        parcourEvent(pile)
        //console.log(rect1.dir.right);
        if(tableauSocle[2].tabSommet.length >= nb_Block){
           win.classList.add('show')
           clearInterval(interval);
        }
        
    },1000/60);



        canvas.addEventListener("mousemove",function(e){
            //console.log(e);
            cx = e.offsetX;
            cy = e.offsetY;
            
            //rect1.update(cx,cy)
            //console.log(rect1.in)
        });
        canvas.addEventListener("mousedown",function(){
            
                    pile.clickdown(cx,cy);
        });
        canvas.addEventListener("mouseup",function(){
            
                pile.clickup();
                /*element.stop();
                element.place(t1);*/
                //element.blur()
            
        });

        document.querySelector('.endGame').addEventListener('click', () => {
            document.querySelector('.game').innerHTML = '';
            let _data = {
                param : 'insert',
                rect_1 : rect1.x + ' ' + rect1.y + ' - ',
                rect_2 : rect2.x + ' ' + rect2.y + ' - ',
                rect_3 : rect3.x + ' ' + rect3.y + ' - ',
                rect_4 : rect4.x + ' ' + rect4.y
               
                }
            xhr.open('POST','./../../manager.php', true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
            xhr.send(JSON.stringify(_data));/* envoie d'une requete au serveur pour
            sauvergarder les positions actuelle des cylindres */

            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    if(xhr.response) {
                        document.querySelector('.game').style.display = 'none';
                        document.querySelector('.avant_garde').style.display = 'block';
                        document.querySelector('.avant_garde').style.animation = 'apear 0.5s ease';
                    }
                }
            }
        
        })
}    



// Start a new game

document.querySelector('.newGame').addEventListener('click', () => {
    let button = document.createElement('button')
    button.setAttribute('class', 'endGame');
    button.innerText = 'sortie';
    let cvs = document.createElement('canvas');
    cvs.setAttribute('width', 800);
    cvs.setAttribute('height', 480);
    document.querySelector('.game').appendChild(cvs);
    document.querySelector('.game').appendChild(button);
    canvas = document.body.querySelector('canvas');
    ctx = canvas.getContext("2d");


    clearInterval(interval);
    ctx.clearRect(0,0,800,480);
    document.querySelector('.avant_garde').style.display = 'none';
    document.querySelector('.game').style.display = 'flex';
    document.querySelector('.game').style.animation = 'apear 0.5s ease';

    


    let tableauDisque = [];
    //let colors = ["#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000"]
    for(let i = 0;i<nb_Block;i++){
        tableauDisque.push(new Tuile(20,15,30,25,i+1,"#"+i+"F"+i+"F"+"0"+i))
    }
    Game_init(tableauDisque);
})


// Recuperer l'etat precedent du jeux
document.querySelector('.continue').addEventListener('click', () => {
    //cree le canvas
    let button = document.createElement('button')
    button.setAttribute('class', 'endGame');
    button.innerText = 'sortie';
    let cvs = document.createElement('canvas');
    cvs.setAttribute('width', 800);
    cvs.setAttribute('height', 480);
    document.querySelector('.game').appendChild(cvs);
    document.querySelector('.game').appendChild(button);
    canvas = document.body.querySelector('canvas');
    ctx = canvas.getContext("2d");

    clearInterval(interval);
    ctx.clearRect(0,0,800,480);
    let _data = {
        param : 'fetch'
    }
    xhr.open('POST','./../../manager.php', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(JSON.stringify(_data)); /* envoie d'une requete au serveur pour
    recuperer les positions enregistrées des cylindres */

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
            if(xhr.response) {
                // once receive data from sever then we display game area
                document.querySelector('.avant_garde').style.display = 'none';
                document.querySelector('.game').style.display = 'flex';
                document.querySelector('.game').style.animation = 'apear 0.5s ease';

                let data = xhr.responseText.split(' - ');
               
                let coor_1 = data[0].split(' ');
                let coor_2 = data[1].split(' ');
                let coor_3 = data[2].split(' ');
                let coor_4 = data[3].split(' ');

                // init game with data received from server
                Game_init(new Tuile(Number(coor_1[0]), Number(coor_1[1]), 30, 25, 1,"#FF0000"),
                          new Tuile(Number(coor_2[0]),Number(coor_2[1]), 30, 25, 2,"#00FF00"),
                          new Tuile(Number(coor_3[0]), Number(coor_3[1]), 30, 25, 3,"#0000FF"),
                          new Tuile(Number(coor_4[0]), Number(coor_4[1]), 30, 25, 4,"#FF0E9A")
                );
            }
        }
    }

})
