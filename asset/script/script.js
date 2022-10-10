

let canvas = document.body.querySelector('canvas');
ctx = canvas.getContext("2d");
wind = {
    w:800,
    h:480
}
class Tuile {
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
        this.inS = false;
    }
    place(t){
        if(this.click == false && this.inS){
            let x = t.lx - (this.w/2);
            let y = (t.ly+t.lh) - this.h*t.pile;
            this.b_x = x;
            this.b_y = y;
            t.pile++;
            //rect.pos = true;
        }
        //console.log(" x :"+rect.x + "bx "+rect.b_x);
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
    roolback(){
        this.x = this.b_x;
        this.y = this.b_y;
    }
    logic(){ 
        
    }
    inRect(offx,offy){
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;
        
       // console.log( (offy > y && offy < y+h) )
        if((offx>x && offx < x+w) && (offy > y && offy < y+h) )
        {
            this.in = true;
        }
        else{
            this.in = false;
        }
    
    } 
    move(cx,cy){
        if(this.click)
        {
            this.x = cx;
            this.y = cy;
        }
    }
    stop(){
        if(this.click)
        {
            this.click = false;
        }
    
    }
    setClick(){
        if(this.in)
        {
            this.click = true;
            this.self = true;
        }   
    }
    update(cx,cy){
        this.inRect(cx,cy);
        this.move(cx,cy);
    }
    blur(){
        this.roolback();
    }
}


class Socle {
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
    
    insocle(rect){
        if( ((this.lx <= rect.x+rect.w && this.lx >= rect.x) &&(rect.y>this.ly && rect.y < this.ly + this.lh))/*||
        (this.lx <= (rect.x+rect.h)+rect.w && this.lx >= (rect.x+rect.h)) &&( (rect.y+rect.h)>this.ly && (rect.y+rect.h) < this.ly + this.lh)*/)
        {
            this.in = true;
            rect.inS = true;
        }
        else{
            this.in = false;
            rect.inS = false;

        }
    }
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
}


rect1 = new Tuile(20,15,30,25,1);
rect2 = new Tuile(20,15,30,25,2);
rect3 = new Tuile(20,15,30,25,3);
rect4 = new Tuile(20,15,30,25,4);
tableau = [rect1,rect2,rect3,rect4]
t1 = new Socle(25,400)  
    




setInterval(function(){

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,wind.w,wind.h)
    //update regle 
    
    t1.draw();
    tableau.forEach(element => {
        element.draw();
        t1.insocle(element);
    });
    //console.log(rect1.dir.right);
},1000/60);


canvas.addEventListener("mousemove",function(e){
    //console.log(e);
    let cx = e.offsetX;
    let cy = e.offsetY;
    tableau.forEach(element =>{
        element.update(cx,cy);
    });
    //rect1.update(cx,cy)
    //console.log(rect1.in)
});
canvas.addEventListener("mousedown",function(){
        tableau.forEach(element =>{
            element.setClick();
        });
});
canvas.addEventListener("mouseup",function(){
    
    tableau.forEach(element =>{
        element.stop();
        if(t1.in){
            element.place(t1);
        }
        element.blur()
    });
});
