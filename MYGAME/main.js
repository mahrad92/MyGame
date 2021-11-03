import { tunnels } from "./dataOfCells.js";
class GAME {}
class player {
  constructor(col, row, ctx, imgStr) {
    this.ctx = ctx;
    this.col = col;
    this.row = row;
    this.direction = "R";
    this.status = "notInPlay";
    //status:notInPlay/waiting/playing
  }
  draw() {
    this.ctx.drawImage(this.img, this.col, this.row, 30, 30);
  }
  canMove(chance) {
    console.log("row", this.row, "col:", this.col, chance);
    if (this.row < 50 && this.col - 50 * chance < 0) {
      return false;
    } else return true;
  }

  moveBack() {
    this.ctx.clearRect(this.col - 5, this.row - 5, 45, 45);
    if (this.direction == "L") {
      if (this.col + 50 < 500) this.col = this.col + 50;
      else if (this.row + 50 > 0) {
        this.row = this.row + 50;
        this.direction = "R";
      }
    } else {
      if (this.col - 50 > 0) this.col = this.col - 50;
      else if (this.row + 50 > 0) {
        this.row = this.row + 50;
        this.direction = "L";
      }
    }
    this.draw();
  }

  move() {
    this.ctx.clearRect(this.col - 5, this.row - 5, 45, 45);
    if (this.direction == "R") {
      if (this.col + 50 < 500) this.col = this.col + 50;
      else if (this.row - 50 > 0) {
        this.row = this.row - 50;
        this.direction = "L";
      }
    } else {
      if (this.col - 50 > 0) this.col = this.col - 50;
      else if (this.row - 50 > 0) {
        this.row = this.row - 50;
        this.direction = "R";
      }
    }
    this.draw();
  }
  checkWin() {
    if (this.col < 50 && this.row < 50) {
      return true;
    }
  }
  moveTunel() {
    let x = Math.ceil(this.col / 50);
    let y = 11 - Math.ceil(this.row / 50);
    const steps = tunnels[y + "," + x] || 0;
    for (let i = 1; i <= Math.abs(steps); i++) {
      if (steps > 0) {
        this.move();
      } else {
        this.moveBack();
      }
    }
  }
  choose(p) {
    document.getElementById(p + "c").setAttribute("style", "display: none;");
    document.getElementById(p).setAttribute("style", "display: compact;");
    this.status = "waiting";
  }
  start(imgPlayer,p) {
    document.getElementById(p).setAttribute("style", "display: none;");
    var img = new Image();
    img.style.display = "none";
    img.src = imgPlayer;
    this.img = img;
    document.body.appendChild(img);
    img.onload = () => {
      this.img = img;
      this.draw();
      this.status = "playing";
    };
  }
}

var drawGrid = function (w, h, ctx) {
  var ctx;
  var img = document.getElementById("snakeundladder");
  ctx.canvas.width = w;
  ctx.canvas.height = h;
  ctx.drawImage(img, 0, 0, w, h);
  for (let x = 0; x <= w; x += 50) {
    for (let y = 0; y <= h; y += 50) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }
};
class dice {
  constructor() {
    this.ctx = document.getElementById("diceCanvas").getContext("2d");
    var img = new Image();
    img.style.display = "none";
    img.src = "dice.png";
    this.img = img;
    document.body.appendChild(img);
    img.onload = () => {
      this.img = img;
      this.drawDice();
    };
  }
  setDice() {
    this.chance = Math.floor(Math.random() * 6 + 1);
    return this.chance;
  }
  drawDice() {
    this.ctx.drawImage(this.img, 0, 0, 40, 40);
  }
}
// run codes when document loaded
window.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("myCanvas").getContext("2d");
  drawGrid(500, 500, ctx);
  const dice1 = new dice();
  let MoveSteps = 0;
  let playerB = new player(8, 459, ctx, "playerx.png");
  let playerR = new player(8, 459, ctx, "playerx.png");
  document.getElementById("playerBc").addEventListener("click", () => {
    playerB = new player(8, 459, ctx, "playerBlue.png");
    playerB.choose("playerB");
  });
    document.getElementById("btn").addEventListener("click", () => {
      MoveSteps = dice1.setDice();
      if (playerB.status == "playing") {
        document.getElementById("lbld").innerHTML = MoveSteps;
        if (playerB.canMove(MoveSteps)) {
          for (let i = 1; i <= MoveSteps; i++) {
            playerB.move();
          }
        }
        playerB.moveTunel();
        drawGrid(500, 500, ctx);
        playerB.draw();
        if (playerB.checkWin()) {
          alert("playerB**DU HAST GEWONNEN**");
        }
      } else if (MoveSteps != 6 && playerB.status == "waiting") {
        document.getElementById("lbld").innerHTML = "GEDULD SEIN , You have " + MoveSteps ;
      } else if (MoveSteps == 6 && playerB.status == "waiting") {
        document.getElementById("lbld").innerHTML = "Congarajulation !!!, You have !!start " + MoveSteps ;
        playerB.start("playerBlue.png","playerB");
      }
    });
    
  
  document.getElementById("playerYc").addEventListener("click", () => {
    //start("playerY")
  });
  document.getElementById("playerGc").addEventListener("click", () => {
    // start("playerG")
  });
});
