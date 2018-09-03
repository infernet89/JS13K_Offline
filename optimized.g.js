// < >
//costant
var RAD = Math.PI/180; 

//global variables
var canvas;
var cW;
var cH;
var ctx;
var activeTask;
var lvl;
var aP=0;
var sO=null;
var rP=null;

//mobile controls
var mousex=-100;
var mousey=-100;
var dG=false;

//setup
canvas = document.getElementById("g");
ctx = canvas.getContext("2d");
cW=canvas.width  = 1200;//window.innerWidth;
cH=canvas.height = 800;//window.innerHeight;
//cW=(cH/800)*1200;
maxDistance=Math.sqrt(cW*cW+cH*cH)/4;
maxIntensity=7;
var randomWords=["absurd","anomaly","bandit","banjo","boiler","bone","book","bottle","breakfast","bridge","broker","card","cat","center","contract","cheese","club","dog","egg","error","experiment","explosion","female","fish","fungus","fusion","game","giraffe","glitch","horse","iceman","infuse","internet","jumper","keyboard","king","lawyer","letter","limit","lobster","man","meatball","message","metal","mouse","movie","mumble","normal","nugget","pancake","phobos","piece","rabbit","random","savage","scream","secure","ship","speed","stasis","sister","substance","table","test","theatre","thing","trip","twist","title","watermelon","wild","zombie"];
var randomWordForRandom=[];
//random words long6
randomWords.forEach(function(e) {
    if(e.length==6)
        randomWordForRandom.push(e);
});
var menuFirstWord="game";
var menuSecondWord="random";
var menuThirdWord="title";
var mO;
var selectedObject=null;
var oldmousex,oldmousey;
var cannotSolve;
var inputDelay=0;
var prevMousex,prevMousey=-1;
var repetition=0;
var carPossibilities=[];

//controls
canvas.addEventListener("mousemove",mossoMouse);
canvas.addEventListener("mousedown",cliccatoMouse);
canvas.addEventListener("mouseup",rilasciatoMouse);
//canvas.addEventListener("contextmenu",sparitoMouse);
window.addEventListener("blur",sparitoMouse);
//window.addEventListener('keyup',keyUp,false);

lvl=0;//TODO change lvl here
generateLevel();
activeTask=setInterval(run, 33);

function generateLevel()
{
    cannotSolve=false;
    aP=0;
    sO=new Object();
    sO.hR=true;
    sO.iC=false;
    sO.oY=0;
    sO.a=1;
    sO.c="#0F0";
    if(lvl==0)
    {
        aP=1;
        sO.w=60;
        sO.h=60;
        sO.x=cW/2-30
        sO.y=cH-120;
    }
    else if(lvl==1)
    {
        
        sO.w=300;
        sO.h=65;
        sO.x=455
        sO.y=450;
        sO.a=0.6;
        sO.hR=false;
        mO=[];
        for(i=0;i<32;i++)
        {
            tmp=new Object();
            tmp.x=rand(0,cW);
            tmp.y=rand(0,cH);
            tmp.dx=rand(-10,10);
            tmp.dy=rand(-10,10);
            tmp.sD=rand(0,300);
            tmp.char="🧠"
            mO.push(tmp);
        }
    }
    else if(lvl==2)
    {
        repetition=0;
        sO.w=45;
        sO.h=45;
        sO.x=100
        sO.y=100;
        sO.dx=rand(-9,9);
        sO.dy=rand(-9,9);
        sO.oY=-15;
        sO.iC=true;
        sO.hR=false;
        sO.a=1;
        mO=[];
        for(i=0;i<16;i++)
        {
            tmp=new Object();
            tmp.x=rand(50,cW-50);
            tmp.y=rand(50,cH-50);
            tmp.dx=0;
            tmp.dy=0;
            if(i%3==0)
            {
                tmp.kind="time";
                tmp.c="#880"
            }
            else if(i%3==1)
            {
                tmp.kind="friend";
                tmp.c="#4267b2"
            }
            else
            {
                tmp.kind="love";
                tmp.c="#800"
            }
            mO.push(tmp);
        }
        

        aP=-20;
    }
    else if(lvl==3)
    {
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

        sO.w=40;
        sO.h=40;
        sO.x=10
        sO.y=80;
        sO.oY=-22;
        sO.hR=false;
        rP=[];
        for(i=0;i<cW/40;i++)
        {
            rP[i]=[];
            for(k=0;k<-5+cH/40;k++)
            {
                rP[i][k]=new Object();
                if(isFirefox)
                    rP[i][k].char="FIREFOXISBROKEN".charAt((i+k)%15);
                else
                    rP[i][k].char=String.fromCharCode(rand(33,255));
                r=rand(0,2)
                if(r==2)
                    rP[i][k].c="#FFF"; 
                else if(r==1)
                    rP[i][k].c="#F00"; 
                else rP[i][k].c="#0F0"; 
            }
                
        }
        r=rand(0,2)
        if(r==2)
            sO.c="#FFF"; 
        else if(r==1)
            sO.c="#F00"; 
        else sO.c="#0F0";
        //sO.c="#00F";//DEBUG
        solX=rand(0,-1+cW/40);
        solY=rand(0,-6+cH/40);
        rP[solX][solY].char="";
        sO.x=solX*40;
        sO.y=cH-solY*40-10;
        //ctx.fillText(rP[i][k].char,i*40,cH-k*40-10);
    }
    else if(lvl==4)
    {
        sO.w=100;
        sO.h=100;
        sO.x=-90950;
        sO.y=600;
        sO.oY=15;
        sO.iC=true;
        sO.hR=false;
        sO.a=1;
        sO.c="#0A0";
        mO=[];
        carPossibilities=["🚗","🚋","🚐","🚑","🚒","🚓","🚕","🚙","🚚","🚛","🚜"];
        for(i=0;i<8;i++)
        {
            tmp=new Object();
            tmp.x=rand(0,cW);
            tmp.y=cH-10-20*i;
            tmp.dx=rand(-20,20);
            tmp.char=carPossibilities[rand(0,carPossibilities.length-1)];
            mO.push(tmp);
        }
    }
    else if(lvl==5)
    {
        sO.w=100;
        sO.h=100;
        sO.x=550;
        sO.y=500;
        sO.oY=15;
        sO.iC=true;
        sO.hR=false;
        sO.a=1;
        sO.c="#FFF";
        mO=[];
        for(i=0;i<9;i++)
        {
            tmp=new Object();
            tmp.x=rand(100,cW-100);
            tmp.y=rand(100,cH-100);
            if(i==0)
                tmp.c="#A00";
            else if(i==1)
                tmp.c="#0A0";
            else if(i==2)
                tmp.c="#00A";
            else if(i==3)
                tmp.c="#0AA";
            else if(i==4)
                tmp.c="#A0A";
            else if(i==5)
                tmp.c="#AA0";
            else if(i==6)
                tmp.c="#A70";
            else if(i==7)
                tmp.c="#A07";
            else if(i==8)
                tmp.c="#7A0";
            tmp.w=50;
            tmp.h=50;
            tmp.a=0.8;
            mO.push(tmp);
        }

    }
    else if(lvl==6)
    {//5 o 8 non compare
        aP=1;
        sO.w=60;
        sO.h=60;
        sO.x=cW/2-30
        sO.y=cH-120;
        mO=[];
        tmp=new Object();
        tmp.x=510;
        tmp.y=225;
        tmp.w=170;
        tmp.h=60;
        mO.push(tmp);
        cannotSolve=true;
    }
    else if(lvl==7)
    {
        mO=[];
        sO.x=-9999;
        sO.w=100;
        sO.h=100;
        sO.oY=15;
        sO.iC=true;
        sO.hR=false;
        sO.a=0;
        tmp=new Object();
        tmp.x=250;
        tmp.y=250;
        tmp.w=150;
        tmp.h=300;
        tmp.isClosed=true;
        mO.push(tmp);
        tmp=new Object();
        tmp.x=500;
        tmp.y=250;
        tmp.w=150;
        tmp.h=300;
        tmp.isClosed=true;
        mO.push(tmp);
        tmp=new Object();
        tmp.x=750;
        tmp.y=250;
        tmp.w=150;
        tmp.h=300;
        tmp.isClosed=true;
        mO.push(tmp);
    }
    else if(lvl==8)
    {
        sO.w=45;
        sO.h=45;
        sO.x=-100
        sO.y=-100;
        sO.oY=-15;
        sO.iC=true;
        sO.hR=false;
        sO.a=1;
        //clearInterval(activeTask);
        //activeTask=setInterval(run, 1);
    }
    else if(lvl==9)
    {
        //clearInterval(activeTask);
        //activeTask=setInterval(run, 33);
        sO.w=45;
        sO.h=45;
        sO.x=cW/2;
        sO.y=cH/2;
        sO.oY=-15;
        sO.iC=true;
        sO.hR=false;
        sO.a=1;
        inputDelay=50;
    }
}
function dS(o)
{
    ctx.save();
    ctx.globalAlpha=o.a;
    ctx.fillStyle=o.c;
    if(o.hR)
    {
        ctx.fillRect(o.x,o.y,o.w,2);
        ctx.fillRect(o.x,o.y-o.h,o.w,2);
        ctx.fillRect(o.x,o.y-o.h,2,o.h);
        ctx.fillRect(o.x+o.w,o.y-o.h,2,o.h+2);
    }
    if(o.iC)
    {
        ctx.beginPath();
        ctx.arc(o.x+o.w/2, o.y-o.h/2, o.w/2, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.lineWidth = 5/10;
        ctx.strokeStyle = o.c;
        ctx.stroke();
        ctx.closePath();
    }

    //dot
    if(o.iC)
        ctx.fillStyle= "#000";
    ctx.beginPath();
    ctx.arc(o.x+o.w/2, o.y-25-o.oY, 5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.lineWidth = 5/10;
    if(o.iC)
        ctx.strokeStyle = "#000";
    else
        ctx.strokeStyle = o.c;
    ctx.stroke();
    ctx.closePath();
    //waves
    for(i=0;i<5;i++)
    {
        ctx.beginPath();
        ctx.arc(o.x+o.w/2, o.y-25-o.oY, 5+i*5, 230*RAD, 310*RAD, false);
        ctx.lineWidth = 1;
        if(o.iC)
        ctx.strokeStyle = "#000";
        else
            ctx.strokeStyle = o.c;
        ctx.stroke();
        ctx.closePath();
    }
    ctx.restore();
}
function drawHUD(to)
{
with (ctx){
    //calcola distanza tra mousex,mousey e to
    distance=Math.sqrt((mousex-to.x-to.w/2)*(mousex-to.x-to.w/2)+(mousey-to.y+to.h/2)*(mousey-to.y+to.h/2));
    //rendi la distanza un numero da 0 a maxIntensity
    distance=maxIntensity-maxIntensity*(distance/maxDistance);
    //document.title=distance;
    
    save();
    //translate(mousex,mousey);//follow the mouse
    translate(cW-30,20);//on top-right
    if(distance<-3)
        fillStyle="#F00";
    else if(distance>maxIntensity-0.8)
        fillStyle="#0F0";
    else
        fillStyle="#FFF";

    beginPath();
    //down 'arrow'
    moveTo(2,0);
    lineTo(0,-3);
    lineTo(2,-3);
    lineTo(2,-10);
    lineTo(4,-10);
    lineTo(4,0);
    lineTo(2,0);
    lineWidth = 1;
    //up 'arrow'
    moveTo(5,-10);
    lineTo(9,-7);
    lineTo(7,-7);
    lineTo(7,0);
    lineTo(5,0);
    lineWidth = 1;
    fill();
    closePath();
    //intensity indicator   
    fillStyle="#FFF";
    for(i=0;i<distance;i++)
        fillRect(10+2*i,0,1,-3-i);
    
    restore();

    //check if it is connected, also display time
    fillStyle="#FFF";
    font = "12px Arial";
    if(navigator.onLine)
    {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = (m < 10) ? "0" + m : m;  //add zero in front of numbers
        s = (s < 10) ? "0" + s : s;  //add zero in front of numbers
        fillText(h + ":" + m + ":" + s,5,15);
    }
    else 
        fillText("Offline",5,15);
}
}
function run()
{
with(ctx)
{
    if(inputDelay>0)
    {
        inputDelay--;
        dG=false;
    }
	clearRect(0, 0, cW, cH);
    fillStyle="#000";
    fillRect(0,0,cW,cH);

    fillStyle="#FFF";
    fillRect(0,0,cW,1);
    fillRect(0,cH-1,cW,1);
    fillRect(0,0,1,cH);
    fillRect(cW-1,0,1,cH);

    //menu
    if(lvl==0)
    {
        dS(sO);

        if(++aP%100==0)
        {
            menuFirstWord=randomWords[rand(0,randomWords.length-1)];
            menuSecondWord=randomWordForRandom[rand(0,randomWordForRandom.length-1)];
            menuThirdWord=randomWords[rand(0,randomWords.length-1)];
        }
        if(Math.round(aP/10)%10==9)
        {
            var s = "abcdefghijklmnopqrstuvwxyz";
            r=rand(4,10);
            menuFirstWord=Array(r).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
            r=6;
            menuSecondWord=Array(r).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
            r=rand(4,10);
            menuThirdWord=Array(r).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
        }
        fillStyle="#EEE";
        font = "70px Lucida Console";
        text="This "+menuFirstWord;
        fillText(text,350,150);
        text="has a "+menuSecondWord+" "+menuThirdWord;
        fillText(text,190,250);
        //document.title=mousex+" "+mousey;
        
        fillStyle="#0F0";
        font = "20px Arial";
        fillText("PLAY",cW/2-25,cH-125);
        fillStyle="#FFF";
        font = "12px Arial";
        fillText("By Infernet89",cW-75,cH-5);
        fillText("Made for JS13k Competition",5,cH-5);
        //fillText("Music by ABSolid",5+cW/2,cH-5);
    }
    else if(lvl==1)
    {
        aP++;
        //document.title=aP;
        if(aP>180) 
            dS(sO);

        toWrite="This";
        toWrite=toWrite.substring(0,aP/2);
        fillStyle="#FFF";
        font="40px Arial";
        fillText(toWrite,150,250);

        toWrite="little";
        toWrite=toWrite.substring(0,-8+aP/2);
        font="20px Arial";
        fillText(toWrite,240,250);

        toWrite="game";
        toWrite=toWrite.substring(0,-16+aP/2);        
        font="40px Arial";
        fillText(toWrite,290,250);

        toWrite="is gonna";
        toWrite=toWrite.substring(0,-24+aP/2);  
        font="40px Arial";
        fillText(toWrite,150,330);

        fillStyle="#F00";
        font="90px Arial";
        if(aP>70)        
            fillText("Hurt",150,450);

        fillStyle="#FFF";
        font="40px Arial";
        if(aP>90) 
            fillText("your",350,450);

        fillStyle="#0F0";
        font="90px Arial";
        if(aP>110) 
            fillText("BRAIN!",450,450);
        else dG=false;//avoid click while loading animation

        font="18px Arial";
        for(i in mO)
        {
            o=mO[i];
            //rimbalza
            if(o.x+o.dx>cW-10 || o.x+o.dx<10)
                o.dx*=-1;
            if(o.y+o.dy+60>cH-10 || o.y+o.dy<10)
                o.dy*=-1;
            o.x+=o.dx;
            o.y+=o.dy;
            o.dx*=0.95;
            o.dy*=0.95;
            if(--o.sD<0)
            {
                o.dx=rand(-10,10);
                o.dy=rand(-10,10);
                o.sD=rand(0,300);
            }
            fillText(o.char,o.x,o.y);
            //console.log(o.x,o.y);
        }     
    }
    else if(lvl==2)
    {
        //commentary
        fillStyle="#777";
        font="24px Arial";
        fillText("They said that in life, only three things really matter..",300,350);
        fillText("          You know that there is a fourth one.",300,450);

        if(sO.x+sO.dx>cW-sO.w || sO.x+sO.dx<0)
            sO.dx*=-1;
        if(sO.y+sO.dy>cH || sO.y+sO.dy<sO.h)
            sO.dy*=-1;
        
        if(--aP>0)
        {
            dG=false;
            if(aP>33)
            {
                sO.x+=sO.dx;
                sO.y+=sO.dy;
                //la fisica di timeObject, friendObject e loveObject
                for(i in mO)
                {
                    o=mO[i];
                    if(distanceFrom(o,sO)<60)
                    {
                        o.dx=(o.x-sO.x)/3;
                        o.dy=(o.y-sO.y)/3;
                    }
                    //collisioni fra loro
                    for(k in mO)
                    {
                        if(i==k) continue;
                        o2=mO[k];
                        if(distanceFrom(o,o2)<100)
                        {
                            o.dx=100/(o.x-o2.x);
                            o.dy=100/(o.y-o2.y);
                        }
                    }
                    //rimbalza
                    if(o.x+o.dx>cW || o.x+o.dx<60)
                        o.dx*=-1;
                    if(o.y+o.dy+60>cH || o.y+o.dy<60)
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
        else if(aP>-25)
            sO.a=1;
        else
        {
            sO.a=0+repetition;
            aP=rand(100,600);
            sO.dx=rand(-5,5);
            sO.dy=rand(-5,5);
            repetition+=0.005;
        }

        //draw stuff
        for(i in mO)
        {
            o=mO[i];
            fillStyle=o.c;
            beginPath();
            arc(o.x, o.y, 50, 0, 2 * Math.PI, false);
            fill();
            lineWidth = 5/10;
            stroke();
            closePath();
            fillStyle="#000";
            if(o.kind=="time")
            {
                font="80px Arial";
                fillText("⧗",o.x-20,o.y+25);
            }
            else if(o.kind=="love")
            {
                font="60px Arial";
                fillText("❤",o.x-30,o.y+25);
            }
            else
            {
                font="80px Arial";
                fillText("☺",o.x-40,o.y+25);
            }
            
        }
        dS(sO);

    }
    else if(lvl==3)
    {
        //commentary
        fillStyle="#777";
        font="24px Arial";
        fillText("They'll try to distract you.",400,100);

        font="40px Webdings";
        for(i=0;i<cW/40;i++)
            for(k=0;k<-5+cH/40;k++)
            {
                fillStyle=rP[i][k].c;
                fillText(rP[i][k].char,i*40,cH-k*40-10);
            }
        dS(sO);
    }
    else if(lvl==4)
    {
        //commentary
        fillStyle="#777";
        font="24px Arial";
        fillText("       But if you stop and think,",200,250);
        fillText("you will understand what you really need.",200,300);

        //semaforo
        fillStyle="#888";
        fillRect(930,160,140,460);
        beginPath();
        fillStyle = "#100";
        arc(1000, 230, 50, 0, 2 * Math.PI, false);
        fill();
        beginPath();
        fillStyle = "#110";
        arc(1000, 390, 50, 0, 2 * Math.PI, false);
        fill();
        beginPath();
        fillStyle = "#010";
        arc(1000, 550, 50, 0, 2 * Math.PI, false);
        fill();
        //red
        if(aP<200)
        {
            fillStyle = "#A00";
            beginPath();
            arc(1000, 230, 50, 0, 2 * Math.PI, false);
            fill();
            lineWidth = 5/10;
            strokeStyle = "#FFF";
            stroke();
            closePath();
            if(mousex==oldmousex && mousey==oldmousey)
            {
                aP++;
            }
            else aP=0;

        }
        //yellow
        else if(aP<300)
        {
            fillStyle = "#AA0";
            beginPath();
            arc(1000, 390, 50, 0, 2 * Math.PI, false);
            fill();
            lineWidth = 5/10;
            strokeStyle = "#FFF";
            stroke();
            closePath();
            if(mousex==oldmousex && mousey==oldmousey)
            {
                aP++;
            }
            else aP=0;
        }
        else if(aP)
        {
            sO.x=950;
            dS(sO);
        }
        fillStyle="#FFF";
        font="24px Arial";
        for(i in mO)
        {
            o=mO[i];
            o.x+=o.dx;
            if(o.x<-50)
            {
                o.x=cW+50;
                o.char=carPossibilities[rand(0,carPossibilities.length-1)];
                o.dx=rand(-20,20);
            }
            else if(o.x>cW+50)
            {
                o.x=-50;
                o.dx=rand(-20,20);
                o.char=carPossibilities[rand(0,carPossibilities.length-1)];
            }
            fillText(o.char,o.x,o.y);
            //console.log(o.x,o.y);
        }     
        oldmousex=mousex;
        oldmousey=mousey;
    }
    else if(lvl==5)
    {
        //commentary
        fillStyle="#777";
        font="24px Arial";
        fillText("There are some cheap imitation of that.",370,220);
        fillText("      But you need the original.",370,270);

        if(!dG)
            selectedObject=null;
        if(selectedObject!=null)
        {
            selectedObject.x=mousex;
            selectedObject.y=mousey;
        }
        dS(sO);
        save();
        compositeOperation="lighter";
        for(i in mO)
        {
            o=mO[i];
            globalAlpha=o.a;
            fillStyle = o.c;
            beginPath();
            arc(o.x, o.y, o.w, 0, 2 * Math.PI, false);
            fill();
            closePath();
            if(selectedObject==null)
            {
                if(mousex>o.x-o.w && mousex<o.x+o.w && mousey>o.y-o.h && mousey<o.y+o.h)
                    selectedObject=o;
            }
            if(o.c=="#0A0")
            {
                dist=Math.sqrt((o.x-sO.x-sO.w/2)*(o.x-sO.x-sO.w/2)+(o.y-sO.y+sO.h/2)*(o.y-sO.y+sO.h/2));
                if(dist<5)
                    cannotSolve=false;
                else cannotSolve=true;
            }
            
        }
        restore();
    }
    //In the jungle, you must wait, until the dice read 5 or 8.
    else if(lvl==6)
    {
         //commentary
        fillStyle="#777";
        font="24px Arial";
        fillText("And you need it now.",900,750);

        fillStyle="#EEE";
        font="60px Arial";
        toWrite="In the jungle,";
        toWrite=toWrite.substring(0,-24+aP/2);  
        fillText(toWrite,350,270);
        toWrite="you must wait,";
        toWrite=toWrite.substring(0,-51+aP/2);  
        fillText(toWrite,350,360);
        toWrite="until the time read 5 or 8.";
        toWrite=toWrite.substring(0,-78+aP/2);  
        fillText(toWrite,350,450);
        
        var today = new Date();
        time=today.getHours()+""+today.getMinutes()+""+today.getSeconds();
        if(cannotSolve)
            sO.c="#A00";
        else sO.c="#0F0";o=mO[0];

        //fillRect(o.x,o.y,o.w,o.h);
        if(mousex>o.x && mousex<o.x+o.w && mousey>o.y && mousey<o.y+o.h)
        {
            sO.c="#0F0";
            if(time.includes("5") || time.includes("8"))
                cannotSolve=false;
        }
        else if(!time.includes("5") && !time.includes("8"))
            cannotSolve=true;
        
       
        dS(sO);
        aP++;
    }
    else if(lvl==7)
    {//monty hall problem
        //commentary
        fillStyle="#777";
        font="24px Arial";
        fillText("Without silly games..",900,750);

        fillStyle="#EEE";
        font="60px Arial";
        if(aP==0)
            fillText("Which door has what are you looking for?",50,150);
        else if(aP==1)
            fillText("Not this. Want to change your mind?",50,150);
        else if(aP==2)
            fillText("Wrong decision.",50,150);
        else if(aP==3)
            fillText("Smart move!",50,150);
        //draw doors
        for(i in mO)
        {
            o=mO[i];
            fillStyle="#29180f";
            fillRect(o.x,o.y,o.w,o.h);
            if(o.isClosed)
            {
                fillStyle = "#874e32";
                fillRect(o.x+5,o.y+5,o.w-10,o.h-10);
                fillStyle="#29180f";
                beginPath();
                arc(o.x+o.w-20, o.y+o.h/2, 10, 0, 2 * Math.PI, false);
                fill();
            }
            else
            {
                fillStyle="#000";
                fillRect(o.x+5,o.y+5,o.w-10,o.h-10);
                fillStyle = "#874e32";
                fillRect(o.x-5,o.y+5,10,o.h-10);
                fillStyle="#29180f";
                fillRect(o.x-15,o.y+o.h/2-10,10,20);
                if(aP==1)
                {
                    //draw a skull
                    fillStyle="#F00";
                    font="99px Arial";
                    fillText("🐐",o.x+10,o.y+o.h/2+30);
                }
                else if(aP==2)
                {
                    fillStyle="#F00";
                    font="99px Arial";
                    fillText("🐐",o.x+10,o.y+o.h/2+30);
                }
                else if(aP==3 && i!=solutionDoor)
                {
                    fillStyle="#F00";
                    font="99px Arial";
                    fillText("🐐",o.x+10,o.y+o.h/2+30);
                }
            }
            closePath();
            //need to choose the first door
            if(aP==0)
            {
                if(dG && mousex>o.x && mousex<o.x+o.w && mousey>o.y && mousey<o.y+o.h)
                {
                    firstDoorChoiche=i;
                    do
                    {
                        r=rand(0,2);
                    }while(r==i);
                    mO[r].isClosed=false;
                    aP=1;
                    inputDelay=30;
                }
            }
            //needs to change his mind
            else if(aP==1)
            {
                if(dG && mousex>o.x && mousex<o.x+o.w && mousey>o.y && mousey<o.y+o.h && o.isClosed)
                {
                    if(i==firstDoorChoiche)
                    {
                        o.isClosed=false;
                        aP=2;
                        sol=-1;
                        do{
                            sol++;
                        }while(!mO[sol].isClosed);
                        sO.x=mO[sol].x+mO[sol].w/2-45;
                        sO.y=mO[sol].y+mO[sol].h/2+40;
                        sO.a=0;
                        cannotSolve=true;
                    }
                    else
                    {
                        aP=3;
                        o.isClosed=false;
                        solutionDoor=i;
                        sO.x=mO[i].x+mO[i].w/2-45;
                        sO.y=mO[i].y+mO[i].h/2+40;
                        sO.a=1;
                        sO.c="#0F0";
                        cannotSolve=false;
                        dG=false;
                        inputDelay=30;
                    }
                }
            }
            else if(aP==2)
            {
                if(dG && mousex>o.x && mousex<o.x+o.w && mousey>o.y && mousey<o.y+o.h && o.isClosed)
                {
                    o.isClosed=false;
                    sO.a=0.8;
                    sO.c="#A00";
                    inputDelay=30;
                    dG=false;
                }
            }
        }
        if(aP==2)
        {
            if(dG && mousex>sO.x && mousex<sO.x+sO.w && mousey>sO.y-sO.h && mousey<sO.y && sO.a>0.5)
            {
                generateLevel();//restart monti hall problem
                inputDelay=30;
            }
        }
        dS(sO);
    }
    else if(lvl==8)
    {
        fillStyle="#777";
        font="24px Arial";
        fillText("Without dirty tricks..",900,750);

        var firstRectangle=new Object();
        firstRectangle.x=200;
        firstRectangle.y=160;
        firstRectangle.w=250;
        firstRectangle.h=500;
        var secondRectangle=new Object();
        secondRectangle.x=700;
        secondRectangle.y=160;
        secondRectangle.w=250;
        secondRectangle.h=500;
        strokeStyle="#F00";
        lineWidth=20;
        strokeRect(firstRectangle.x,firstRectangle.y,firstRectangle.w,firstRectangle.h); 
        strokeRect(secondRectangle.x,secondRectangle.y,secondRectangle.w,secondRectangle.h);

        insideFirst=false;
        insideSecond=false;

        //mouse inside first rectangle
        if(mousex>firstRectangle.x-15 && mousex<firstRectangle.x+firstRectangle.w+15 && mousey>firstRectangle.y-15 && mousey<firstRectangle.y+firstRectangle.h+15
        && (mousex<firstRectangle.x+40 || mousex>firstRectangle.x+firstRectangle.w-40 || mousey<firstRectangle.y+40 || mousey>firstRectangle.y+firstRectangle.h-40)//only on borders
        )
        {
            sO.x=800;
            sO.y=410;
        }
        else if(mousex>secondRectangle.x-15 && mousex<secondRectangle.x+secondRectangle.w+15 && mousey>secondRectangle.y-15 && mousey<secondRectangle.y+secondRectangle.h+15
            && (mousex<secondRectangle.x+40 || mousex>secondRectangle.x+secondRectangle.w-40 || mousey<secondRectangle.y+40 || mousey>secondRectangle.y+secondRectangle.h-40)//only on borders
        )
        {
            sO.x=300;
            sO.y=410;
        }
        else if(mousex>firstRectangle.x-15 && mousex<firstRectangle.x+firstRectangle.w+15 && mousey>firstRectangle.y-15 && mousey<firstRectangle.y+firstRectangle.h+15)
        {
            insideFirst=true;
        }
        else if(mousex>secondRectangle.x-15 && mousex<secondRectangle.x+secondRectangle.w+15 && mousey>secondRectangle.y-15 && mousey<secondRectangle.y+secondRectangle.h+15)
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
            if(insideFirst && !(mx>firstRectangle.x-15 && mx<firstRectangle.x+firstRectangle.w+15 && my>firstRectangle.y-15 && my<firstRectangle.y+firstRectangle.h+15))
            {
                sO.x=800;
                sO.y=410;
            }
            if(insideSecond && !(mx>secondRectangle.x-15 && mx<secondRectangle.x+secondRectangle.w+15 && my>secondRectangle.y-15 && my<secondRectangle.y+secondRectangle.h+15))
            {
                sO.x=300;
                sO.y=410;
            }
        }
        prevMousex=mousex;
            prevMousey=mousey;
        dS(sO);
    }
    else if(lvl==9)
    {
        dS(sO);
        //riquadro ad
        fillStyle="#874e32";
        fillRect(300,cH-100,20,100);
        fillRect(900,cH-100,20,100);
        fillStyle="#29180f";
        fillRect(100,cH-105,1000,5);
        fillRect(100,105,5,cH-205);
        fillRect(1100,105,5,cH-205);
        fillRect(100,105,1000,5);
        fillStyle="#FFF";
        font="10px Arial";
        fillText("Loading ad....",110,120);

        if(navigator.onLine && ++aP>40)
        {
            //aP++;
            cannotSolve=true;
            fillStyle="#CCC";
            fillRect(105,110,995,585);
            font="180px Arial";
            fillStyle="#7f41f1";
            fillText("Totally fake",150,300);
            font="130px Arial";
            if(aP/7%5>2)
                fillText("ADVERTISING",155,500);
            fillStyle="#000";
            font="30px Arial";
            fillText("Want to play more of my games? Find them, by yourself.",150,600);
            //rotating stuff
            save();
            translate(940,605);
            rotate(9*aP*RAD);
            fillText("🐐",0,0);
            restore();

            save();
            translate(1055,150);
            rotate(-5*aP*RAD);
            fillText("⛲",0,0);
            restore();

            save();
            translate(135,650);
            rotate(-25*aP*RAD);
            fillText("⛽",0,0);
            restore();

            save();
            translate(675,320);
            rotate(3*aP*RAD);
            fillText("⛄",0,0);
            restore();

            save();
            translate(140,140);
            rotate(aP*RAD);
            if(aP/20%5>2) fillText("☕",0,0);
            restore();
        }
        else cannotSolve=false;

        //document.title=mousex+" "+mousey;
        //commentary
        fillStyle="#777";
        font="24px Arial";
        fillText("Just the pure essence of what are you looking for:",580,750);
        fillText("you need to ..",960,780);
    }
    else if(lvl==10)
    {
        aP++;
        //commentary
        fillStyle="#777";
        font="180px Arial";
        fillText("GO OUTSIDE!",10,240);
        font="24px Arial";
        toWrite="You just discovered that being always connected prevents you from reaching your goals.";
        toWrite=toWrite.substring(0,aP);  
        fillText(toWrite,50,350);
        toWrite="Internet can become and addiction.";
        toWrite=toWrite.substring(0,-86+aP);  
        fillText(toWrite,50,380);
        toWrite="Try to live OFFLINE.";
        toWrite=toWrite.substring(0,-120+aP);  
        fillText(toWrite,50,410);
        fillStyle="#abb";
        fillRect(285,425,600,cH-440);
        fillStyle="#f0af19";
        fillRect(285,425,600,5);
        fillRect(285,cH-15,600,5);
        fillRect(285,425,5,cH-440);
        fillRect(880,425,5,cH-440);

        font="45px Tiomes New Roman";
        fillStyle="#000";
        fillText("I've completed a stupid game",330,500);
        fillText("with a random title and all I've",315,550);
        fillText("got was this stupid certificate.",320,600);
        fillText("  🎀CONGRATULATIONS🎀",290,750);

        document.title=mousex+" "+mousey;
    }

    drawHUD(sO);
    //if mouse is inside sO, mouse becomes an hand
    if(mousex>sO.x && mousex<sO.x+sO.w && mousey>sO.y-sO.h && mousey<sO.y && !cannotSolve)
    {
        document.body.style.cursor = "pointer";
        if(dG)
        {
            lvl++;
            generateLevel();
        }
    }
    else document.body.style.cursor = "default";
}
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
    dG=true;
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
    dG=false;
    mousey=-100;
    mousex=-100;
}*/
//uindows
function cliccatoMouse(evt)
{
    dG=true;
    var rect = canvas.getBoundingClientRect();
    mousex=(evt.clientX-rect.left)/(rect.right-rect.left)*cW;
    mousey=(evt.clientY-rect.top)/(rect.bottom-rect.top)*cH;
//< >
}
function mossoMouse(evt)
{
    var rect = canvas.getBoundingClientRect();
    mousex=(evt.clientX-rect.left)/(rect.right-rect.left)*cW;
    mousey=(evt.clientY-rect.top)/(rect.bottom-rect.top)*cH;
}
function rilasciatoMouse(evt)
{
    dG=false;    
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
