<template>
  <v-row justify="center">
    <v-dialog
      v-model="ModalVerRepuesto"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <div v-if="spinnerModal == true" style="text-align: -webkit-center;">
          <div class="spacer"></div>
            <div class="spinner"></div>
          <div class="spacer"></div>
        </div>
        <div v-if="spinnerModal == false">          
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="CerrarModalVerRepuestoEmit()"
          >
          <v-icon style="color: white">mdi-arrow-left</v-icon>
          </v-btn>
          <v-row>
            <v-col cols="12">
              <v-toolbar-title>Chilerepuestos</v-toolbar-title>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-img  height="250" :src="'http://143.198.165.86:3000/repuestos/' + Repuesto.CurrentImg + '.jpg'"></v-img>
        <v-row no-gutters>
          <div style="font-size: 14px; font-weight: bold;padding: 0.3rem 1rem; text-align: center;">{{ Repuesto.Descripcion }}</div>
          <div style="font-size: 12px; font-weight: bold;padding: 0rem 1rem; text-align: center;text-decoration: line-through;color: gray;">$ {{ Repuesto.PrecioCliente }}</div>
          <div style="display: inline-flex;
          align-items: center;
          place-content: center;">
            <div style="font-size: 18px; font-weight: bold;padding: 0rem 0.1rem 0.1rem 1rem; text-align: center; color: green;">$ {{ Repuesto.PrecioImportadora }}</div> <span style="color: red; font-size: 9px;"><b>40% OFF !</b></span>
          </div>
          <v-col cols="12" style="margin: 0px; padding: 0px; "><v-divider></v-divider></v-col>
          <v-col cols="6" style="margin: 0px; padding: 0px; ">
            <v-col cols="12" style="margin: 0px; padding: 0.1rem 0.1rem 0.1rem 0.5rem; ">
              <div style="font-size: 14px;width: 100%;"><b>OEM:</b> 93736247-100</div>
            </v-col>
            <v-col cols="12" style="margin: 0px; padding: 0.1rem 0.1rem 0.1rem 0.5rem; ">
              <div style="font-size: 14px;width: 100%;"><b>Marca:</b> MOBIL SUPER</div>
            </v-col>
            <v-col cols="12" style="margin: 0px; padding: 0.1rem 0.1rem 0.1rem 0.5rem; ">
              <div style="font-size: 14px;width: 100%;"><b>Origen:</b> CHINA</div>
            </v-col>
            <v-col cols="12" style="margin: 0px; padding: 0.1rem 0.1rem 0.1rem 0.5rem; ">
              <div style="font-size: 12px" v-if="Repuesto.Retiro == true">
                <v-chip
                class="ma-0"
                color="orange"
                outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
              >
                <v-icon left>
                  mdi-store
                </v-icon>
                Entrega inmediata
              </v-chip>
          
              </div>
              <div style="font-size: 12px" v-if="Repuesto.Retiro == false && Repuesto.Importadora == 'Mannheim'">
                <v-chip
                class="ma-0"
                color="blue"
                outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
              >
                <v-icon left>
                  mdi-car
                </v-icon>
                Despacho en 2 dias habiles
              </v-chip>
          
              </div>
              <div style="font-size: 12px" v-if="Repuesto.Retiro == false && Repuesto.Importadora == 'Refax'">
                <v-chip
                class="ma-0"
                color="blue"
                outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
              >
                <v-icon left>
                  mdi-car
                </v-icon>
                Despacho en 2 dias habiles
              </v-chip>
          
              </div>
              <div style="font-size: 12px" v-if="Repuesto.Retiro == false && Repuesto.Importadora == 'Alsacia'">
                <v-chip
                class="ma-0"
                color="blue"
                outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
              >
                <v-icon left>
                  mdi-car
                </v-icon>
                Despacho en 2 dias habiles
              </v-chip>
          
              </div>
              <div style="font-size: 12px" v-if="Repuesto.Retiro == false && Repuesto.Importadora == 'Bicimoto'">
                <v-chip
                class="ma-0"
                color="blue"
                outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
              >
                <v-icon left>
                  mdi-car
                </v-icon>
                Despacho en 2 dias habiles
              </v-chip>
          
              </div>
            </v-col>
          </v-col>
          <v-col cols="6" style="
          place-self: center;
          text-align: -webkit-center;
      ">

              <div class="spinner" v-if="spinnerCantidad == true"></div>

            <div class="minusplusnumber" v-if="CantidadAgregada > 0 && spinnerCantidad == false">
              <div class="mpbtn minus" v-on:click="restarCantidad(Repuesto.CodigoImportadora, 1)">
                  -
              </div>
              
              <div id="field_container">
                  <input type="number" v-model="CantidadAgregada" disabled />
              </div>
              
              <div class="mpbtn plus" v-on:click="sumarCantidad(Repuesto.CodigoImportadora, 1)">
                  +
              </div>
          </div>
          
          <v-btn class="btn-agregar" style="margin-right: 6px;" v-if="CantidadAgregada == 0 && spinnerCantidad == false"  @click="AgregarCarritoEmit(Repuesto.CodigoImportadora, 1)">
            <v-icon
          dark
          right
        >
        mdi-cart-plus
        </v-icon>
            Agregar
          </v-btn>

        </v-col>
        </v-row>
          <v-divider></v-divider>        
        <v-row>
          <v-col cols="6" style="margin: 0px; padding: 0.1rem 0.1rem 0.1rem 0.5rem;">
            <div style="font-size: 14px;width: 100%;">{{ Modelo.MarcaVehiculo }} {{ Modelo.Modelo }} {{ Modelo.Cilindra }}</div>
            <div style="font-size: 14px;width: 100%;">{{ Modelo.Motor }} {{ Modelo.Valvula}} VAL</div>
            <div style="font-size: 14px;width: 100%;">{{ Modelo.AñoI }} al {{ Modelo.AñoT }}</div>
          </v-col>
          <v-col cols="6" style="margin: 0px; padding: 0.1rem 0.1rem 0.1rem 0.5rem;text-aling: center;text-align: -webkit-center;">
            <v-img
              :src="`/vehiculo/${Modelo.Img}.png`"
              contain
              style="width: 60%"
            ></v-img>
          </v-col>
        </v-row>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'modal-ver-repuesto',
  props: ["ModalVerRepuesto", "spinnerModal", "spinnerCantidad", "RepuestoSeleccionado", "Repuesto", "CantidadAgregada", "CantidadMaxima", "CantidadMinima", "Modelo"],
  data() {
      return {
          // CodigoModelo: this.RepuestoSeleccionado
      }
  },


  methods: {

    async sumarCantidad(CodigoImportadora, Cantidad, Modelo){
        this.$emit('AgregarAlCarritoEmit', CodigoImportadora, Cantidad, Modelo)
    },

    async restarCantidad(CodigoImportadora, Cantidad){
        await this.$emit('RestarCarritoEmit', CodigoImportadora, Cantidad)
    },

    CerrarModalVerRepuestoEmit(){
        this.$emit('CerrarModalVerRepuestoEmit')
    },

    AgregarCarritoEmit(CodigoImportadora, Cantidad){
      var Model = this.Model
      this.$emit('AgregarAlCarritoEmit', CodigoImportadora, Cantidad, Model);
    }
  },

  computed: {
    Model: function() {
      return this.Modelo.Modelo + ' ' + this.Modelo.Cilindra
    }
  },

    
  async created() {
      // this.Modelo = await API.GET_MODEL(this.CodigoModelo);
},

}


</script>