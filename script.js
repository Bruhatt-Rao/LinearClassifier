var pos1x=0, pos2x=0;
var pos1y=0, pos2=0;
var m = 0;
var b = 1;
var lr = 0.0001;
var points = gen();

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

function f2(x, m2, b2) {
  var out = (m2*x)+b2;
  return out
}

function side(point) {
  if (f(point[0]) < point[1]) {
    return 2;
  } else {
    return 1;
  }
}

function side_def(point, m2, b2) {
  if (f2(point[0], m2, b2) < point[1]) {
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
  points = gen();
}

function gen() {
  m2 = rand();
  b2 = randint(100,300);
  points2 = [];
  var amount = document.getElementById("amount").value;
  for (var i = amount; i >= 0; i--) {
    var p = [randint(0,500), randint(0,500)];
    p.push(side_def(p, m2, b2));
    points2.push(p);
    console.log(p);
  }
  return points2;
}

loop();
