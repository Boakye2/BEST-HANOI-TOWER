

let canvas = document.body.querySelector('canvas');
ctx = canvas.getContext("2d");
wind = {
    w:800,
    h:480
}
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
    constructor(x,y,w,h,s,color="#DBBA55")
    {
        this.x =x; 
        this.y =y; 
        this.s = s;
        this.w =w *this.s; 
        this.h =h;
        
        this.b_x = this.x;
        this.b_y = this.y;

        this.color = color ;

        this.click = false;
        this.in = false;
        this.pos = false;
        this.self = false;
    }
    //dessine le disque
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
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
        if(this.self){
            this.move(cx,cy)
        }
        
    }
    
}

//support des disque
class Socle {
    /**
     * 
     * @param {position abscice } x 
     * @param {position ordonner} y 
     * @param {la taille} s 
     * @param {la couleur} color 
     */
    constructor(x,y,s=50,color="#000000"){
        this.self = false;
        this.x = x;
        this.y = y;
        this.s = s;
        this.lx = x+s;
        this.ly = y -s*2;
        this.lh = s*2;
        this.lw = 5;
        this.pile = 1;
        this.color = color;
        this.in = false;
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
    place(rect){
        if(rect == null)
            return;
        if(rect.click == false && rect.self){
            let x = this.lx - (rect.w/2);
            let y = (this.ly+this.lh) - rect.h*this.pile;
            rect.b_x = x;
            rect.b_y = y;
            if(this.pile < 4)
                this.pile++;
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
let rect1 = new Tuile(20,15,30,25,1);
let rect2 = new Tuile(20,15,30,25,2);
let rect3 = new Tuile(20,15,30,25,3);
let rect4 = new Tuile(20,15,30,25,4);

let pile = new PileEvent(rect1,1);
pile.add(rect2);
pile.add(rect3);
pile.add(rect4);

//parcour(pile);


let tableau = [rect1,rect2,rect3,rect4]
let tableauSocle = [new Socle(25,400),new Socle(250,400),new Socle(450,400)]
    










setInterval(function(){

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,wind.w,wind.h)
    //update regle 
    
    tableauSocle.forEach(element => {
        element.draw();
    });
    parcourEvent(pile)
    //console.log(rect1.dir.right);
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
    
