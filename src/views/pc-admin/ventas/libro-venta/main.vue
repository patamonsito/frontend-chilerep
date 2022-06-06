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
                  background-color="blue-grey darken-4"
                  centered
                  dark
                  icons-and-text
                >
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab href="#tab-1">
                    Resumen de Ventas
                    <v-icon>mdi-cash</v-icon>
                  </v-tab>

                  <v-tab href="#tab-2">
                    Ventas por Vendedor
                    <v-icon>mdi-account-cash</v-icon>
                  </v-tab>

                  <v-tab href="#tab-3">
                    Otros Datos
                    <v-icon>mdi-sitemap-outline</v-icon>
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
                                    <th width="12%" valign="bottom" class="titulocajas_Menu">Total S.I.I.</th>
                                    <th width="12%" valign="bottom" class="titulocajas_Menu">Total ERP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>FACTURA ELECTRÓNICA</td>
                                    <td>{{ Facturas.length }}</td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalFacturas / 1.19))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalFacturas - (TotalFacturas / 1.19)))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalFacturas))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalFacturasOff))}}</div></td>
                                </tr>
                                <tr>
                                    <td>BOLETA ELECTRÓNICA</td>
                                    <td>{{ Boletas.length }}</td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalBoletas / 1.19))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalBoletas - (TotalBoletas / 1.19)))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalBoletas))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalBoletasOff))}}</div></td>
                                </tr>
                                <tr>
                                    <td>NOTA DE CREDITO ELECTRÓNICA</td>
                                    <td>{{ NotaCredito.length }}</td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalNotaCredito / 1.19))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalNotaCredito - (TotalNotaCredito / 1.19)))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalNotaCredito))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalNotaCreditoOff))}}</div></td>
                                </tr>
                                <tr>
                                    <td><div align="left"><strong>TOTALES</strong></div></td>
                                    <td><div align="left">{{ Boletas.length + Facturas.length + NotaCredito.length }}</div>
                                    </td>
                                    <td width="15%" class="texto">
                                        <div align="left">$ {{ FormatearPrecio(Math.round((TotalBoletas + TotalFacturas - TotalNotaCredito) / 1.19)) }}</div>
                                    </td>
                                    <td width="15%" class="texto">
                                        <div align="left">$ {{ FormatearPrecio(Math.round((TotalBoletas + TotalFacturas - TotalNotaCredito)  - ((TotalBoletas + TotalFacturas - TotalNotaCredito) / 1.19))) }}</div>
                                    </td>
                                    <td width="15%" class="texto">
                                        <div align="left">$ {{ FormatearPrecio(Math.round((TotalBoletas + TotalFacturas - TotalNotaCredito))) }}</div>
                                    </td>
                                    <td width="15%" class="texto">
                                        <div align="left">$ {{ FormatearPrecio(Math.round((TotalBoletasOff + TotalFacturasOff - TotalNotaCreditoOff))) }}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>GUIA DESPACHO</td>
                                    <td>{{ GuiaDespacho.length }}</td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalGuiaDespacho / 1.19))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalGuiaDespacho - (TotalGuiaDespacho / 1.19)))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalGuiaDespacho))}}</div></td>
                                    <td><div align="left">N/A</div></td>
                                </tr>
                                <tr>
                                    <td>ABONOS</td>
                                    <td>{{ Abonos.length }}</td>
                                    <td><div align="left">N/A</div></td>
                                    <td><div align="left">N/A</div></td>
                                    <td><div align="left">N/A</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalAbonos))}}</div></td>
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
                                    <th width="20%" height="28" valign="bottom" class="titulocajas_Menu">Vendedor</th>
                                    <th width="15%" valign="bottom" class="titulocajas_Menu">Doc.</th>
                                    <th width="15%" valign="bottom" class="titulocajas_Menu">Boletas</th>
                                    <th width="15%" valign="bottom" class="titulocajas_Menu">Facturas</th>
                                    <th width="15%" valign="bottom" class="titulocajas_Menu">Nota Credito</th>
                                    <th width="12%" valign="bottom" class="titulocajas_Menu">Total</th>
                                    <th width="15%" valign="bottom" class="titulocajas_Menu">Abonos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="Vendedor in Vendedores" :key="Vendedor.Usuario">
                                    <td>{{ Vendedor.Usuario }}</td>
                                    <td>{{ Vendedor.TotalDte }}</td>
                                    <td>$ {{ FormatearPrecio(Vendedor.TotalFacturas) }}</td>
                                    <td>$ {{ FormatearPrecio(Vendedor.TotalBoletas) }}</td>
                                    <td>$ {{ FormatearPrecio(Vendedor.TotalNotaCredito) }}</td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round((Vendedor.TotalBoletas + Vendedor.TotalFacturas) - Vendedor.TotalNotaCredito))}}</div></td>
                                    <td>$ {{ FormatearPrecio(Vendedor.TotalAbonos) }}</td>
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
                                    <th width="20%" height="28" valign="bottom" class="titulocajas_Menu">Metodo de Pago</th>
                                    <th width="15%" valign="bottom" class="titulocajas_Menu">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="MotodoPago in MetodosPago" :key="MotodoPago.MetodoPago">
                                    <td>{{ MotodoPago.MetodoPago }}</td>
                                    <td>$ {{ FormatearPrecio(Math.round(MotodoPago.Monto)) }}</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
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
        TotalBoletas: 0,
        TotalFacturas: 0,
        TotalAbonos: 0,
        TotalNotaCredito: 0,
        TotalGuiaDespacho: 0,
        //Vendedores
        Vendedores: [],
        //Offline
        BoletasOff: [],
        FacturasOff: [],
        NotaCreditoOff: [],
        GuiaDespachoOff: [],
        RechazadosOff: [],
        Abonos: [],
        //Totales DTE
        TotalAbonos: 0,
        TotalBoletasOff: 0,
        TotalFacturasOff: 0,
        TotalNotaCreditoOff: 0,
        TotalGuiaDespachoOff: 0,
        //Formas de Pago
        MetodosPago: []
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

        FormatearPrecio (number) {
            const exp = /(\d)(?=(\d{3})+(?!\d))/g;
            const rep = '$1.';
            let arr = number.toString().split(',');
            arr[0] = arr[0].replace(exp,rep);
            return arr[1] ? arr.join(','): arr[0];
          }

    },

    //Apis
    async created(){
        let Res  = await API.GET_DOCUMENTOS();
        let data = Res.data;

        //SEPARAR DOCUMENTOS API DTE
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
            
        //VALOR TOTALES API DTE
        this.Boletas.map(e => {
            this.TotalBoletas = this.TotalBoletas + e.total;
        })
        
        this.Facturas.map(e => {
            this.TotalFacturas = this.TotalFacturas + e.total;
        })

        this.GuiaDespacho.map(e => {
            this.TotalGuiaDespacho = this.TotalGuiaDespacho + e.total;
        })

        this.NotaCredito.map(e => {
            this.TotalNotaCredito = this.TotalNotaCredito + e.total;
        })



        // SISTEMA OFFLINE DTE
        this.BoletasOff = Res?.DocBoletas ? Res?.DocBoletas : [];
        this.FacturasOff = Res?.DocFacturas ? Res?.DocFacturas : [];
        this.GuiaDespachoOff = Res?.DocGuiaDespacho ? Res?.DocGuiaDespacho : [];
        this.NotaCreditoOff = Res?.DocNotaCredito ? Res?.DocNotaCredito : [];
        this.Abonos = Res?.DocAbonos ? Res?.DocAbonos : [];

        
        // TOTALES OFFLINE DTE
        Res?.DocBoletas.map(e => {
            this.TotalBoletasOff =  this.TotalBoletasOff + e.PrecioTotal
        })

        
        Res?.DocFacturas?.map(e => {
            this.TotalFacturasOff =  this.TotalFacturasOff + e.PrecioTotal
        })


        Res?.DocGuiaDespacho?.map(e => {
            this.TotalGuiaDespachoOff =  this.TotalGuiaDespachoOff + e.PrecioTotal

        })

        Res?.DocNotaCredito?.map(e => {
            this.TotalNotaCreditoOff =  this.TotalNotaCreditoOff + e.PrecioTotal
        })

        Res?.DocAbonos?.map(e => {
            this.TotalAbonos =  this.TotalAbonos + e.PrecioTotal
        })


        //VENTAS POR VENDEDOR
        Res?.Vendedores?.map(e => {
            this.Vendedores.push({
                Usuario: e,
                TotalBoletas: 0,
                TotalFacturas: 0,
                TotalNotaCredito: 0,
                TotalGuiaDespacho: 0,
                TotalAbonos: 0,
                TotalDte: 0,
            })
        });

     // Unir Documentos
        let Documents = [
        ...this.BoletasOff,
        ...this.FacturasOff,
        ...this.GuiaDespachoOff,
        ...this.NotaCreditoOff,
        ...this.Abonos
        ]

        //ASIGNAR TOTALES A VENDEDORES SEGUN DOCUMENTO
        this.Vendedores.map(e => {
            for(let i = 0; i < Documents.length; i++){
                if(e.Usuario == Documents[i].Usuario){
                    if(Documents[i].TipoDocumento == 'Boleta'){
                        e.TotalBoletas = e.TotalBoletas + Documents[i].PrecioTotal;
                    }else if(Documents[i].TipoDocumento == 'Factura'){
                        e.TotalFacturas = e.TotalFacturas + Documents[i].PrecioTotal;
                    }else if(Documents[i].TipoDocumento == 'Nota Credito'){
                        e.TotalNotaCredito = e.TotalNotaCredito + Documents[i].PrecioTotal;
                    }else if(Documents[i].TipoDocumento == 'Guia Despacho'){
                        e.TotalGuiaDespacho = e.TotalGuiaDespacho + Documents[i].PrecioTotal;
                    }else if(Documents[i].TipoDocumento == 'Abono'){
                        e.TotalAbonos = e.TotalAbonos + Documents[i].PrecioTotal;
                    }
                    e.TotalDte = e.TotalDte + 1;
                }
            }
        })

        Res?.MetodosPago?.map(e => {
            this.MetodosPago.push({
                MetodoPago: e,
                Monto: 0
            })
        });


        this.MetodosPago.map(e => {
            for(let i = 0; i < Documents.length; i++){ 

                if(Documents[i].MetodoPagoSeleccionado == "Transferencia y Efectivo"){

                    if(e.MetodoPago == Documents[i].CuentaBancariaSeleccionada){
                        e.Monto = e.Monto + Documents[i].MontoTransferido
                    }

                    if(e.MetodoPago == Documents[i].CajaSeleccionada){
                        e.Monto = e.Monto + Documents[i].MontoCaja
                    }

                }else if(Documents[i].MetodoPagoSeleccionado == "Transbank y Efectivo"){

                    if(e.MetodoPago == "Transbank"){
                        e.Monto = e.Monto + Documents[i].MontoTransbank
                    }

                    if(e.MetodoPago == Documents[i].CajaSeleccionada){
                        e.Monto = e.Monto + Documents[i].MontoCaja
                    }

                }else if(Documents[i].MetodoPagoSeleccionado == "Transbank y Transferencia"){

                    if(e.MetodoPago == "Transbank"){
                        e.Monto = e.Monto + Documents[i].MontoTransbank
                    }

                    if(e.MetodoPago == Documents[i].CuentaBancariaSeleccionada){
                        e.Monto = e.Monto + Documents[i].MontoTransferido
                    }

                }else if(e.MetodoPago == Documents[i].CajaSeleccionada || e.MetodoPago == Documents[i].CuentaBancariaSeleccionada || e.MetodoPago == Documents[i].MetodoPagoSeleccionado){
                      e.Monto = e.Monto + Documents[i].PrecioTotal;
                }

            }
        })


        console.log(this.MetodosPago)



    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>