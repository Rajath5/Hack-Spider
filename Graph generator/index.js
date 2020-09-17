let canvas=document.getElementById("canvas");
let ctx= canvas.getContext("2d");

let funcInput=document.getElementsByClassName("func");
let colorPicker=document.getElementsByClassName("color-picker");
let colorbtn=document.getElementsByClassName("colorbtn");
let sinbtn=document.getElementById("sin");
let cosbtn=document.getElementById("cos");
let tanbtn=document.getElementById("tan");
let x, y;
let scale=50;
let clicked=[];
let j=0;
let color=[];


class InputWrap{
    constructor(j){
        this.index=j;
    }
    set(){
        clicked[this.index]=false;
        funcInput[this.index].addEventListener("click",()=>{
            if(!clicked[this.index]){
                funcInput[this.index].style.border="none";
                funcInput[this.index].style.borderBottom="2px solid green";
                clicked[this.index]=true;
            }
            else {
                funcInput[this.index].style.border="none";
                funcInput[this.index].style.borderBottom="2px solid blue";
                clicked[this.index]=false;
            }
        })
        colorPicker[this.index].addEventListener("change",()=>{
            console.log(this.index)
            color[this.index]=colorPicker[this.index].value;
            draw();
        })
    }
}
window.onload=()=>{
    canvas.width=0.95*window.innerWidth;
    canvas.height=0.95*window.innerHeight;
    clicked[0]=false;
    drawAxes()
    funcInput[0].addEventListener("click",()=>{
        if(!clicked[0]){
            funcInput[0].style.border="none";
            funcInput[0].style.borderBottom="2px solid green";
            clicked[0]=true;
        }
        else{
            funcInput[0].style.border="none";
            funcInput[0].style.borderBottom="2px solid blue";
            clicked[0]=false;
        }
    })
    colorPicker[0].addEventListener("change",()=>{
        color[0]=colorPicker[0].value;
        console.log(j)
        draw()
    })
}

function graph(){
        draw();
}
function draw(){
    let canvy;
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for(let i=0;i<funcInput.length;i++){
        for(let posx=-canvas.width/2;posx<canvas.width/2;){

            ctx.beginPath();
            ctx.strokeStyle=color[i];
            ctx.lineCap="butt";
            ctx.lineWidth=2;
    
            canvx=posx+canvas.width/2;
          
            y=scale*eval(funcInput[i].value);
            canvy=y+canvas.height/2;
            ctx.moveTo(canvx,canvy);
    
            posx+=0.05;
            x=posx/scale;
            canvx=posx+canvas.width/2;
            y=scale*eval(funcInput[i].value);
            canvy=y+canvas.height/2;
            ctx.lineTo(canvx,canvy);
            ctx.stroke();
        }
    }
    drawAxes()

}
function drawAxes(){
    // ctx.clearRect(0,0,canvas.width,canvas.height)
    let canvy;
    let canvx;

    for(let posy=0;posy<canvas.height/2;){

        ctx.beginPath();
        ctx.strokeStyle="#fff";
        ctx.lineCap="butt";
        ctx.lineWidth=2;

        canvy=posy+canvas.height/2;
        ctx.moveTo(canvas.width/2,canvy);
       
        posy+=scale;
        canvy=posy+canvas.height/2;

        ctx.lineTo(canvas.width/2,canvy);
        ctx.moveTo(canvas.width/2,canvy);
        ctx.lineTo(canvas.width/2-10,canvy);
        ctx.stroke();
      
    }
    for(let posx=0;posx<canvas.width/2;){

        ctx.beginPath();
        ctx.strokeStyle="#fff";
        ctx.lineCap="butt";
        ctx.lineWidth=2;

        canvx=posx+canvas.width/2;
        ctx.moveTo(canvx,canvas.height/2);
       
        posx+=scale;
        canvx=posx+canvas.width/2;

        ctx.lineTo(canvx,canvas.height/2);
        ctx.moveTo(canvx,canvas.height/2);
        ctx.lineTo(canvx,canvas.height/2-10)
        ctx.stroke();
    }



    for(let posy=0;posy>-canvas.height/2;){

        ctx.beginPath();
        ctx.strokeStyle="#fff";
        ctx.lineCap="butt";
        ctx.lineWidth=2;

        canvy=posy+canvas.height/2;
        ctx.moveTo(canvas.width/2,canvy);
       
        posy-=scale;
        canvy=posy+canvas.height/2;

        ctx.lineTo(canvas.width/2,canvy);
        ctx.moveTo(canvas.width/2,canvy);
        ctx.lineTo(canvas.width/2-10,canvy)
        ctx.stroke();
    }
    for(let posx=0;posx>-canvas.width/2;){

        ctx.beginPath();
        ctx.strokeStyle="#fff";
        ctx.lineCap="butt";
        ctx.lineWidth=2;

        canvx=posx+canvas.width/2;
        ctx.moveTo(canvx,canvas.height/2);
       
        posx-=scale;
        canvx=posx+canvas.width/2;

        ctx.lineTo(canvx,canvas.height/2);
        ctx.moveTo(canvx,canvas.height/2);
        ctx.lineTo(canvx,canvas.height/2-10)
        ctx.stroke();
    }
}
function addFunc(){
    const div=document.createElement("div");
    document.getElementById("wrapper").appendChild(div);
    div.classList.add("func-box");
    const label=document.createElement("label")
    div.appendChild(label)
    label.innerText="f(x) = ";

    const inputEle=document.createElement("input");
    inputEle.setAttribute("type", "text");
    div.appendChild(inputEle);
    inputEle.classList.add("func");

    const pickerInput=document.createElement("input");
    pickerInput.setAttribute("type", "color");
    div.appendChild(pickerInput);
    pickerInput.classList.add("color-picker");

    j++;
    let inputWrapper=new InputWrap(j);
    inputWrapper.set();
}
function trig(fn){
    for(let i=0;i<funcInput.length;i++){
        if(funcInput[i].style.borderBottom==="2px solid green"){
            switch(fn){
                case 'sin':{
                    funcInput[i].value+="Math.sin(x)";
                    clicked[i]=false;
                    break;
                }
            
                case 'cos':{
                    funcInput[i].value+="Math.cos(x)";
                    clicked[i]=false;
                    break;
                }
            
                case 'tan':{
                    funcInput[i].value+="Math.tan(x)";
                    clicked[i]=false;
                    break; 
                }
                    
            }
        }
    }

}
window.addEventListener('keydown', function (e) {
    if (e.key === "w") {
        scale+=5;
        drawAxes()
        draw()
    }
    else if(e.key==="s"){
        scale-=5;
        drawAxes()
        draw()
    }

});