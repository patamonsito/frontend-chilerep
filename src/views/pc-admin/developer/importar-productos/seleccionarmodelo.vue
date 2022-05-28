<template>
  <div>
    <h6>Seleccione modelo a agregar productos.</h6>
    <v-row>
      <v-col cols="4">
        <v-autocomplete
          v-model="MarcaSeleccionada"
          :items="Marcas"
          menu-props="auto"
          label="Seleccione Marca de Vehiculo"
          hide-details
          prepend-icon="mdi-car"
          single-line
          item-text="Descripcion"
          return-object
          @change="marcaSearch"
        ></v-autocomplete>
      </v-col>
      <v-col cols="8">
        <v-autocomplete
          v-model="ModeloSeleccionado"
          :items="Modelos"
          menu-props="auto"
          label="Seleccione Vehiculo"
          hide-details
          prepend-icon="mdi-car"
          single-line
          item-text="formatModelo"
          return-object
          @change="modelSearch()"
        ></v-autocomplete>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="4" class="pa-0 ma-0 center aling-center" style="text-align: -webkit-center;">
        <v-img
          max-width="100"
          :src="'http://143.198.165.86:3000/marcavehiculo/' + this.imgMarca"
        ></v-img>
      </v-col>
      <v-col cols="8" class="pa-0 ma-0 center aling-center" style="text-align: -webkit-center;">
        <v-img
          max-width="100"
          :src="'http://143.198.165.86:3000/vehiculo/'+ this.imgModelo + '.png'"
        ></v-img>
      </v-col>
    </v-row>


    <div class="center" v-if="Enviando == true">
      <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
      <p>Procesando, por favor espere...</p>
    </div>


    <div v-if="Modelo != '' && Enviando == false" class="subtitle-1 pt-2 pb-2 text--secondary">
     
    <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Importadora
          </th>
          <th class="text-left">
            Productos
          </th>
          <th class="text-left">
            Ultima Actualización
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Refax</td>
          <td>{{ RefaxCount }} <div v-if="RefaxCreados != 0 || RefaxActualizados != 0" style="display: inline-flex;">(<div class="green--text" >+{{ RefaxCreados }}</div>) (<div class="orange--text" > {{ RefaxActualizados }}</div>) (<div class="red--text" > -{{ sinCambiosRefax }}</div>)</div> </td>
          <td>{{ LastUpdateRefax == 'NUNCA' ? 'NUNCA' : LastUpdateRefax.slice(0, 10).split('-').reverse().join('/') }}</td>
        </tr>
        <tr>
          <td>Alsacia</td>
          <td>{{ AlsaciaCount }} <div v-if="AlsaciaCreados != 0 || AlsaciaActualizados != 0" style="display: inline-flex;">(<div class="green--text" >+{{ AlsaciaCreados }}</div>) (<div class="orange--text" > {{ AlsaciaActualizados }}</div>) (<div class="red--text" > -{{ sinCambiosAlsacia }}</div>)</div></td>
          <td>{{ LastUpdateAlsacia == 'NUNCA' ? 'NUNCA' : LastUpdateAlsacia.slice(0, 10).split('-').reverse().join('/') }}</td>
        </tr>
        <tr>
          <td>Bicimoto</td>
          <td>{{ BicimotoCount }} <div v-if="BicimotoCreados != 0 || BicimotoActualizados != 0" style="display: inline-flex;">(<div class="green--text" >+{{ BicimotoCreados }}</div>) (<div class="orange--text" > {{ BicimotoActualizados }}</div>) (<div class="red--text" > -{{ sinCambiosBicimoto }}</div>)</div></td>
          <td>{{ LastUpdateBicimoto == 'NUNCA' ? 'NUNCA' : LastUpdateBicimoto.slice(0, 10).split('-').reverse().join('/') }}</td>
        </tr>
        <tr>
          <td>Mannheim</td>
          <td>{{ MannheimCount }} <div v-if="MannheimCreados != 0 || MannheimActualizados != 0" style="display: inline-flex;">(<div class="green--text" >+{{ MannheimCreados }}</div>) (<div class="orange--text" > {{ MannheimActualizados }}</div>) (<div class="red--text" > -{{ sinCambiosMannheim }}</div>)</div></td>
          <td>{{ LastUpdateMannheim == 'NUNCA' ? 'NUNCA' : LastUpdateMannheim.slice(0, 10).split('-').reverse().join('/') }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

    </div>

    <v-divider></v-divider>

    <div v-if="ModeloSeleccionado != '' && Enviando == false">
        <h5>Copiar extraccion de codigo</h5>

        <v-form ref="Codes" lazy-validation>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Importadora</th>
              <th class="text-left">Copiar Code</th>
              <th class="text-left">link</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Refax</td>
              <td>
                <v-btn
                  color="primary"
                  small
                  elevation="2"
                  @click="CodeInjector('Refax')"
                  >Injector</v-btn
                >
              </td>
              <td v-if="refaxUrl != '' && refaxUrl != undefined">
                <a
                  :href="'https://b2b.refaxchile.cl/B2BRefax/' + refaxUrl"
                  target="_blank"
                  ><v-btn color="primary" small elevation="2">Refax</v-btn></a
                >
              </td>
              <td v-else>
                <v-text-field
                  label="Link Directo"
                  v-model="linkRefax"
                  :rules="linkUnoRules"
                  placeholder="Pegar Url del modelo"
                ></v-text-field>
              </td>
              <td  v-if="refaxUrl != '' && refaxUrl != undefined">
              </td>
              <td v-else>
                <v-btn
                  color="primary"
                  small
                  elevation="2"
                  @click="EnviarUrl('Refax')"
                  >Enviar</v-btn
                >
              </td>
            </tr>
            <tr>
              <td>Alsacia</td>
              <td>
                <v-btn
                  color="primary"
                  small
                  elevation="2"
                  @click="CodeInjector('Alsacia')"
                  >Injector</v-btn
                >
              </td>
              <td v-if="alsaciaUrl != '' && alsaciaUrl != undefined">
                <a :href="alsaciaUrl" target="_blank"
                  ><v-btn color="primary" small elevation="2">Alsacia</v-btn></a
                >
              </td>
              <td v-else>
                <v-text-field
                  label="Link Directo"
                  v-model="linkAlsacia"
                  :rules="linkDosRules"
                  placeholder="Pegar Url del modelo"
                ></v-text-field>
              </td>
              <td  v-if="alsaciaUrl != '' && alsaciaUrl != undefined">
              </td>
              <td v-else>
                <v-btn
                  color="primary"
                  small
                  elevation="2"
                  @click="EnviarUrl('Alsacia')"
                  >Enviar</v-btn
                >
              </td>
            </tr>
            <tr>
              <td>Bicimoto</td>
              <td >
                <v-btn
                  color="primary"
                  small
                  elevation="2"
                  @click="CodeInjector('Bicimoto')"
                  >Injector</v-btn
                >
              </td>
              <td v-if="bicimotoUrl != '' && bicimotoUrl != undefined">
                <a :href="bicimotoUrl" target="_blank"
                  ><v-btn color="primary" small elevation="2"
                    >Bicimoto</v-btn
                  ></a>
              </td>
              <td v-else>
                <v-text-field
                  label="Link Directo"
                  v-model="linkBicimoto"
                  :rules="linkTresRules"
                  placeholder="Pegar Url del modelo"
                ></v-text-field>
              </td>
              <td v-if="bicimotoUrl != '' && bicimotoUrl != undefined">
              </td>
              <td v-else>
                <v-btn
                  color="primary"
                  small
                  elevation="2"
                  @click="EnviarUrl('Bicimoto')"
                  >Enviar</v-btn
                >
              </td>
            </tr>
            <tr>
              <td>Mannheim</td>
              <td>
                <v-btn
                  color="primary"
                  small
                  elevation="2"
                  @click="CodeInjector('Mannheim')"
                  >Injector</v-btn
                >
              </td>
              <td>NA</td>
              <td>
              </td>
            </tr>
          </tbody>


    <v-textarea
      solo
      :class="{ 'd-none': displayRefax }"
      v-on:focus="$event.target.select()"
      name="name"
      label="label"
      ref="refax"
      :value="refax"
      style="max-width: 0px; max-height: 0px;"
    >
    </v-textarea>
    <v-textarea
      solo
      :class="{ 'd-none': displayAlsacia }"
      v-on:focus="$event.target.select()"
      name="name"
      label="label"
      ref="alsacia"
      :value="alsacia"
      style="max-width: 0px; max-height: 0px;"
    >
    </v-textarea>
    <v-textarea
      solo
      :class="{ 'd-none': displayBicimoto }"
      v-on:focus="$event.target.select()"
      name="name"
      label="label"
      ref="bicimoto"
      :value="bicimoto"
      style="max-width: 0px; max-height: 0px;"
    >
    </v-textarea>
    <v-textarea
      solo
      :class="{ 'd-none': displayMannheim }"
      v-on:focus="$event.target.select()"
      name="name"
      label="label"
      ref="mannheim"
      :value="mannheim"
      style="max-width: 0px; max-height: 0px;"
    >
    </v-textarea>


        </template>
      </v-simple-table>
        </v-form>
    

            <v-divider></v-divider>
          
          <h5>Pegar Codigos</h5>
        
          <v-text-field
            label="Datos"
            v-model="code"
            placeholder="Pegar Code"
          ></v-text-field>

        
                <v-btn
                  color="primary"
                  small
                  elevation="2"
                  @click="Enviar()"
                  >Enviar</v-btn
                >

    
    </div>

    <div class="center" v-else>
        <h5>Esperando por modelo...</h5>
    </div>
  </div>
</template>

<script>
// Formulario: <v-form ref="Ejemplo" lazy-validation></v-form> // :rules="EjemploRules" // EjemploRules: [(v) => !!v || "Seleccione agencia de su preferencia"] // this.$refs.formEjemplo.validate();
import API from '../../../../api.js'
export default {
  name: "refax",
  refax: "miau",
  props: [],
  //Variables
  data: () => ({
    imgMarca: '',
    imgModelo: '',
    MarcaSeleccionada: '',
    Marcas: [],
    Modelos: [],
    linkRefax: '',
    linkUnoRules: [(v) => !!v || "Debe ingresar la URL para enviar."],
    linkAlsacia: '',
    linkDosRules: [(v) => !!v || "Debe ingresar la URL para enviar."],
    linkBicimoto: '',
    linkTresRules: [(v) => !!v || "Debe ingresar la URL para enviar."],
    Modelo: "",
    ModeloSeleccionado: "",
    CodigoProducto: "",
    CodigoModelo: 0,
    MarcaVehiculo: "",
    AñoI: 0,
    AñoT: 0,
    AlsaciaCount: 0,
    RefaxCount: 0,
    BicimotoCount: 0,
    MannheimCount: 0,
    code: '',
    refaxUrl: '',
    alsaciaUrl: '',
    bicimotoUrl: '',
    displayRefax: true,
    displayBicimoto: true,
    displayAlsacia: true,
    displayMannheim: true,
    RefaxCreados: 0,
    RefaxActualizados: 0,
    RefaxCantidad: 0,
    BicimotoCreados: 0,
    BicimotoActualizados: 0,
    BicimotoCantidad: 0,
    AlsaciaCreados: 0,
    AlsaciaActualizados: 0,
    AlsaciaCantidad: 0,
    MannheimCreados: 0,
    MannheimActualizados: 0,
    MannheimCantidad: 0,
    Enviando: false,
    LastUpdateRefax: '',
    LastUpdateAlsacia: '',
    LastUpdateBicimoto: '',
    LastUpdateMannheim: '',
  }),
  components: {},

  //Variable en base a otra
  computed: {
    sinCambiosRefax: function (){
      if((this.RefaxCount - this.RefaxCantidad) > 0 ){
          return this.RefaxCount - this.RefaxCantidad 
      }else{
        return 0;
      };
    },
    sinCambiosAlsacia: function (){
      if((this.AlsaciaCount - this.AlsaciaCantidad) > 0 ){
          return this.AlsaciaCount - this.AlsaciaCantidad 
      }else{
        return 0;
      };
    },
    sinCambiosBicimoto: function (){
      if((this.BicimotoCount - this.BicimotoCantidad) > 0 ){
          return this.BicimotoCount - this.BicimotoCantidad 
      }else{
        return 0;
      };
    },
    sinCambiosMannheim: function (){
      if((this.MannheimCount - this.MannheimCantidad) > 0 ){
          return this.MannheimCount - this.MannheimCantidad 
      }else{
        return 0;
      };
    },

    refax: function () {
      return `var cantidad = $('#modeloa > table > tbody > tr').length + 1
var Productos = []

for(var i = 1; i < cantidad; i++ ){
    var CodigoImportadora = $('#modeloa > table > tbody > tr:nth-child(' +  i + ') > td:nth-child(7) > a').text();
    var Descripcion = $('#modeloa > table > tbody > tr:nth-child(' +  i + ') > td:nth-child(3)').text().trim() + ' ' + $('#modeloa > table > tbody > tr:nth-child(' +  i + ') > td:nth-child(4)').text().trim().replaceAll('  ', ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').replaceAll('DEL', 'DELANTERO').replaceAll('USA', '').replaceAll('INF', 'INFERIOR').replaceAll('IZQ', 'IZQUIERDO').replaceAll('DER', 'DERECHO').replaceAll('ESTRUCTURA', '').replaceAll('ESC', 'ESCAPE').replaceAll('ADM', 'ADMISION').replaceAll('SUP', 'SUPERIOR').replaceAll('STD', 'ESTANDAR').replaceAll('EXT', 'EXTREMO').replaceAll('LARGO', '').replaceAll('TRAS', 'TRASERO');
    var Origen =  $('#modeloa > table > tbody > tr:nth-child(' +  i + ') > td:nth-child(5)').text().trim()
    var Marca = $('#modeloa > table > tbody > tr:nth-child(' +  i + ') > td:nth-child(6)').text().trim()
    var PrecioImportadora = parseInt($('#modeloa > table > tbody > tr:nth-child(' +  i + ') > td:nth-child(8)').text().trim().replaceAll('.', ''))
    var Stock = $('#modeloa > table > tbody > tr:nth-child(' +  i + ') > td:nth-child(9)').text().trim();
    var Importadora = 'Refax';
    var CodigoProducto = 'M-${this.CodigoProducto}-' + i;
    var Modelo = '${this.Modelo}';
    var AñoI = ${this.AñoI};
    var AñoT = ${this.AñoT};
    var MarcaVehiculo = '${this.MarcaVehiculo}';
    var CodigoModelo = ${this.CodigoModelo};

    Productos.push({
        Importadora,
        CodigoProducto,
        CodigoImportadora,
        CodigoModelo,
        Descripcion,
        Origen,
        Marca,
        MarcaVehiculo,
        Modelo,
        AñoI,
        AñoT,
        PrecioImportadora,
        Stock
    })
}

var $temp = $('<input>')
$('body').append($temp)
$temp.val(JSON.stringify(Productos)).select()
document.execCommand('copy')
$temp.remove()`;
    },
    alsacia: function () {
      return `$('i').remove();

var cantidad = $('#myTable > div > div').length + 1;

var Productos = [];

for(i = 1; i < cantidad;i++){

    var Importadora = 'Alsacia';
    var CodigoImportadora = $('#myTable > div > div:nth-child(' + i + ') > div > div.col-lg-8.col-md-7.pv_description > div > span:nth-child(3) > span.code_pv_two').text().replaceAll(' ', '').trim();
    var OEM = $('#myTable > div > div:nth-child(' + i + ') > div > div.col-lg-8.col-md-7.pv_description > div > span:nth-child(5) > span.code_pv_two').text().replaceAll(' ', '').trim();
    var Descripcion = $('#myTable > div > div:nth-child(' + i + ') > div > div.col-lg-8.col-md-7.pv_description > div > span.productname').text().trim() + ' ' + $('#myTable > div > div:nth-child(' + i + ') > div > div.col-lg-8.col-md-7.pv_description > div > span.description_pv').text().replaceAll('$', '').replaceAll('  ', ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').trim().replaceAll('DEL', 'DELANTERO').replaceAll('INF', 'INFERIOR').replaceAll('IZQ', 'IZQUIERDO').replaceAll('DER', 'DERECHO').replaceAll('ESTRUCTURA', '').replaceAll('ESC', 'ESCAPE').replaceAll('ADM ', 'ADMISION').replaceAll('SUP', 'SUPERIOR').replaceAll('STD', 'ESTANDAR').replaceAll('EXT', 'EXTREMO').replaceAll('LARGO', '').replaceAll('TRAS', 'TRASERO').replaceAll('  ', ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').trim();
    var Origen =  $('#myTable > div > div:nth-child(' + i + ') > div > div.col-lg-8.col-md-7.pv_description > div > span:nth-child(6) > span.code_pv_two').text().trim()
    var Marca = $('#myTable > div > div:nth-child(' + i + ') > div > div.col-lg-8.col-md-7.pv_description > div > span:nth-child(4) > span.code_pv_two').text().trim()
    var PrecioImportadora = parseInt($('#myTable > div > div:nth-child(' + i + ') > div > div.col-lg-2.col-md-2.pv_right > div > span').text().replaceAll(' ', '').replaceAll('$', '').replaceAll('.', '').trim()) > 0 ? parseInt($('#myTable > div > div:nth-child(' + i + ') > div > div.col-lg-2.col-md-2.pv_right > div > span').text().replaceAll(' ', '').replaceAll('$', '').replaceAll('.', '').trim()) : 0
    var Stock = $('#myTable > div > div:nth-child(' + i + ') > div > div.col-lg-2.col-md-2.pv_right > div > button').text().replaceAll(' ', '').trim() == 'Agregar' ? 'Disponible' : '0';
    var Img = $('#myTable > div > div:nth-child(' + i + ') > div > div.col-lg-2.col-md-3.pv_col > div > a > img').attr("src");
    var CodigoProducto = 'A-${this.CodigoProducto}-' + i;
    var Modelo = '${this.Modelo}';
    var AñoI = ${this.AñoI};
    var AñoT = ${this.AñoT};
    var MarcaVehiculo = '${this.MarcaVehiculo}';
    var CodigoModelo = ${this.CodigoModelo};

    var Json = {
        Importadora,
        CodigoImportadora,
        CodigoProducto,
        CodigoModelo,
        OEM,
        Descripcion,
        Origen,
        Marca,
        PrecioImportadora,
        Modelo,
        AñoI,
        AñoT,
        Img,
        MarcaVehiculo,
        Stock
    }
    
    if(Json.CodigoImportadora != '' && Json.CodigoImportadora != undefined){
        Productos.push(Json)   
        }
    
}


var cantidadDos = $('#myTable > div').length + 1;

for(i = 1; i < cantidadDos;i++){

    var Importadora = 'Alsacia';
    var CodigoImportadora = $('#myTable > div:nth-child(' + i + ') > div > div.col-lg-8.col-md-7.pv_description > div > span:nth-child(3) > span.code_pv_two').text().replaceAll(' ', '').trim();
    var OEM = $('#myTable > div:nth-child(' + i + ') > div > div.col-lg-8.col-md-7.pv_description > div > span:nth-child(5) > span.code_pv_two').text().replaceAll(' ', '').trim();
    var Descripcion = $('#myTable > div:nth-child(' + i + ') > div > div.col-lg-8.col-md-7.pv_description > div > span.productname').text().trim() + ' ' + $('#myTable > div:nth-child(' + i + ') > div > div.col-lg-8.col-md-7.pv_description > div > span.description_pv').text().replaceAll('$', '').replaceAll('  ', ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').trim().replaceAll('DEL', 'DELANTERO').replaceAll('INF', 'INFERIOR').replaceAll('IZQ', 'IZQUIERDO').replaceAll('DER', 'DERECHO').replaceAll('ESTRUCTURA', '').replaceAll('ESC', 'ESCAPE').replaceAll('ADM ', 'ADMISION').replaceAll('SUP', 'SUPERIOR').replaceAll('STD', 'ESTANDAR').replaceAll('EXT', 'EXTREMO').replaceAll('LARGO', '').replaceAll('TRAS', 'TRASERO').replaceAll('  ', ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').trim();
    var Origen =  $('#myTable > div:nth-child(' + i + ') > div > div.col-lg-8.col-md-7.pv_description > div > span:nth-child(6) > span.code_pv_two').text().trim()
    var Marca = $('#myTable > div:nth-child(' + i + ') > div > div.col-lg-8.col-md-7.pv_description > div > span:nth-child(4) > span.code_pv_two').text().trim()
    var PrecioImportadora = parseInt($('#myTable > div:nth-child(' + i + ') > div > div.col-lg-2.col-md-2.pv_right > div > span').text().replaceAll(' ', '').replaceAll('$', '').replaceAll('.', '').trim()) > 0 ? parseInt($('#myTable > div:nth-child(' + i + ') > div > div.col-lg-2.col-md-2.pv_right > div > span').text().replaceAll(' ', '').replaceAll('$', '').replaceAll('.', '').trim()) : 0
    var Stock = $('#myTable > div:nth-child(' + i + ') > div > div.col-lg-2.col-md-2.pv_right > div > button').text().replaceAll(' ', '').trim() == 'Agregar' ? 'Disponible' : '0';
    var Img = $('#myTable > div:nth-child(' + i + ') > div > div.col-lg-2.col-md-3.pv_col > div > a > img').attr("src");
    var CodigoProducto = 'A-${this.CodigoProducto}-' + i;
    var Modelo = '${this.Modelo}';
    var AñoI = ${this.AñoI};
    var AñoT = ${this.AñoT};
    var MarcaVehiculo = '${this.MarcaVehiculo}';
    var CodigoModelo = ${this.CodigoModelo};

    var Json = {
        Importadora,
        CodigoImportadora,
        CodigoProducto,
        CodigoModelo,
        OEM,
        Descripcion,
        Origen,
        Marca,
        PrecioImportadora,
        Modelo,
        AñoI,
        AñoT,
        Img,
        MarcaVehiculo,
        Stock
    }
    
    if(Json.CodigoImportadora != '' && Json.CodigoImportadora != undefined){
        Productos.push(Json)   
        }
    
}

Productos

`;
    },
    bicimoto: function () {
      return `$('strong').remove();
$('i').remove();

var cantidad = $('.data-content-products > div').length + 1;

var Productos = []

for(i = 1; i < cantidad; i++){
var Descripcion = $('.data-content-products > div:nth-child(' + i + ') > div > div.producto-box-pack > div.producto-box-datos > h2').text()
.replaceAll('MULT ', 'MULTIPLE ')
.replaceAll('ADM ', 'ADMISION ')
.replaceAll('ALTERN ', 'ALTERNADOR ')
.replaceAll('AMORT ', 'AMORTIGUADOR ')
.replaceAll('DEL ', 'DELANTERO ')
.replaceAll('RH ', 'DERECHO ')
.replaceAll('LH ', 'IZQUIERDO ')
.replaceAll('TRAS ', 'TRASERO ')
.replaceAll('R/L ', 'DERACHO / IZQUIERDO ')
.replaceAll('SUP ', 'SUPERIOR ')
.replaceAll('BAND ', 'BANDEJA ')
.replaceAll('CREM ', '')
.replaceAll('11/17', '')
.replaceAll('1.4', '')
.replaceAll('2011', '')
.replaceAll('INF ', 'INFERIOR ')
.replaceAll('AVEO/SAIL', '')
.replaceAll('CH ', '')
.replaceAll('BBA ', 'BOMBA ')
.replaceAll('BENC ', 'BENCINA ')
.replaceAll('C/DEP ', 'CON DEPOSITO ')
.replaceAll(' F14D', ' ')
.replaceAll('L/P ', '')
.replaceAll('DER ', 'DERECHO ')
.replaceAll('IZQ ', 'IZQUIERDO ')
.replaceAll('ESTAB ', 'ESTABILIZADORA ')
.replaceAll('FRE ', 'FRENO ')
.replaceAll('ALTERN ', 'ALTERNADOR ')
.replaceAll('TRA ', 'TRASERO ')
.replaceAll('DER/IZQ ', 'DERECHO IZQUIERDO ')
.replaceAll('A/C ', 'AIRE ACONDICIONADO ')
.replaceAll('DIR ', 'DIRECCION ')
.replaceAll('A/VIDRIO ', 'ALZA VIDRIO ')
.replaceAll('C/MOTOR ', 'CON MOTOR ')
.replaceAll('DEP ', 'DEPOSITO ')
.replaceAll('EMB ', 'EMBRAGUE ')
.replaceAll('ESC ', 'ESCAPE ')
.replaceAll('ELECT ', 'ELECTRO ')
.replaceAll('VENT ', 'VENTILADOR ')
.replaceAll('EMP ', 'EMPAQUETADURA ')
.replaceAll('MULT ', 'MULTIPLE ')
.replaceAll('VALV ', 'VALVULA ')
.replaceAll('ESP ', 'ESPEJO ')
.replaceAll('EXT ', 'EXTERIOR ')
.replaceAll('LHH ', 'IZQUIERDO ')
.replaceAll('ELECT ', 'ELECTRICO ')
.replaceAll('LAT ', 'LATERAL')
.replaceAll('LAT ', 'LATERAL ')
.replaceAll('TAPAB ', 'TAPABARRO ')
.replaceAll('BCO/AMAR ', 'BLANCO - AMARILLO ')
.replaceAll('GUARDAF ', 'GUARDAFANGO ')
.replaceAll('SOP ', 'SOPORTE ')
.replaceAll('PARACH ', 'PARACHOQUE ')
.replaceAll('HORQ ', 'HORQUILLA ')
.replaceAll('JTA ', 'JUNTA ')
.replaceAll('C/ABS ', 'CON ABS ')
.replaceAll('DISTRIB ', 'DISTRIBUCION ')
.replaceAll('PZAS ', 'PIEZAS ')
.replaceAll('DEP ', 'DEPOSITO ')
.replaceAll(' C/', ' CON')
.replaceAll('CALEF ', 'CALEFACCION ')
.replaceAll('SENS ', 'SENSOR ')
.replaceAll('BK ', 'NEGRA ')
.replaceAll('PART ', 'PARTIDA ')
.replaceAll('NEBL ', 'NEBLINEO ')
.replaceAll('LAT ', 'LATERAL ')
.replaceAll('PINOM ', 'PIÑON ')
.replaceAll('ESTAB ', 'ESTABILIZADORA ')
.replaceAll('FRE ', 'FRENO ')
.replaceAll('IZQ ', 'IZQUIERDO ')
.replaceAll('DER ', 'DERECHO ')
.replaceAll('SAIL ', '')
.replaceAll('SIMYI', '')
.replaceAll('PTA ', 'PUNTA ')
.replaceAll('RAD ', 'RADIADOR ')
.replaceAll('L/PARAB ', 'LIMPIA PARABRISAS ')
.replaceAll('DER/', 'DERECHO ')
.replaceAll('B/', 'BIELA ')
.replaceAll('/', ' ')
.replaceAll('11/15', '')
.replaceAll(' KM', ' KILOMETRO')
.replaceAll('TERMOST ', 'TERMOSTATO ')
.replaceAll('S/', 'SIN ')
.replaceAll('ROD ', 'RODAMIENTO ')
.replaceAll('11-15', '')
.replaceAll('11-17', '')
.replaceAll('PCS', 'PIEZAS')
.replaceAll('CIGÜEÑAL', 'CIGUEÑAL')
.replaceAll('11 15', '')
.replaceAll('AUX ', 'AUXILIAR ')
.replaceAll(' S ', ' SIN ')
.replaceAll('TENS ', 'TENSOR ')
.replaceAll('  ', ' ')
.replaceAll('  ', ' ')
.replaceAll('  ', ' ')
.replaceAll('  ', ' ')
.replaceAll('  ', ' ')
.trim();

var Importadora = 'Bicimoto';
var CodigoImportadora = $('.data-content-products > div:nth-child(' + i + ') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(2)').text().trim()
var OEM = $('.data-content-products > div:nth-child(' + i + ') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(6)').text().trim();
var Origen =  $('.data-content-products > div:nth-child(' + i + ') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(7)').text().replaceAll(' CHN', 'CHINA').replaceAll(' THA', 'THAIWAN').trim()
var PrecioImportadora = parseInt($('.data-content-products > div:nth-child(' + i + ') > div > div.producto-box-datos-boton > div.producto-box-boton.producto-box-prices > h3').text().replaceAll('$', '').replaceAll('.', ''))
var Stock = $('.data-content-products > div:nth-child(' + i + ') > div > div.producto-box-datos-boton > div:nth-child(2) > button').text().trim() == 'Comprar' ? 'Disponible' : '0'
var Img = 'https://www.bicimoto.cl/timthumb.php?src=upload/productsGalleries/img/' + CodigoImportadora + '.jpg';
var CodigoProducto = 'B-${this.CodigoProducto}-' + i;
var Modelo = '${this.Modelo}';
var AñoI = ${this.AñoI};
var AñoT = ${this.AñoT};
var MarcaVehiculo = '${this.MarcaVehiculo}';
var CodigoModelo = ${this.CodigoModelo};


var Json = {
    Importadora,
    CodigoImportadora,
    OEM,
    CodigoProducto,
    CodigoModelo,
    Descripcion,
    Origen,
    MarcaVehiculo,
    Modelo,
    AñoI,
    AñoT,
    PrecioImportadora,
    Stock,
    Img
}

    Productos.push(Json)

}

var $temp = $('<input>')
$('body').append($temp)
$temp.val(JSON.stringify(Productos)).select()
document.execCommand('copy')
$temp.remove()

Productos


            `;
    },

    mannheim: function () {
      return `-- Extraer datos
local list = getAddressList()
local numero = list.getMemoryRecordByDescription("numero").value
local Importadora = "Mannheim"
local CodigoImportadora = list.getMemoryRecordByDescription("CodigoImportadora").value
local OEM = list.getMemoryRecordByDescription("OEM").value
local Descripcion = list.getMemoryRecordByDescription("Descripcion").value
local Marca = list.getMemoryRecordByDescription("Marca").value
local Origen = list.getMemoryRecordByDescription("Origen").value
local Stock = list.getMemoryRecordByDescription("Stock").value
local PrecioImportadora = list.getMemoryRecordByDescription("PrecioImportadora").value
local Oferta = list.getMemoryRecordByDescription("Oferta").value
-- Variables a editar
local CodigoProducto = 'M-${this.CodigoProducto}-' .. numero;
local Modelo = '${this.Modelo}';
local AnoI = ${this.AñoI};
local AnoT = ${this.AñoT};
local MarcaVehiculo = '${this.MarcaVehiculo}';
local CodigoModelo = ${this.CodigoModelo};


writeToClipboard("<tr>" .. "<td>" .. Importadora .. "</td>" .. "<td>" .. CodigoImportadora .. "</td>" .. "<td>" .. CodigoProducto .. "</td>" .. "<td>" .. OEM .. "</td>" .. "<td>" .. Descripcion .. "</td>" .. "<td>" .. MarcaVehiculo .. "</td>" .. "<td>" .. Modelo .. "</td>" .. "<td>" .. AnoI .. "</td>" .. "<td>" .. AnoT .. "</td>" .. "<td>" .. Marca .. "</td>" .. "<td>" .. Origen .. "</td>" .. "<td>" .. Stock .. "</td>" .. "<td>" .. PrecioImportadora .. "</td>" .. "<td>" .. Oferta .. "</td>" .. "<td>" .. CodigoModelo .. "</td>" .. "</tr>")`;
    },
  },

  watch: {
    //   UnaVariable: function (val) { // val es el valor anterior
    // this.Ejemplo = val + ' ' + this.UnaVariable
    //   },
  },

  // funciones
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },

    async CodeInjector(Text){
        if(Text == 'Refax'){
            this.displayRefax = false
            setTimeout(() =>  this.$refs.refax.focus(), 10);
            setTimeout(() =>  document.execCommand('copy'), 20);
            setTimeout(() =>  this.displayRefax = true, 30);
        }else if(Text == 'Alsacia'){
            this.displayAlsacia = false
            setTimeout(() =>  this.$refs.alsacia.focus(), 10);
            setTimeout(() =>  document.execCommand('copy'), 20);
            setTimeout(() =>  this.displayAlsacia = true, 30);
        }else if(Text == 'Bicimoto'){
            this.displayBicimoto = false
            setTimeout(() =>  this.$refs.bicimoto.focus(), 10);
            setTimeout(() =>  document.execCommand('copy'), 20);
            setTimeout(() =>  this.displayBicimoto = true, 30);
        }else if(Text == 'Mannheim'){
            this.displayMannheim = false
            setTimeout(() =>  this.$refs.mannheim.focus(), 10);
            setTimeout(() =>  document.execCommand('copy'), 20);
            setTimeout(() =>  this.displayMannheim = true, 30);
        }
    },

    async EnviarUrl(text){
      this.Enviando = true;

      if(text == 'Refax'){
        await API.POST_CREATELINK(text, this.ModeloSeleccionado.CodigoModelo, this.linkRefax);
        this.refaxUrl = this.linkRefax;
      }else if(text == 'Alsacia'){
        await API.POST_CREATELINK(text, this.ModeloSeleccionado.CodigoModelo, this.linkAlsacia);
        this.alsaciaUrl = this.linkAlsacia;
      }else if(text == 'Bicimoto'){
        await API.POST_CREATELINK(text, this.ModeloSeleccionado.CodigoModelo, this.linkBicimoto);
        this.bicimotoUrl = this.linkBicimoto;
      }
      this.Enviando = false;
    },

    async Enviar(){
      this.Enviando = true;
      var sendData = await API.POST_CREATEPRODUCTS(this.code)
    
      this.modelSearchDos()

      if(sendData.Importadora == 'Refax'){
        this.RefaxCreados = sendData.Creados;
        this.RefaxActualizados = sendData.Actualizados;
        this.RefaxCantidad = sendData.Cantidad;
      }else if(sendData.Importadora == 'Alsacia'){
        this.AlsaciaCreados = sendData.Creados;
        this.AlsaciaActualizados = sendData.Actualizados;
        this.AlsaciaCantidad = sendData.Cantidad;
      }else if(sendData.Importadora == 'Bicimoto'){
        this.BicimotoCreados = sendData.Creados;
        this.BicimotoActualizados = sendData.Actualizados;
        this.BicimotoCantidad = sendData.Cantidad;

      }else if(sendData.Importadora == 'Mannheim'){
        this.MannheimCreados = sendData.Creados;
        this.MannheimActualizados = sendData.Actualizados;
        this.MannheimCantidad = sendData.Cantidad;
      }

      this.code = '';

      this.Enviando = false
    },

    async marcaSearch(){
      this.imgMarca = this.MarcaSeleccionada.Img;

      this.Modelos = await API.GET_MODELSBYMARCA(this.MarcaSeleccionada.CodigoMarcaVehiculo);

      this.Modelos.map(e => {
        e.formatModelo = e.Modelo + ' ' + e.Motor + ' ' + e.AñoI + ' - ' + e.AñoT;
      })

    },

    
    async modelSearchDos() {
      var Datos = await API.POST_COUNT_PRODUCT_BY_MODELS(
      this.ModeloSeleccionado.CodigoModelo
      );
      //count
      this.AlsaciaCount = Datos.AlsaciaCount;
      this.RefaxCount = Datos.RefaxCount;
      this.BicimotoCount = Datos.BicimotoCount;
      this.MannheimCount = Datos.MannheimCount;
      //print dates
      this.imgModelo = Datos.Modelo.Img;
      this.CodigoProducto = Datos.Modelo.CodigoProducto;
      this.Modelo = Datos.Modelo.Modelo + " " + Datos.Modelo.Motor;
      this.AñoI = Datos.Modelo.AñoI;
      this.AñoT = Datos.Modelo.AñoT;
      this.MarcaVehiculo = Datos.Modelo.MarcaVehiculo;
      this.CodigoModelo = Datos.Modelo.CodigoModelo;
      this.refaxUrl = Datos.Modelo.Url;
      this.alsaciaUrl = Datos.Modelo.UrlAlsacia;
      this.bicimotoUrl = Datos.Modelo.UrlBicimoto;
      this.LastUpdateRefax = Datos.Modelo.LastUpdateRefax ||'NUNCA';
      this.LastUpdateAlsacia = Datos.Modelo.LastUpdateAlsacia ||'NUNCA';
      this.LastUpdateBicimoto = Datos.Modelo.LastUpdateBicimoto ||'NUNCA';
      this.LastUpdateMannheim = Datos.Modelo.LastUpdateMannheim ||'NUNCA';
    },

    async modelSearch() {

        this.Enviando = true;
        this.RefaxCreados = 0;
        this.RefaxActualizados = 0;
        this.RefaxCantidad = 0;
        this.AlsaciaCreados = 0;
        this.AlsaciaActualizados = 0;
        this.AlsaciaCantidad = 0;
        this.BicimotoCreados = 0;
        this.BicimotoActualizados = 0;
        this.BicimotoCantidad = 0;
        this.MannheimCreados = 0;
        this.MannheimActualizados = 0;
        this.MannheimCantidad = 0;
        this.linkRefax = '';
        this.linkAlsacia = '';
        this.linkBicimoto = '';

      var Datos = await API.POST_COUNT_PRODUCT_BY_MODELS(
        this.ModeloSeleccionado.CodigoModelo
      );
      console.log(Datos);
      //count
      this.AlsaciaCount = Datos.AlsaciaCount;
      this.RefaxCount = Datos.RefaxCount;
      this.BicimotoCount = Datos.BicimotoCount;
      this.MannheimCount = Datos.MannheimCount;
      //print dates
      this.imgModelo = Datos.Modelo.Img;
      this.CodigoProducto = Datos.Modelo.CodigoProducto;
      this.Modelo = Datos.Modelo.Modelo + " " + Datos.Modelo.Motor;
      this.AñoI = Datos.Modelo.AñoI;
      this.AñoT = Datos.Modelo.AñoT;
      this.MarcaVehiculo = Datos.Modelo.MarcaVehiculo;
      this.CodigoModelo = Datos.Modelo.CodigoModelo;
      this.refaxUrl = Datos.Modelo.Url;
      this.alsaciaUrl = Datos.Modelo.UrlAlsacia;
      this.bicimotoUrl = Datos.Modelo.UrlBicimoto;
      this.LastUpdateRefax = Datos.Modelo.LastUpdateRefax ||'NUNCA';
      this.LastUpdateAlsacia = Datos.Modelo.LastUpdateAlsacia ||'NUNCA';
      this.LastUpdateBicimoto = Datos.Modelo.LastUpdateBicimoto ||'NUNCA';
      this.LastUpdateMannheim = Datos.Modelo.LastUpdateMannheim ||'NUNCA';

      this.Enviando = false;

    },
  },

  //Apis
  async created() {
    this.Marcas = await API.GET_MARCAS();
  },

  //WindowsOnready
  mounted() {
    // console.log(this.$el.querySelectorAll('a'));
  },
};
</script>