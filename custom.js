const names=["X","CHAOS","BEAR","NO FEAR","WINGS","BORN TO BE REAL","VIXCLO","XX","ROSE","MOUNTAIN","BELIEVE","EAGLE","X","MAKE IT HAPPEN"];

let frontIndex = 6;
let backIndex = 8;
let sameDesign = false;
let frontScale = 100;

function makeDesignGrid(targetId, selectedIndex, side) {
  const grid = document.getElementById(targetId);
  grid.innerHTML = names.map((n,i)=>{
    const x=String(i+1).padStart(2,"0");
    return `<button class="design ${i===selectedIndex?"active":""}" data-index="${i}" data-side="${side}">
      <img src="assets/designs/design-${x}.svg"><small>${x} • ${n}</small>
    </button>`;
  }).join("");
}

function setPrint(side, index) {
  const x=String(index+1).padStart(2,"0");
  const src=`assets/designs/design-${x}.svg`;
  if(side==="front") {
    frontIndex=index;
    document.getElementById("frontPrint").src=src;
  } else {
    backIndex=index;
    document.getElementById("backPrint").src=src;
  }
}

function applyFrontScale() {
  const el=document.getElementById("frontPrint");
  el.style.width = `${19 * frontScale / 100}%`;
  el.style.left = `${17 + (19 - 19 * frontScale / 100) / 2}%`;
  el.style.top = `${32 + (19 - 19 * frontScale / 100) / 2}%`;
  document.getElementById("frontSizeValue").textContent = `${frontScale}%`;
}

function refreshGrids() {
  makeDesignGrid("frontDesigns", frontIndex, "front");
  makeDesignGrid("backDesigns", backIndex, "back");

  document.querySelectorAll(".design").forEach(btn=>{
    btn.onclick=()=>{
      const side=btn.dataset.side;
      const index=Number(btn.dataset.index);

      if(side==="front") {
        setPrint("front", index);
        if(sameDesign) {
          setPrint("back", index);
          backIndex=index;
        }
      } else {
        setPrint("back", index);
        if(sameDesign) {
          setPrint("front", index);
          frontIndex=index;
        }
      }
      refreshGrids();
      applyFrontScale();
    };
  });
}

refreshGrids();
applyFrontScale();

document.getElementById("sameDesign").onchange = e => {
  sameDesign=e.target.checked;
  if(sameDesign) {
    backIndex=frontIndex;
    setPrint("back", frontIndex);
  }
  refreshGrids();
  applyFrontScale();
};

document.getElementById("frontSize").oninput = e => {
  frontScale=Number(e.target.value);
  applyFrontScale();
};

document.querySelectorAll(".c").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".c").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");
  document.getElementById("mockup").src="assets/mockups/"+b.dataset.img;
});

document.querySelectorAll(".sizes button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".sizes button").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");
});

document.querySelector(".cart").onclick=()=>{
  alert(`Demo order
Front: Design ${String(frontIndex+1).padStart(2,"0")} — ${names[frontIndex]} — Size ${frontScale}%
Back: Design ${String(backIndex+1).padStart(2,"0")} — ${names[backIndex]} — Fixed standard size`);
};
document.querySelector(".buy").onclick=()=>{
  alert(`Demo Buy Now
Front: ${names[frontIndex]} — ${frontScale}%
Back: ${names[backIndex]} — Fixed standard size`);
};
document.querySelector(".wa").onclick=()=>{
  alert(`Demo WhatsApp Order
Front: Design ${String(frontIndex+1).padStart(2,"0")} — ${frontScale}%
Back: Design ${String(backIndex+1).padStart(2,"0")} — Fixed standard size
Replace 01700-000000 with your real number.`);
};
