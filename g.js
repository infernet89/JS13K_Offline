// < >
var DEBUG=0;
//costant
var TO_RADIANS = Math.PI/180; 

//global variables
var canvas;
var canvasW;
var canvasH;
var ctx;
var activeTask;
var level=0;
var animationProgress=0;
var solutionObject=null;
var randomPlaces=null;

//mobile controls
var mousex=-100;
var mousey=-100;
var dragging=false;

//setup
canvas = document.getElementById("g");
ctx = canvas.getContext("2d");
canvasW=canvas.width  = 1200;//window.innerWidth;
canvasH=canvas.height = 800;//window.innerHeight;
//canvasW=(canvasH/800)*1200;
maxDistance=Math.sqrt(canvasW*canvasW+canvasH*canvasH)/4;
maxIntensity=7;

//controls
canvas.addEventListener("mousemove",mossoMouse);
canvas.addEventListener("mousedown",cliccatoMouse);
canvas.addEventListener("mouseup",rilasciatoMouse);
window.addEventListener('keyup',keyUp,false);

level=0;//TODO change level here
generateLevel();
activeTask=setInterval(run, 33);

function generateLevel()
{
    animationProgress=0;
    solutionObject=new Object();
    solutionObject.hasRectangle=true;
    solutionObject.offsetY=0;
    solutionObject.alpha=1;
    solutionObject.color="#0F0";
    if(level==0)
    {

        solutionObject.sizeX=60;
        solutionObject.sizeY=60;
        solutionObject.x=canvasW/2-30
        solutionObject.y=canvasH-120;
    }
    else if(level==1)
    {
        
        solutionObject.sizeX=300;
        solutionObject.sizeY=65;
        solutionObject.x=455
        solutionObject.y=450;
        solutionObject.alpha=0.2;
        solutionObject.hasRectangle=false;
    }
    else if(level==2)
    {
        solutionObject.sizeX=40;
        solutionObject.sizeY=40;
        solutionObject.x=10
        solutionObject.y=80;
        solutionObject.offsetY=-18;
        solutionObject.hasRectangle=false;
        randomPlaces=[];
        for(i=0;i<canvasW/40;i++)
        {
            randomPlaces[i]=[];
            for(k=0;k<-5+canvasH/40;k++)
            {
                randomPlaces[i][k]=new Object();
                randomPlaces[i][k].char=String.fromCharCode(rand(33,255));
                r=rand(0,2)
                if(r==2)
                    randomPlaces[i][k].color="#FFF"; 
                else if(r==1)
                    randomPlaces[i][k].color="#F00"; 
                else randomPlaces[i][k].color="#0F0"; 
            }
                
        }
        r=rand(0,2)
        if(r==2)
            solutionObject.color="#FFF"; 
        else if(r==1)
            solutionObject.color="#F00"; 
        else solutionObject.color="#0F0";
        solX=rand(0,-1+canvasW/40);
        solY=rand(0,-6+canvasH/40);
        randomPlaces[solX][solY].char="";
        solutionObject.x=solX*40;
        solutionObject.y=canvasH-solY*40-10;
        //ctx.fillText(randomPlaces[i][k].char,i*40,canvasH-k*40-10);
    }
}
function drawSolutionPoint(o)
{
    ctx.save();
    ctx.globalAlpha=o.alpha;
    ctx.fillStyle=o.color;
    if(o.hasRectangle)
    {
        ctx.fillRect(o.x,o.y,o.sizeX,2);
        ctx.fillRect(o.x,o.y-o.sizeY,o.sizeX,2);
        ctx.fillRect(o.x,o.y-o.sizeY,2,o.sizeY);
        ctx.fillRect(o.x+o.sizeX,o.y-o.sizeY,2,o.sizeY+2);
    }

    ctx.beginPath();
    ctx.arc(o.x+o.sizeX/2, o.y-25-o.offsetY, 5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.lineWidth = 5/10;
    ctx.strokeStyle = o.color;
    ctx.stroke();
    ctx.closePath();
    for(i=0;i<5;i++)
    {
        ctx.beginPath();
        ctx.arc(o.x+o.sizeX/2, o.y-25-o.offsetY, 5+i*5, 230*TO_RADIANS, 310*TO_RADIANS, false);
        ctx.lineWidth = 1;
        ctx.strokeStyle = o.color;
        ctx.stroke();
        ctx.closePath();
    }
    ctx.restore();
}
function drawDistanceIndicator(to)
{
    //calcola distanza tra mousex,mousey e to
    distance=Math.sqrt((mousex-to.x-to.sizeX/2)*(mousex-to.x-to.sizeX/2)+(mousey-to.y+to.sizeY/2)*(mousey-to.y+to.sizeY/2));
    //rendi la distanza un numero da 0 a maxIntensity
    distance=maxIntensity-maxIntensity*(distance/maxDistance);
    //document.title=distance;
    
    ctx.save();
    //ctx.translate(mousex,mousey);//follow the mouse
    ctx.translate(canvasW-30    ,20);//on top-right
    if(distance<-3)
        ctx.fillStyle="#F00";
    else if(distance>maxIntensity-0.8)
        ctx.fillStyle="#0F0";
    else
        ctx.fillStyle="#FFF";

    ctx.beginPath();
    //down 'arrow'
    ctx.moveTo(2,0);
    ctx.lineTo(0,-3);
    ctx.lineTo(2,-3);
    ctx.lineTo(2,-10);
    ctx.lineTo(4,-10);
    ctx.lineTo(4,0);
    ctx.lineTo(2,0);
    ctx.lineWidth = 1;
    //up 'arrow'
    ctx.moveTo(5,-10);
    ctx.lineTo(9,-7);
    ctx.lineTo(7,-7);
    ctx.lineTo(7,0);
    ctx.lineTo(5,0);
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.closePath();
    //intensity indicator   
    ctx.fillStyle="#FFF";
    for(i=0;i<distance;i++)
        ctx.fillRect(10+2*i,0,1,-3-i);
    
    ctx.restore();
}
function run()
{
	ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.fillStyle="#000";
    ctx.fillRect(0,0,canvasW,canvasH);

    ctx.fillStyle="#FFF";
    ctx.fillRect(0,0,canvasW,1);
    ctx.fillRect(0,canvasH-1,canvasW,1);
    ctx.fillRect(0,0,1,canvasH);
    ctx.fillRect(canvasW-1,0,1,canvasH);

    //menu
    if(level==0)
    {
        drawSolutionPoint(solutionObject);
        
        ctx.fillStyle="#0F0";
        ctx.font = "20px Arial";
        ctx.fillText("PLAY",canvasW/2-25,canvasH-125);
        ctx.fillStyle="#FFF";
        ctx.font = "12px Arial";
        ctx.fillText("By Infernet89",canvasW-75,canvasH-5);
        ctx.fillText("Made for JS13k Competition",5,canvasH-5);
        //ctx.fillText("Music by ABSolid",5+canvasW/2,canvasH-5);
    }
    else if(level==1)
    {
        animationProgress++;
        //document.title=animationProgress;
        if(animationProgress>180) 
            drawSolutionPoint(solutionObject);

        toWrite="This";
        toWrite=toWrite.substring(0,animationProgress/2);
        ctx.fillStyle="#FFF";
        ctx.font="40px Arial";
        ctx.fillText(toWrite,150,250);

        toWrite="little";
        toWrite=toWrite.substring(0,-8+animationProgress/2);
        ctx.font="20px Arial";
        ctx.fillText(toWrite,240,250);

        toWrite="game";
        toWrite=toWrite.substring(0,-16+animationProgress/2);        
        ctx.font="40px Arial";
        ctx.fillText(toWrite,290,250);

        toWrite="is gonna";
        toWrite=toWrite.substring(0,-24+animationProgress/2);  
        ctx.font="40px Arial";
        ctx.fillText(toWrite,150,330);

        ctx.fillStyle="#F00";
        ctx.font="90px Arial";
        if(animationProgress>70)        
            ctx.fillText("Hurt",150,450);

        ctx.fillStyle="#FFF";
        ctx.font="40px Arial";
        if(animationProgress>90) 
            ctx.fillText("your",350,450);

        ctx.fillStyle="#0F0";
        ctx.font="90px Arial";
        if(animationProgress>110) 
            ctx.fillText("BRAIN!",450,450);
        else dragging=false;//avoid click while loading animation
    }
    else if(level==2)
    {
        ctx.font="40px Webdings";
        for(i=0;i<canvasW/40;i++)
            for(k=0;k<-5+canvasH/40;k++)
            {
                ctx.fillStyle=randomPlaces[i][k].color;
                ctx.fillText(randomPlaces[i][k].char,i*40,canvasH-k*40-10);
                //ctx.fillText("a",i*40,canvasH-k*40-10);
            }
                
        /*ctx.fillText("QWERTYUIOPASDFGHJKLZXCVBNM",10,100);
        ctx.fillText("1234567890!£$%&/()=?^'ì.:,;",10,150);
        ctx.fillText("<>àèìòù@ç°§*é+][#{}",10,200);
        ctx.fillText("qwertyuiopasdfghjklzxcvbnm",10,250);*/

        drawSolutionPoint(solutionObject);
    }
    //TODO altri livelli qui

    //if mouse is inside solutionobject, mouse becomes an hand
    if(mousex>solutionObject.x && mousex<solutionObject.x+solutionObject.sizeX && mousey>solutionObject.y-solutionObject.sizeY && mousey<solutionObject.y)
    {
        document.body.style.cursor = "pointer";
        if(dragging)
        {
            level++;
            generateLevel();
        }
    }
    else document.body.style.cursor = "default";

    drawDistanceIndicator(solutionObject);
}
/*#############
    Funzioni Utili
##############*/
function rand(da, a)
{
    if(da>a) return rand(a,da);
    a=a+1;
    return Math.floor(Math.random()*(a-da)+da);
}

//controlli mobile
function mossoTap(evt)
{
    evt.preventDefault();
    dragging=true;
    var rect = canvas.getBoundingClientRect();
    mousex = evt.targetTouches[0].pageX,
    mousey = evt.targetTouches[0].pageY;
}
function cliccatoTap(evt)
{
    evt.preventDefault();
    var rect = canvas.getBoundingClientRect();
    mousex = evt.targetTouches[0].pageX,
    mousey = evt.targetTouches[0].pageY;
}
function rilasciatoTap(evt)
{
    evt.preventDefault();
    dragging=false;
    mousey=-100;
    mousex=-100;
}
//uindows
function cliccatoMouse(evt)
{
    dragging=true;
    var rect = canvas.getBoundingClientRect();
    mousex=(evt.clientX-rect.left)/(rect.right-rect.left)*canvasW;
    mousey=(evt.clientY-rect.top)/(rect.bottom-rect.top)*canvasH;
//< >
}
function mossoMouse(evt)
{
    var rect = canvas.getBoundingClientRect();
    mousex=(evt.clientX-rect.left)/(rect.right-rect.left)*canvasW;
    mousey=(evt.clientY-rect.top)/(rect.bottom-rect.top)*canvasH;
}
function rilasciatoMouse(evt)
{
    dragging=false;    
}
function keyUp(e) {
    //alert(e.keyCode);
    if(e.keyCode==77 || e.keyCode==83)//m OR s
    {
        //TODO enable/disable sound
        e=e;
    }
}
window.AutoScaler = function(element, initialWidth, initialHeight, skewAllowance){
    var self = this;
    
    this.viewportWidth  = 0;
    this.viewportHeight = 0;
    
    if (typeof element === "string")
        element = document.getElementById(element);
    
    this.element = element;
    this.gameAspect = initialWidth/initialHeight;
    this.skewAllowance = skewAllowance || 0;
    
    this.checkRescale = function() {
        if (window.innerWidth == self.viewportWidth && 
            window.innerHeight == self.viewportHeight) return;
        
        var w = window.innerWidth;
        var h = window.innerHeight;
        
        var windowAspect = w/h;
        var targetW = 0;
        var targetH = 0;
        
        targetW = w;
        targetH = h;
        
        if (Math.abs(windowAspect - self.gameAspect) > self.skewAllowance) {
            if (windowAspect < self.gameAspect)
                targetH = w / self.gameAspect;
            else
                targetW = h * self.gameAspect;
        }
        
        self.element.style.width  = targetW + "px";
        self.element.style.height = targetH + "px";
    
        self.element.style.marginLeft = ((w - targetW)/2) + "px";
        self.element.style.marginTop  = ((h - targetH)/2) + "px";
    
        self.viewportWidth  = w;
        self.viewportHeight = h;
        
    }
    
    // Ensure our element is going to behave:
    self.element.style.display = 'block';
    self.element.style.margin  = '0';
    self.element.style.padding = '0';
    
    // Add event listeners and timer based rescale checks:
    window.addEventListener('resize', this.checkRescale);
    rescalercheck=setInterval(this.checkRescale, 150);
};
