/* board.js -- The user interface part of the w2go board. */

$(document).ready(function() {
  var board = new Board();
  board.add_stone("A19", "black");
  board.add_stone("A1", "black");
  board.add_stone("T19", "black");
  board.add_stone("T1", "black");
  board.add_stone("J11", "white");
  board.add_stone("K11", "white");
  board.add_stone("L11", "white");
  board.add_stone("J10", "white");
  board.add_stone("K10", "white");
  board.add_stone("L10", "white");
  board.add_stone("J9", "white");
  board.add_stone("K9", "white");
  board.add_stone("L9", "white");
  board.remove_stone("K10");
});

function Board() {
  // Set up the board and context.
  this.canvas = document.getElementById("board");
  this.context = this.canvas.getContext("2d");

  // This is a static variable because it is used outside the Board context.
  Board.letters = "ABCDEFGHJKLMNOPQRST".split("");

  // Draw the board and save its empty state for clearing stones from it.
  this.draw();
  this.clean = this.context.getImageData(0, 0, 600, 600);

  this.canvas.onmousedown = function(event) {
    // Capture only left clicks.
    if (event.which != 1) return;

    // Get the real coordinates from mouse position and validate them.
    var x = Math.round((event.pageX - this.offsetLeft - 30.5) / 30);
    var y = 19 - Math.round((event.pageY - this.offsetTop - 30.5) / 30);
    if (x < 0 || x > 18 || y < 1 || y > 19) return;

    // The event needs to be sent to the backend server through some API.
    var coords = Board.letters[x] + y;
    alert(coords);
  }
}

Board.prototype.draw = function() {
  var context = this.context;

  //  Set up the background.
  context.fillStyle = "#D7A620";
  context.fillRect(0, 0, 600, 600);
  
  // Draw the outline and grid.
  context.strokeRect(29.5, 29.5, 540, 540);
  for (var y = 30.5; y < 580.5; y += 30) {
    context.moveTo(30, y);
    context.lineTo(570, y);
    context.moveTo(y, 30);
    context.lineTo(y, 570);
  }
  context.strokeStyle = "#000";
  context.stroke();

  // Draw hoshi.
  context.fillStyle = "#000";
  for (var x = 0; x < 3; x += 1) {
    for (var y = 0; y < 3; y += 1) {
      context.beginPath();
      context.arc(120.5 + x * 180, 120.5 + y * 180, 3, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
    }
  }

  // Draw coordinates along the edges.
  context.textAlign = "center";
  context.textBaseline = "middle";
  for (var y = 0; y < 19; y += 1) {
    context.fillText(19 - y, 8, 30.5 + y * 30);
    context.fillText(19 - y, 592, 30.5 + y * 30);
    context.fillText(Board.letters[y], 30.5 + y * 30, 8);
    context.fillText(Board.letters[y], 30.5 + y * 30, 592);
  }
}

Board.prototype.add_stone = function(coords, color) {
  var context = this.context;

  // Convert the coords argument.
  var x = Board.letters.indexOf(coords.charAt(0).toUpperCase());
  var y = 19 - coords.substring(1);

  // Fill the content with the color.
  context.fillStyle = color;
  context.beginPath();
  context.arc(30.5 + x * 30, 30.5 + y * 30, 13.7, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
  
  // Draw the outline.
  context.beginPath();
  context.arc(30.5 + x * 30, 30.5 + y * 30, 13.7, 0, Math.PI * 2, true);
  context.closePath();
  context.lineWidth = 2;
  context.stroke();
}

Board.prototype.remove_stone = function(coords) {
  // Convert the coords argument.
  var x = Board.letters.indexOf(coords.charAt(0).toUpperCase());
  var y = 19 - coords.substring(1);

  // The stone is removed by restoring empty board state over its area.
  this.context.putImageData(this.clean, 0, 0, 15 + 30 * x, 15 + 30 * y, 31, 31);
}
