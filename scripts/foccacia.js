// Begin code shamelessly copied from w3schools

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/foccacia.html";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let shape = getCookie("idx_shape");
  if (shape != "") {
    return true;
  } 
  else {
    return false;
  }
}

// End shamelessly copied code
function loadParams(){

  var e = document.getElementById("shape");
  var shape = getCookie("idx_shape");
  e.selectedIndex = shape;

  e = document.getElementById("edge");
  var edge = getCookie("idx_edge");
  e.selectedIndex = edge;


    document.getElementById("diameter").value = getCookie("diameter");
    document.getElementById("length").value = getCookie("length");
    document.getElementById("width").value = getCookie("width");
    document.getElementById("count").value = getCookie("count");
}

function saveParams()
{
  var e = document.getElementById("shape");
  setCookie("idx_shape", e.selectedIndex, 400);


  e = document.getElementById("edge");
  setCookie("idx_edge", e.selectedIndex, 400);

  setCookie("diameter", document.getElementById("diameter").value, 400);
  setCookie("length", document.getElementById("length").value, 400);
  setCookie("width", document.getElementById("width").value, 400);
  setCookie("count", document.getElementById("count").value, 400);
}

function foccacia_onLoad(){
  if(checkCookie())
  {
    loadParams();
  }
  foccacia_changeShape();
  //document.getElementById("recipe").style.display = 'none';
}

function foccacia_changeShape() {
    var e = document.getElementById("shape");
    var value = e.options[e.selectedIndex].value;
    if(value == "round")
    {
        document.getElementById("lbl_diameter").style.display = '';
        document.getElementById("diameter").style.display = '';
        document.getElementById("lbl_length").style.display = 'none';
        document.getElementById("length").style.display = 'none';
        document.getElementById("lbl_width").style.display = 'none';
        document.getElementById("width").style.display = 'none';
    }
    if(value == "rect")
    {
      document.getElementById("lbl_diameter").style.display = 'none';
      document.getElementById("diameter").style.display = 'none';
      document.getElementById("lbl_length").style.display = '';
      document.getElementById("length").style.display = '';
      document.getElementById("lbl_width").style.display = '';
      document.getElementById("width").style.display = '';
    
    }
    // warn_slant
    e = document.getElementById("edge");
    var edge = e.options[e.selectedIndex].value;
    if(edge == "slanted")
    {
      document.getElementById("warn_slant").style.display = '';
    }
    else
    {
      document.getElementById("warn_slant").style.display = 'none';
    }

    mkfoccacia();
}

function mkfoccacia(){
  var e = document.getElementById("shape");
  var shape = e.options[e.selectedIndex].value;
  e = document.getElementById("edge");
  var edge = e.options[e.selectedIndex].value;
  var area;

  if(shape == "round")
    {
      var diameter = parseFloat(document.getElementById("diameter").value);
      if(edge == "slanted")
      {
        diameter = diameter + 2.0;
      }
      var radius = diameter / 2.0;
      area = radius * radius * 3.14159;
    }
    if(shape == "rect")
    {
      var length = parseFloat(document.getElementById("length").value);
      var width = parseFloat(document.getElementById("width").value);
      if(edge == "slanted")
        {
          length = length + 2.0;
          width = width + 2.0;
        }
      area = length * width;      
    }

    var density = 0.8; // Density of dough in grams per sq cm (default 0.8)
    var doughball_weight = density * area;
    var count = parseFloat(document.getElementById("count").value); 
    var extra_dough = 1.03; // Add a little extra for dough lost to stickiness etc. This is a very wet dough

    var total_dough_weight = doughball_weight * count * extra_dough;

    // Ingredient weighting follows (in bakers percent, nominally flour is always 100% / 1.00)
    var w_vwg = 0.05;
    var w_flour = 0.807;
    var w_sd_disc = 0.286;

    var w_water = 0.65;
    var w_salt = 0.02;

    // There used to be code for sugar amount etc. here



    var w_yeast = 0.025; // Try 0.02 - 0.027
    var w_oil = 0.04;

    var w_sum = w_vwg + w_sd_disc + w_flour + w_water + w_salt + w_yeast + w_oil;

    var total_vwg = w_vwg * total_dough_weight / w_sum;
    var total_flour = w_flour * total_dough_weight / w_sum;
    var total_sd_disc = w_sd_disc * total_dough_weight / w_sum;
    var total_water = w_water * total_dough_weight / w_sum;
    var total_salt = w_salt * total_dough_weight / w_sum;
    var total_yeast = w_yeast * total_dough_weight / w_sum;
    var total_oil = w_oil * total_dough_weight / w_sum;

    document.getElementById("doughball_weight").innerHTML = `${doughball_weight.toFixed(1)} g`;
    document.getElementById("num_doughballs").innerHTML = `${count.toFixed(0)}`;

    document.getElementById("ing_vwg").innerHTML = `${total_vwg.toFixed(1)} g`;
    document.getElementById("ing_flour").innerHTML = `${total_flour.toFixed(1)} g`;
    document.getElementById("ing_sd_disc").innerHTML = `${total_sd_disc.toFixed(1)} g`;
    document.getElementById("ing_water").innerHTML = `${total_water.toFixed(1)} g`;
    document.getElementById("ing_salt").innerHTML = `${total_salt.toFixed(1)} g`;
    document.getElementById("ing_yeast").innerHTML = `${total_yeast.toFixed(1)} g`;
    document.getElementById("ing_oil").innerHTML = `${total_oil.toFixed(1)} g`;

    saveParams();
}

