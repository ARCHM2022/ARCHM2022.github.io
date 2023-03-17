function calculate() {
    var dirAngle = parseFloat(document.getElementById("dir-angle").value);
    var horPos = parseFloat(document.getElementById("hor-pos").value);
    var x = Math.cos(degreesToRadians(dirAngle)) * horPos;
    var y = Math.sin(degreesToRadians(dirAngle)) * horPos;
    document.getElementById("result").innerHTML = "X = " + x + "<br>Y = " + y;
  }
  
  function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  