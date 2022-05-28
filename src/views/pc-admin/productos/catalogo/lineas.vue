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
              v-model="LineaSeleccionada"
              :items="Lineas"
              menu-props="auto"
              label="Seleccione Linea"
              hide-details
              prepend-icon="mdi-car"
              single-line
              item-text="Descripcion"
              return-object
              @change="lineaSearch()"
            ></v-autocomplete>
          </v-col>
        </v-row>


    <div class="center" v-if="Enviando == true">
      <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
      <p>Cargando, por favor espere...</p>
    </div>

    <v-divider></v-divider>

    <div v-if="Productos.length != 0 && Enviando == false">

      <v-row>
        <v-col cols="9">
          <v-text-field
          class="mt-3 mb-3"
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar Repuesto"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="2" class="text-center d-flex justify-center">
          <v-container
          class="px-0"
          fluid
        >
          <v-switch
            v-model="switchRepetidos"
            label="Ocultar Repetidos"
            @click="Repetidos"
          ></v-switch>
        </v-container>
        </v-col>
        <v-col cols="1" class="text-center d-flex justify-center" style="align-self: center;">
          <div>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  OPCIONES
                </v-btn>
              </template>
              <v-list>
                <v-list-item link>
                  <v-list-item-title @click="downloadCatalogo()">Descargar Excel</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
      </v-row>
  

        <div class="center" v-if="EnviandoM == true">
          <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
          <p>Cargando, por favor espere...</p>
        </div>

          <v-simple-table v-if="EnviandoM == false && Mercado != []">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Descripcion
                  </th>
                  <th class="text-left">
                    Origen
                  </th>
                  <th class="text-right">
                    StockM
                  </th>
                  <th class="text-right">
                    Precio I.
                  </th>
                  <th class="text-right">
                    Precio C.
                  </th>
                  <th class="text-right">
                    Precio M.
                  </th>
                  <th class="text-right">
                    Precio R.
                  </th>
                  <th class="text-right">
                    Margen R.
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr 
                v-for="item in Mercado">
                  <td v-if="item.UrlM == ''">{{ item.DescripcionM }}</td>
                  <td v-else><a :href="item.UrlM" class="text--primary" target="_blank">
                      {{ item.DescripcionM }}
                  </a></td>
                  <td class="text-right">{{ item.Origen }}</td>
                  <td class="text-right">{{ item.StockM }}</td>
                  <td class="text-right">{{ item.Precio }}</td>
                  <td class="text-right">{{ item.PrecioCliente }}</td>
                  <td class="text-right">{{ item.PrecioMercado }}</td>
                  <td class="text-right">{{ item.PrecioRecomendado }}</td>
                  <td class="text-right">{{ item.MargenR }}%</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          



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
              <td>{{row.item.Modelo}}</td>
              <td>{{row.item.Marca}}</td>
              <td>{{row.item.Origen}}</td>
              <td>{{row.item.Stock}}</td>
              <td class="text-right">
                <v-btn dark v-if="row.item.Importadora == 'Alsacia' || row.item.Importadora == 'Mannheim'" color="green" @click="PrecioMargen(row.item.Importadora, row.item.OEM, row.item.PrecioImportadora, row.item.PrecioCliente, row.item.Descripcion, row.item.Origen)">
                    {{row.item.PrecioCliente}}
                </v-btn>
                <v-btn dark v-else color="green" @click="PrecioMargen(row.item.Importadora, row.item.CodigoImportadora, row.item.PrecioImportadora, row.item.PrecioCliente, row.item.Descripcion, row.item.Origen)">
                  {{row.item.PrecioCliente}}
              </v-btn></td>
              <td v-if="row.item.Bodega < 1">{{ llegada(row.item.Importadora, row.item.Retiro) }}</td>
              <td v-else>Bodega</td>
              <!-- <td>
                <v-btn v-if="row.item.Marketplace == true" class="mx-2" fab dark small color="green" @click="marketplace(row.item)">
                    <v-icon dark>mdi-facebook</v-icon>
                </v-btn>
                <v-btn v-else class="mx-2" fab dark small color="blue" @click="marketplace(row.item)">
                    <v-icon dark>mdi-facebook</v-icon>
                </v-btn>
                </td> -->
                <td style="width: 7rem">
                  <v-btn class="mx-2" fab dark small color="blue" v-if="row.item.CantidadAgregada == 0 && spinnerCantidad == false"  @click="AgregarCarritoEmit(row.item.CodigoImportadora, 1, row.item.Modelo)">
                      <v-icon dark>mdi-cart</v-icon>
                  </v-btn>
                  
             <div class="spinner" v-if="spinnerCantidad == true" style="max-width: 1rem; max-height: 1rem"></div>

            <div class="minusplusnumber" v-if="row.item.CantidadAgregada > 0 && spinnerCantidad == false">
              <div class="mpbtn minus" @click="restarCantidad(row.item.CodigoImportadora)">
                  -
              </div>
              
              <div id="field_container">
                {{ row.item.CantidadAgregada }}
              </div>
              
              <div class="mpbtn plus" @click="AgregarCarritoEmit(row.item.CodigoImportadora, 1, row.item.Modelo)">
                  +
              </div>
          </div>


                </td>
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
              >Marketplace</v-toolbar>
              <v-card-text class="text-center justify-center">
                <div class="text-h2 pa-12"><img :src="productoSeleccionado.CurrentImg"  style="max-width: 20rem; max-height: 5rem"></div>
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

        <v-dialog
        transition="dialog-bottom-transition"
        max-width="800"
      v-model="dialogFB">
        <template>
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >{{ productoSeleccionado.CodigoImportadora }} - {{ productoSeleccionado.Descripcion }}</v-toolbar>
            <v-card-text>

                <p class="mt-3" style="margin-bottom: 0.2rem !important;">Editar Titulo:</p>

                <v-text-field
                  :value="productoSeleccionado.Descripcion"
                  @blur="guardarDescripcion(productoSeleccionado.Importadora, productoSeleccionado.CodigoImportadora, productoSeleccionado.OEM, $event.target.value)"
                ></v-text-field>

                <p>Copiar en marketplace:</p>
                <v-row>
                    <v-col cols="2">
                        <v-btn
                          color="primary"
                          elevation="2"
                          @click="copiarTitulo()"
                        >Titulo</v-btn>
                    </v-col>
                    <v-col cols="3">
                        <v-btn
                          color="primary"
                          elevation="2"
                          @click="copiarDescripcion()"
                        >Descripcion</v-btn>
                    </v-col>
                    <v-col cols="2">
                        <v-btn
                          color="primary"
                          elevation="2"
                          @click="copiarTag()"
                        >Tags</v-btn>
                    </v-col>
                </v-row>
                <br>
                <p>Aplicaicones:</p>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Marca
                        </th>
                        <th class="text-left">
                          Modelo
                        </th>
                        <th class="text-left">
                          AñoI
                        </th>
                        <th class="text-left">
                          AñoT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in aplicaciones.split('@')"
                      >
                        <td>{{ item.split(' ')[0] }}</td>
                        <td>{{ item.replace(item.split(' ')[0] + ' ', '').replace(' ' + item.split(' ')[item.split(' ').length - 3] + ' - ' + item.split(' ')[item.split(' ').length - 1], '').replace(item.split(' ')[0], '' ) }}</td>
                        <td>{{ item.split(' ')[item.split(' ').length - 1] }}</td>
                        <td>{{ item.split(' ')[item.split(' ').length - 3] }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>



                <v-container fluid>
                  <v-checkbox v-model="checkboxMarketplace" @change="changeMarketplace()">
                    <template v-slot:label>
                      <div>
                        Publicado en Marketplace
                      </div>
                    </template>
                  </v-checkbox>
                </v-container>




                <v-divider></v-divider>

          <v-row>
            <v-col cols="12">
              <v-card>
                <v-row>
                <v-col cols="6">
                    <a :href="productoSeleccionado.CurrentImg"
                    target="_blank">
                    <v-img
                          :src="productoSeleccionado.CurrentImg"
                          class="align-end"
                          contain
                          height="150px" style="font-size: 0.8rem">
                        </v-img>
                    </a>
                </v-col>
                <v-col cols="6">
                    <a :href='"https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + productoSeleccionado.CodigoImportadora + "/" + productoSeleccionado.CodigoImportadora + "A.jpg"'
                    target="_blank"
                    v-if="productoSeleccionado.Importadora == 'Refax'">
                    <v-img
                      :src='"https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + productoSeleccionado.CodigoImportadora + "/" + productoSeleccionado.CodigoImportadora + "A.jpg"'
                      class="align-end"
                      contain
                      height="150px" style="font-size: 0.8rem"
                      >
                      
                    </v-img>
                    </a>
                    <a :href="productoSeleccionado.Img"
                    target="_blank"
                    v-if="productoSeleccionado.Importadora == 'Alsacia'">
                    <v-img
                      :src="productoSeleccionado.Img"
                      class="align-end"
                      contain
                      height="150px" style="font-size: 0.8rem" >
                      
                    </v-img>
                    </a>
                    <a :href="productoSeleccionado.Img"
                    target="_blank"
                    v-if="productoSeleccionado.Importadora == 'Bicimoto'">
                    <v-img
                      :src="productoSeleccionado.Img"
                      class="align-end"
                      contain
                      height="150px" style="font-size: 0.8rem" >
                    </v-img>
                    </a>
                    <a :href='"http://200.73.35.244:8080/webclient/images/" + productoSeleccionado.OEM + ".jpg"'
                    target="_blank"
                    v-if="productoSeleccionado.Importadora == 'Mannheim'">
                    <v-img
                      :src='"http://200.73.35.244:8080/webclient/images/" + productoSeleccionado.OEM + ".jpg"'
                      class="align-end"
                      contain
                      height="150px" style="font-size: 0.8rem" >
                    </v-img>
                    </a>
                </v-col>
                </v-row>
                <v-divider></v-divider>
        
        <v-list-item class="text-center">
          <v-list-item-content>
            <v-list-item-title>OEM: {{productoSeleccionado.OEM || productoSeleccionado.CodigoImportadora}}</v-list-item-title>
            <v-list-item-subtitle>
              {{ productoSeleccionado.Importadora }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ productoSeleccionado.Descripcion }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
        
        
         <v-card-actions class="white justify-center">
                      <v-btn
                        v-for="(social, i) in socials"
                        :key="i"
                        :color="social.color"
                        class="white--text"
                        fab
                        icon
                        @click="imgController(productoSeleccionado.CodigoImportadora, productoSeleccionado.OEM, productoSeleccionado.Importadora, social.action, productoSeleccionado.Img)"
                      >
                        <v-icon>{{ social.icon }}</v-icon>
                      </v-btn>
                      <v-file-input
                        v-model="file"
                        hide-input
                        color="blue lighten-3"
                        prepend-icon="mdi-image-search"
                        fab
                        accept="image/jpg"
                        truncate-length="15"
                        @change="uploadImg(productoSeleccionado.CodigoImportadora, productoSeleccionado.Importadora)"
                        style="max-width: 1rem; padding-bottom: 1.1rem; margin-left: 1rem;"></v-file-input>
                    </v-card-actions>
        
              </v-card>
            </v-col>
          </v-row>

          <v-textarea
          :class="{ 'd-none': displayTituloFB }"
          style="max-width: 0px; max-height: 0px;"
          solo
          v-on:focus="$event.target.select()"
          name="name"
          label="label"
          ref="tituloFB"
          :value="tituloFB"
        >
        </v-textarea>
    
        <v-textarea
        :class="{ 'd-none': displayDescripcionFB }"
        style="max-width: 0px; max-height: 0px;"
        solo
        v-on:focus="$event.target.select()"
        name="name"
        label="label"
        ref="descripcionFB"
        :value="descripcionFB"
      >
      </v-textarea>
    
    <v-textarea
    :class="{ 'd-none': displayTagFB }"
    style="max-width: 0px; max-height: 0px;"
    solo
    v-on:focus="$event.target.select()"
    name="name"
    label="label"
    ref="tagFB"
    :value="tagFB"
    >
    </v-textarea>


            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                color="primary"
                @click="dialogFB = false"
              >Cerrar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>


  </div>


    </div>
</template>

<script>
import API from '../../../../api.js';
import { MargenPrecio } from '../../../global-function/margen-precio.js';
import { FormatearPrecio } from '../../../global-function/formatear-precio.js';
    export default {
    name: 'lineas',
    props: ["CantidadMinima", "CantidadMaxima", "CantidadAgregada", "spinnerCantidad", "Carrito", "Usuario", "Login"],
    //Variables
    data: () => ({
        checkboxMarketplace: false,
        file: null,
        imgUpdate: 0,
        dialogImg: false,
        dialogFB: false,
        search: '',
        headers: [
          { text: 'Imagen', value: 'CurrentImg' },
          { text: 'Importadora', value: 'Importadora' },
          { text: 'Codigo', value: 'CodigoImportadora' },
          { text: 'OEM', value: 'OEM' },
          { text: 'Descripcion', value: 'Descripcion' },
          { text: 'Modelo', value: 'Modelo' },
          { text: 'Marca', value: 'Marca' },
          { text: 'Origen', value: 'Origen' },
          { text: 'Stock', value: 'Stock' },
          { text: 'Precio', value: 'PrecioCliente' },
          { text: 'Llegada', value: 'Stock' },
          // { text: 'Marketplace', value: 'Marketplace' },
          { text: 'Carrito' },
        //   { text: 'Llegada', value: 'Llegada' },
        ],
        productoSeleccionado: {
            CodigoImportadora: '',
            CurrentImg: '',
            Descripcion: '',
            Modelo: '',
            MarcaVehiculo: '',
            OEM: '',
        },
        tituloModelo: '',
        ModelosCompatibles: [],
        switchRepetidos: false,
        MarcaSeleccionada: '',
        LineaSeleccionada: '',
        ProductosCount: 0,
        Mercado: [],
        EnviandoM: false,
        Marcas: [],
        Lineas: [],
        Temp: [],
        Productos: [],
        imgMarca: '',
        Enviando: false,
        //Copy paste
        displayTituloFB: true,
        displayDescripcionFB: true,
        displayTagFB: true,
        socials: [
        {
          icon: 'mdi-image-plus',
          action: 'asignar',
          color: 'indigo',
        },
        {
          icon: 'mdi-image-remove',
          action: 'eliminar',
          color: 'red',
        },
      ],
    }),
    components: {
      
    },

    //Variable en base a otra
    computed: {
    //    Example : function() { 
        //   return this.existe ? this.existe : this.nop
        // }

        tituloFB: function() {
            return `${this.productoSeleccionado.Descripcion} ${this.productoSeleccionado.MarcaVehiculo} ${this.tituloModelo.toString().replaceAll(',', '')}`;
        },

        descripcionFB: function() {
            return `MODELOS COMPATIBLES:
${this.ModelosCompatibles.toString().replaceAll(',', '\n')}

MARCA: ${this.productoSeleccionado.Marca}

ORIGEN: ${this.productoSeleccionado.Origen}

Somos Chilerepuestos una empresa dedicada a la venta de repuestos para automóviles online y física.

Estacionamiento en local. 🚘
Delivery Santiago. 🚚
Envio a Regiones. 🚛
Garantia de 3 meses. 🔒

Productos Nuevos originales y alternativos.`;
        },

        tagFB: function() {
            return `${this.productoSeleccionado.Descripcion.replaceAll(' ', ', ').replaceAll('-', '').replaceAll('/', '').replaceAll(',,', ',').replaceAll(',,', ',').replaceAll(',,', ',').replaceAll(', ,', ',')}, ${this.productoSeleccionado.MarcaVehiculo}, ${this.ModelosCompatibles.toString().replaceAll('-', '').replaceAll('/', '').replaceAll(' ', ',').replaceAll(',,', ',').replaceAll(',,', ',').replaceAll(',,', ',')}`;
        },

        aplicaciones: function(){
         return `${this.ModelosCompatibles.toString().replaceAll(',', '@')}`
        }

    },

    watch: {
    //   UnaVariable: function (val) { // val es el valor anterior
        // this.Ejemplo = val + ' ' + this.UnaVariable
    //   },
    },

    // funciones 
    methods: {
        // Formulario: <v-form ref="Ejemplo" lazy-validation></v-form> // :rules="EjemploRules" // EjemploRules: [(v) => !!v || "Seleccione agencia de su preferencia"] // this.$refs.formEjemplo.validate(); 
    

        Repetidos(){
          if(this.switchRepetidos == true){
            var NoDuplicados = [];

            this.Temp = this.Productos.slice()

            for(var i = 0; i < this.Productos.length; i++){
                if(i > 0){
                  if(this.Productos[i].Importadora == 'Refax' || this.Productos[i].Impotadora == 'Alsacia'){
                    if(this.Productos[i].CodigoImportadora == this.Productos[i - 1].CodigoImportadora ){
                      if(i == 1 && this.Productos[i].CodigoImportadora != this.Productos[i + 1].CodigoImportadora){
                        console.log('Se cumplio')
                        NoDuplicados.push(this.Productos[i])
                      }
                    }else{
                        NoDuplicados.push(this.Productos[i])
                    }
                  }else if(this.Productos[i].Importadora == 'Mannheim' || this.Productos[i].Importadora == 'Bicimoto'){
                    if(this.Productos[i].OEM == this.Productos[i - 1].OEM){
                    }else{
                      NoDuplicados.push(this.Productos[i])
                    } 
                  }
                }
            }
            this.Productos = NoDuplicados;
            this.ProductosCount = NoDuplicados.length + 1;
          }else{

            this.Productos = this.Temp;
            
          }
        },

      async sumarCantidad(CodigoImportadora, Cantidad, Modelo) {
        console.log('')
        await this.$emit('AgregarAlCarritoEmit', CodigoImportadora, Cantidad, Modelo)
        var e = this.Productos.length;
        for(let i = 0; i < e; i++){
        if(this.Productos[i].CodigoImportadora == CodigoImportadora){
          this.Productos[i].CantidadAgregada = this.Productos[i].CantidadAgregada + 1;
        }
      }
      },

      async restarCantidad(CodigoImportadora) {
        await this.$emit('RestarCarritoEmit', CodigoImportadora)
        var e = this.Productos.length;
        for(let i = 0; i < e; i++){
        var e = this.Productos.length;
        if(this.Productos[i].CodigoImportadora == CodigoImportadora){
          this.Productos[i].CantidadAgregada = this.Productos[i].CantidadAgregada - 1;
        }
      }
      },

    async AgregarCarritoEmit(CodigoImportadora, Cantidad, Modelo){
      await this.$emit('AgregarCarritoEmit', CodigoImportadora, Cantidad, Modelo);
      var e = this.Productos.length;
      for(let i = 0; i < e; i++){
        if(this.Productos[i].CodigoImportadora == CodigoImportadora){
          this.Productos[i].CantidadAgregada = this.Productos[i].CantidadAgregada + 1;
        }
      }
    },


    async marcaSearch(){
      this.Productos = [];
      this.imgModelo = '';
      this.LineaSeleccionada = 'Seleccione una linea';
      this.imgMarca = this.MarcaSeleccionada.Img;

      this.Lineas = await API.GET_LINEAS();

    },

    async changeMarketplace(){
      await API.PRODUCT_MARKETPLACE(this.productoSeleccionado.Importadora, this.productoSeleccionado.CodigoImportadora, this.productoSeleccionado.OEM, this.checkboxMarketplace)

      this.Productos.map(e => {
            if(e.CodigoImportadora == this.productoSeleccionado.CodigoImportadora){
                e.Marketplace = this.checkboxMarketplace
                console.log(e)
            }
            return e;
      })
    },

    async lineaSearch() {
    
      console.log(this.Carrito, '')
      this.Mercado = [];
      this.search = '';
      this.Enviando = true;

      var Productos = await API.POST_LINEA_SEARCH(
        this.MarcaSeleccionada.Descripcion, this.LineaSeleccionada.Descripcion
      );

      Productos.Datos = Productos.Datos.map(e => {
        e.PrecioCliente = FormatearPrecio(MargenPrecio(e))
            e.CantidadAgregada = 0;
            return e;
        })

      var NoDuplicados = [];

      for(var i = 0; i < Productos.Datos.length; i++){
          if(i > 0){
            if(Productos.Datos[i].OEM == Productos.Datos[i - 1].OEM || Productos.Datos[i].CodigoImportadora == Productos.Datos[i - 1].CodigoImportadora ){
            }else{
                NoDuplicados.push(Productos.Datos[i])
            }
          }
      }

      console.log(Productos.Datos);

      this.Productos = Productos.Datos;
      this.ProductosCount = Productos.lenght + 1;

      var e = this.Productos.length;
        for(let i = 0; i < e; i++){
          for(let a = 0; a < this.CantidadAgregada.length; a++){
            if(this.Productos[i].CodigoImportadora == this.CantidadAgregada[a].CodigoImportadora){
              this.Productos[i].CantidadAgregada = this.CantidadAgregada[a].Cantidad;
            }
          }
        }
      //Aqui lo que se quiere hacer al seleccionar el modelo, Json respuesta: { AlsaciaCount, RefaxCount, BicimotoCount, MannheimCount, Modelo, ProductosList }
      //count

      this.Enviando = false;
    },


    copiarTitulo(){
            this.displayTituloFB = false
            setTimeout(() =>  this.$refs.tituloFB.focus(), 10);
            setTimeout(() =>  document.execCommand('copy'), 20);
            setTimeout(() =>  this.displayTituloFB = true, 30);
    },

    async downloadCatalogo(){
      
      var Catalogo = []

      this.Productos.map(e => {
        var Json = {
          Repuesto: e.Descripcion,
          Modelo: e.Modelo,
          Años: e.AñoI + ' - ' + e.AñoT,
          Marca: e.Marca,
          Origen: e.Origen,
          Repuesto: e.Descripcion,
          Precio: e.PrecioCliente
        }
      Catalogo.push(Json)
      })

      let excel = await API.CATALOGO_EXCEL(Catalogo, 'CATALOGO ' + this.LineaSeleccionada.Descripcion + ' ' + new Date().getDate() + '-' + ((parseInt(new Date().getMonth()) + 1) < 10? '0' + (parseInt(new Date().getMonth()) + 1) : (parseInt(new Date().getMonth()) + 1))  + '-' + new Date().getFullYear());


    },

    async PrecioMargen(Importadora, CodigoImportadora, PrecioImportadora, PrecioCliente, Descripcion, Origen){
        this.EnviandoM = true;

        var Comprobar = parseInt(PrecioCliente.split('.')[0].slice(-1));

        if(parseInt(Comprobar) < 6){
          PrecioCliente = parseInt(PrecioCliente.split('.')[0].slice(0, -1) + 5 + '990')
        }else{
          PrecioCliente = parseInt(PrecioCliente.split('.')[0].slice(0, -1) + 9 + '990')
        }

      var Datos = await API.PRECIOMERCADO(Importadora, CodigoImportadora)
          if(Importadora == 'Mannheim'){
            var Precio = Math.round(PrecioImportadora * 1.29);
          }else{
            var Precio = Math.round(PrecioImportadora * 1.19);
          }
        // new
        if(Datos.Stock == '0' || Datos.Stock == 'Agotado'){
          if(Importadora == 'Alsacia'){
              var UrlM = 'https://www.takora.cl/autos/repuestos/advanced_search_result.php?keywords=' + CodigoImportadora;
            }else if(Importadora == 'Mannheim'){
              var UrlM = 'https://repuestos.buscalibre.cl/repuestos/search?q=' + CodigoImportadora;;
            }else if(Importadora == 'Refax'){
              var UrlM = '';
            }else if(Importadora == 'Bicimoto'){
              var UrlM = 'https://www.bicimoto.cl/busqueda.php?search=' + CodigoImportadora;
            }
          var Json = [{
                    DescripcionM: Descripcion, 
                    StockM: 'Agotado',
                    Precio: 0,
                    PrecioCliente: 0,
                    PrecioMercado: 0,
                    PrecioRecomendado: 0,
                    MargenR: 0,
                    Origen: '',
                    UrlM: UrlM
              }]

              this.Mercado = Json
              this.EnviandoM = false;
          }else{
            console.log(Datos)
            //Empezamos
            var p = Datos.Precio.replaceAll('.', '').replaceAll(' ', '').split('$').splice(1).sort();
            var PrecioMercado = p.map( e => { return parseInt(e) })
            if(Importadora == 'Mannheim' || Importadora == 'Alsacia'){
              var OrigenM = Datos.Origen.split('-')
            }
            if(Importadora == 'Mannheim'){
              var PrecioRecomendado = p.map( e => { return Math.round(parseInt(e) - (parseInt(e) * 0.05)) })
              var MargenR = p.map( e => { return ((parseInt(e) - (parseInt(e) * 0.05) - Precio) / Precio).toString().split('.')[1][0] + ((parseInt(e) - (parseInt(e) * 0.05) - Precio) / Precio).toString().split('.')[1][1] })
            }else if(Importadora == 'Bicimoto'){
              var PrecioRecomendado = [PrecioCliente];
              var MargenR = [((PrecioCliente - Precio) / Precio).toString().split('.')[1][0] + ((PrecioCliente - Precio) / Precio).toString().split('.')[1][1]]
            }else{
              var PrecioRecomendado = p.map( e => {  if(e == '0'){ return 1000 }else{ return Math.round(parseInt(e) - (parseInt(e) * 0.20)) } })
              var MargenR = p.map( e => { if(e == '0'){ return 1000 }else{return ((parseInt(e) - (parseInt(e) * 0.20) - Precio) / Precio).toString().split('.')[1][0] + ((parseInt(e) - (parseInt(e) * 0.05) - Precio) / Precio).toString().split('.')[1][1]} })
            }
            //Definir URL
            if(Importadora == 'Alsacia'){
              var UrlM = 'https://www.takora.cl/autos/repuestos/advanced_search_result.php?keywords=' + CodigoImportadora;
            }else if(Importadora == 'Mannheim'){
              var UrlM = 'https://repuestos.buscalibre.cl/repuestos/search?q=' + CodigoImportadora;;
            }else{
              var UrlM = '';
            }     
            this.Mercado = [];
            if(Importadora == 'Mannheim' || Importadora == 'Alsacia'){
              for(let i = 0; i < PrecioMercado.length; i++){
                var a = i == 0? Datos.Stock : 'Consultar';

                var Json = {
                    DescripcionM: Descripcion, 
                    StockM: a,
                    Precio: FormatearPrecio(Precio),
                    PrecioCliente: FormatearPrecio(PrecioCliente),
                    PrecioMercado: FormatearPrecio(PrecioMercado[i]),
                    PrecioRecomendado: FormatearPrecio(PrecioRecomendado[i]),
                    MargenR: MargenR[i],
                    Origen: OrigenM[i],
                    UrlM: UrlM
                }
  
                this.Mercado.push(Json)
              }
            }else{
                var Json = {
                    DescripcionM: Descripcion, 
                    StockM: Datos.Stock,
                    Precio: FormatearPrecio(Precio),
                    PrecioCliente: FormatearPrecio(PrecioCliente),
                    PrecioMercado: FormatearPrecio(PrecioMercado[0]),
                    PrecioRecomendado: FormatearPrecio(PrecioRecomendado[0]),
                    MargenR: MargenR[0],
                    Origen: Origen,
                    UrlM: UrlM
              }

              this.Mercado.push(Json)
            }

            console.log(2)
            this.EnviandoM = false;
          }


// OLD

      console.log(Datos)
        // if(Datos.Stock == '0' || Datos.Stock == 'Agotado'){
        //   this.DescripcionM = Descripcion;
        //   this.StockM = 'No Encontrado';
        //   this.UrlM = '';
        //   this.PrecioMercado = 0;
        //   if(Importadora == 'Mannheim'){
        //     this.Precio = Math.round(PrecioImportadora * 1.29);
        //   }else{
        //     this.Precio = Math.round(PrecioImportadora * 1.19);
        //   }
        //   this.PrecioRecomendado = PrecioCliente;
        //   this.MargenR = ((PrecioCliente - this.Precio) / this.Precio).toString().split('.')[1][0] + ((PrecioCliente - this.Precio) / this.Precio).toString().split('.')[1][1]
        //   this.EnviandoM = false;
        // }else{

        // this.DescripcionM =  Descripcion + ' - ' + Datos.Origen;
        // this.OrigenM = Datos.Origen;
        // this.StockM = Datos.Stock;
        // var b = Datos.Precio.replaceAll('.', '').replaceAll(' ', '').split('$').splice(1).sort();
        // b = b.map( e => { return parseInt(e) })
        // b = b.sort(function(a, b) {
        //   return a - b;
        // });
        // this.PrecioMercado = b.map( e => { return FormatearPrecio(e) })
        // if(Importadora == 'Mannheim'){
        //   this.Precio = Math.round(PrecioImportadora * 1.29);
        // }else{
        //   this.Precio = Math.round(PrecioImportadora * 1.19);
        // }
        // this.PrecioCliente =  PrecioCliente;
        // console.log(b)
        // if(b[0] > this.Precio){
        // this.PrecioMercado = this.PrecioMercado[0]
        // var Descuento = parseInt(b[0]) * 0.05;
        // this.PrecioRecomendado = FormatearPrecio(Math.round(parseInt(b[0]) - Descuento));
        // this.MargenR = ((Math.round(parseInt(b[0]) - Descuento) - this.Precio) / this.Precio).toString().split('.')[1][0] + ((Math.round(parseInt(b[0]) - Descuento) - this.Precio) / this.Precio).toString().split('.')[1][1];
        // }else if(b[0] < this.Precio && b[1] > this.Precio ){
        // this.PrecioMercado = this.PrecioMercado[1]
        // var Descuento = parseInt(b[1]) * 0.05;
        // this.PrecioRecomendado = FormatearPrecio(Math.round(parseInt(b[1]) - Descuento));
        // this.MargenR = ((Math.round(parseInt(b[1]) - Descuento) - this.Precio) / this.Precio).toString().split('.')[1][0] + ((Math.round(parseInt(b[1]) - Descuento) - this.Precio) / this.Precio).toString().split('.')[1][1];
        // }else if(b[0] < this.Precio && b[1] < this.Precio &&  b[2] > this.Precio ){
        // this.PrecioMercado = this.PrecioMercado[2]
        // var Descuento = parseInt(b[2]) * 0.05;
        // this.PrecioRecomendado = FormatearPrecio(Math.round(parseInt(b[2]) - Descuento));
        // this.MargenR = ((Math.round(parseInt(b[2]) - Descuento) - this.Precio) / this.Precio).toString().split('.')[1][0] + ((Math.round(parseInt(b[2]) - Descuento) - this.Precio) / this.Precio).toString().split('.')[1][1];
        // }else if(b[0] < this.Precio && b[1] < this.Precio &&  b[2] < this.Precio &&  b[3] > this.Precio ){
        // this.PrecioMercado = this.PrecioMercado[3]
        // var Descuento = parseInt(b[3]) * 0.05;
        // this.PrecioRecomendado = FormatearPrecio(Math.round(parseInt(b[3]) - Descuento));
        // this.MargenR = ((Math.round(parseInt(b[3]) - Descuento) - this.Precio) / this.Precio).toString().split('.')[1][0] + ((Math.round(parseInt(b[3]) - Descuento) - this.Precio) / this.Precio).toString().split('.')[1][1];
        // }

        //   if(Importadora == 'Alsacia'){
        //     this.UrlM = 'https://www.takora.cl/autos/repuestos/advanced_search_result.php?keywords=' + CodigoImportadora;
        //   }else if(Importadora == 'Mannheim'){
        //     this.UrlM = 'https://repuestos.buscalibre.cl/repuestos/search?q=' + CodigoImportadora;;
        //   }else{
        //     this.UrlM = '';
        //   }

        // console.log(this.UrlM.length)
        // this.Precio = FormatearPrecio(this.Precio)
        // this.EnviandoM = false;
        // }
    },

    copiarDescripcion(){
            this.displayDescripcionFB = false
            setTimeout(() =>  this.$refs.descripcionFB.focus(), 10);
            setTimeout(() =>  document.execCommand('copy'), 20);
            setTimeout(() =>  this.displayDescripcionFB = true, 30);
        
    },

    copiarTag(){
            this.displayTagFB = false
            setTimeout(() =>  this.$refs.tagFB.focus(), 10);
            setTimeout(() =>  document.execCommand('copy'), 20);
            setTimeout(() =>  this.displayTagFB = true, 30);
    },

    async uploadImg(CodigoImportadora, Importadora){
      if(this.file.size < 1000000 && this.file.name.split('.')[1] == 'jpg' || this.file.size < 1000000 && this.file.name.split('.')[1] == 'jpeg'){

        var Datos = await API.UPLOAD_IMG_REPUESTO(CodigoImportadora, this.file)
        
        this.imgUpdate = this.imgUpdate + 1; 

        this.productoSeleccionado.CurrentImg = 'http://143.198.165.86:3000/repuestos/' + this.productoSeleccionado.CodigoImportadora + '.jpg?version=' + this.imgUpdate;

        this.file = null;

      }else{
        alert('formato invalido, asegurese de enviar imagen en jpg y que pese menos de 1MB')
      }
    },

    
    async guardarDescripcion(Importadora, CodigoImportadora, OEM, Descripcion){
        var response = await API.PRODUCT_CHANGE_DESCRIPCTION(
            Importadora, CodigoImportadora, OEM, Descripcion
        );

        this.Productos = this.Productos.map(e => {
            if(e.CodigoImportadora == CodigoImportadora){
                e.Descripcion = Descripcion
            }
            return e;
        });

        this.productoSeleccionado.Descripcion = Descripcion; 
    },


    async imgController(CodigoImportadora, OEM, Importadora, Accion, Img){

    var response = await API.IMG_CONTROLLER(
      CodigoImportadora, OEM, Importadora, Accion, Img
    );
    if(Accion == 'asignar'){

        if(this.productoSeleccionado.Importadora == 'Refax'){
            this.productoSeleccionado.CurrentImg = "https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + this.productoSeleccionado.CodigoImportadora + "/" + this.productoSeleccionado.CodigoImportadora + "A.jpg";
        }else if(this.productoSeleccionado.Importadora == 'Mannheim'){
            this.productoSeleccionado.CurrentImg = `http://200.73.35.244:8080/webclient/images/${ this.productoSeleccionado.OEM }.jpg?version=' + imgUpdate`;
        }else if(this.productoSeleccionado.Importadora == 'Alsacia' || this.productoSeleccionado.Importadora == 'Bicimoto'){
            this.productoSeleccionado.CurrentImg = Img;
        }

    }else if(Accion == 'eliminar'){
        this.productoSeleccionado.CurrentImg = 'http://143.198.165.86:3000/repuestos/default.jpg';
    }
    },

    verImagen(producto){
        this.productoSeleccionado = producto;
        this.dialogImg = true;
    },

    async marketplace(producto){
        if(producto.CurrentImg[0] != 'h'){
            producto.CurrentImg = 'http://143.198.165.86:3000/repuestos/' + producto.CurrentImg + '.jpg';
        }
        this.productoSeleccionado = producto

        this.checkboxMarketplace = producto.Marketplace;
        console.log(producto.Marketplace)


        if(producto.Importadora == 'Mannheim'){
            var res =  await API.POST_PRODUCTS_CODE(producto.OEM)
        }else{
            var res = await API.POST_PRODUCTS_CODE(producto.CodigoImportadora)
        }

        this.ModelosCompatibles = res.map(e => {
            return  e.MarcaVehiculo + ' ' + e.Modelo + ' ' + e.AñoI + ' - ' + e.AñoT
        })

        this.tituloModelo = res.map(e => {
            return ' / ' + e.Modelo.split(' ')[0] + ' ' + e.Modelo.split(' ')[1] + ' ' + e.Modelo.split(' ')[2]
        })

        this.dialogFB = true
    },

    llegada(Importadora, Retiro){
      var FechaEntrega;
      let date = new Date()


      let month = date.getMonth() + 1
      let year = date.getFullYear()

      var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      ultimoDia = ultimoDia.getDate()
      
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