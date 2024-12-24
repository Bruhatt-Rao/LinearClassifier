var pos1x=0, pos2x=0;
var pos1y=0, pos2=0;
var m = 0;
var b = 1;
var lr = 0.0001;
var points = [
    [230,456,2],
    [302,254,2],
    [306,50,1],
    [264,427,2],
    [119,107,1],
    [199,281,2],
    [434,219,1],
    [227,259,2],
    [119,181,1]
]
console.log(points);
function init() {
  b = randint(0,500);
  pos1x = 0;
  pos1y = f(0);
  pos2x = 500;
  pos2y = f(500);
}

function update() {
  pos1y = f(0);
  pos2y = f(500);
  stroke("#0d1b2a");
  line(pos1x, pos1y, pos2x, pos2y);
  for (var i = points.length - 1; i >= 0; i--) {
    if (points[i][2] == 1) {
      color("#778da9");
    } else {
      color("#1b263b");
    }
    ellipse(points[i][0], points[i][1], 5);

    var pred = side(points[i]);
    if (pred != points[i][2]) {
      var err = points[i][2] == 1 ? 1 : -1;
      m += lr * err * points[i][0];
      b += err;
    }
  }
  document.getElementById("p").innerText = "Error rate: " + error().toFixed(3) + "%";
  document.getElementById("p2").innerText = "y = "+m.toFixed(4)+"x + " + b;
}

function f(x) {
  var out = (m*x)+b;
  return out
}

function side(point) {
  if (f(point[0]) < point[1]) {
    return 2;
  } else {
    return 1;
  }
}

function error() {
  var w = 0;
  for (var i = points.length - 1; i >= 0; i--) {
    if (side(points[i]) != points[i][2]) {
      w += 1
    }
  }
  return (w/points.length)*100
}

function reset() {
  m = 0;
  b = randint(0,500);
}
loop();
