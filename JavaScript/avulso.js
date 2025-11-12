class Obj {
  frame = 1;
  timer = 0;

  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  desenha() {
    var img = new Image();
    img.src = this.color;
    pincel.drawImage(img, this.x, this.y, this.width, this.height);
  }

  animation(name) {
    this.timer += 2;
    if (this.timer > 10) {
      this.timer = 0;
      this.frame += 1;
    }
    if (this.frame > 4) {
      this.frame = 1;
    }
    this.color = "img/" + name + this.frame + ".png";
  }
}
class Abelha extends Obj {
  dir = 0;
  lifes = 3;

  move() {
    this.x += this.dir;
  }

  collide(obj) {
    if (
      this.x < obj.x + obj.width &&
      this.x + this.width > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + this.height > obj.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}

class Aranha extends Obj {
  move() {
    this.y += 2;
    if (this.y > 900) {
      this.y = -50;
      this.x = Math.random() * (400 - 0);
    }
  }
  resetPosicao() {
    this.y = -100;
    this.x = Math.random() * 800;
  }

  mudaPosicao() {
    this.resetPosicao();
  }
}

class Bg extends Obj {
  move(speed, limit, pos) {
    this.y += speed;
    if (this.y > limit) {
      this.y = pos;
    }
  }
}

class Flor extends Aranha {
  mudaPosicao() {
    this.y = -50;
    this.x = Math.random() * 800;
  }
}

class Text {
  draw(
    texto,
    x,
    y,
    color = "#fff9c4",
    font = "bold 26px 'Poppins'",
    shadow = true
  ) {
    pincel.font = font;
    pincel.fillStyle = color;

    if (shadow) {
      pincel.shadowColor = "rgba(0,0,0,0.7)";
      pincel.shadowBlur = 6;
      pincel.shadowOffsetX = 2;
      pincel.shadowOffsetY = 2;
    } else {
      pincel.shadowColor = "transparent";
    }

    pincel.lineWidth = 2;
    pincel.strokeStyle = "rgba(255, 200, 0, 0.6)";
    pincel.strokeText(texto, x, y);

    pincel.fillText(texto, x, y);
    pincel.shadowColor = "transparent";
  }

  centerText(
    texto,
    y,
    color = "#fff9c4",
    font = "bold 70px 'Poppins'",
    shadow = true
  ) {
    pincel.font = font;
    pincel.fillStyle = color;

    if (shadow) {
      pincel.shadowColor = "rgba(0,0,0,0.8)";
      pincel.shadowBlur = 12;
    } else {
      pincel.shadowColor = "transparent";
    }

    const textWidth = pincel.measureText(texto).width;
    const centerX = (900 - textWidth) / 2;
    pincel.lineWidth = 3;
    pincel.strokeStyle = "rgba(255, 220, 0, 0.7)";
    pincel.strokeText(texto, centerX, y);
    pincel.fillText(texto, centerX, y);
    pincel.shadowColor = "transparent";
  }
}

class Sons {
  constructor() {
    this.somFlor = new Audio("sons/flower.wav");
    this.somAranha = new Audio("sons/spider.wav");
    this.somGameOver = new Audio("sons/gameover.wav");
  }

  tocarFlor() {
    this.somFlor.currentTime = 0;
    this.somFlor.play();
  }

  tocarAranha() {
    this.somAranha.currentTime = 0;
    this.somAranha.play();
  }

  tocarGameOver() {
    this.somGameOver.currentTime = 0;
    this.somGameOver.play();
  }
}
