class HtmlMatrix {
   constructor(div) {
      this.count = 0;
      this.container = div;

      // this.table = document.createElement('table');
      // let tr = document.createElement('tr');
      // let td = document.createElement('td');
      // td.innerHTML = 'text in table';
      // tr.appendChild(td);
      // this.table.appendChild(tr);
      // console.log(this.table)
      // this.container.appendChild(this.table);

      this.martix = new TableArray(30, 30);
      this.container.appendChild(this.martix.element);

      // --- Styling ---
      this.container.style.backgroundColor = '#36454a';
      this.container.style.fontFamily = 'monospace';
      console.log(this);

      this.update = function () {
         // matrix.container.innerHTML += this.count + '00';
         for (let row = 0; row < this.martix.table.length; row++) {
            for (let col = 0; col < this.martix.table[row].length; col++) {
               this.martix.table[row][col].innerHTML = (this.count + col * row)%10;
            }
         }
         
         this.count++;
      };
   }
}

function TableArray(cols, rows) {
   this.cols = cols;
   this.rows = rows;

   this.element = document.createElement('table');
   this.table = [];

   for (let y = 0; y < rows; y++) {
      let tr = document.createElement('tr');
      this.table[y] = [];
      for (let x = 0; x < cols; x++) {
         let td = document.createElement('td');
         this.table[y][x] = td;
         td.innerHTML = '0 ';
         tr.appendChild(td);
      }
      this.element.appendChild(tr);
   }
}