var switch_nuevo_cancelar = 0;
var maestros = [];
var pokemones;
var exp_maestro;
var posicion_modificar;
$(document).ready(function() {
  if(JSON.parse(localStorage.getItem('data_tarea3'))!=null){
  maestros = JSON.parse(localStorage.getItem('data_tarea3'));
}
  $("#btn_guardar").attr('disabled', true);
  $("#div_data").hide();
  update_pokemon_table();
  update_master_table();

  /*var pokemon_nombre = $("#txt_nombre_pokemon").val();
  var pokemon_exp = $("#txt_nivel_pokemon").val();
  var pokemon_nivel = $("#txt_exp_pokemon").val();*/

  $("#btn_nuevo").click(function(event) {
    if (switch_nuevo_cancelar==0) {
      nuevo_registro();
    }else{
      cancelar_registro();
    }
  });
  $("#btn_guardar").click(function(event) {
    var cedula = $("#txt_cedula").val();
    var nombre = $("#txt_nombre").val();
    var apellido = $("#txt_apellido").val();
    var exp = $("#txt_exp").val();
    var maestro = new Maestros(cedula,nombre,apellido,exp,pokemones);
    maestros.push(maestro);
    console.log(maestros);
    clear_todo();
    update_master_table();
  });
  $("#btn_modificar").click(function(event) {
    modificar_maestro();
  });
  /*$("#btn_agregar").click(function(event) {
    var pokemon_nombre = $("#txt_nombre_pokemon").val();
    var pokemon_nivel = $("#txt_nivel_pokemon").val();
    var pokemon_exp = $("#txt_exp_pokemon").val();
    var pokemon = new Pokemones(pokemon_nombre,pokemon_nivel,pokemon_exp);
    pokemones.push(pokemon);
    clear_pokemon_text();
    update_pokemon_table();
    console.log(pokemones);
  });*/

});
function modificar_maestro(){
  var cedula = $("#txt_cedula").val();
  var nombre = $("#txt_nombre").val();
  var apellido = $("#txt_apellido").val();
  var exp = $("#txt_exp").val();
  var maestro = new Maestros(cedula,nombre,apellido,exp,pokemones);
  delete maestros[posicion_modificar];
  maestros[posicion_modificar] = maestro;
  console.log(maestros);
  $("#btn_nuevo").attr('disabled', false);
  $("#btn_modificar").attr('hidden', true);
  clear_todo();
  update_master_table();
}
function editar_maestro(posicion){
  var maestro = maestros[posicion];
  $("#txt_cedula").attr('disabled', false);
  $("#txt_nombre").attr('disabled', false);
  $("#txt_apellido").attr('disabled', false);
  $("#btn_guardar").attr('disabled', true);
  $("#btn_nuevo").attr('disabled', true);
  $("#btn_modificar").attr('hidden', false);

  $("#txt_cedula").val(maestro.cedula);
  $("#txt_nombre").val(maestro.nombre);
  $("#txt_apellido").val(maestro.apellido);
  $("#div_data").show();
  pokemones = maestro.pokemons;
  update_pokemon_table();
  posicion_modificar = posicion;
}
function update_master_table(){
  console.log(maestros);
  $("#tbodyMaster tr").remove();
  var count = 0;
    var tbody = $('#tableMaster tbody'),
        props = ["cedula", "nombre", "apellido","exp"];
    $.each(maestros, function(i, maestros) {
      var tr = $('<tr>');
      $.each(props, function(i, prop) {
        $('<td>').html(maestros[prop]).appendTo(tr);
      });
      $('<td>').html(maestros["pokemons"].length).appendTo(tr);
    $('<td>').html('<a style="padding-left:5px; padding-right:5px;" href="#" onClick="editar_maestro('+count+')">Editar</a>').appendTo(tr);
      tbody.append(tr);
  count++;
  });
  localStorage.setItem('data_tarea3',JSON.stringify(maestros));
}
function get_master_exp(){
  exp_maestro = 0;
  $.each(pokemones, function(i, pokemones) {
    exp_maestro += parseInt(pokemones["exp"]);
  });
  return exp_maestro;
}
function agregar(){
  var pokemon_nombre = $("#txt_nombre_pokemon").val();
  var pokemon_nivel = $("#txt_nivel_pokemon").val();
  var pokemon_exp = $("#txt_exp_pokemon").val();
  var pokemon = new Pokemones(pokemon_nombre,pokemon_nivel,pokemon_exp);
  pokemones.push(pokemon);
  clear_pokemon_text();
  update_pokemon_table();
  console.log(pokemones);
  console.log(exp_maestro);
}
function borrar_pokemon(posicion){
  pokemones.splice(posicion,1);
  update_pokemon_table();
}
function update_pokemon_table(){
  $("#tbody tr").remove();
  $("#txt_exp").val(get_master_exp);
  var count = 0;

    var tbody = $('#table tbody'),
        props = ["nombre", "nivel", "exp"];
    $.each(pokemones, function(i, pokemones) {
      var tr = $('<tr>');
      $.each(props, function(i, prop) {
        $('<td>').html(pokemones[prop]).appendTo(tr);
      });
  	$('<td>').html('<a style="padding-left:5px; padding-right:5px;" href="#" onClick="borrar_pokemon('+count+')">X</a>').appendTo(tr);
      tbody.append(tr);
  count++;
  });
  var tr = $('<tr>');
  $('<td>').html('<input type="text" class="form-control" id="txt_nombre_pokemon">').appendTo(tr);
  $('<td>').html('<input type="number" class="form-control" id="txt_nivel_pokemon">').appendTo(tr);
  $('<td>').html('<input type="number" class="form-control" id="txt_exp_pokemon">').appendTo(tr);
  $('<td>').html('<input type="button" class="btn" value="Agregar" id="btn_agregar" onClick="agregar()">').appendTo(tr);
  tbody.append(tr);
}
function clear_pokemon_text(){
  $("#txt_nombre_pokemon").val();
  $("#txt_nivel_pokemon").val();
  $("#txt_exp_pokemon").val();
}
function nuevo_registro(){
  $("#txt_cedula").attr('disabled', false);
  $("#txt_nombre").attr('disabled', false);
  $("#txt_apellido").attr('disabled', false);
  $("#btn_guardar").attr('disabled', false);
  $("#btn_nuevo").html("Cancelar");
  $("#div_data").show();
  exp_maestro = 0;
  pokemones = [];
  switch_nuevo_cancelar = 1;
}
function cancelar_registro(){
  $("#txt_cedula").attr('disabled', true);
  $("#txt_nombre").attr('disabled', true);
  $("#txt_apellido").attr('disabled', true);
  $("#btn_nuevo").html("Nuevo");
  $("#btn_guardar").attr('disabled', true);
  exp_maestro = 0;
  pokemones = [];
  update_pokemon_table();
  $("#div_data").hide();
  clear_pokemon_text();
  switch_nuevo_cancelar = 0;
}
function clear_todo(){
  cancelar_registro();
  $("#txt_cedula").val("");
  $("#txt_nombre").val("");
  $("#txt_apellido").val("");
}
function Maestros(cedula,nombre,apellido,exp,pokemons){
  this.cedula=cedula;
  this.nombre=nombre;
  this.apellido=apellido;
  this.exp=exp;
  this.pokemons=pokemons;
}
function Pokemones(nombre,nivel,exp){
  this.nombre=nombre;
  this.nivel=nivel;
  this.exp=exp;
}
