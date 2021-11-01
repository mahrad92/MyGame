class player {
  constructor(col, row, ctx, imgStr) {
    var img = new Image();
    img.style.display = "none";
    img.src = imgStr;
    this.img = img;
    document.body.appendChild(img);
    img.onload = () => {
      this.img = img;
      this.draw();
    };
    this.ctx = ctx;
    this.col = col;
    this.row = row;
    this.direction = "R";
  }
  draw() {
    this.ctx.drawImage(this.img, this.col, this.row, 30, 30);
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
  
}

var drawGrid = function (w, h, ctx) {
  var ctx;
  ctx.canvas.width = w;
  ctx.canvas.height = h;
  for (x = 0; x <= w; x += 50) {
    for (y = 0; y <= h; y += 50) {
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
    //console.log(this.chance);
    //console.log("************");
  }
  drawDice() {
    this.ctx.drawImage(this.img, 0, 0, 40, 40);
  }
}
// run codes when document loaded
window.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("myCanvas").getContext("2d");
  drawGrid(500, 500, ctx);
  let player1 = new player(8, 459, ctx, "playerBlue.png");
  document.getElementById("btn").addEventListener("click", () => {
    const dice1 = new dice();
    timeMove=dice1.setDice()
    document.getElementById("lbld").innerHTML = timeMove;
    for(let i= 1;i<=timeMove;i++)
    {
        player1.move();
    }
  });
  
 


});