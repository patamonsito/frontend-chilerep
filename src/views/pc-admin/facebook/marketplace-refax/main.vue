<style scoped>
    @import './main.css';
</style>
<template>
    <div>
        <h4>{{ ModuloFullName }} Refax</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Aqui encontraras todos los productos publicados y por publicar en {{ ModuloFullName }}.</div>
        <v-divider></v-divider>

<v-col cols="12" v-if="Loader == true">
<div class="center">
  <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
  <p>Cargando Carrito, por favor espere...</p>
</div>
</v-col>

<h6>Seleccione MarcaVehiculo.</h6>
        <v-row>
          <v-col cols="8">
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
              @change="marcaSearch()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="2" style="align-self: center;margin-top: 1rem;">
          <v-select
            v-model="filtroController"
            :items="['Todo', 'Completadas', 'Faltantes']"
            label="Mostrar"
            prepend-icon="mdi-panorama-sphere"
            persistent-hint
            single-line
            @change="changeController()"
            dense></v-select>
      </v-col>
      <v-col cols="2">
        <v-text-field
          label="Cotizar SKU"
          @keyup="searchProductBySku()"
          v-model="Sku"
          autocomplete="off"
          prepend-icon="mdi-account-box"
          placeholder="Cotizar SKU"
        ></v-text-field>
      </v-col>

        </v-row>


        <v-row v-if="Productos.length > 0 && Loader == false">
          <v-col cols="12" style="margin-bottom: 0px !important;">
          <p style="margin-bottom: 0px !important;">Filtros:</p>
        </v-col>

        <v-col cols="2">
          <v-text-field
            label="Buscar Sku"
            @keyup="searchSku()"
            v-model="filterSku"
            autocomplete="off"
            prepend-icon="mdi-account-box"
            placeholder="Buscar Sku"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-text-field
            label="Buscar por Descripción"
            @keyup="searchDescription()"
            v-model="filterDescription"
            autocomplete="off"
            prepend-icon="mdi-account-box"
            placeholder="Buscar por Descripción"
          ></v-text-field>
        </v-col>
      <v-col cols="2" style="align-self: center;margin-top: 0.5rem;">
      <v-select
        v-model="filtroVer"
        :items="['10', '30', '100', 'Todo']"
        label="Cantiadad"
        prepend-icon="mdi-panorama-sphere"
        persistent-hint
        single-line
        @change="changeCount()"
        dense></v-select>
    </v-col>
  </v-row>




  <v-simple-table v-if="Productos.length > 0 && Loader == false">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Sku
          </th>
          <th class="text-left">
            Descripción
          </th>
          <th class="text-left">
            Actualización
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Publicado?
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Producto in Productos"
          :key="Producto._id"
          style="cursor: pointer"
        >
          <td @click="openModal(Producto._id)">{{ Producto.Sku }}</td>
          <td @click="openModal(Producto._id)">{{ Producto.Descripcion }}</td>
          <td @click="openModal(Producto._id)">{{ Producto.updatedAt == Producto.createdAt ? 'NUNCA' : Producto.updatedAt.slice(0, 10).split('-').reverse().join('-').replaceAll('-', '/') }}</td>
          <td @click="copyPrice(Producto._id)">{{ Math.round(Producto.Precio * 1.7) }}</td>
          <td>

            <v-switch
            v-model="Producto.Marketplace"
            @click="changeMarketplace(Producto._id, Producto.Marketplace)"
          ></v-switch>

          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  <v-simple-table v-else-if="Productos.length <= 0 && Loader == false">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Productos en {{ ModuloName }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center">Sin datos para mostrar.</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>



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

<v-textarea
:class="{ 'd-none': displayPriceFB }"
style="max-width: 0px; max-height: 0px;"
solo
v-on:focus="$event.target.select()"
name="name"
label="label"
ref="priceFB"
:value="priceFB"
>
</v-textarea>




<v-form ref="form" lazy-validation>
  <v-dialog
          transition="dialog-bottom-transition"
          max-width="1200"
        v-model="modalMarketplace">
          <template>
            <v-card>
              <v-card-text class="text-center">
                <v-alert
                  shaped
                  dense
                  dark
                  color="grey"
                >
                    Detalles del Producto
                </v-alert>
                <v-alert v-if="Alert != ''" class="mt-2"
                     dense
                     outlined
                     type="error"
                >
                  <strong>{{ Alert }}</strong>
                </v-alert>

                <v-row v-if="productoSeleccionado">
                    <v-col cols="12">
                      <v-row>
                        <v-col cols="4">
                          <v-card>
                            <a :href="`https://img.refaxchile.cl:9092/FOTOGRAFIAS/${this.productoSeleccionado.Sku}/${this.productoSeleccionado.Sku}A.jpg`" target="_blank">
                              <v-img
                              max-width="100%"
                              :src="`https://img.refaxchile.cl:9092/FOTOGRAFIAS/${this.productoSeleccionado.Sku}/${this.productoSeleccionado.Sku}A.jpg`"
                            ></v-img>
                            </a>
                          </v-card>
                        </v-col>
                        <v-col cols="8">
                        
                          <div style="margin-bottom: 1rem;">
                            <h4>{{this.productoSeleccionado.Descripcion}}</h4>
                          </div>

                          <v-btn color="primary" class="mt-3  ml-3" @click="CopyTittle()">
                            <v-icon small dark>mdi-archive-edit</v-icon> Copiar Titutlo
                        </v-btn>
                        
                        <v-btn color="primary" class="mt-3 ml-3" @click="CopyDescription()">
                            <v-icon small dark>mdi-archive-edit</v-icon> Copiar Descripcion
                        </v-btn>
                        
                        <v-btn color="primary" class="mt-3 ml-3" @click="CopyTags()">
                          <v-icon small dark>mdi-archive-edit</v-icon> Copiar Tags
                        </v-btn>

                        </v-col>
                      </v-row>
                    </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" style="text-align: -webkit-right;">
                    <v-btn color="secondary" class="mt-3 " @click="modalMarketplace = false">
                      <v-icon small dark>mdi-archive-edit</v-icon> Cancelar
                    </v-btn>
                    <v-btn color="success" class="mt-3 ml-3" @click="publicatedProduct(true)" style="">
                      <v-icon small dark>mdi-archive-edit</v-icon> Publicado
                    </v-btn>
                  </v-col>
                </v-row>

              </v-card-text>
            </v-card>
          </template>
  </v-dialog>
</v-form>
    </div>
</template>

<script>
import API from '../../../../api.js'
import { MargenPrecio } from '../../../global-function/margen-precio.js';
import { FormatearPrecio } from '../../../global-function/formatear-precio.js';
    export default {
    name: 'marketplace-refax',
    props: [],
    //Variables
    data: () => ({
    //MODULO
    ModuloFullName: 'Marketplace',
    ModuloName: 'Marketplace',
    //Alertas
    modalMarketplace: false,
    Alert: '',
    Actualizacion: false,
    //Data
    productoSeleccionado: {
            Sku: '',
            Descripcion: '',
            Modelo: '',
            OEM: '',
        },
    Sku: '',
    filtroController: 'Faltantes',
    filterDescription: '',
    filterSku: '',
    MarcaSeleccionada: null,
    Marcas: [],
    Productos: [],
    ProductosSave: [],
    filtroVer: '10',
    //Copy paste
    displayTituloFB: true,
    displayDescripcionFB: true,
    displayTagFB: true,
    displayPriceFB: true,
    //LOADER
    Loader: false,
    }),
    components: {
    },

 //Variable en base a otra
 computed: {
    //    Example : function() { 
        //   return this.existe ? this.existe : this.nop
        // }

        tituloFB: function() {
            return `${this.productoSeleccionado.Descripcion} - UL${this.productoSeleccionado.Sku.split('').reverse().join('')}TI`;
        },

        priceFB: function() {
            return `Hola si esta disponible en ${FormatearPrecio(MargenPrecio(this.productoSeleccionado.Precio))} despacho o entrega en bodega de 2 a 3 días hábiles después de confirmar su compra`;
        },

        descripcionFB: function() {
            return `MODELOS COMPATIBLES:
${this.productoSeleccionado.Modelo.toString().replaceAll(',', '\n')}

ORIGEN-MARCA: ${this.productoSeleccionado.Fabricante}

Somos Ulti SPA empresa dedicada a la venta de repuestos para automóviles en linea.

Delivery Santiago. 🚚
Envio a Regiones. 🚛
Garantia de 3 meses. 🔒

Productos Nuevos originales y alternativos.

Referencia: UL${this.productoSeleccionado.Sku.split('').reverse().join('')}TI

`;
        },

        tagFB: function() {
            return `${this.productoSeleccionado.OEM.slice(0, 150).split(' ')}`;
        },

    },


    watch: {
    //   UnaVariable: function (val) { // val es el valor anterior
        // this.Ejemplo = val + ' ' + this.UnaVariable
    //   },
    },

    // funciones 
    methods: {
      async openModal(id){
        this.Alert = ''
        
        this.productoSeleccionado = await this.Productos.filter(e => {
          if(e._id == id){
            return e;
          }
        })[0]

        if(typeof(this.productoSeleccionado.Modelo) === 'string'){
        
        let Modelos = this.productoSeleccionado.Modelo.split('-')

        Modelos = Modelos.map((e, i) => {
          if(Modelos[i+1]){
            let pass = Modelos[i+1].split(' ')[1] ? Modelos[i+1].split(' ')[1] : ''
            e = (e + ' - ' + pass).replaceAll('  ', ' ');
            if(i != 0){
              e = e.split(' ')
              e.shift()
              e.shift()
              e = e.join(' ')
            }
          }

          return e;
        })

        this.productoSeleccionado.Modelo = Modelos;
        }

        //Ingrese los datos por defecto
        this.modalMarketplace = true;
    },


    async searchSku(){
      var dato = this.filterSku;

      let result = await this.filterSku ? this.ProductosSave.filter(e => {
        if(e.Sku.includes(dato)){
          return e;
        }
      }) : this.ProductosSave;


      result = this.productosController(result)

      this.paginarProductos(result)

    },

    async searchDescription(){
      var datoProduct = this.filterDescription;

      let result = await this.filterDescription ? this.ProductosSave.filter(e => {
        if(e.Descripcion.includes(datoProduct.toUpperCase())){
          return e;
        }
      }) : this.ProductosSave;

      result = this.productosController(result)

      this.paginarProductos(result)

    },

    async getMarcas(){
      this.Marcas = await API.GET_MARCA_REFAX()
    },

    CopyTittle(){
      this.displayTituloFB = false
      setTimeout(() =>  this.$refs.tituloFB.focus(), 10);
      setTimeout(() =>  document.execCommand('copy'), 20);
      setTimeout(() =>  this.displayTituloFB = true, 30);
    },


    CopyDescription(){
            this.displayDescripcionFB = false
            setTimeout(() =>  this.$refs.descripcionFB.focus(), 10);
            setTimeout(() =>  document.execCommand('copy'), 20);
            setTimeout(() =>  this.displayDescripcionFB = true, 30);
    },


    CopyTags(){
            this.displayTagFB = false
            setTimeout(() =>  this.$refs.tagFB.focus(), 10);
            setTimeout(() =>  document.execCommand('copy'), 20);
            setTimeout(() =>  this.displayTagFB = true, 30);
    },

   async copyPrice(id){
      this.productoSeleccionado = await this.Productos.filter(e => {
          if(e._id == id){
            return e;
          }
        })[0]

      this.displayPriceFB = false
      setTimeout(() =>  this.$refs.priceFB.focus(), 10);
      setTimeout(() =>  document.execCommand('copy'), 20);
      setTimeout(() =>  this.displayPriceFB = true, 30);

    },


    async marcaSearch(){
      let result = await API.POST_PRODUCTS_REFAX_BY_MARCA(this.MarcaSeleccionada);
      this.ProductosSave = result;


      result = await this.productosController(result)
      
      this.paginarProductos(result)

    },


    productosController(result){
      if(this.filtroController == 'Completadas'){
        
        result = result.filter(e => {
          if(e.Marketplace){
            return e;
          }
        })
      }else if(this.filtroController == 'Faltantes'){
        result = result.filter(e => {
          console.log(e.Marketplace)
          if(!e.Marketplace){
            return e;
          }
        })
      }

      return result;


    },

    paginarProductos(result){
      if(this.filtroVer != 'Todo'){
        var cant = parseInt(this.filtroVer)
        result = result.filter((e, i) => {
          if(i < cant){
            return e;
          }
        })
      }

      this.Productos = result;
    },

    changeCount(){

      let result = this.ProductosSave;

      if(this.filtroVer != 'Todo'){
        var cant = parseInt(this.filtroVer)
        result = result.filter((e, i) => {
          if(i < cant){
            return e;
          }
        })
      }

      this.Productos = result;

    },


    
    async searchProductBySku(){
      let Sku = this.Sku.slice(0, -2).slice(2).split('').reverse().join('');

      let response = await API.POST_PRODUCTS_BY_SKU(this.Sku);

      if(response){
        this.Productos = response;
      }
    },

    async publicatedProduct(isPublicated){

      let id = this.productoSeleccionado._id;

      await API.POST_REFAX_MARKETPLACE(isPublicated, id)

      this.ProductosSave = this.ProductosSave.map(e => {
        if(e._id == id){
          e.Marketplace = isPublicated;
        }
        return e;
      })

      this.modalMarketplace = false;

      this.productoSeleccionado = {
            Sku: '',
            Descripcion: '',
            Modelo: '',
            OEM: '',
        }

      this.changeController()
      this.changeCount()

    },

    async changeMarketplace(id,isPublicated){

      await API.POST_REFAX_MARKETPLACE(isPublicated, id)

      this.ProductosSave = this.ProductosSave.map(e => {
        if(e._id == id){
          e.Marketplace = isPublicated;
        }
        return e;
      })

      this.changeController()
      this.changeCount()

    },


    async changeController(){
      let result = this.ProductosSave;

      
      if(this.filtroController == 'Completadas'){
        
        result = result.filter(e => {
          if(e.Marketplace){
            return e;
          }
        })
      }else if(this.filtroController == 'Faltantes'){
        result = result.filter(e => {
          console.log(e.Marketplace)
          if(!e.Marketplace){
            return e;
          }
        })
      }

      
      result = await this.productosController(result)

      this.Productos = result;

    }


  },
    //Apis
    async created(){
        this.Loader = true
        this.getMarcas()
        this.Loader = false
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    },
}
</script>