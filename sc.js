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
    var w_water = 0.68;
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



    var w_yeast = 0.02;
    var w_oil = 0.06; // A little bit more oil will be added during the baking process too, that is okay, we want about 6.5% or so of oil total, so we do 6% in the dough
    var w_eggyolk = 0.05;

    var w_sum = w_flour + w_water + w_salt + w_sugar + w_yeast + w_oil + w_eggyolk;

    var total_flour = w_flour * total_dough_weight / w_sum;
    var total_water = w_water * total_dough_weight / w_sum;
    var total_salt = w_salt * total_dough_weight / w_sum;
    var total_sugar = w_sugar * total_dough_weight / w_sum;
    var total_yeast = w_yeast * total_dough_weight / w_sum;
    var total_oil = w_oil * total_dough_weight / w_sum;
    var total_eggyolk = w_eggyolk * total_dough_weight / w_sum;

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
    document.getElementById("ing_eggyolk").innerHTML = `${total_eggyolk.toFixed(1)} g`;

    document.getElementById("sauce_light").innerHTML = `${sauce_light.toFixed(0)} g`;
    document.getElementById("sauce_medium").innerHTML = `${sauce_medium.toFixed(0)} g`;
    document.getElementById("sauce_heavy").innerHTML = `${sauce_heavy.toFixed(0)} g`;
    document.getElementById("cheese_light").innerHTML = `${cheese_light.toFixed(0)} g (${(2.0*cheese_light/3.0).toFixed(0)} g mozzarella, ${(cheese_light/3.0).toFixed(0)} g annen ost)`;
    document.getElementById("cheese_medium").innerHTML = `${cheese_medium.toFixed(0)} g (${(2.0*cheese_medium/3.0).toFixed(0)} g mozzarella, ${(cheese_medium/3.0).toFixed(0)} g annen ost)`;
    document.getElementById("cheese_heavy").innerHTML = `${cheese_heavy.toFixed(0)} g (${(2.0*cheese_heavy/3.0).toFixed(0)} g mozzarella, ${(cheese_heavy/3.0).toFixed(0)} g annen ost)`;

    document.getElementById("recipe").style.display = '';
}

function subw_changeSize(){
  var e = document.getElementById("size");
  var value = e.options[e.selectedIndex].value;
  if(value != "custom")
  {
      document.getElementById("lbl_custom_size").style.display = 'none';
      document.getElementById("custom_size").style.display = 'none';
  }
  else
  {
    document.getElementById("lbl_custom_size").style.display = '';
    document.getElementById("custom_size").style.display = '';
  
  }
  mkSubway();
}

function subw_onLoad(){
  subw_changeSize();
}

function mkSubway(){
  var e = document.getElementById("size");
  var value = e.options[e.selectedIndex].value;
  var doughball_weight = 280;
  if(value == "large")
  {
    doughball_weight = 310;
  }
  else if(value == "custom")
  {
    doughball_weight = parseFloat(document.getElementById("custom_size").value);
    if(isNaN(doughball_weight) || doughball_weight < 1){ // sanity check
      doughball_weight = 280.0; // If input is insane just go with standard 280g balls
    } 
  }
  else
  {
    doughball_weight = 280;
  }


    var count = parseFloat(document.getElementById("count").value);
    if(isNaN(count) || count < 1){
      count = 1.0;
    } 
    var extra_dough = 1.05; // Add a little extra for dough lost to stickiness etc

    var total_dough_weight = doughball_weight * count * extra_dough;

    var w_flour_fine = 0.87;
    var w_flour_oat = 0.05;
    var w_flour_vwg = 0.08;

    // Ingredient weighting follows (in bakers percent, nominally flour is always 100% / 1.00)
    var w_flour = 1.00;
    var w_potatomash = 0.07;
    var w_water = 0.75;
    var w_salt = 0.018;
    var w_sugar = 0.06;
    var w_yeast = 0.026;
    var w_oil = 0.04;
    var w_eggyolk = 0.05;

    var w_sum = w_flour + w_potatomash + w_water + w_salt + w_sugar + w_yeast + w_oil + w_eggyolk;

    var total_flour = w_flour * total_dough_weight / w_sum;
    var total_flour_fine = total_flour * w_flour_fine;
    var total_flour_oat = total_flour * w_flour_oat;
    var total_flour_vwg = total_flour * w_flour_vwg;

    var total_potatomash = w_potatomash * total_dough_weight / w_sum;
    var total_water = w_water * total_dough_weight / w_sum;
    var total_salt = w_salt * total_dough_weight / w_sum;
    var total_sugar = w_sugar * total_dough_weight / w_sum;
    var total_yeast = w_yeast * total_dough_weight / w_sum;
    var total_oil = w_oil * total_dough_weight / w_sum;
    var total_eggyolk = w_eggyolk * total_dough_weight / w_sum;

    document.getElementById("doughball_weight").innerHTML = `${doughball_weight.toFixed(1)} g`;
    if(count.toFixed(0) == 1)
    {
      document.getElementById("num_doughballs").innerHTML = `Ingredienser for ${count.toFixed(0)} deigball`;
    }
    else{
      document.getElementById("num_doughballs").innerHTML = `Ingredienser for ${count.toFixed(0)} deigballer`;
    }

    document.getElementById("ing_flour_fine").innerHTML = `${total_flour_fine.toFixed(1)} g`;
    document.getElementById("ing_flour_oat").innerHTML = `${total_flour_oat.toFixed(1)} g`;
    document.getElementById("ing_flour_vwg").innerHTML = `${total_flour_vwg.toFixed(1)} g`;
    document.getElementById("ing_potatomash").innerHTML = `${total_potatomash.toFixed(1)} g`;
    document.getElementById("ing_water").innerHTML = `${total_water.toFixed(1)} g`;
    document.getElementById("ing_salt").innerHTML = `${total_salt.toFixed(1)} g`;
    document.getElementById("ing_sugar").innerHTML = `${total_sugar.toFixed(1)} g`;
    document.getElementById("ing_yeast").innerHTML = `${total_yeast.toFixed(1)} g`;
    document.getElementById("ing_oil").innerHTML = `${total_oil.toFixed(1)} g`;
    document.getElementById("ing_eggyolk").innerHTML = `${total_eggyolk.toFixed(1)} g`;

    document.getElementById("recipe").style.display = '';
}