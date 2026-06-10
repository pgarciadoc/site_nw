const svg = document.getElementById("network");

const nodesGroup = document.getElementById("nodes");
const linesGroup = document.getElementById("connections");

const nodes = [];

for (let i = 0; i < 70; i++) {
    nodes.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2
    });
}

function drawNodes(){

    nodesGroup.innerHTML="";

    nodes.forEach(n=>{

        const c=document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
        );

        c.setAttribute("cx",n.x);

        c.setAttribute("cy",n.y);

        c.setAttribute("r",3);

        c.setAttribute("fill","#f78b00");

        nodesGroup.appendChild(c);

    });

}

function drawLines(){

    linesGroup.innerHTML="";

    for(let i=0;i<nodes.length;i++){

        for(let j=i+1;j<nodes.length;j++){

            const dx=nodes[i].x-nodes[j].x;
            const dy=nodes[i].y-nodes[j].y;

            const dist=Math.sqrt(dx*dx+dy*dy);

            if(dist<220){

                const line=document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
                );

                line.setAttribute("x1",nodes[i].x);

                line.setAttribute("y1",nodes[i].y);

                line.setAttribute("x2",nodes[j].x);

                line.setAttribute("y2",nodes[j].y);

                const opacity = 1 - dist / 220;

                line.setAttribute(
                    "stroke",
                    `rgba(247,139,0,${opacity * 0.4})`
                );

                line.setAttribute(
                    "stroke-width",
                    "1"
                );

                linesGroup.appendChild(line);

            }

        }

    }

}

function update(){

    nodes.forEach(n=>{

        n.x+=n.vx;

        n.y+=n.vy;

        if(n.x<0||n.x>800){

            n.vx*=-1;

        }

        if(n.y<0||n.y>600){

            n.vy*=-1;

        }

    });

}

function animate(){

    update();

    drawLines();

    drawNodes();

    requestAnimationFrame(animate);

}

animate();


const texts = [
    "> Inicializando conexão...",
    "> Inteligência Artificial ........ OK",
    "> Banco de Dados .............. OK",
    "> Comunicação segura iniciada.",
    "> Pronto para transformar sua ideia"
];

const container = document.querySelector(".terminal-body");
const button = document.querySelector(".terminal-button");

async function sleep(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

async function typeLine(text){

    const p = document.createElement("p");

    p.className = "line";

    container.appendChild(p);

    const cursor = document.createElement("span");

    cursor.className = "cursor";

    p.appendChild(cursor);

    for(let i=0;i<text.length;i++){

        cursor.before(text[i]);

        await sleep(35);

    }

    cursor.remove();

}

let typing = false;
let canRestart = true;

const observer = new IntersectionObserver((entries) => {

    const entry = entries[0];

    if (entry.isIntersecting && canRestart) {

        canRestart = false;
        startTerminal();

    }

    if (!entry.isIntersecting) {

        canRestart = true;

    }

}, {
    threshold: 0.4
});

observer.observe(document.querySelector("#contato"));

async function startTerminal() {

    if (typing) return;

    typing = true;

    container.innerHTML = "";

    if (button)
        button.classList.remove("show");

    for (const text of texts) {

        await typeLine(text);
        await sleep(250);

    }

    if (button)
        button.classList.add("show");

    typing = false;
}