<style scoped>
    @import './main.css';
</style>
<template>
    <div>
        <h4>Libro Ventas</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Lista de documentos emitidos.</div>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="12">
            <v-card>
                <v-tabs
                  v-model="tab"
                  background-color="deep-purple accent-4"
                  centered
                  dark
                  icons-and-text
                >
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab href="#tab-1">
                    Resumen de Ventas
                    <v-icon>mdi-phone</v-icon>
                  </v-tab>

                  <v-tab href="#tab-2">
                    Ventas por Vendedor
                    <v-icon>mdi-heart</v-icon>
                  </v-tab>

                  <v-tab href="#tab-3">
                    Otros Datos
                    <v-icon>mdi-account-box</v-icon>
                  </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item
                    v-for="i in 3"
                    :key="i"
                    :value="'tab-' + i"
                  >
                    <v-card flat>
                      <v-card-text v-if="i == 1">
                          <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <th width="20%" height="28" valign="bottom" class="titulocajas_Menu">Tipo de Documentos</th>
                                    <th width="15%" valign="bottom" class="titulocajas_Menu">Cantidad</th>
                                    <th width="18%" valign="bottom" class="titulocajas_Menu">Valor Neto</th>
                                    <th width="15%" valign="bottom" class="titulocajas_Menu">IVA</th>
                                    <th width="12%" valign="bottom" class="titulocajas_Menu">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>FACTURA ELECTRÓNICA</td>
                                    <td>{{ Facturas.length }}</td>
                                    <td><div align="left">$ {{Math.round(TotalFacturas / 1.19)}}</div></td>
                                    <td><div align="left">$ {{Math.round(TotalFacturas - (TotalFacturas / 1.19))}}</div></td>
                                    <td><div align="left">$ {{Math.round(TotalFacturas)}}</div></td>
                                </tr>
                                <tr>
                                    <td>BOLETA ELECTRÓNICA</td>
                                    <td>{{ Boletas.length }}</td>
                                    <td><div align="left">$ {{Math.round(TotalBoletas / 1.19)}}</div></td>
                                    <td><div align="left">$ {{Math.round(TotalBoletas - (TotalBoletas / 1.19))}}</div></td>
                                    <td><div align="left">$ {{Math.round(TotalBoletas)}}</div></td>
                                </tr>
                                <tr>
                                    <td>NOTA DE CREDITO ELECTRÓNICA</td>
                                    <td>{{ NotaCredito.length }}</td>
                                    <td><div align="left">$ {{Math.round(TotalNotaCredito / 1.19)}}</div></td>
                                    <td><div align="left">$ {{Math.round(TotalNotaCredito - (TotalNotaCredito / 1.19))}}</div></td>
                                    <td><div align="left">$ {{Math.round(TotalNotaCredito)}}</div></td>
                                </tr>
                                <tr>
                                    <td><div align="right">Totales</div></td>
                                    <td><div align="left">{{ Boletas.length + Facturas.length + NotaCredito.length }}</div>
                                    </td>
                                    <td width="15%" class="texto">
                                        <div align="left">$ {{ Total / 1.19 }}</div>
                                    </td>
                                    <td width="15%" class="texto">
                                        <div align="left">$ {{ Total  - (Total / 1.19) }}</div>
                                    </td>
                                    <td width="15%" class="texto">
                                        <div align="left">$ {{ Total }}</div>
                                    </td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                      </v-card-text>
                      <v-card-text v-if="i == 2">
                          <p>Proximamente...</p>
                      </v-card-text>
                      <v-card-text v-if="i == 3">
                          <p>Proximamente...</p>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
            </v-card>
            </v-col>
        </v-row>
        

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
        tab: 1,
        //DTE S.I.I.
        Boletas: [],
        Facturas: [],
        NotaCredito: [],
        GuiaDespacho: [],
        Rechazados: [],
        //Totales DTE
        TotalBoletas: 1000,
        TotalFacturas: 1000,
        TotalAbonos: 1000,
        TotalNotaCredito: 1000,
        TotalGuiaDespacho: 1000,
        //Usuarios
        Usuarios: [],
        //Offline
        BoletasOff: [],
        FacturasOff: [],
        NotaCreditoOff: [],
        GuiaDespachoOff: [],
        RechazadosOff: [],
        //Totales DTE
        TotalBoletasOff: 0,
        TotalFacturasOff: 0,
        TotalAbonosOff: 0,
        TotalNotaCreditoOff: 0,
        TotalGuiaDespachoOff: 0,
        //Formas de Pago
        Cajas: [],
        CuentasBancarias: [],
        Transbank: 0,
        Webpay: 0
    }),
    components: {
    },

    //Variable en base a otra
    computed: {
    //    Example : function() { 
        //   return this.existe ? this.existe : this.nop
        // }
        Total: function () {
      // `this` apunta a la instancia vm
        return this.TotalFacturas
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

    },

    //Apis
    async created(){
        let Res  = await API.GET_DOCUMENTOS();
        let data = Res.data;

        for (var i = 0; i < data.length; i++) {
            if(data[i].dte == 39 && data[i].estado == 'EPR' || data[i].dte == 39 && data[i].estado == 'EPR - Envio Procesado' || data[i].dte == 39 && data[i].estado == "REC" || data[i].dte == 39 && data[i].estado == null || data[i].dte == 39 && data[i].estado == undefined){
                this.Boletas.push(data[i]);
            }else if(data[i].dte == 33 && data[i].estado == 'EPR' || data[i].dte == 33 && data[i].estado == 'EPR - Envio Procesado' || data[i].dte == 33 && data[i].estado == "REC" || data[i].dte == 33 && data[i].estado == null || data[i].dte == 33 && data[i].estado == undefined){
                this.Facturas.push(data[i]);
            }else if(data[i].dte == 61  && data[i].estado == 'EPR' || data[i].dte == 61 && data[i].estado == 'EPR - Envio Procesado' || data[i].dte == 61 && data[i].estado == "REC" || data[i].dte == 61 && data[i].estado == null || data[i].dte == 61 && data[i].estado == undefined){
                this.NotaCredito.push(data[i])
            }else if(data[i].dte == 52  && data[i].estado == 'EPR' || data[i].dte == 52 && data[i].estado == 'EPR - Envio Procesado' || data[i].dte == 52 && data[i].estado == "REC" || data[i].dte == 52 && data[i].estado == null || data[i].dte == 52 && data[i].estado == undefined ){
                this.GuiaDespacho.push(data[i])
            }else{
                this.Rechazados.push(data[i])
            }
            

        }
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>