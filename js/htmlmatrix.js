/*

   +--- Matrix -------------------------------------------------+
   |                                                            |
   |   Matrix engine --> (symblols n colors) --> Text renderer  |
   |                                                            |
   |                                                            |
   +------------------------------------------------------------+

> Matrix:
   > Matrix engine:
      - array of streams:
         - x, y
         - speed
         - length
   > Text renderer:

*/


class MStream {

   constructor(string, x, y) {
      this.speed = Math.random()*0.25 + 0.25;
      this.len = Math.floor(10 + Math.random() * 20);
      this.col = x;
      this.row = y - this.len;
      this.string = string;
   }

   move() {
      this.row += this.speed;
   }

   getActiveChars() {
      let chars = [];
      for (let i = Math.floor(this.row); i < this.row + this.len; i++) {
         let color;
         if (i === Math.floor(this.row + this.len))
            color = 'hsl(60, 100%, 100%)';
         else
            color = 'hsla(200, 70%, 40%, ' + (i - Math.floor(this.row))*25 + '%)';
         chars.push({ char: this.string[i], color });
      }
      return chars;
   }
}



class HtmlMatrixRenderer {
   constructor(div) {
      this.count = 0;
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = div.clientWidth;
      this.canvas.height = div.clientHeight;
      div.appendChild(this.canvas);

      this.fontW = 12;
      this.fontH = 12;
      this.cols = this.canvas.width / this.fontW;
      this.rows = this.canvas.height / this.fontH;
      this.ctx.font = '12px monospace';

      this.streams = [];
      this.maxStreams = 300;
      for (let i = 0; i < this.maxStreams; i++) {
         this.streams.push(new MStream(randomString(this.rows), Math.floor(Math.random() * this.cols), -Math.floor(Math.random() * this.rows)));
      }
   }

   update() {
      this.ctx.fillStyle = 'rgba(37, 47, 50, 100%)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = 0; i < this.streams.length; i++) {
         const stream = this.streams[i];
         if (stream.row > this.rows) {
            this.streams.splice(i, 1);
            i--;
         } else {
            stream.move();
            let current = stream.getActiveChars();
            for (let i = 0; i < current.length; i++) {
               this.drawChar(current[i], stream.col, Math.floor(stream.row) + i);
            }
         }
      }

      if (this.streams.length < this.maxStreams) {
         this.streams.push(new MStream(randomString(this.rows), Math.floor(Math.random() * this.cols), 0));
      }

      // this.update();
   }

   drawChar({ char, color }, col, row) {
      if (row > this.rows) return
      this.ctx.fillStyle = color;
      this.ctx.fillText(char, col * this.fontW, row * this.fontH);
   }
}



const minSymbolCode = 0x30A0;
const maxSymbolCode = 0x30;
const symbolBlockLen = maxSymbolCode - minSymbolCode;

function drawRandomSymbol(ctx, x, y) {
   const char = String.fromCharCode(minSymbolCode + Math.floor(Math.random() * 96));
   ctx.fillText(char, x, y);
}

function randomSymbol() {
   return String.fromCharCode(minSymbolCode + Math.floor(Math.random() * 96));
}

function randomString(length) {
   let str = '';
   for (let i = 0; i < length; i++) {
      str += randomSymbol();
   }
   return str;
}