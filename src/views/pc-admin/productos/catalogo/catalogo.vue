<template>
    <div>
    <h6>Seleccione modelo.</h6>
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


    <v-row >
      <v-col v-if="imgMarca != '' && Enviando == false" cols="4" class="pa-0 ma-0 center aling-center" style="text-align: -webkit-center;">
        <v-img
          max-width="100"
          :src="'http://localhost:3000/marcavehiculo/' + this.imgMarca"
        ></v-img>
      </v-col>
      <v-col v-if="imgModelo != '' && Enviando == false" cols="8" class="pa-0 ma-0 center aling-center" style="text-align: -webkit-center;">
        <v-img
          max-width="100"
          :src="'http://localhost:3000/vehiculo/'+ this.imgModelo + '.png'"
        ></v-img>
      </v-col>
    </v-row>


    <div class="center" v-if="Enviando == true">
      <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
      <p>Cargando, por favor espere...</p>
    </div>



    <div v-if="Modelo != '' && Enviando == false" class="subtitle-1 pt-2 pb-2 text--secondary">
    <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Importadora
          </th>
          <th class="text-center">
            Productos
          </th>
          <th class="text-center">
            Disponibles
          </th>
          <th class="text-center">
            Agotados
          </th>
          <th class="text-center">
            Ultima Actualización
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Refax</td>
          <td class="text-center">{{ RefaxCount }}</td>
          <td class="text-center">{{ RefaxCountD }}</td>
          <td class="text-center">{{ RefaxCountA }}</td>
          <td class="text-center">{{ LastUpdateRefax == 'NUNCA' ? 'NUNCA' : LastUpdateRefax.slice(0, 10).split('-').reverse().join('/') }}</td>
        </tr>
        <tr>
          <td>Alsacia</td>
          <td class="text-center">{{ AlsaciaCount }}</td>
          <td class="text-center">{{ AlsaciaCountD }}</td>
          <td class="text-center">{{ AlsaciaCountA }}</td>
          <td class="text-center">{{ LastUpdateAlsacia == 'NUNCA' ? 'NUNCA' : LastUpdateAlsacia.slice(0, 10).split('-').reverse().join('/') }}</td>
        </tr> 
        <tr>
          <td>Bicimoto</td>
          <td class="text-center">{{ BicimotoCount }}</td>
          <td class="text-center">{{ BicimotoCountD }}</td>
          <td class="text-center">{{ BicimotoCountA }}</td>
          <td class="text-center">{{ LastUpdateBicimoto == 'NUNCA' ? 'NUNCA' : LastUpdateBicimoto.slice(0, 10).split('-').reverse().join('/') }}</td>
        </tr>
        <tr>
          <td>Mannheim</td>
          <td class="text-center">{{ MannheimCount }}</td>
          <td class="text-center">{{ MannheimCountD }}</td>
          <td class="text-center">{{ MannheimCountA }}</td>
          <td class="text-center">{{ LastUpdateMannheim == 'NUNCA' ? 'NUNCA' : LastUpdateMannheim.slice(0, 10).split('-').reverse().join('/') }}</td>
        </tr>
        <tr>
          <td><b>Total</b></td>
          <td class="text-center">{{ ProductosCount + ProductosCountA}}</td>
          <td class="text-center">{{ ProductosCount }}</td>
          <td class="text-center">{{ ProductosCountA }}</td>
          <td class="text-center">-</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>

    <v-divider></v-divider>

    <div v-if="Modelo != '' && Enviando == false">

      <v-text-field
      class="mt-3 mb-3"
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar Repuesto"
        single-line
        hide-details
      ></v-text-field>


  <v-data-table
    :headers="headers"
    :items="Productos"
    :items-per-page="10"
    class="elevation-1"
    :search="search"
  >
      <template v-slot:item="row">
          <tr>
            <td>
                <v-btn v-if="row.item.CurrentImg != '' && row.item.CurrentImg != null  && row.item.CurrentImg != 'default'" class="mx-2" fab dark small color="cyan" @click="verImagen(row.item)">
                    <v-icon dark>mdi-image</v-icon>
                </v-btn></td>
            <td>{{row.item.Importadora}}</td>
            <td>{{row.item.CodigoImportadora}}</td>
            <td>{{row.item.OEM}}</td>
            <td>{{row.item.Descripcion}}</td>
            <td>{{row.item.Marca}}</td>
            <td>{{row.item.Origen}}</td>
            <td>{{row.item.Stock}}</td>
            <td class="text-right">{{row.item.PrecioCliente}}</td>
            <td>{{ llegada(row.item.Importadora, row.item.Retiro) }}</td>
            <!-- <td>
                <v-btn class="mx-2" fab dark small color="pink" @click="onButtonClick(row.item)">
                    <v-icon dark>mdi-heart</v-icon>
                </v-btn>
            </td> -->
          </tr>
      </template>
  </v-data-table>


<v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      v-model="dialogImg">
        <template>
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >{{ productoSeleccionado.CodigoImportadora }} - {{ productoSeleccionado.Descripcion }}</v-toolbar>
            <v-card-text class="text-center justify-center">
              <div class="text-h2 pa-12"><img :src="'http://localhost:3000/repuestos/' + productoSeleccionado.CurrentImg + '.jpg'"  style="max-width: 20rem; max-height: 20rem"></div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                color="primary"
                @click="dialogImg = false"
              >Cerrar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

</div>

    </div>
</template>

<script>
import API from '../../../../api.js'
import { MargenPrecio } from '../../../global-function/margen-precio.js';
import { FormatearPrecio } from '../../../global-function/formatear-precio.js';
    export default {
    name: 'galeria',
    props: [],
    //Variables
    data: () => ({
        dialogImg: false,
        search: '',
        headers: [
          { text: 'Imagen', value: 'CurrentImg' },
          { text: 'Importadora', value: 'Importadora' },
          { text: 'Codigo', value: 'CodigoImportadora' },
          { text: 'OEM', value: 'OEM' },
          { text: 'Descripcion', value: 'Descripcion' },
          { text: 'Marca', value: 'Marca' },
          { text: 'Origen', value: 'Origen' },
          { text: 'Stock', value: 'Stock' },
          { text: 'Precio', value: 'PrecioCliente' },
          { text: 'Llegada', value: 'Stock' },
        //   { text: 'Llegada', value: 'Llegada' },
        ],
        productoSeleccionado: {
            CodigoImportadora: '',
            CurrentImg: ''
        },
        //SELECCION MODELOS
        MarcaSeleccionada: '',
        ModeloSeleccionado: '',
        Marcas: [],
        Modelos: [],
        Productos: [],
        ProductosCount: 0,
        ProductosCountA: 0,
        AlsaciaCount: 0,
        AlsaciaCountD: 0,
        AlsaciaCountA: 0,
        RefaxCount: 0,
        RefaxCountD: 0,
        RefaxCountA: 0,
        BicimotoCount: 0,
        BicimotoCountD: 0,
        BicimotoCountA: 0,
        MannheimCount: 0,
        MannheimCountD: 0,
        MannheimCountA: 0,
        imgModelo: '',
        CodigoProducto: '',
        Modelo: '',
        AñoI: 0,
        AñoT: '',
        MarcaVehiculo: '',
        CodigoModelo: '',
        refaxUrl: '',
        alsaciaUrl: '',
        bicimotoUrl: '',
        LastUpdateRefax: '',
        LastUpdateAlsacia: '',
        LastUpdateBicimoto: '',
        LastUpdateMannheim: '',
        Enviando: false,
    }),
    components: {
      
    },

    //Variable en base a otra
    computed: {
    //    Example : function() { 
        //   return this.existe ? this.existe : this.nop
        // }
    },

    watch: {
    //   UnaVariable: function (val) { // val es el valor anterior
        // this.Ejemplo = val + ' ' + this.UnaVariable
    //   },
    },

    // funciones 
    methods: {
        // Formulario: <v-form ref="Ejemplo" lazy-validation></v-form> // :rules="EjemploRules" // EjemploRules: [(v) => !!v || "Seleccione agencia de su preferencia"] // this.$refs.formEjemplo.validate(); 
    async marcaSearch(){
      this.Productos = [];
      this.imgModelo = '';
      this.Modelo = '';
      this.imgMarca = this.MarcaSeleccionada.Img;

      this.Modelos = await API.GET_MODELSBYMARCA(this.MarcaSeleccionada.CodigoMarcaVehiculo);

      this.Modelos.map(e => {
        e.formatModelo = e.Modelo + ' ' + e.Motor + ' ' + e.AñoI + ' - ' + e.AñoT;
      })

    },

    async modelSearch() {

      this.Enviando = true;
      
      var Datos = await API.POST_COUNT_PRODUCT_BY_MODELS(
        this.ModeloSeleccionado.CodigoModelo
      );
      //Aqui lo que se quiere hacer al seleccionar el modelo, Json respuesta: { AlsaciaCount, RefaxCount, BicimotoCount, MannheimCount, Modelo, ProductosList }
      //count
      this.ProductosCount = Datos.ProductosCount;
      this.ProductosCountA = Datos.ProductosCountA;
      this.AlsaciaCount = Datos.AlsaciaCount;
      this.AlsaciaCountD = Datos.AlsaciaCountD;
      this.AlsaciaCountA = Datos.AlsaciaCountA;
      this.RefaxCount = Datos.RefaxCount;
      this.RefaxCountD = Datos.RefaxCountD;
      this.RefaxCountA = Datos.RefaxCountA;
      this.BicimotoCount = Datos.BicimotoCount;
      this.BicimotoCountD = Datos.BicimotoCountD;
      this.BicimotoCountA = Datos.BicimotoCountA;
      this.MannheimCount = Datos.MannheimCount;
      this.MannheimCountD = Datos.MannheimCountD;
      this.MannheimCountA = Datos.MannheimCountA;
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
      //Productos
      Datos.ProductosList.map(e => {
        e.PrecioCliente = FormatearPrecio(MargenPrecio(e))
      })


      this.Productos = Datos.ProductosList;

      this.Enviando = false;
    },

    verImagen(producto){
        this.productoSeleccionado = producto
        console.log(producto)
        this.dialogImg = true
    },

    llegada(Importadora, Retiro){
      var FechaEntrega;
      let date = new Date()


      let month = date.getMonth() + 1
      let year = date.getFullYear()

      var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      ultimoDia = ultimoDia.getDate()
      console.log(this.Mannheim)
      
      if (Retiro == true) {
        return 'Bodega'
      }else if (Importadora == 'Mannheim') {
        var day = date.getDate() + 5
        if(day > ultimoDia){
          var DiaRestante = day - ultimoDia
          day = DiaRestante
          month = month + 1
          if(month > 12){
            month = '0' + 1
          }
        }

      } else if (Importadora == 'Alsacia') {
        var day = date.getDate() + 4
        if(day > ultimoDia){
          var DiaRestante = day - ultimoDia
          day = DiaRestante
          month = month + 1
          if(month > 12){
            month = '0' + 1
          }
        }
      } else if (Importadora == 'Bicimoto') {
        var day = date.getDate() + 2
        if(day > ultimoDia){
          var DiaRestante = day - ultimoDia
          day = DiaRestante
          month = month + 1
          if(month > 12){
            month = '0' + 1
          }
        }
      } else if (Importadora == 'Refax') {
        var day = date.getDate() + 2
        if(day > ultimoDia){
          var DiaRestante = day - ultimoDia
          day = DiaRestante
          month = month + 1
          if(month > 12){
            month = '0' + 1
          }
        }
      }

      let dias = [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ];



      if (month < 10) {
        var fechaComoCadena = `${year}-0${month}-${day}`;
      } else {
        var fechaComoCadena = `${year}-${month}-${day}`;
      }

      var numeroDia = new Date(fechaComoCadena).getDay();


      if (numeroDia == 0) {
        day = day + 1
        if (month < 10) {
          var fechaComoCadena = `${year}-0${month}-${day}`;
        } else {
          var fechaComoCadena = `${year}-${month}-${day}`;
        }
      } else if (numeroDia == 6) {
        day = day + 2
        if (month < 10) {
          var fechaComoCadena = `${year}-0${month}-${day}`;
        } else {
          var fechaComoCadena = `${year}-${month}-${day}`;
        }
      }

      numeroDia = new Date(fechaComoCadena).getDay();

      var Dia = dias[numeroDia + 1];


      if (month < 10) {
        if(day < 10){
          FechaEntrega = `0${day}/0${month}/${year}`
        }else{
          FechaEntrega = `${day}/0${month}/${year}`
        }

      } else {
        if(day < 10){
          FechaEntrega = `0${day}/${month}/${year}`
        }else{
          FechaEntrega = `${day}/${month}/${year}`
        }
      }

      return Dia + ', ' + FechaEntrega
    }

    },

    //Apis
    async created(){
        this.Marcas = await API.GET_MARCAS();
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>