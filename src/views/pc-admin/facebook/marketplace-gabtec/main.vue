<style scoped>
    @import './main.css';
</style>
<template>
    <div>
        <h4>{{ ModuloFullName }}</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Aqui encontraras todos los productos publicados y por publicar en {{ ModuloFullName }}.</div>
        <v-divider></v-divider>

<v-col cols="12" v-if="Loader == true">
<div class="center">
  <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
  <p>Cargando Carrito, por favor espere...</p>
</div>
</v-col>


        <v-row>
          <v-col cols="12" style="margin-bottom: 0px !important;">
          <p style="margin-bottom: 0px !important;">Filtros:</p>
        </v-col>
      <v-select
        v-model="filtroCategoria"
        :items="['Amortiguadores', 'Pastillas']"
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
            Codigo Importadora
          </th>
          <th class="text-left">
            Descripción
          </th>
          <th class="text-left">
            Stock
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
          <td @click="openModal(Producto.CodigoImportadora)">{{ Producto.CodigoImportadora }}</td>
          <td @click="openModal(Producto.CodigoImportadora)">{{ Producto.Descripcion }}</td>
          <th class="text-left">
            {{ Producto.Stock }}
          </th>
          <td @click="openModal(Producto.CodigoImportadora)">{{ Producto.updatedAt == Producto.createdAt ? 'NUNCA' : Producto.updatedAt.slice(0, 10).split('-').reverse().join('-').replaceAll('-', '/') }}</td>
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
                        <v-col cols="1">
                          <v-card>
                            <div v-if="productoSeleccionado.Imagenes">
                              <div v-for="(image, imageIndex) in productoSeleccionado.Imagenes">
                                <a  :download="image.replace('ch_', '')" :href="image.replace('ch_', '')" target="_blank" title="ImageName">
                                  <img :src="image.replace('ch_', '')" class="img-fluid" :key="imageIndex" />
                                </a>
                              </div>
                            </div>

                            
                            <div v-if="productoSeleccionado.Img1">
                                <a  :download="productoSeleccionado.Img1" :href="productoSeleccionado.Img1" target="_blank" title="ImageName">
                                  <img :src="productoSeleccionado.Img1" class="img-fluid" :key="imageIndex" />
                                </a>
                            </div>
                            <div v-if="productoSeleccionado.Img2">
                                <a  :download="productoSeleccionado.Img2" :href="productoSeleccionado.Img2" target="_blank" title="ImageName">
                                  <img :src="productoSeleccionado.Img2" class="img-fluid" :key="imageIndex" />
                                </a>
                            </div>
                            <div v-if="productoSeleccionado.Img3">
                                <a  :download="productoSeleccionado.Img3" :href="productoSeleccionado.Img3" target="_blank" title="ImageName">
                                  <img :src="productoSeleccionado.Img3" class="img-fluid" :key="imageIndex" />
                                </a>
                            </div>
                            <div v-if="productoSeleccionado.Img4">
                                <a  :download="productoSeleccionado.Img4" :href="productoSeleccionado.Img4" target="_blank" title="ImageName">
                                  <img :src="productoSeleccionado.Img4" class="img-fluid" :key="imageIndex" />
                                </a>
                            </div>
                            <div v-if="productoSeleccionado.Img5">
                                <a  :download="productoSeleccionado.Img5" :href="productoSeleccionado.Img5" target="_blank" title="ImageName">
                                  <img :src="productoSeleccionado.Img5" class="img-fluid" :key="imageIndex" />
                                </a>
                            </div>

                          </v-card>
                        </v-col>
                        <v-col cols="8">
                        
                          <div style="margin-bottom: 1rem;">

                            <h4>{{this.productoSeleccionado.Descripcion}} - {{this.productoSeleccionado.CodigoImportadora}}</h4>
                          </div>

                          <v-btn color="primary" class="mt-3  ml-3" @click="CopyTittle()">
                            <v-icon small dark>mdi-archive-edit</v-icon> Copiar Titutlo
                        </v-btn>
                        
                        <v-btn color="primary" class="mt-3 ml-3" @click="CopyDescription()">
                            <v-icon small dark>mdi-archive-edit</v-icon> Copiar Descripcion
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
    name: 'marketplace-facebook',
    props: ["Usuario", "Login"],
    //Variables
    data: () => ({
    //MODULO
    ModuloFullName: 'Marketplace-gabtec',
    ModuloName: 'Marketplace-gabtec',
    //Alertas
    modalMarketplace: false,
    Alert: '',
    Actualizacion: false,
    //Data
    productoSeleccionado: {
            CodigoImportadora: '',
            Descripcion: '',
            Aplicaciones: [{
              Marca: '',
            },
            {
              Modelo: '',
            },
            {
              Posicion: '',
            },
            {
              AñoI: '',
            },
            {
              AñoT: ''
            }
            ],
        },
    CodigoImportadora: '',
    filtroController: 'Faltantes',
    filterDescription: '',
    filterCodigoImportadora: '',
    MarcaSeleccionada: null,
    Marcas: [],
    Productos: [],
    ProductosSave: [],
    filtroVer: '10',
    filtroCategoria: 'Amortiguadores',
    //Copy paste
    displayTituloFB: true,
    displayDescripcionFB: true,
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
            return (this.productoSeleccionado.Descripcion + ' ' + this.productoSeleccionado.Aplicaciones[0].Posicion + ' ' + this.productoSeleccionado.Aplicaciones[0].Marca + ' ' + this.productoSeleccionado.Aplicaciones[0].Modelo + ' ' + this.productoSeleccionado.Aplicaciones[0].AñoI + ' al ' + this.productoSeleccionado.Aplicaciones[0].AñoT).toUpperCase().replace('TRASERO TRASERO', 'TRASERO').replace('DELANTERO DELANTERO', 'DELANTERO') + ' - ' + 'UL'+this.productoSeleccionado.CodigoImportadora.split('').reverse().join('')+'TI';
        },

        priceFB: function() {
            return `Hola si esta disponible en ${FormatearPrecio(MargenPrecio(this.productoSeleccionado.Precio))} despacho o entrega en bodega de 2 a 3 días hábiles después de confirmar su compra`;
        },

        descripcionFB: function() {
          let aplications = [] 
          for(let i = 0; i < this.productoSeleccionado.Aplicaciones.length; i++){
            aplications.push(this.productoSeleccionado.Aplicaciones[i].Marca + ' ' + this.productoSeleccionado.Aplicaciones[i].Modelo + ' ' + this.productoSeleccionado.Aplicaciones[i].AñoI + ' al ' + this.productoSeleccionado.Aplicaciones[i].AñoT)
          }  
          
          return `Aplicable a:
${
  aplications.toString().replaceAll(',', '\n')
}

${ this.productoSeleccionado.LargoExtendido ? 'Largo Extendido: ' + this.productoSeleccionado.LargoExtendido : '' }
${ this.productoSeleccionado.LargoComprimido ? 'Largo Comprimido: ' + this.productoSeleccionado.LargoComprimido : '' }
${ this.productoSeleccionado.TerminalSuperior ? 'Terminal Superior: ' + this.productoSeleccionado.TerminalSuperior : '' }
${ this.productoSeleccionado.TerminarInferior ? 'Terminar Inferior: ' + this.productoSeleccionado.TerminarInferior : '' }
${ this.productoSeleccionado.Kit ? 'Kit: ' + this.productoSeleccionado.Kit : '' }


Somos Ulti SPA empresa dedicada a la venta de repuestos para automóviles en linea.

Delivery Santiago. 🚚
Envio a Regiones. 🚛
Garantia de 3 meses. 🔒

Productos Nuevos originales y alternativos.

Referencia: UL${this.productoSeleccionado.CodigoImportadora.split('').reverse().join('')}TI

`;
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

        this.productoSeleccionado = await API.GET_PRODUCTS_GABTEC_BY_SKU(id)


        this.productoSeleccionado.Modelo = this.productoSeleccionado.Modelo.map((e, i) => {
          if(i != this.productoSeleccionado.Modelo.length &&  e.Descripcion != this.productoSeleccionado.Modelo[i+1]?.Descripcion){
            return e.Descripcion;
          }
        })

        console.log(this.productoSeleccionado)

        //Ingrese los datos por defecto
        this.modalMarketplace = true;
    },


    async searchCodigoImportadora(){
      var dato = this.filterCodigoImportadora;

      let result = await this.filterCodigoImportadora ? this.ProductosSave.filter(e => {
        if(e.CodigoImportadora.includes(dato)){
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

    async changeCount(){

      this.Productos = await API.POST_PRODUCTS_GABTEC(this.filtroCategoria);

    },


    
    async searchProductByCodigoImportadora(){
      let CodigoImportadora = this.CodigoImportadora.slice(0, -2).slice(2).split('').reverse().join('');

      let response = await API.POST_PRODUCTS_BY_SKU(this.CodigoImportadora);

      if(response){
        this.Productos = response;
      }
    },

    async publicatedProduct(isPublicated){

      this.modalMarketplace = false;

      let id = this.productoSeleccionado.CodigoImportadora;

      await API.POST_GABTEC_MARKETPLACE(isPublicated, id)

      this.Productos = await API.POST_PRODUCTS_GABTEC(this.filtroCategoria);

      this.productoSeleccionado = {
            CodigoImportadora: '',
            Aplicaciones: [{
              Marca: '',
            },
            {
              Posicion: '',
            },
            {
              Modelo: '',
            },
            {
              AñoI: '',
            },
            {
              AñoT: ''
            }
            ],
            Descripcion: '',
            Modelo: '',
            OEM: '',
        }

    },

    async changeMarketplace(id,isPublicated){

      await API.POST_GABTEC_MARKETPLACE(isPublicated, id)

      this.Productos = await API.POST_PRODUCTS_GABTEC(this.filtroCategoria);

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
        this.Productos = await API.POST_PRODUCTS_GABTEC('Amortiguadores');
        this.Loader = false
    },


    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    },
}
</script>