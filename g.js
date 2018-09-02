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
var level;
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
var randomWords=["absurd","anomaly","bandit","banjo","boiler","bone","book","bottle","breakfast","bridge","broker","card","cat","center","cheese","club","dog","egg","error","experiment","explosion","female","fish","fungus","fusion","game","giraffe","glitch","horse","iceman","infuse","internet","jumper","keyboard","king","lawyer","letter","limit","lobster","man","meatball","message","metal","mouse","movie","mumble","normal","nugget","pancake","phobos","piece","rabbit","random","savage","scream","secure","ship","speed","stasis","substance","table","test","theatre","thing","trip","twist","title","watermelon","wild","zombie","undefined"];
var randomWordForRandom=[];
//random words long6
randomWords.forEach(function(e) {
    if(e.length==6)
        randomWordForRandom.push(e);
});
var menuFirstWord="game";
var menuSecondWord="random";
var menuThirdWord="title";
var timeObject;
var loveObject;
var friendObject;
var movableObjects;
var selectedObject=null;
var oldmousex,oldmousey;
var cannotSolve;
var inputDelay=0;
var prevMousex,prevMousey=-1;

//controls
canvas.addEventListener("mousemove",mossoMouse);
canvas.addEventListener("mousedown",cliccatoMouse);
canvas.addEventListener("mouseup",rilasciatoMouse);
//canvas.addEventListener("contextmenu",sparitoMouse);
window.addEventListener("blur",sparitoMouse);
//window.addEventListener('keyup',keyUp,false);

level=0;//TODO change level here
generateLevel();
activeTask=setInterval(run, 33);

function generateLevel()
{
    cannotSolve=false;
    animationProgress=0;
    solutionObject=new Object();
    solutionObject.hasRectangle=true;
    solutionObject.isCircle=false;
    solutionObject.offsetY=0;
    solutionObject.alpha=1;
    solutionObject.color="#0F0";
    if(level==0)
    {
        animationProgress=1;
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
        solutionObject.alpha=0.6;
        solutionObject.hasRectangle=false;
    }
    else if(level==2)
    {
        solutionObject.sizeX=45;
        solutionObject.sizeY=45;
        solutionObject.x=100
        solutionObject.y=100;
        solutionObject.dx=rand(-9,9);
        solutionObject.dy=rand(-9,9);
        solutionObject.offsetY=-15;
        solutionObject.isCircle=true;
        solutionObject.hasRectangle=false;
        solutionObject.alpha=1;
        movableObjects=[];
        for(i=0;i<16;i++)
        {
            tmp=new Object();
            tmp.x=rand(50,canvasW-50);
            tmp.y=rand(50,canvasH-50);
            tmp.dx=0;
            tmp.dy=0;
            if(i%3==0)
            {
                tmp.kind="time";
                tmp.color="#880"
            }
            else if(i%3==1)
            {
                tmp.kind="friend";
                tmp.color="#4267b2"
            }
            else
            {
                tmp.kind="love";
                tmp.color="#800"
            }
            movableObjects.push(tmp);
        }
        

        animationProgress=-20;
    }
    else if(level==3)
    {
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

        solutionObject.sizeX=40;
        solutionObject.sizeY=40;
        solutionObject.x=10
        solutionObject.y=80;
        solutionObject.offsetY=-22;
        solutionObject.hasRectangle=false;
        randomPlaces=[];
        for(i=0;i<canvasW/40;i++)
        {
            randomPlaces[i]=[];
            for(k=0;k<-5+canvasH/40;k++)
            {
                randomPlaces[i][k]=new Object();
                if(isFirefox)
                    randomPlaces[i][k].char="FIREFOXISBROKEN".charAt((i+k)%15);
                else
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
        //solutionObject.color="#00F";//DEBUG
        solX=rand(0,-1+canvasW/40);
        solY=rand(0,-6+canvasH/40);
        randomPlaces[solX][solY].char="";
        solutionObject.x=solX*40;
        solutionObject.y=canvasH-solY*40-10;
        //ctx.fillText(randomPlaces[i][k].char,i*40,canvasH-k*40-10);
    }
    else if(level==4)
    {
        solutionObject.sizeX=100;
        solutionObject.sizeY=100;
        solutionObject.x=-90950;
        solutionObject.y=600;
        solutionObject.offsetY=15;
        solutionObject.isCircle=true;
        solutionObject.hasRectangle=false;
        solutionObject.alpha=1;
        solutionObject.color="#0A0";
    }
    else if(level==5)
    {
        solutionObject.sizeX=100;
        solutionObject.sizeY=100;
        solutionObject.x=550;
        solutionObject.y=500;
        solutionObject.offsetY=15;
        solutionObject.isCircle=true;
        solutionObject.hasRectangle=false;
        solutionObject.alpha=1;
        solutionObject.color="#FFF";
        movableObjects=[];
        for(i=0;i<9;i++)
        {
            tmp=new Object();
            tmp.x=rand(100,canvasW-100);
            tmp.y=rand(100,canvasH-100);
            if(i==0)
                tmp.color="#A00";
            else if(i==1)
                tmp.color="#0A0";
            else if(i==2)
                tmp.color="#00A";
            else if(i==3)
                tmp.color="#0AA";
            else if(i==4)
                tmp.color="#A0A";
            else if(i==5)
                tmp.color="#AA0";
            else if(i==6)
                tmp.color="#A70";
            else if(i==7)
                tmp.color="#A07";
            else if(i==8)
                tmp.color="#7A0";
            tmp.sizeX=50;
            tmp.sizeY=50;
            tmp.alpha=0.8;
            movableObjects.push(tmp);
        }

    }
    else if(level==6)
    {//5 o 8 non compare
        animationProgress=1;
        solutionObject.sizeX=60;
        solutionObject.sizeY=60;
        solutionObject.x=canvasW/2-30
        solutionObject.y=canvasH-120;
        movableObjects=[];
        tmp=new Object();
        tmp.x=510;
        tmp.y=225;
        tmp.sizeX=170;
        tmp.sizeY=60;
        movableObjects.push(tmp);
        cannotSolve=true;
    }
    else if(level==7)
    {
        movableObjects=[];
        solutionObject.x=-9999;
        solutionObject.sizeX=100;
        solutionObject.sizeY=100;
        solutionObject.offsetY=15;
        solutionObject.isCircle=true;
        solutionObject.hasRectangle=false;
        solutionObject.alpha=0;
        tmp=new Object();
        tmp.x=250;
        tmp.y=250;
        tmp.sizeX=150;
        tmp.sizeY=300;
        tmp.isClosed=true;
        movableObjects.push(tmp);
        tmp=new Object();
        tmp.x=500;
        tmp.y=250;
        tmp.sizeX=150;
        tmp.sizeY=300;
        tmp.isClosed=true;
        movableObjects.push(tmp);
        tmp=new Object();
        tmp.x=750;
        tmp.y=250;
        tmp.sizeX=150;
        tmp.sizeY=300;
        tmp.isClosed=true;
        movableObjects.push(tmp);
    }
    else if(level==8)
    {
        solutionObject.sizeX=45;
        solutionObject.sizeY=45;
        solutionObject.x=-100
        solutionObject.y=-100;
        solutionObject.offsetY=-15;
        solutionObject.isCircle=true;
        solutionObject.hasRectangle=false;
        solutionObject.alpha=1;
        //clearInterval(activeTask);
        //activeTask=setInterval(run, 1);
    }
    else if(level==9)
    {
        //clearInterval(activeTask);
        //activeTask=setInterval(run, 33);
        solutionObject.sizeX=45;
        solutionObject.sizeY=45;
        solutionObject.x=canvasW/2;
        solutionObject.y=canvasH/2;
        solutionObject.offsetY=-15;
        solutionObject.isCircle=true;
        solutionObject.hasRectangle=false;
        solutionObject.alpha=1;
        inputDelay=50;
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
    if(o.isCircle)
    {
        ctx.beginPath();
        ctx.arc(o.x+o.sizeX/2, o.y-o.sizeY/2, o.sizeX/2, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.lineWidth = 5/10;
        ctx.strokeStyle = o.color;
        ctx.stroke();
        ctx.closePath();
    }

    //dot
    if(o.isCircle)
        ctx.fillStyle= "#000";
    ctx.beginPath();
    ctx.arc(o.x+o.sizeX/2, o.y-25-o.offsetY, 5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.lineWidth = 5/10;
    if(o.isCircle)
        ctx.strokeStyle = "#000";
    else
        ctx.strokeStyle = o.color;
    ctx.stroke();
    ctx.closePath();
    //waves
    for(i=0;i<5;i++)
    {
        ctx.beginPath();
        ctx.arc(o.x+o.sizeX/2, o.y-25-o.offsetY, 5+i*5, 230*TO_RADIANS, 310*TO_RADIANS, false);
        ctx.lineWidth = 1;
        if(o.isCircle)
        ctx.strokeStyle = "#000";
        else
            ctx.strokeStyle = o.color;
        ctx.stroke();
        ctx.closePath();
    }
    ctx.restore();
}
function drawHUD(to)
{
    //calcola distanza tra mousex,mousey e to
    distance=Math.sqrt((mousex-to.x-to.sizeX/2)*(mousex-to.x-to.sizeX/2)+(mousey-to.y+to.sizeY/2)*(mousey-to.y+to.sizeY/2));
    //rendi la distanza un numero da 0 a maxIntensity
    distance=maxIntensity-maxIntensity*(distance/maxDistance);
    //document.title=distance;
    
    ctx.save();
    //ctx.translate(mousex,mousey);//follow the mouse
    ctx.translate(canvasW-30,20);//on top-right
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

    //check if it is connected, also display time
    ctx.fillStyle="#FFF";
    ctx.font = "12px Arial";
    if(navigator.onLine)
    {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = (m < 10) ? "0" + m : m;  //add zero in front of numbers
        s = (s < 10) ? "0" + s : s;  //add zero in front of numbers
        ctx.fillText(h + ":" + m + ":" + s,5,15);
    }
    else 
        ctx.fillText("Offline",5,15);
}
function run()
{
    if(inputDelay>0)
    {
        inputDelay--;
        dragging=false;
    }
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

        if(++animationProgress%100==0)
        {
            menuFirstWord=randomWords[rand(0,randomWords.length-1)];
            menuSecondWord=randomWordForRandom[rand(0,randomWordForRandom.length-1)];
            menuThirdWord=randomWords[rand(0,randomWords.length-1)];
        }
        if(Math.round(animationProgress/10)%10==9)
        {
            var s = "abcdefghijklmnopqrstuvwxyz";
            r=rand(4,10);
            menuFirstWord=Array(r).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
            r=6;
            menuSecondWord=Array(r).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
            r=rand(4,10);
            menuThirdWord=Array(r).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
        }
        ctx.fillStyle="#EEE";
        ctx.font = "70px Lucida Console";
        text="This "+menuFirstWord;
        ctx.fillText(text,350,150);
        text="has a "+menuSecondWord+" "+menuThirdWord;
        ctx.fillText(text,190,250);
        //document.title=mousex+" "+mousey;
        
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
        //commentary
        ctx.fillStyle="#777";
        ctx.font="24px Arial";
        ctx.fillText("They said that in life, only three things really matter..",300,350);
        ctx.fillText("          You know that there is a fourth one.",300,450);

        if(solutionObject.x+solutionObject.dx>canvasW-solutionObject.sizeX || solutionObject.x+solutionObject.dx<0)
            solutionObject.dx*=-1;
        if(solutionObject.y+solutionObject.dy>canvasH || solutionObject.y+solutionObject.dy<solutionObject.sizeY)
            solutionObject.dy*=-1;
        
        if(--animationProgress>0)
        {
            dragging=false;
            if(animationProgress>33)
            {
                solutionObject.x+=solutionObject.dx;
                solutionObject.y+=solutionObject.dy;
                //la fisica di timeObject, friendObject e loveObject
                for(i in movableObjects)
                {
                    o=movableObjects[i];
                    if(distanceFrom(o,solutionObject)<60)
                    {
                        o.dx=(o.x-solutionObject.x)/3;
                        o.dy=(o.y-solutionObject.y)/3;
                    }
                    //collisioni fra loro
                    for(k in movableObjects)
                    {
                        if(i==k) continue;
                        o2=movableObjects[k];
                        if(distanceFrom(o,o2)<100)
                        {
                            o.dx=100/(o.x-o2.x);
                            o.dy=100/(o.y-o2.y);
                        }
                    }
                    //rimbalza
                    if(o.x+o.dx>canvasW || o.x+o.dx<60)
                        o.dx*=-1;
                    if(o.y+o.dy+60>canvasH || o.y+o.dy<60)
                        o.dy*=-1;
                    //muovi
                    o.x+=o.dx;
                    o.y+=o.dy;
                    //attrito
                    o.dx*=0.95;
                    o.dy*=0.95;
                    if(Math.abs(o.dx)<0.5)
                        o.dx=0;
                    if(Math.abs(o.dy)<0.5)
                        o.dy=0;
                }
            }
        }
        else if(animationProgress>-25)
            solutionObject.alpha=1;
        else
        {
            solutionObject.alpha=0;
            animationProgress=rand(100,600);
            solutionObject.dx=rand(-5,5);
            solutionObject.dy=rand(-5,5);
        }

        //draw stuff
        for(i in movableObjects)
        {
            o=movableObjects[i];
            ctx.fillStyle=o.color;
            ctx.beginPath();
            ctx.arc(o.x, o.y, 50, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.lineWidth = 5/10;
            ctx.stroke();
            ctx.closePath();
            ctx.fillStyle="#000";
            if(o.kind=="time")
            {
                ctx.font="80px Arial";
                ctx.fillText("⧗",o.x-20,o.y+25);
            }
            else if(o.kind=="love")
            {
                ctx.font="60px Arial";
                ctx.fillText("❤",o.x-30,o.y+25);
            }
            else
            {
                ctx.font="80px Arial";
                ctx.fillText("☺",o.x-40,o.y+25);
            }
            
        }
        drawSolutionPoint(solutionObject);

    }
    else if(level==3)
    {
        //commentary
        ctx.fillStyle="#777";
        ctx.font="24px Arial";
        ctx.fillText("They'll try to distract you.",400,100);

        ctx.font="40px Webdings";
        for(i=0;i<canvasW/40;i++)
            for(k=0;k<-5+canvasH/40;k++)
            {
                ctx.fillStyle=randomPlaces[i][k].color;
                ctx.fillText(randomPlaces[i][k].char,i*40,canvasH-k*40-10);
            }
        drawSolutionPoint(solutionObject);
    }
    else if(level==4)
    {
        //commentary
        ctx.fillStyle="#777";
        ctx.font="24px Arial";
        ctx.fillText("       But if you stop and think,",200,250);
        ctx.fillText("you will understand what you really need.",200,300);

        //semaforo
        ctx.fillStyle="#888";
        ctx.fillRect(930,160,140,460);
        ctx.beginPath();
        ctx.fillStyle = "#100";
        ctx.arc(1000, 230, 50, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#110";
        ctx.arc(1000, 390, 50, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#010";
        ctx.arc(1000, 550, 50, 0, 2 * Math.PI, false);
        ctx.fill();
        //red
        if(animationProgress<200)
        {
            ctx.fillStyle = "#A00";
            ctx.beginPath();
            ctx.arc(1000, 230, 50, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.lineWidth = 5/10;
            ctx.strokeStyle = "#FFF";
            ctx.stroke();
            ctx.closePath();
            if(mousex==oldmousex && mousey==oldmousey)
            {
                animationProgress++;
            }
            else animationProgress=0;

        }
        //yellow
        else if(animationProgress<300)
        {
            ctx.fillStyle = "#AA0";
            ctx.beginPath();
            ctx.arc(1000, 390, 50, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.lineWidth = 5/10;
            ctx.strokeStyle = "#FFF";
            ctx.stroke();
            ctx.closePath();
            if(mousex==oldmousex && mousey==oldmousey)
            {
                animationProgress++;
            }
            else animationProgress=0;
        }
        else if(animationProgress)
        {
            solutionObject.x=950;
            drawSolutionPoint(solutionObject);
        }     
        oldmousex=mousex;
        oldmousey=mousey;
    }
    else if(level==5)
    {
        //commentary
        ctx.fillStyle="#777";
        ctx.font="24px Arial";
        ctx.fillText("There are some cheap imitation of that.",370,220);
        ctx.fillText("      But you need the original.",370,270);

        if(!dragging)
            selectedObject=null;
        if(selectedObject!=null)
        {
            selectedObject.x=mousex;
            selectedObject.y=mousey;
        }
        drawSolutionPoint(solutionObject);
        ctx.save();
        ctx.compositeOperation="lighter";
        for(i in movableObjects)
        {
            o=movableObjects[i];
            ctx.globalAlpha=o.alpha;
            ctx.fillStyle = o.color;
            ctx.beginPath();
            ctx.arc(o.x, o.y, o.sizeX, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            if(selectedObject==null)
            {
                if(mousex>o.x-o.sizeX && mousex<o.x+o.sizeX && mousey>o.y-o.sizeY && mousey<o.y+o.sizeY)
                    selectedObject=o;
            }
            if(o.color=="#0A0")
            {
                dist=Math.sqrt((o.x-solutionObject.x-solutionObject.sizeX/2)*(o.x-solutionObject.x-solutionObject.sizeX/2)+(o.y-solutionObject.y+solutionObject.sizeY/2)*(o.y-solutionObject.y+solutionObject.sizeY/2));
                if(dist<5)
                    cannotSolve=false;
                else cannotSolve=true;
            }
            
        }
        ctx.restore();
    }
    //In the jungle, you must wait, until the dice read 5 or 8.
    else if(level==6)
    {
         //commentary
        ctx.fillStyle="#777";
        ctx.font="24px Arial";
        ctx.fillText("And you need it now.",900,750);

        ctx.fillStyle="#EEE";
        ctx.font="60px Arial";
        toWrite="In the jungle,";
        toWrite=toWrite.substring(0,-24+animationProgress/2);  
        ctx.fillText(toWrite,350,270);
        toWrite="you must wait,";
        toWrite=toWrite.substring(0,-51+animationProgress/2);  
        ctx.fillText(toWrite,350,360);
        toWrite="until the time read 5 or 8.";
        toWrite=toWrite.substring(0,-78+animationProgress/2);  
        ctx.fillText(toWrite,350,450);
        
        var today = new Date();
        time=today.getHours()+""+today.getMinutes()+""+today.getSeconds();
        if(cannotSolve)
            solutionObject.color="#A00";
        else solutionObject.color="#0F0";o=movableObjects[0];

        //ctx.fillRect(o.x,o.y,o.sizeX,o.sizeY);
        if(mousex>o.x && mousex<o.x+o.sizeX && mousey>o.y && mousey<o.y+o.sizeY)
        {
            solutionObject.color="#0F0";
            if(time.includes("5") || time.includes("8"))
                cannotSolve=false;
        }
        else if(!time.includes("5") && !time.includes("8"))
            cannotSolve=true;
        
       
        drawSolutionPoint(solutionObject);
        animationProgress++;
    }
    else if(level==7)
    {//monty hall problem
        //commentary
        ctx.fillStyle="#777";
        ctx.font="24px Arial";
        ctx.fillText("Without silly games..",900,750);

        ctx.fillStyle="#EEE";
        ctx.font="60px Arial";
        if(animationProgress==0)
            ctx.fillText("Which door has what are you looking for?",50,150);
        else if(animationProgress==1)
            ctx.fillText("Not this. Want to change your mind?",50,150);
        else if(animationProgress==2)
            ctx.fillText("Wrong decision.",50,150);
        else if(animationProgress==3)
            ctx.fillText("Smart move!",50,150);
        //draw doors
        for(i in movableObjects)
        {
            o=movableObjects[i];
            ctx.fillStyle="#29180f";
            ctx.fillRect(o.x,o.y,o.sizeX,o.sizeY);
            if(o.isClosed)
            {
                ctx.fillStyle = "#874e32";
                ctx.fillRect(o.x+5,o.y+5,o.sizeX-10,o.sizeY-10);
                ctx.fillStyle="#29180f";
                ctx.beginPath();
                ctx.arc(o.x+o.sizeX-20, o.y+o.sizeY/2, 10, 0, 2 * Math.PI, false);
                ctx.fill();
            }
            else
            {
                ctx.fillStyle="#000";
                ctx.fillRect(o.x+5,o.y+5,o.sizeX-10,o.sizeY-10);
                ctx.fillStyle = "#874e32";
                ctx.fillRect(o.x-5,o.y+5,10,o.sizeY-10);
                ctx.fillStyle="#29180f";
                ctx.fillRect(o.x-15,o.y+o.sizeY/2-10,10,20);
                if(animationProgress==1)
                {
                    //draw a skull
                    ctx.fillStyle="#F00";
                    ctx.font="99px Arial";
                    ctx.fillText("🐐",o.x+10,o.y+o.sizeY/2+30);
                }
                else if(animationProgress==2)
                {
                    ctx.fillStyle="#F00";
                    ctx.font="99px Arial";
                    ctx.fillText("🐐",o.x+10,o.y+o.sizeY/2+30);
                }
                else if(animationProgress==3 && i!=solutionDoor)
                {
                    ctx.fillStyle="#F00";
                    ctx.font="99px Arial";
                    ctx.fillText("🐐",o.x+10,o.y+o.sizeY/2+30);
                }
            }
            ctx.closePath();
            //need to choose the first door
            if(animationProgress==0)
            {
                if(dragging && mousex>o.x && mousex<o.x+o.sizeX && mousey>o.y && mousey<o.y+o.sizeY)
                {
                    firstDoorChoiche=i;
                    do
                    {
                        r=rand(0,2);
                    }while(r==i);
                    movableObjects[r].isClosed=false;
                    animationProgress=1;
                    inputDelay=30;
                }
            }
            //needs to change his mind
            else if(animationProgress==1)
            {
                if(dragging && mousex>o.x && mousex<o.x+o.sizeX && mousey>o.y && mousey<o.y+o.sizeY && o.isClosed)
                {
                    if(i==firstDoorChoiche)
                    {
                        o.isClosed=false;
                        animationProgress=2;
                        sol=-1;
                        do{
                            sol++;
                        }while(!movableObjects[sol].isClosed);
                        solutionObject.x=movableObjects[sol].x+movableObjects[sol].sizeX/2-45;
                        solutionObject.y=movableObjects[sol].y+movableObjects[sol].sizeY/2+40;
                        solutionObject.alpha=0;
                        cannotSolve=true;
                    }
                    else
                    {
                        animationProgress=3;
                        o.isClosed=false;
                        solutionDoor=i;
                        solutionObject.x=movableObjects[i].x+movableObjects[i].sizeX/2-45;
                        solutionObject.y=movableObjects[i].y+movableObjects[i].sizeY/2+40;
                        solutionObject.alpha=1;
                        solutionObject.color="#0F0";
                        cannotSolve=false;
                        dragging=false;
                        inputDelay=30;
                    }
                }
            }
            else if(animationProgress==2)
            {
                if(dragging && mousex>o.x && mousex<o.x+o.sizeX && mousey>o.y && mousey<o.y+o.sizeY && o.isClosed)
                {
                    o.isClosed=false;
                    solutionObject.alpha=0.8;
                    solutionObject.color="#A00";
                    inputDelay=30;
                    dragging=false;
                }
            }
        }
        if(animationProgress==2)
        {
            if(dragging && mousex>solutionObject.x && mousex<solutionObject.x+solutionObject.sizeX && mousey>solutionObject.y-solutionObject.sizeY && mousey<solutionObject.y && solutionObject.alpha>0.5)
            {
                generateLevel();//restart monti hall problem
                inputDelay=30;
            }
        }
        drawSolutionPoint(solutionObject);
    }
    else if(level==8)
    {
        ctx.fillStyle="#777";
        ctx.font="24px Arial";
        ctx.fillText("Without dirty tricks..",900,750);

        var firstRectangle=new Object();
        firstRectangle.x=200;
        firstRectangle.y=160;
        firstRectangle.sizeX=250;
        firstRectangle.sizeY=500;
        var secondRectangle=new Object();
        secondRectangle.x=700;
        secondRectangle.y=160;
        secondRectangle.sizeX=250;
        secondRectangle.sizeY=500;
        ctx.strokeStyle="#F00";
        ctx.lineWidth=20;
        ctx.strokeRect(firstRectangle.x,firstRectangle.y,firstRectangle.sizeX,firstRectangle.sizeY); 
        ctx.strokeRect(secondRectangle.x,secondRectangle.y,secondRectangle.sizeX,secondRectangle.sizeY);

        insideFirst=false;
        insideSecond=false;

        //mouse inside first rectangle
        if(mousex>firstRectangle.x-15 && mousex<firstRectangle.x+firstRectangle.sizeX+15 && mousey>firstRectangle.y-15 && mousey<firstRectangle.y+firstRectangle.sizeY+15
        && (mousex<firstRectangle.x+40 || mousex>firstRectangle.x+firstRectangle.sizeX-40 || mousey<firstRectangle.y+40 || mousey>firstRectangle.y+firstRectangle.sizeY-40)//only on borders
        )
        {
            solutionObject.x=800;
            solutionObject.y=410;
        }
        else if(mousex>secondRectangle.x-15 && mousex<secondRectangle.x+secondRectangle.sizeX+15 && mousey>secondRectangle.y-15 && mousey<secondRectangle.y+secondRectangle.sizeY+15
            && (mousex<secondRectangle.x+40 || mousex>secondRectangle.x+secondRectangle.sizeX-40 || mousey<secondRectangle.y+40 || mousey>secondRectangle.y+secondRectangle.sizeY-40)//only on borders
        )
        {
            solutionObject.x=300;
            solutionObject.y=410;
        }
        else if(mousex>firstRectangle.x-15 && mousex<firstRectangle.x+firstRectangle.sizeX+15 && mousey>firstRectangle.y-15 && mousey<firstRectangle.y+firstRectangle.sizeY+15)
        {
            insideFirst=true;
        }
        else if(mousex>secondRectangle.x-15 && mousex<secondRectangle.x+secondRectangle.sizeX+15 && mousey>secondRectangle.y-15 && mousey<secondRectangle.y+secondRectangle.sizeY+15)
        {
            insideSecond=true;
        }
        //document.title=prevMousex+" "+prevMousey;
        //check if it always been
        mx=prevMousex;
        my=prevMousey;
        //mouse was not here
        if(mx!=-1 && my!=-1)
        {
            //one of the point was not inside
            if(insideFirst && !(mx>firstRectangle.x-15 && mx<firstRectangle.x+firstRectangle.sizeX+15 && my>firstRectangle.y-15 && my<firstRectangle.y+firstRectangle.sizeY+15))
            {
                solutionObject.x=800;
                solutionObject.y=410;
            }
            if(insideSecond && !(mx>secondRectangle.x-15 && mx<secondRectangle.x+secondRectangle.sizeX+15 && my>secondRectangle.y-15 && my<secondRectangle.y+secondRectangle.sizeY+15))
            {
                solutionObject.x=300;
                solutionObject.y=410;
            }
        }
        prevMousex=mousex;
            prevMousey=mousey;
        drawSolutionPoint(solutionObject);
    }
    else if(level==9)
    {
        drawSolutionPoint(solutionObject);
        //riquadro ad
        ctx.fillStyle="#874e32";
        ctx.fillRect(300,canvasH-100,20,100);
        ctx.fillRect(900,canvasH-100,20,100);
        ctx.fillStyle="#29180f";
        ctx.fillRect(100,canvasH-105,1000,5);
        ctx.fillRect(100,105,5,canvasH-205);
        ctx.fillRect(1100,105,5,canvasH-205);
        ctx.fillRect(100,105,1000,5);
        ctx.fillStyle="#FFF";
        ctx.font="10px Arial";
        ctx.fillText("Loading ad....",110,120);

        if(navigator.onLine && ++animationProgress>40)
        {
            //animationProgress++;
            cannotSolve=true;
            ctx.fillStyle="#CCC";
            ctx.fillRect(105,110,995,585);
            ctx.font="180px Arial";
            ctx.fillStyle="#7f41f1";
            ctx.fillText("Totally fake",150,300);
            ctx.font="130px Arial";
            if(animationProgress/7%5>2)
                ctx.fillText("ADVERTISING",155,500);
            ctx.fillStyle="#000";
            ctx.font="30px Arial";
            ctx.fillText("Want to play more of my games? Find them, by yourself.",150,600);
            //rotating stuff
            ctx.save();
            ctx.translate(940,605);
            ctx.rotate(9*animationProgress*Math.PI/180);
            ctx.fillText("🐐",0,0);
            ctx.restore();

            ctx.save();
            ctx.translate(1055,150);
            ctx.rotate(-5*animationProgress*Math.PI/180);
            ctx.fillText("⛲",0,0);
            ctx.restore();

            ctx.save();
            ctx.translate(135,650);
            ctx.rotate(-25*animationProgress*Math.PI/180);
            ctx.fillText("⛽",0,0);
            ctx.restore();

            ctx.save();
            ctx.translate(675,320);
            ctx.rotate(3*animationProgress*Math.PI/180);
            ctx.fillText("⛄",0,0);
            ctx.restore();

            ctx.save();
            ctx.translate(140,140);
            ctx.rotate(animationProgress*Math.PI/180);
            if(animationProgress/20%5>2) ctx.fillText("☕",0,0);
            ctx.restore();
        }
        else cannotSolve=false;

        //document.title=mousex+" "+mousey;
        //commentary
        ctx.fillStyle="#777";
        ctx.font="24px Arial";
        ctx.fillText("Just the pure essence of what are you looking for:",580,750);
        ctx.fillText("you need to ..",960,780);
    }
    else if(level==10)
    {
        animationProgress++;
        //commentary
        ctx.fillStyle="#777";
        ctx.font="180px Arial";
        ctx.fillText("GO OUTSIDE!",10,240);
        ctx.font="24px Arial";
        toWrite="You just discovered that being always connected prevents you from reaching your goals.";
        toWrite=toWrite.substring(0,animationProgress);  
        ctx.fillText(toWrite,50,350);
        toWrite="Internet can become and addiction.";
        toWrite=toWrite.substring(0,-86+animationProgress);  
        ctx.fillText(toWrite,50,380);
        toWrite="Try to live OFFLINE.";
        toWrite=toWrite.substring(0,-120+animationProgress);  
        ctx.fillText(toWrite,50,410);
        ctx.fillStyle="#abb";
        ctx.fillRect(285,425,600,canvasH-440);
        ctx.fillStyle="#f0af19";
        ctx.fillRect(285,425,600,5);
        ctx.fillRect(285,canvasH-15,600,5);
        ctx.fillRect(285,425,5,canvasH-440);
        ctx.fillRect(880,425,5,canvasH-440);

        ctx.font="45px Tiomes New Roman";
        ctx.fillStyle="#000";
        ctx.fillText("I've completed a stupid game",330,500);
        ctx.fillText("with a random title and all I've",315,550);
        ctx.fillText("got was this stupid certificate.",320,600);
        ctx.fillText("  🎀CONGRATULATIONS🎀",290,750);

        document.title=mousex+" "+mousey;
    }

    drawHUD(solutionObject);
    //if mouse is inside solutionObject, mouse becomes an hand
    if(mousex>solutionObject.x && mousex<solutionObject.x+solutionObject.sizeX && mousey>solutionObject.y-solutionObject.sizeY && mousey<solutionObject.y && !cannotSolve)
    {
        document.body.style.cursor = "pointer";
        if(dragging)
        {
            level++;
            generateLevel();
        }
    }
    else document.body.style.cursor = "default";
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
function distanceFrom(a,b)
{
    return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

/*//controlli mobile
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
}*/
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
function sparitoMouse(evt)
{
    mousex=mousey=-1;
}
/*
function keyUp(e) {
    //alert(e.keyCode);
    if(e.keyCode==77 || e.keyCode==83)//m OR s
    {
        //TODO enable/disable sound
        e=e;
    }
}*/
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
    rescalercheck=setInterval(this.checkRescale, 1500);
};
