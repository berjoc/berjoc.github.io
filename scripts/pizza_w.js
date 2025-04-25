function pizza_onLoad(){
  pizza_changeShape();
  //document.getElementById("recipe").style.display = 'none';
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
    mkPizza();
}

function mkPizza(){
  var e = document.getElementById("shape");
  var shape = e.options[e.selectedIndex].value;
  e = document.getElementById("edge");
  edge = e.options[e.selectedIndex].value;
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
    var w_water = 0.62;
    var w_salt = 0.02;
    var w_sugar = 0.01;

    e = document.getElementById("sugar_amount");
    var sugar_amount = e.options[e.selectedIndex].value;
    if(sugar_amount == "none")
    {
      w_sugar = 0.0;
    }
    else if(sugar_amount == "extra")
    {
      w_sugar = 0.02;
    }
    else if(sugar_amount == "normal")
    {
      w_sugar = 0.01;
    }



    var w_yeast = 0.023; // Try 0.02 - 0.027
    var w_oil = 0.065;
    var w_egg = 0.14;

    var w_sum = w_flour + w_water + w_salt + w_sugar + w_yeast + w_oil + w_egg;

    var total_flour = w_flour * total_dough_weight / w_sum;
    var total_water = w_water * total_dough_weight / w_sum;
    var total_salt = w_salt * total_dough_weight / w_sum;
    var total_sugar = w_sugar * total_dough_weight / w_sum;
    var total_yeast = w_yeast * total_dough_weight / w_sum;
    var total_oil = w_oil * total_dough_weight / w_sum;
    var total_egg = w_egg * total_dough_weight / w_sum;

    var sauce_light = 0.11644 * area;
    var sauce_medium = sauce_light * 1.3334;
    var sauce_heavy = sauce_light * 1.6667;

    var cheese_heavy = area * 0.44;
    var cheese_medium = cheese_heavy * 0.8;
    var cheese_light = cheese_heavy * 0.55;

    document.getElementById("doughball_weight").innerHTML = `${doughball_weight.toFixed(1)} g`;
    if(count.toFixed(0) == 1)
    {
      document.getElementById("num_doughballs").innerHTML = `Ingredienser for ${count.toFixed(0)} deigball`;
    }
    else{
      document.getElementById("num_doughballs").innerHTML = `Ingredienser for ${count.toFixed(0)} deigballer`;
    }
    
    document.getElementById("ing_flour").innerHTML = `${total_flour.toFixed(1)} g`;
    document.getElementById("ing_water").innerHTML = `${total_water.toFixed(1)} g`;
    document.getElementById("ing_salt").innerHTML = `${total_salt.toFixed(1)} g`;
    document.getElementById("ing_sugar").innerHTML = `${total_sugar.toFixed(1)} g`;
    document.getElementById("ing_yeast").innerHTML = `${total_yeast.toFixed(1)} g`;
    document.getElementById("ing_oil").innerHTML = `${total_oil.toFixed(1)} g`;
    document.getElementById("ing_egg").innerHTML = `${total_egg.toFixed(1)} g`;
    document.getElementById("ing_egg_shellapprox").innerHTML = `${(total_egg/0.9).toFixed(1)} g`;

    document.getElementById("sauce_light").innerHTML = `${sauce_light.toFixed(0)} g`;
    document.getElementById("sauce_medium").innerHTML = `${sauce_medium.toFixed(0)} g`;
    document.getElementById("sauce_heavy").innerHTML = `${sauce_heavy.toFixed(0)} g`;
    document.getElementById("cheese_light").innerHTML = `${cheese_light.toFixed(0)} g (${(2.0*cheese_light/3.0).toFixed(0)} g mozzarella, ${(cheese_light/3.0).toFixed(0)} g annen ost)`;
    document.getElementById("cheese_medium").innerHTML = `${cheese_medium.toFixed(0)} g (${(2.0*cheese_medium/3.0).toFixed(0)} g mozzarella, ${(cheese_medium/3.0).toFixed(0)} g annen ost)`;
    document.getElementById("cheese_heavy").innerHTML = `${cheese_heavy.toFixed(0)} g (${(2.0*cheese_heavy/3.0).toFixed(0)} g mozzarella, ${(cheese_heavy/3.0).toFixed(0)} g annen ost)`;

    document.getElementById("recipe").style.display = '';
}

