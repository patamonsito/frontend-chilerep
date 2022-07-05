<style scoped>
    @import './main.css';
</style>
<template>
    <div>
        <h4>Buscar productos en importadora</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Aqui buscar los productos disponibles en la importadora, usted podra usar el buscador para realizar una busqueda exacta.</div>
        <v-divider></v-divider>

        <v-row>
            <v-col cols="10">
                <v-text-field :rules="rules" v-model="Solicitud" placeholder="Amortiguador Chevrolet Sail 1.4" v-on:keyup.enter="onEnter"></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-btn color="info" @click="Buscar()">Buscar</v-btn>
            </v-col>
        </v-row>
        
                <v-divider></v-divider>

    <div style="margin-top: 1rem" v-if="Refax == '' && Alsacia == '' && Bicimoto == '' && Mannheim == '' && Loader == false"> 
        
        <p class="center" style="margin-top: 1rem">{{Msg}}</p>

    </div>

    <div v-else-if="Loader == true">
        <div class="center">
            <img src="http://143.198.165.86:3000/etc/loader.gif" alt="Cargando...">
        </div>
    </div>

    <div v-else>
    <v-tabs
      v-model="tab"
      background-color="black"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#tab-1" v-if="Refax.length != 0">
        Refax 
      </v-tab>

      <v-tab href="#tab-2" v-if="Alsacia.length != 0">
        Alsacia
      </v-tab>

      <v-tab href="#tab-3" v-if="Bicimoto.length != 0">
        Bicimoto
      </v-tab>

      <v-tab href="#tab-4" v-if="Mannheim.length != 0">
        Mannheim
      </v-tab>

      <v-tab href="#tab-5" v-if="Noriega.length != 0">
        Noriega
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 5"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
            <v-card-text v-if="i == 1">
                
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Codigo
          </th>
          <th class="text-left">
            Marca
          </th>
          <th class="text-left">
            Modelo
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Fabricante
          </th>
          <th class="text-left">
            Origen
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Stock
          </th>
          <th class="text-left">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Producto, i in Refax"
          :key="i"
        >
          <td>{{ Producto.Sku }}</td>
          <td>{{ Producto.Marca }}</td>
          <td v-if="Producto.Modelo != '' && Producto.Modelo" :style=" i != 0? 'border-top: 2px solid red' : ''">{{ Producto.Modelo }} {{ Producto['AñoI'] }} - {{ Producto['AñoT'] }}</td>
          <td v-else></td>
          <td>{{ Producto.Producto }} {{ Producto.Descripcion }}</td>
          <td>{{ Producto.MARCA }}</td>
          <td>{{ Producto.Origen }}</td>
          <td>{{ Producto.PrecioImportadora }}</td>
          <td>{{ Producto.Stock }}</td>
          <td v-if="Producto.Stock == 'DISPONIBLE'">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-1"
              outlined
              fab
              small
              color="grey"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
              </template>
                <v-list>
                  <v-list-item link @click="CrearProducto(Producto)">
                    <v-list-item-title>Crear Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="PedirProducto(Producto, 'Refax')">
                    <v-list-item-title>Pedir Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="VerEnImportadora(Producto, 'Refax')">
                    <v-list-item-title>Ver en Importadora</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
         </td>
         <td v-else></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
            
            <v-card-text v-if="i == 2">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Codigo
          </th>
          <th class="text-left">
            Marca
          </th>
          <th class="text-left">
            Modelo
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Fabricante
          </th>
          <th class="text-left">
            Origen
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Stock
          </th>
          <th class="text-left">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Producto, i in Alsacia"
          :key="i"
        >
          <td>{{ Producto.Sku }}</td>
          <td>{{ Producto.Marca }}</td>
          <td v-if="Producto.Modelo != ''" :style=" i != 0? 'border-top: 2px solid red' : ''">{{ Producto.Modelo }} {{ Producto['AñoI'] }} - {{ Producto['AñoT'] }}</td>
          <td v-else></td>
          <td>{{ Producto.Producto }} {{ Producto.Descripcion }}</td>
          <td>{{ Producto.MARCA }}</td>
          <td>{{ Producto.Origen }}</td>
          <td>{{ Producto.Precio }}</td>
          <td>{{ Producto.Stock }}</td>
          <td v-if="Producto.Stock != ''">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-1"
              outlined
              fab
              small
              color="grey"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
              </template>
                <v-list>
                  <v-list-item link @click="CrearProducto(Producto)">
                    <v-list-item-title>Crear Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="PedirProducto(Producto, 'Refax')">
                    <v-list-item-title>Pedir Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="VerEnImportadora(Producto, 'Refax')">
                    <v-list-item-title>Ver en Importadora</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
         </td>
         <td v-else></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
            <v-card-text v-if="i == 3">
                
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Codigo
          </th>
          <th class="text-left">
            Oem
          </th>
          <th class="text-left">
            Marca
          </th>
          <th class="text-left">
            Modelo
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Origen
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Stock
          </th>
          <th class="text-left">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Producto, i in Bicimoto"
          :key="i"
        >
          <td>{{ Producto.Sku }}</td>
          <td>{{ Producto.Oem }}</td>
          <td>{{ Producto.Marca }}</td>
          <td>{{ Producto.Modelo }}</td>
          <td>{{ Producto.Descripcion }}</td>
          <td>{{ Producto.Origen }}</td>
          <td>{{ Producto.PrecioImportadora }}</td>
          <td>{{ Producto.Stock }}</td>
          <td v-if="Producto.Stock != '0'">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-1"
              outlined
              fab
              small
              color="grey"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
              </template>
                <v-list>
                  <v-list-item link @click="CrearProducto(Producto)">
                    <v-list-item-title>Crear Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="PedirProducto(Producto, 'Refax')">
                    <v-list-item-title>Pedir Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="VerEnImportadora(Producto, 'Refax')">
                    <v-list-item-title>Ver en Importadora</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
         </td>
         <td v-else></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
            <v-card-text v-if="i == 4">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Oem
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Fabricante
          </th>
          <th class="text-left">
            Origen
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Producto, i in Mannheim"
          :key="i"
        >
          <td>{{ Producto.Oem }}</td>
          <td>{{ Producto.Descripcion }}</td>
          <td>{{ Producto.Fabricante }}</td>
          <td>{{ Producto.Origen }}</td>
          <td>{{ Producto.PrecioImportadora }}</td>
          <td>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-1"
              outlined
              fab
              small
              color="grey"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
              </template>
                <v-list>
                  <v-list-item link @click="VerAplicacionesM(Producto)">
                    <v-list-item-title>Ver Aplicaciones</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="CrearProducto(Producto)">
                    <v-list-item-title>Crear Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="PedirProducto(Producto, 'Refax')">
                    <v-list-item-title>Pedir Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="VerEnImportadora(Producto, 'Refax')">
                    <v-list-item-title>Ver en Importadora</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
         </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

            </v-card-text>
            <v-card-text v-if="i == 5">
                
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Codigo
          </th>
          <th class="text-left">
            Marca
          </th>
          <th class="text-left">
            Modelo
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Origen
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Stock
          </th>
          <th class="text-left">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Producto, i in Noriega"
          :key="i"
        >
          <td>{{ Producto.Sku }}</td>
          <td>{{ Producto.Marca }}</td>
          <td v-if="Producto.Modelo != '' && Producto.Modelo" :style=" i != 0? 'border-top: 2px solid red' : ''">{{ Producto.Modelo }} {{ Producto['AñoI'] }} - {{ Producto['AñoT'] }}</td>
          <td v-else></td>
          <td>{{ Producto.Producto }} {{ Producto.Descripcion }}</td>
          <td>{{ Producto.Origen }}</td>
          <td>{{ Producto.Precio }}</td>
          <td>{{ Producto.Stock }}</td>
          <td v-if="Producto.Stock != ''">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-1"
              outlined
              fab
              small
              color="grey"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
              </template>
                <v-list>
                  <v-list-item link @click="CrearProducto(Producto)">
                    <v-list-item-title>Crear Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="PedirProducto(Producto, 'Refax')">
                    <v-list-item-title>Pedir Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="VerEnImportadora(Producto, 'Refax')">
                    <v-list-item-title>Ver en Importadora</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
         </td>
         <td v-else></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </div>


    <!-- Modal -->

        <v-dialog
      v-model="dialogMannheim"
      width="1300"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ ProductoMannheim.Oem }} - {{ ProductoMannheim.Descripcion }} Aplicaciones:
        </v-card-title>

 <v-card-text>
  <v-simple-table class="mt-2">
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
            SubModelo
          </th>
          <th class="text-left">
            Año
          </th>
          <th class="text-left">
            Motor
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Modelo, i in AplicacionesM"
          :key="i"
        >
          <td>{{ Modelo.marca }}</td>
          <td>{{ Modelo.modelo }}</td>
          <td>{{ Modelo.submodelo }}</td>
          <td>{{ Modelo.ano }}</td>
          <td>{{ Modelo.motor }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
          
            

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="secondary"
            text
            @click="dialogMannheim = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        

    </div>
</template>

<script>
import API from '../../../../api.js'
// import catalogo from './catalogo.vue';
    export default {
    name: 'buscar-factura',
    props: [],
    //Variables
    data: () => ({
        Loader: true,
        dialogMannheim: false,
        AplicacionesM: [],
        Refax: [],
        Alsacia: [],
        Bicimoto: [],
        Mannheim: [],
        Noriega: [],
        Msg: 'Realice una busqueda para empezar.',
        ProductoMannheim: {
          Descripcion: '',
          Oem: ''
        },
        Solicitud: '',
        rules: [
        value => !!value || 'Este campo es requirido para buscar.',
        value => (value || '').length <= 100 || 'Maximo 100 letras',
      ],
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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

        async VerAplicacionesM(Producto){
            

            this.ProductoMannheim = Producto;
            
            let AplicacionesM = await API.POST_APLICACIONESM(Producto.Aplicacion);
            
            this.AplicacionesM = AplicacionesM.aplicaciones;

            this.dialogMannheim = true;

        },


        onEnter(){
            this.Buscar();
        },

        async Buscar(){
            if(this.Solicitud == ''){
                return alert('No puedes realizar una busqueda vacia.')
            }

            this.Loader = true;
            let Datos = await API.POST_API_IMPORTADORA(this.Solicitud)

            Datos.Refax[0].pop();
            Datos.Refax[0].pop();

            this.Refax = Datos.Refax[0];
            this.Alsacia = Datos.Alsacia[0];
            this.Bicimoto = Datos.Bicimoto;
            this.Mannheim = Datos.Mannheim;
            this.Noriega = Datos.Noriega;

            console.log(process.env.NODE_ENV)

            if(this.Bicimoto[0].Descripcion == '' || process.env.NODE_ENV == 'production'){
                this.Bicimoto = [];
            }


            var Cantidad = this.Bicimoto.length + this.Refax.length + this.Mannheim.length + this.Alsacia.length + this.Noriega.length;

            if(Cantidad == 0){
                this.Msg = 'No hay resultados.'
            }

            this.Loader = false;

            // if(Datos.Refax == "ERROR : java.lang.Exception: Logica.ProductosLogica.BuscarArticuloGlosa5: null"){
            //     let Go = await API.POST_REFAX_AUTH();
            //     let Datos = await API.POST_API_IMPORTADORA(this.Solicitud);
            //     this.Loader = false;
            // }else{
            //     this.Refax = Datos.Refax.replaceAll('style', 'stylo').replaceAll('<th stylo="width: 40px;">Comprar</th>', '<th style="display: none;">Comprar</th>')
            //     this.Alsacia = Datos.Alsacia.replaceAll('style', 'stylo').replaceAll('<th stylo="width: 40px;" scope="col"></th>', '<th style="display:none;" scope="col"></th>').replaceAll('button type="submit"', 'button style="display: none;"').replaceAll('stylo="width: 40px;"', 'style="display: none;"').replaceAll('class="tobuy"', 'style="display: none;"').replaceAll('span stylo="font-size: 10px;"', 'span style="display: none;"');
            //     this.Loader = false;
            // }

        }

    },

    //Apis
    async created(){
        this.Loader = false;
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>