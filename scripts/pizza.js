// Begin code shamelessly copied from w3schools

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/pizza.html";
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
  let shape = getCookie("egg_adj_toggle");
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

  var egg_adj = getCookie("egg_adj_toggle");
  if(egg_adj == "true")
  {
    e = document.getElementById("egg_adj_toggle");
    e.checked = true;
    document.getElementById("egg_adj_amt").value = getCookie("egg_adj_amt");
  }

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

  e = document.getElementById("egg_adj_toggle");
  if(e.checked == true)
  {
    setCookie("egg_adj_toggle", "true", 400);
  }
  else
  {
    setCookie("egg_adj_toggle", "false", 400);
  }
  setCookie("egg_adj_amt", document.getElementById("egg_adj_amt").value, 400);
}

function pizza_onLoad(){
  if(checkCookie())
  {
    loadParams();
  }
  pizza_changeShape();
  //document.getElementById("recipe").style.display = 'none';
}

function pizza_enableEggAdj()
{
  document.getElementById("egg_adj_amt").value =`${total_egg.toFixed(1)}`;
  pizza_changeShape();
}
function pizza_changeShape() {
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

    e = document.getElementById("egg_adj_toggle");
    if(e.checked == false)
    {
      document.getElementById("lbl_egg_adj_amt").style.display = 'none';
      document.getElementById("warn_egg_adj_amt").style.display = 'none';
      document.getElementById("egg_adj_amt").style.display = 'none';
    }
    else
    {
      document.getElementById("lbl_egg_adj_amt").style.display = '';
      document.getElementById("warn_egg_adj_amt").style.display = '';
      document.getElementById("egg_adj_amt").style.display = '';
    }

    mkPizza();
}

var total_egg;

function mkPizza(){
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

    var density = 0.4; // Density of dough in grams per sq cm (default 0.4)
    var doughball_weight = density * area;
    var count = parseFloat(document.getElementById("count").value); 
    var extra_dough = 1.05; // Add a little extra for dough lost to stickiness etc

    var total_dough_weight = doughball_weight * count * extra_dough;

    // Ingredient weighting follows (in bakers percent, nominally flour is always 100% / 1.00)
    var w_flour = 1.00;
    var w_water = 0.6;
    var w_salt = 0.02;
    var w_sugar = 0.01;

    e = document.getElementById("sugar_amount");
    var sugar_amount = e.options[e.selectedIndex].value;
    if(sugar_amount == "none")
    {
      w_sugar = 0.0;
      document.getElementById("sugar_th").style.display = 'none';
      document.getElementById("ing_sugar").style.display = 'none';

    }
    else if(sugar_amount == "extra")
    {
      w_sugar = 0.02;
      document.getElementById("sugar_th").style.display = '';
      document.getElementById("ing_sugar").style.display = '';
    }
    else if(sugar_amount == "normal")
    {
      w_sugar = 0.01;
      document.getElementById("sugar_th").style.display = '';
      document.getElementById("ing_sugar").style.display = '';
    }



    var w_yeast = 0.024; // Try 0.02 - 0.027
    var w_oil = 0.06;
    var w_egg = 0.14;

    var w_sum = w_flour + w_water + w_salt + w_sugar + w_yeast + w_oil + w_egg;

    var total_flour = w_flour * total_dough_weight / w_sum;
    var total_water = w_water * total_dough_weight / w_sum;
    var total_salt = w_salt * total_dough_weight / w_sum;
    var total_sugar = w_sugar * total_dough_weight / w_sum;
    var total_yeast = w_yeast * total_dough_weight / w_sum;
    var total_oil = w_oil * total_dough_weight / w_sum;
    total_egg = w_egg * total_dough_weight / w_sum;

    if(document.getElementById("egg_adj_toggle").checked == true)
    {
      var exact_egg =  parseFloat(document.getElementById("egg_adj_amt").value);

      var egg_diff = total_egg - exact_egg;
      var add_water = 0.76 * egg_diff;
      var add_oil = 0.105 * egg_diff;
      //var add_flour = 0.135 * egg_diff; // Maybe not quite correct to add flour in lieu of egg dry matter but it will keep dough weight from messing up

      total_water = total_water + add_water;
      total_oil = total_oil + add_oil;
      //total_flour = total_flour + add_flour;
      total_egg = exact_egg;

    }

    var sauce_light = 0.11644 * area;
    var sauce_medium = sauce_light * 1.3334;
    var sauce_heavy = sauce_light * 1.6667;

    var cheese_heavy = area * 0.44;
    var cheese_medium = cheese_heavy * 0.8;
    var cheese_light = cheese_heavy * 0.55;

    document.getElementById("doughball_weight").innerHTML = `${doughball_weight.toFixed(1)} g`;

    document.getElementById("num_doughballs").innerHTML = `${count.toFixed(0)}`;

    // <em data-tooltip="En rikelig mengde ost, uten at pizzaen blir for tung." data-placement="right">🛈</em>
    
    document.getElementById("ing_flour").innerHTML = `${total_flour.toFixed(1)} g`;
    document.getElementById("ing_water").innerHTML = `${total_water.toFixed(1)} g`;
    document.getElementById("ing_salt").innerHTML = `${total_salt.toFixed(1)} g`;
    document.getElementById("ing_sugar").innerHTML = `${total_sugar.toFixed(1)} g`;
    document.getElementById("ing_yeast").innerHTML = `${total_yeast.toFixed(1)} g`;
    document.getElementById("ing_oil").innerHTML = `${total_oil.toFixed(1)} g`;
    document.getElementById("ing_egg").innerHTML = `${total_egg.toFixed(1)} g <em data-placement="left" data-tooltip="ca ${(total_egg/0.87).toFixed(1)} g med skall" data-placement="right">(?)</em>`;

    document.getElementById("sauce_light").innerHTML = `${sauce_light.toFixed(0)} g`;
    document.getElementById("sauce_medium").innerHTML = `${sauce_medium.toFixed(0)} g`;
    document.getElementById("sauce_heavy").innerHTML = `${sauce_heavy.toFixed(0)} g`;
    document.getElementById("cheese_light").innerHTML = `${cheese_light.toFixed(0)} g (${(2.0*cheese_light/3.0).toFixed(0)} g mozzarella, ${(cheese_light/3.0).toFixed(0)} g annen ost)`;
    document.getElementById("cheese_medium").innerHTML = `${cheese_medium.toFixed(0)} g (${(2.0*cheese_medium/3.0).toFixed(0)} g mozzarella, ${(cheese_medium/3.0).toFixed(0)} g annen ost)`;
    document.getElementById("cheese_heavy").innerHTML = `${cheese_heavy.toFixed(0)} g (${(2.0*cheese_heavy/3.0).toFixed(0)} g mozzarella, ${(cheese_heavy/3.0).toFixed(0)} g annen ost)`;

    var hydration = (total_water + 0.76 * total_egg) / total_flour;
    var fat_percent = (total_oil + 0.105 * total_egg) / total_flour;
    var fluid_percent = hydration + fat_percent;

    document.getElementById("hydration").innerHTML = `${(100*hydration).toFixed(1)} %`;
    document.getElementById("fat_percent").innerHTML = `${(100*fat_percent).toFixed(1)} %`;
    document.getElementById("fluid_percent").innerHTML = `${(100*fluid_percent).toFixed(1)} %`;

    saveParams();
}

