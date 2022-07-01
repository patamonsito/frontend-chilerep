<style scoped>
    @import './main.css';
</style>
<template>
    <div>
        <h4>Libro Ventas</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Lista de documentos emitidos.</div>
        <v-divider></v-divider>
        <div v-if="LoaderMain == false">
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
                                    <td>FACTURA</td>
                                    <td>{{ Facturas.length }}</td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalFacturas / 1.19))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalFacturas - (TotalFacturas / 1.19)))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalFacturas))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalFacturasOff))}}</div></td>
                                </tr>
                                <tr>
                                    <td>BOLETA</td>
                                    <td>{{ Boletas.length }}</td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalBoletas / 1.19))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalBoletas - (TotalBoletas / 1.19)))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalBoletas))}}</div></td>
                                    <td><div align="left">$ {{FormatearPrecio(Math.round(TotalBoletasOff))}}</div></td>
                                </tr>
                                <tr>
                                    <td>NOTA DE CREDITO</td>
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
                                        <div align="left">$ {{ FormatearPrecio(Math.round((TotalBoletasOff + TotalFacturasOff - TotalNotaCreditoOff))) }} (ERP)<br>$ {{ FormatearPrecio(Math.round((TotalBoletasOff + TotalFacturasOff - TotalNotaCreditoOff) + CantidadTotalErpMasSii)) }} (ERP + S.I.I)</div>
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

    <!-- Filtros -->

        <div class="row">
            <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-dialog
        ref="dialog"
        v-model="modalPicker"
        :return-value.sync="dateFilter"
        persistent
        width="290px"
        height="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateFilter"
            label="Filtrar por fechas"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateFilter"
          range
        >
          <v-btn
            text
            color="primary"
            @click="modalPicker = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="FilterDateRange()"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
        </div>


    <!-- Lista de ventas  -->
        <v-row>
            <v-col cols="12">
            <v-card>                                           
                <v-tabs
                  v-model="tabDos"
                  background-color="blue-grey darken-4"
                  centered
                  dark
                  icons-and-text
                >
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab href="#tabdos-1">
                    Documentos
                    <v-icon>mdi-cash</v-icon>
                  </v-tab>

                  <v-tab href="#tabdos-2" v-show="Boletas.length != 0">
                    Boletas
                    <v-icon>mdi-account-cash</v-icon>
                  </v-tab>

                  <v-tab href="#tabdos-3" v-show="Facturas.length != 0">
                    Facturas
                    <v-icon>mdi-sitemap-outline</v-icon>
                  </v-tab>
                  <v-tab href="#tabdos-4" v-show="GuiaDespacho.length != 0">
                    Guias Despacho
                    <v-icon>mdi-sitemap-outline</v-icon>
                  </v-tab>
                  <v-tab href="#tabdos-5" v-show="NotaCredito.length != 0">
                    Nota Credito
                    <v-icon>mdi-sitemap-outline</v-icon>
                  </v-tab>
                  <v-tab href="#tabdos-6" v-show="Abonos.length != 0">
                    Abonos
                    <v-icon>mdi-sitemap-outline</v-icon>
                  </v-tab>
                  <v-tab href="#tabdos-7">
                    Offline
                    <v-icon>mdi-sitemap-outline</v-icon>
                  </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tabDos">
                  <v-tab-item
                    v-for="e in 7"
                    :key="e"
                    :value="'tabdos-' + e"
                  >
                    <v-card flat>
                      <v-card-text v-if="e == 1">
                          <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <td>Fecha</td>
                                    <td>Documento</td>
                                    <td>Razon Social</td>
                                    <td>Total</td>
                                    <td>Vendedor</td>
                                    <td>MetodoPago</td>
                                    <td>Entrega</td>
                                    <td>Estado</td>
                                    <td>Acción</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="Documento, e in Documentos" :key="e" :style="Documento.NotaCreditoRef.length != 0? 'background-color: lightgray' : ''">
                                    <td>{{ Documento.fecha.split('-').reverse().join('/') ? Documento.fecha.split('-').reverse().join('/') : 'N/A' }}</td>
                                    <td v-if="Documento.NotaCreditoRef.length == 0">{{ Documento.tipo }} #{{ Documento.folio }}</td>
                                    <td v-else>Ref. Nota de Credito {{ Documento.tipo[0] }}#{{ Documento.folio }}</td>                                  
                                    <td>{{ FormatearPrecio(Documento.receptor) }} - {{ Documento.razon_social }}</td>
                                    <td>$ {{ FormatearPrecio(Math.round(Documento.total)) }}</td>
                                    <td>{{ Documento.Usuario?  Documento.Usuario : 'S.I.I.' }}</td>
                                    <td>{{ Documento.MetodoPagoSeleccionado == 'Transferencia' ?  Documento.CuentaBancariaSeleccionada : Documento.MetodoPagoSeleccionado == 'Efectivo'? Documento.CajaSeleccionada : Documento.MetodoPagoSeleccionado ?  Documento.MetodoPagoSeleccionado : 'N/A' }}</td>
                                    <td>{{ Documento.EntregaSeleccionada ? Documento.EntregaSeleccionada : 'N/A' }}</td>
                                    <td>{{ Documento.estado }}</td>
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
                                            <v-list-item link @click="VerDetalles(Documento)">
                                              <v-list-item-title>Ver Detalles</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item link @click="RealizarNotaCredito(Documento)">
                                              <v-list-item-title>Nota de Credito</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item link @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">
                                              <v-list-item-title>Imprimir Letter</v-list-item-title>
                                            </v-list-item>
                                          </v-list>
                                        </v-menu>
                                    </td>
                                </tr>
                                <tr v-if="Documentos.length == 0">
                                    <td colspan="9" class="center">No hay Documentos emitidos.</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                      </v-card-text>
                      <v-card-text v-if="e == 2">
                          <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <td>Fecha</td>
                                    <td>Documento</td>
                                    <td>Razon Social</td>
                                    <td>Total</td>
                                    <td>Vendedor</td>
                                    <td>MetodoPago</td>
                                    <td>Entrega</td>
                                    <td>Estado</td>
                                    <td>Acción</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="Documento, e in Boletas" :key="e" :style="Documento.NotaCreditoRef.length != 0? 'background-color: lightgray' : ''">
                                    <td>{{ Documento.fecha.split('-').reverse().join('/') ? Documento.fecha.split('-').reverse().join('/') : 'N/A' }}</td>
                                    <td v-if="Documento.NotaCreditoRef.length == 0">{{ Documento.tipo }} #{{ Documento.folio }}</td>
                                    <td v-else>Ref. Nota de Credito {{ Documento.tipo[0] }}#{{ Documento.folio }}</td>                                  
                                    <td>{{ FormatearPrecio(Documento.receptor) }} - {{ Documento.razon_social }}</td>
                                    <td>$ {{ FormatearPrecio(Math.round(Documento.total)) }}</td>
                                    <td>{{ Documento.Usuario?  Documento.Usuario : 'S.I.I.' }}</td>
                                    <td>{{ Documento.MetodoPagoSeleccionado == 'Transferencia' ?  Documento.CuentaBancariaSeleccionada : Documento.MetodoPagoSeleccionado == 'Efectivo'? Documento.CajaSeleccionada : Documento.MetodoPagoSeleccionado ?  Documento.MetodoPagoSeleccionado : 'N/A' }}</td>
                                    <td>{{ Documento.EntregaSeleccionada ? Documento.EntregaSeleccionada : 'N/A' }}</td>
                                    <td>{{ Documento.estado }}</td>
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
                                                  <v-list-item link @click="VerDetalles(Documento)">
                                                    <v-list-item-title>Ver Detalles</v-list-item-title>
                                                  </v-list-item>
                                                  <v-list-item link @click="RealizarNotaCredito(Documento)">
                                                    <v-list-item-title>Nota de Credito</v-list-item-title>
                                                  </v-list-item>
                                                  <v-list-item link @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">
                                                    <v-list-item-title>Imprimir Letter</v-list-item-title>
                                                  </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </td>
                                </tr>
                                <tr v-if="Boletas.length == 0">
                                    <td colspan="9" class="center">No hay Boletas emitidas.</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                      </v-card-text>
                      <v-card-text v-if="e == 3">
                          <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <td>Fecha</td>
                                    <td>Documento</td>
                                    <td>Razon Social</td>
                                    <td>Total</td>
                                    <td>Vendedor</td>
                                    <td>MetodoPago</td>
                                    <td>Entrega</td>
                                    <td>Estado</td>
                                    <td>Acción</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="Documento, e in Facturas" :key="e" :style="Documento.NotaCreditoRef.length != 0? 'background-color: lightgray' : ''">
                                    <td>{{ Documento.fecha.split('-').reverse().join('/') ? Documento.fecha.split('-').reverse().join('/') : 'N/A' }}</td>
                                    <td v-if="Documento.NotaCreditoRef.length == 0">{{ Documento.tipo }} #{{ Documento.folio }}</td>
                                    <td v-else>Ref. Nota de Credito {{ Documento.tipo[0] }}#{{ Documento.folio }}</td>                                  
                                    <td>{{ FormatearPrecio(Documento.receptor) }} - {{ Documento.razon_social }}</td>
                                    <td>$ {{ FormatearPrecio(Math.round(Documento.total)) }}</td>
                                    <td>{{ Documento.Usuario?  Documento.Usuario : 'S.I.I.' }}</td>
                                    <td>{{ Documento.MetodoPagoSeleccionado == 'Transferencia' ?  Documento.CuentaBancariaSeleccionada : Documento.MetodoPagoSeleccionado == 'Efectivo'? Documento.CajaSeleccionada : Documento.MetodoPagoSeleccionado ?  Documento.MetodoPagoSeleccionado : 'N/A' }}</td>
                                    <td>{{ Documento.EntregaSeleccionada ? Documento.EntregaSeleccionada : 'N/A' }}</td>
                                    <td>{{ Documento.estado }}</td>
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
                                                  <v-list-item link @click="VerDetalles(Documento)">
                                                    <v-list-item-title>Ver Detalles</v-list-item-title>
                                                  </v-list-item>
                                                  <v-list-item link @click="RealizarNotaCredito(Documento)">
                                                    <v-list-item-title>Nota de Credito</v-list-item-title>
                                                  </v-list-item>
                                                  <v-list-item link @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">
                                                    <v-list-item-title>Imprimir Letter</v-list-item-title>
                                                  </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </td>
                                </tr>
                                <tr v-if="Facturas.length == 0">
                                    <td colspan="9" class="center">No hay Facturas emitidas.</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                      </v-card-text>
                      <v-card-text v-if="e == 4">
                          <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <td>Fecha</td>
                                    <td>Documento</td>
                                    <td>Razon Social</td>
                                    <td>Total</td>
                                    <td>Vendedor</td>
                                    <td>MetodoPago</td>
                                    <td>Entrega</td>
                                    <td>Estado</td>
                                    <td>Acción</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="Documento, e in GuiaDespacho" :key="e">
                                        <td>{{ Documento.fecha.split('-').reverse().join('/') ? Documento.fecha.split('-').reverse().join('/') : 'N/A' }}</td>
                                        <td>{{ Documento.tipo }} #{{ Documento.folio }}</td>
                                        <td>{{ FormatearPrecio(Documento.receptor) }} - {{ Documento.razon_social }}</td>
                                        <td>$ {{ FormatearPrecio(Math.round(Documento.total)) }}</td>
                                        <td>{{ Documento.Usuario?  Documento.Usuario : 'S.I.I.' }}</td>
                                        <td>{{ Documento.MetodoPagoSeleccionado == 'Transferencia' ?  Documento.CuentaBancariaSeleccionada : Documento.MetodoPagoSeleccionado == 'Efectivo'? Documento.CajaSeleccionada : Documento.MetodoPagoSeleccionado ?  Documento.MetodoPagoSeleccionado : 'N/A' }}</td>
                                        <td>{{ Documento.EntregaSeleccionada ? Documento.EntregaSeleccionada : 'N/A' }}</td>
                                        <td>{{ Documento.estado }}</td>
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
                                                  <v-list-item link @click="VerDetalles(Documento)">
                                                    <v-list-item-title>Ver Detalles</v-list-item-title>
                                                  </v-list-item>
                                                  <v-list-item link @click="RealizarNotaCredito(Documento)">
                                                    <v-list-item-title>Nota de Credito</v-list-item-title>
                                                  </v-list-item>
                                                  <v-list-item link @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">
                                                    <v-list-item-title>Imprimir Letter</v-list-item-title>
                                                  </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </td>
                                </tr>
                                <tr v-if="GuiaDespacho.length == 0">
                                    <td colspan="9" class="center">No hay Guías de Despacho emitidas.</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                      </v-card-text>
                      <v-card-text v-if="e == 5">
                          <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <td>Fecha</td>
                                    <td>Documento</td>
                                    <td>Razon Social</td>
                                    <td>Total</td>
                                    <td>Vendedor</td>
                                    <td>MetodoPago</td>
                                    <td>Entrega</td>
                                    <td>Estado</td>
                                    <td>Acción</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="Documento, e in NotaCredito" :key="e">
                                        <td>{{ Documento.fecha.split('-').reverse().join('/') ? Documento.fecha.split('-').reverse().join('/') : 'N/A' }}</td>
                                        <td>{{ Documento.tipo }} #{{ Documento.folio }}</td>
                                        <td>{{ FormatearPrecio(Documento.receptor) }} - {{ Documento.razon_social }}</td>
                                        <td>$ {{ FormatearPrecio(Math.round(Documento.total)) }}</td>
                                        <td>{{ Documento.Usuario?  Documento.Usuario : 'S.I.I.' }}</td>
                                        <td>{{ Documento.MetodoPagoSeleccionado == 'Transferencia' ?  Documento.CuentaBancariaSeleccionada : Documento.MetodoPagoSeleccionado == 'Efectivo'? Documento.CajaSeleccionada : Documento.MetodoPagoSeleccionado ?  Documento.MetodoPagoSeleccionado : 'N/A' }}</td>
                                        <td>{{ Documento.EntregaSeleccionada ? Documento.EntregaSeleccionada : 'N/A' }}</td>
                                        <td>{{ Documento.estado }}</td>
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
                                                  <v-list-item link @click="VerDetalles(Documento)">
                                                    <v-list-item-title>Ver Detalles</v-list-item-title>
                                                  </v-list-item>
                                                  <v-list-item link @click="RealizarNotaCredito(Documento)">
                                                    <v-list-item-title>Nota de Credito</v-list-item-title>
                                                  </v-list-item>
                                                  <v-list-item link @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">
                                                    <v-list-item-title>Imprimir Letter</v-list-item-title>
                                                  </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </td>
                                </tr>
                                <tr v-if="NotaCredito.length == 0">
                                    <td colspan="9" class="center">No hay Notas de Créditos emitidos.</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                      </v-card-text>
                      <v-card-text v-if="e == 6">
                          <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <td>Fecha</td>
                                    <td>Documento</td>
                                    <td>Razon Social</td>
                                    <td>Total</td>
                                    <td>Vendedor</td>
                                    <td>MetodoPago</td>
                                    <td>Entrega</td>
                                    <td>Estado</td>
                                    <td>Acción</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="Documento, e in Abonos" :key="e">
                                        <td>{{ Documento.fecha.split('-').reverse().join('/') ? Documento.fecha.split('-').reverse().join('/') : 'N/A' }}</td>
                                        <td>{{ Documento.tipo }} #{{ Documento.folio }}</td>
                                        <td>{{ FormatearPrecio(Documento.receptor) }} - {{ Documento.razon_social }}</td>
                                        <td>$ {{ FormatearPrecio(Math.round(Documento.total)) }}</td>
                                        <td>{{ Documento.Usuario?  Documento.Usuario : 'S.I.I.' }}</td>
                                        <td>{{ Documento.MetodoPagoSeleccionado == 'Transferencia' ?  Documento.CuentaBancariaSeleccionada : Documento.MetodoPagoSeleccionado == 'Efectivo'? Documento.CajaSeleccionada : Documento.MetodoPagoSeleccionado ?  Documento.MetodoPagoSeleccionado : 'N/A' }}</td>
                                        <td>{{ Documento.EntregaSeleccionada ? Documento.EntregaSeleccionada : 'N/A' }}</td>
                                        <td>{{ Documento.estado }}</td>
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
                                                  <v-list-item link @click="VerDetalles(Documento)">
                                                    <v-list-item-title>Ver Detalles</v-list-item-title>
                                                  </v-list-item>
                                                  <v-list-item link @click="RealizarNotaCredito(Documento)">
                                                    <v-list-item-title>Nota de Credito</v-list-item-title>
                                                  </v-list-item>
                                                  <v-list-item link @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">
                                                    <v-list-item-title>Imprimir Letter</v-list-item-title>
                                                  </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </td>
                                </tr>
                                <tr v-if="Abonos.length == 0">
                                    <td colspan="9" class="center">No hay Abonos emitidos.</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                      </v-card-text>
                      <v-card-text v-if="e == 7">
                          <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <td>Fecha</td>
                                    <td>Documento</td>
                                    <td>Razon Social</td>
                                    <td>Total</td>
                                    <td>Vendedor</td>
                                    <td>MetodoPago</td>
                                    <td>Entrega</td>
                                    <td>Estado</td>
                                    <td>Acción</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="Documento, e in DocumentosOff" :key="e">
                                        <td>{{ Documento.fecha.split('-').reverse().join('/') ? Documento.fecha.split('-').reverse().join('/') : 'N/A' }}</td>
                                        <td>{{ Documento.tipo }} #{{ Documento.folio }}</td>
                                        <td>{{ FormatearPrecio(Documento.receptor) }} - {{ Documento.razon_social }}</td>
                                        <td>$ {{ FormatearPrecio(Math.round(Documento.total)) }}</td>
                                        <td>{{ Documento.Usuario?  Documento.Usuario : Documento.datos_dte.Encabezado.Emisor.CdgVendedor ? Documento.datos_dte.Encabezado.Emisor.CdgVendedor : 'S.I.I.' }}</td>
                                        <td>{{ Documento.MetodoPagoSeleccionado == 'Transferencia' ?  Documento.CuentaBancariaSeleccionada : Documento.MetodoPagoSeleccionado == 'Efectivo'? Documento.CajaSeleccionada : Documento.MetodoPagoSeleccionado ?  Documento.MetodoPagoSeleccionado : 'N/A' }}</td>
                                        <td>{{ Documento.EntregaSeleccionada ? Documento.EntregaSeleccionada : 'N/A' }}</td>
                                        <td>{{ Documento.estado }}</td>
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
                                                  <v-list-item link @click="VerDetalles(Documento)">
                                                    <v-list-item-title>Ver Detalles</v-list-item-title>
                                                  </v-list-item>
                                                  <v-list-item link @click="RealizarNotaCredito(Documento)">
                                                    <v-list-item-title>Nota de Credito</v-list-item-title>
                                                  </v-list-item>
                                                  <v-list-item link @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">
                                                    <v-list-item-title>Imprimir Letter</v-list-item-title>
                                                  </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </td>
                                </tr>
                                <tr v-if="DocumentosOff.length == 0">
                                    <td colspan="9" class="center">No hay Documentos Offline emitidos.</td>
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

    <!-- Dialogs  -->

    <v-row>
            <!-- Venta SII  -->
            <v-dialog
              v-model="ModalVerDetalles"
              scrollable
              max-width="1200px"
             >
              <v-card v-if="ModalVerDetalles == true && DocumentoSeleccionado.tipo ? true : false">
                <v-card-title>{{ DocumentoSeleccionado.tipo.dte_tipo }} #{{ DocumentoSeleccionado.folio}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text v-if="DocumentoSeleccionado.dte != 61">
                
                <v-row style="margin-top: 1rem; text-shadow: 0 0 darkblue !important;">
                    <v-col cols="6">
                       <v-text-field
                         label="Cliente"
                         placeholder="Placeholder"
                         :value="DocumentoSeleccionado.datos_dte.Encabezado.Receptor.RUTRecep + ' ' + DocumentoSeleccionado.datos_dte.Encabezado.Receptor.RznSocRecep "
                         :disabled="true"
                         outlined
                       ></v-text-field>

                        <v-text-field
                          label="Vendedor"
                          placeholder="Placeholder"
                          :value="DocumentoSeleccionado.extra.dte.Encabezado.Emisor.CdgVendedor"
                         :disabled="true"
                          outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                       
                       <v-text-field
                         label="Fecha y Hora"
                         placeholder="Placeholder"
                         :value="DocumentoSeleccionado.fecha_hora_creacion"
                         :disabled="true"
                         outlined
                       ></v-text-field>

                        <v-text-field
                          label="Observaciones"
                          placeholder="Placeholder"
                          :value="DocumentoSeleccionado.extra.dte.Encabezado.IdDoc.TermPagoGlosa"
                          :disabled="true"
                          outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                    <v-simple-table style="border: 1px solid lightgray;">
                        <template v-slot:default>
                            <thead style="background-color: darkblue; color: white;font-size: 1rem;">
                                <th style="text-align: center">Nº</th>
                                <th style="text-align: center">Codigo</th>
                                <th style="padding-left: 1rem">Descripcion</th>
                                <th style="text-align: center">Cant.</th>
                                <th style="text-align: center">Precio</th>
                                <th style="text-align: center">Neto</th>
                                <th style="text-align: center">Iva</th>
                                <th style="text-align: center">Total</th>
                            </thead>
                            <tbody>
                                <tr v-for="Detalle, i in DocumentoSeleccionado.detalle" :key="i">
                                    <td style="text-align: center">{{Detalle.NroLinDet}}</td>
                                    <td style="text-align: center">{{Detalle.CdgItem.VlrCodigo}}</td>
                                    <td>{{Detalle.NmbItem}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Detalle.QtyItem))}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Detalle.PrcItem))}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(Math.round(parseInt(Detalle.NetoItem)))}}</td> <!-- Neto -->
                                    <td style="text-align: center">{{FormatearPrecio(Math.round(parseInt(Detalle.IvaItem)))}}</td> <!-- Iva -->
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Math.round(Detalle.MontoItem)))}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                        <v-row>
                            <v-col cols="6"></v-col>
                            <v-col cols="6">
                                <v-simple-table>
                                  <template v-slot:default>
                                    <tbody>
                                      <tr>
                                        <td style="font-weight: bold">Neto</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(DocumentoSeleccionado.neto)}} $</td>
                                      </tr>
                                      <tr>
                                        <td style="font-weight: bold">Iva</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(DocumentoSeleccionado.iva)}} $</td>
                                      </tr>
                                      <tr>
                                        <td style="font-weight: bold">Total</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(DocumentoSeleccionado.total)}} $</td>
                                      </tr>
                                    </tbody>
                                  </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                </v-card-text>

                <v-card-text v-else>
                <v-row style="margin-top: 1rem; text-shadow: 0 0 darkblue !important;">



                    <!-- e._id = DocumentosOff[i]?._id || 'Offline';
                    e.Receptor = DocumentosOff[i]?.receptor ||'';
                    e.Dte = 'Nota de Credito Electronica';
                    e.Factura = DocumentosOff[i]?.Factura ||'';
                    e.CodeNotaCredito = DocumentosOff[i]?.CodeNotaCredito ||'';
                    e.RazonNotaCredito = DocumentosOff[i]?.RazonNotaCredito ||'';
                    e.dte = DocumentosOff[i]?.dte ||'';
                    e.datos_dte = DocumentosOff[i]?.datos_dte ||'';
                    e.Folio = DocumentosOff[i]?.folio ||'';
                    e.Iva = DocumentosOff[i]?.iva ||'';
                    e.Neto = DocumentosOff[i]?.neto ||'';
                    e.Total = DocumentosOff[i]?.total ||'';
                    e.createdAt = DocumentosOff[i]?.createdAt || '0000-00-00T'; -->


                    <v-col cols="6">
                       <v-text-field
                         label="Cliente"
                         placeholder="Cliente"
                         :value="DocumentoSeleccionado.Receptor.contribuyente"
                         :disabled="true"
                         outlined
                       ></v-text-field>


                       <v-text-field
                          label="Vendedor"
                          placeholder="Placeholder"
                          :value="DocumentoSeleccionado.datos_dte.Encabezado.Emisor.CdgVendedor"
                         :disabled="true"
                          outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                       <v-text-field
                         label="Fecha y Hora"
                         placeholder="Fecha"
                         :value="DocumentoSeleccionado.createdAt.split('T')[0] ? DocumentoSeleccionado.createdAt.split('T')[0] : '0000-00-00'"
                         :disabled="true"
                         outlined
                       ></v-text-field>

                        <v-text-field
                          label="Motivo"
                          placeholder="Placeholder"
                          :value="DocumentoSeleccionado.RazonNotaCredito"
                          :disabled="true"
                          outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                    <v-simple-table style="border: 1px solid lightgray;">
                        <template v-slot:default>
                            <thead style="background-color: darkblue; color: white;font-size: 1rem;">
                                <th style="text-align: center">Nº</th>
                                <th style="text-align: center">Codigo</th>
                                <th style="padding-left: 1rem">Descripcion</th>
                                <th style="text-align: center">Cant.</th>
                                <th style="text-align: center">Precio</th>
                                <th style="text-align: center">Neto</th>
                                <th style="text-align: center">Iva</th>
                                <th style="text-align: center">Total</th>
                            </thead>
                            <tbody>
                                <tr v-for="Detalle, i in DocumentoSeleccionado.detalle" :key="i">
                                    <td style="text-align: center">{{Detalle.NroLinDet}}</td>
                                    <td style="text-align: center">{{Detalle.CdgItem.VlrCodigo}}</td>
                                    <td>{{Detalle.NmbItem}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Detalle.QtyItem))}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Detalle.PrcItem))}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(Math.round(parseInt(Detalle.NetoItem)))}}</td> <!-- Neto -->
                                    <td style="text-align: center">{{FormatearPrecio(Math.round(parseInt(Detalle.IvaItem)))}}</td> <!-- Iva -->
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Math.round(Detalle.MontoItem)))}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                        <v-row>
                            <v-col cols="6"></v-col>
                            <v-col cols="6">
                                <v-simple-table>
                                  <template v-slot:default>
                                    <tbody>
                                      <tr>
                                        <td style="font-weight: bold">Neto</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(DocumentoSeleccionado.neto)}} $</td>
                                      </tr>
                                      <tr>
                                        <td style="font-weight: bold">Iva</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(DocumentoSeleccionado.iva)}} $</td>
                                      </tr>
                                      <tr>
                                        <td style="font-weight: bold">Total</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(DocumentoSeleccionado.total)}} $</td>
                                      </tr>
                                    </tbody>
                                  </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
               
                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions style="justify-content: right;">
                  <v-btn
                    color="black"
                    class="pa-2"
                    dark
                    text
                    @click="ModalVerDetalles = false"
                  >
                    Cerrar
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-card v-else>
                <div class="center">
                    <img src="http://localhost:3000/etc/loader.gif" alt="Cargando...">
                </div>
              </v-card>
            </v-dialog>


            <!-- Venta ERP  -->
            <v-dialog
              v-model="ModalVerDetallesOff"
              scrollable
              max-width="1200px"
              v-if="ModalVerDetallesOff == true"
             >
              <v-card>
                <v-card-title>{{ DocumentoSeleccionado.TipoDocumento ||'Nota de Credito'}} #{{ DocumentoSeleccionado.Folio || DocumentoSeleccionado.folio || 0}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text v-if="DocumentoSeleccionado.Dte != 'Nota de Credito Electronica'">
                
                <v-row style="margin-top: 1rem; text-shadow: 0 0 darkblue !important;">
                    <v-col cols="6">
                       <v-text-field
                         label="Cliente"
                         placeholder="Cliente"
                         :value="DocumentoSeleccionado.Nombres ? DocumentoSeleccionado.Nombres + ' ' +  DocumentoSeleccionado.Apellidos : DocumentoSeleccionado.RazonSocialEmpresa"
                         :disabled="true"
                         outlined
                       ></v-text-field>

                       <v-text-field
                         label="Entrega"
                         placeholder="Entrega"
                         :value="DocumentoSeleccionado.EntregaSeleccionada"
                         :disabled="true"
                         outlined
                        v-if="DocumentoSeleccionado.EntregaSeleccionada"></v-text-field>


                       <v-text-field
                          label="Vendedor"
                          placeholder="Placeholder"
                          :value="DocumentoSeleccionado.Usuario"
                         :disabled="true"
                          outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                       <v-text-field
                         label="Fecha y Hora"
                         placeholder="Fecha"
                         :value="DocumentoSeleccionado.createdAt.split('T')[0] ? DocumentoSeleccionado.createdAt.split('T')[0] : '0000-00-00'"
                         :disabled="true"
                         outlined
                       ></v-text-field>

                       <v-text-field
                         label="Telefono"
                         placeholder="Telefono"
                         :value="DocumentoSeleccionado.Telefono"
                         :disabled="true"
                         outlined
                        v-if="DocumentoSeleccionado.Telefono"></v-text-field>

                        <v-text-field
                          label="Observaciones y Pago"
                          placeholder="Placeholder"
                          :value="DocumentoSeleccionado.Observaciones"
                          :disabled="true"
                          outlined
                        ></v-text-field>
                    </v-col>
                </v-row>

                <div v-if="DocumentoSeleccionado.MetodoPagoSeleccionado == 'Transferencia' || DocumentoSeleccionado.MetodoPagoSeleccionado == 'Transferencia y Efectivo' || DocumentoSeleccionado.MetodoPagoSeleccionado == 'Transbank y Transferencia'">
                <v-divider></v-divider>
                    <v-row style="text-shadow: 0 0 darkblue !important;">
                        <v-col cols="12">
                            <spam>Datos de Pago</spam>
                        </v-col>
                        <v-col cols="6">

                            <v-text-field
                               label="Pago"
                               placeholder="Pago"
                               :value="DocumentoSeleccionado.MetodoPagoSeleccionado"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                            <v-text-field
                               label="Titular"
                               placeholder="Titular"
                               :value="DocumentoSeleccionado.Titular"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                               label="Cuenta Bancaria"
                               placeholder="Cuenta Bancaria"
                               :value="DocumentoSeleccionado.CuentaBancariaSeleccionada"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                            <v-text-field
                               label="Monto"
                               placeholder="Monto"
                               :value="DocumentoSeleccionado.MontoTransferido || DocumentoSeleccionado.Monto"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                        </v-col>
                    </v-row>
                    

                </div>

               <div v-if="DocumentoSeleccionado.MetodoPagoSeleccionado == 'Efectivo' || DocumentoSeleccionado.MetodoPagoSeleccionado == 'Transferencia y Efectivo' || DocumentoSeleccionado.MetodoPagoSeleccionado == 'Transbank y Efectivo'">
                <v-divider></v-divider>
                    <v-row style="text-shadow: 0 0 darkblue !important;">
                        <v-col cols="12">
                            <spam>Datos de Pago</spam>
                        </v-col>
                        <v-col cols="6">

                            <v-text-field
                               label="Caja"
                               placeholder="Caja"
                               :value="DocumentoSeleccionado.CajaSeleccionada"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                               label="Monto"
                               placeholder="Monto"
                               :value="DocumentoSeleccionado.MontoCaja"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                        </v-col>
                    </v-row>
                    

                </div>

               <div v-if="DocumentoSeleccionado.MetodoPagoSeleccionado == 'Personalizado'">
                <v-divider></v-divider>
                    <v-row style="text-shadow: 0 0 darkblue !important;">
                        <v-col cols="12">
                            <spam>Pago Personalizado</spam>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                               label="Información del Pago"
                               placeholder="Información del Pago"
                               :value="DocumentoSeleccionado.InformacionPago"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                        </v-col>
                    </v-row>
                    

                </div>

               <div v-if="DocumentoSeleccionado.MetodoPagoSeleccionado == 'Webpay'">
                <v-divider></v-divider>
                    <v-row style="text-shadow: 0 0 darkblue !important;">
                        <v-col cols="12">
                            <spam>Pago Webpay</spam>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                               label="Orden de Compra"
                               placeholder="Orden de Compra"
                               :value="DocumentoSeleccionado.OrdenCompra"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                        </v-col>
                    </v-row>
                    

                </div>



                <div v-if="DocumentoSeleccionado.EntregaSeleccionada == 'Delivery Santiago'">
                <v-divider></v-divider>
                    <v-row style="text-shadow: 0 0 darkblue !important;">
                        <v-col cols="12">
                            <spam>Datos Delivery</spam>
                        </v-col>
                        <v-col cols="6">

                            <v-text-field
                               label="Calle"
                               placeholder="Calle"
                               :value="DocumentoSeleccionado.Calle"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                            <v-text-field
                               label="Departamento"
                               placeholder="Departamento"
                               :value="DocumentoSeleccionado.Departamento"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                               label="Comuna"
                               placeholder="Comuna"
                               :value="DocumentoSeleccionado.ComunaSeleccionada"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                            <v-text-field
                               label="Numero"
                               placeholder="Numero"
                               :value="DocumentoSeleccionado.Numero"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                        </v-col>
                    </v-row>
                    

                </div>


                <div v-if="DocumentoSeleccionado.EntregaSeleccionada == 'Envío a región'">
                <v-divider></v-divider>
                    <v-row style="text-shadow: 0 0 darkblue !important;">
                        <v-col cols="12">
                            <spam>Datos de Envio</spam>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                               label="Region"
                               placeholder="Region"
                               :value="DocumentoSeleccionado.RegionSeleccionada"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                            <v-text-field
                               label="Calle"
                               placeholder="Calle"
                               :value="DocumentoSeleccionado.Calle"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                            <v-text-field
                               label="Departamento"
                               placeholder="Departamento"
                               :value="DocumentoSeleccionado.Departamento"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                               label="Comuna"
                               placeholder="Comuna"
                               :value="DocumentoSeleccionado.ComunaSeleccionada"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                            <v-text-field
                               label="Numero"
                               placeholder="Numero"
                               :value="DocumentoSeleccionado.Numero"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                             
                            <v-text-field
                               label="Agencia"
                               placeholder="Agencia"
                               :value="DocumentoSeleccionado.AgenciaSeleccionada"
                              :disabled="true"
                               outlined
                             ></v-text-field>

                        </v-col>
                    </v-row>
                    

                </div>



                    <v-simple-table style="border: 1px solid lightgray;">
                        <template v-slot:default>
                            <thead style="background-color: darkblue; color: white;font-size: 1rem;">
                                <th style="text-align: center">Nº</th>
                                <th style="text-align: center">Codigo</th>
                                <th style="padding-left: 1rem">Descripcion</th>
                                <th style="text-align: center">Cant.</th>
                                <th style="text-align: center">Precio</th>
                                <th style="text-align: center">Neto</th>
                                <th style="text-align: center">Iva</th>
                                <th style="text-align: center">Total</th>
                            </thead>
                            <tbody>
                                <tr v-for="Detalle, i in DocumentoSeleccionado.Detalles" :key="i">
                                    <td style="text-align: center">{{Detalle.NroLinDet}}</td>
                                    <td style="text-align: center">{{Detalle.CdgItem.VlrCodigo}}</td>
                                    <td>{{Detalle.NmbItem}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Detalle.QtyItem))}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Detalle.PrcItem))}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(Math.round((parseInt(Detalle.PrcItem) / 1.19) * Detalle.QtyItem))}}</td> <!-- Iva -->
                                    <td style="text-align: center">{{FormatearPrecio(Math.round((parseInt(Detalle.PrcItem) - (parseInt(Detalle.PrcItem) / 1.19)) * Detalle.QtyItem))}}</td> <!-- Neto -->
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Math.round(Detalle.MontoItem)))}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                        <v-row>
                            <v-col cols="6"></v-col>
                            <v-col cols="6">
                                <v-simple-table>
                                  <template v-slot:default>
                                    <tbody>
                                      <tr>
                                        <td style="font-weight: bold">Neto</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(DocumentoSeleccionado.Neto)}} $</td>
                                      </tr>
                                      <tr>
                                        <td style="font-weight: bold">Iva</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(DocumentoSeleccionado.Iva)}} $</td>
                                      </tr>
                                      <tr>
                                        <td style="font-weight: bold">Total</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(DocumentoSeleccionado.PrecioTotal)}} $</td>
                                      </tr>
                                    </tbody>
                                  </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                </v-card-text>
                
                <v-card-text v-else>
                <v-row style="margin-top: 1rem; text-shadow: 0 0 darkblue !important;">



                    <!-- e._id = DocumentosOff[i]?._id || 'Offline';
                    e.Receptor = DocumentosOff[i]?.receptor ||'';
                    e.Dte = 'Nota de Credito Electronica';
                    e.Factura = DocumentosOff[i]?.Factura ||'';
                    e.CodeNotaCredito = DocumentosOff[i]?.CodeNotaCredito ||'';
                    e.RazonNotaCredito = DocumentosOff[i]?.RazonNotaCredito ||'';
                    e.dte = DocumentosOff[i]?.dte ||'';
                    e.datos_dte = DocumentosOff[i]?.datos_dte ||'';
                    e.Folio = DocumentosOff[i]?.folio ||'';
                    e.Iva = DocumentosOff[i]?.iva ||'';
                    e.Neto = DocumentosOff[i]?.neto ||'';
                    e.Total = DocumentosOff[i]?.total ||'';
                    e.createdAt = DocumentosOff[i]?.createdAt || '0000-00-00T'; -->


                    <v-col cols="6">
                       <v-text-field
                         label="Cliente"
                         placeholder="Cliente"
                         :value="DocumentoSeleccionado.Receptor.contribuyente"
                         :disabled="true"
                         outlined
                       ></v-text-field>


                       <v-text-field
                          label="Vendedor"
                          placeholder="Placeholder"
                          :value="DocumentoSeleccionado.datos_dte.Encabezado.Emisor.CdgVendedor"
                         :disabled="true"
                          outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                       <v-text-field
                         label="Fecha y Hora"
                         placeholder="Fecha"
                         :value="DocumentoSeleccionado.createdAt.split('T')[0] ? DocumentoSeleccionado.createdAt.split('T')[0] : '0000-00-00'"
                         :disabled="true"
                         outlined
                       ></v-text-field>

                        <v-text-field
                          label="Motivo"
                          placeholder="Placeholder"
                          :value="DocumentoSeleccionado.RazonNotaCredito"
                          :disabled="true"
                          outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
               
                    <v-simple-table style="border: 1px solid lightgray;">
                        <template v-slot:default>
                            <thead style="background-color: darkblue; color: white;font-size: 1rem;">
                                <th style="text-align: center">Nº</th>
                                <th style="text-align: center">Codigo</th>
                                <th style="padding-left: 1rem">Descripcion</th>
                                <th style="text-align: center">Cant.</th>
                                <th style="text-align: center">Precio</th>
                                <th style="text-align: center">Neto</th>
                                <th style="text-align: center">Iva</th>
                                <th style="text-align: center">Total</th>
                            </thead>
                            <tbody>
                                <tr v-for="Detalle, i in DocumentoSeleccionado.datos_dte.Detalle" :key="i">
                                    <td style="text-align: center">{{Detalle.NroLinDet}}</td>
                                    <td style="text-align: center">{{Detalle.CdgItem.VlrCodigo}}</td>
                                    <td>{{Detalle.NmbItem}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Detalle.QtyItem))}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Detalle.PrcItem))}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(Math.round(parseInt(Detalle.PrcItem) * Detalle.QtyItem))}}</td> <!-- Iva -->
                                    <td style="text-align: center">{{FormatearPrecio(Math.round(((parseInt(Detalle.PrcItem) * 1.19) - ((parseInt(Detalle.PrcItem) * 1.19) / 1.19)) * Detalle.QtyItem))}}</td> <!-- Neto -->
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Math.round(Detalle.MontoItem)))}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                        <v-row>
                            <v-col cols="6"></v-col>
                            <v-col cols="6">
                                <v-simple-table>
                                  <template v-slot:default>
                                    <tbody>
                                      <tr>
                                        <td style="font-weight: bold">Neto</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(DocumentoSeleccionado.Neto)}} $</td>
                                      </tr>
                                      <tr>
                                        <td style="font-weight: bold">Iva</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(DocumentoSeleccionado.Iva)}} $</td>
                                      </tr>
                                      <tr>
                                        <td style="font-weight: bold">Total</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(DocumentoSeleccionado.Total)}} $</td>
                                      </tr>
                                    </tbody>
                                  </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions style="justify-content: right;">
                  <v-btn
                    color="black"
                    class="pa-2"
                    dark
                    text
                    @click="ModalVerDetallesOff = false"
                  >
                    Cerrar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- NOTA CREDITO  -->
            <v-dialog
              v-model="ModalNotaCredito"
              scrollable
              max-width="1200px"
              v-if="ModalNotaCredito == true"
             >
              <v-card v-if="ModalNotaCredito == true && LoaderNotaCredito == false && NotaCreditoReady == false">
                <v-card-title>{{ DocumentoSeleccionado.tipo.dte_tipo }} #{{ DocumentoSeleccionado.folio || 0}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                
                <v-alert class="mt-2" dense outlined type="error" v-if="AlertNotaCredito != ''">
                  <strong
                    > {{ AlertNotaCredito }}</strong
                  >
                </v-alert>



                <v-row style="margin-top: 1rem;">
                    <v-col cols="6">
                        <v-select
                          :items="SelectNotaCredito"
                          label="Seleccione Motivo"
                          v-model="CodeNotaCredito"
                          @change="VerificarNotaCredito()"
                        ></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                           label="Explique la Razon"
                           placeholder="Porque se emite esta nota de credito"
                          v-model="RazonNotaCredito"
                         ></v-text-field>
                    </v-col>
                </v-row>
                <v-divider></v-divider>

                    <v-simple-table style="border: 1px solid lightgray;">
                        <template v-slot:default>
                            <thead style="background-color: darkblue; color: white;font-size: 1rem;">
                                <th style="text-align: center">Nº</th>
                                <th style="text-align: center">Codigo</th>
                                <th style="padding-left: 1rem">Descripcion</th>
                                <th style="text-align: center">Cant.</th>
                                <th style="text-align: center">Precio</th>
                                <th style="text-align: center">Neto</th>
                                <th style="text-align: center">Iva</th>
                                <th style="text-align: center">Total</th>
                                <th style="text-align: center" v-if="DocumentoSeleccionado.detalle.length > 1">Eliminar</th>
                            </thead>
                            <tbody>
                                <tr v-for="Detalle, i in DocumentoSeleccionado.detalle" :key="i">
                                    <td style="text-align: center">{{Detalle.NroLinDet}}</td>
                                    <td style="text-align: center">{{Detalle.CdgItem.VlrCodigo}}</td>
                                    <td>{{Detalle.NmbItem}}</td>
                                    <td style="text-align: center">
                                        <v-text-field
                                           label="Cant."
                                           placeholder="Cantidad"
                                           v-model="Detalle.QtyItem"
                                           @keyup="TotalDocumentoSeleccionado()"
                                         ></v-text-field>
                                    </td>
                                    <td style="text-align: center">
                                        <v-text-field
                                           label="Monto"
                                           placeholder="EditarMonto"
                                           v-model="Detalle.PrcItem"
                                           @keyup="TotalDocumentoSeleccionado()"></v-text-field></td>
                                    <td style="text-align: center">{{FormatearPrecio(Math.round(parseInt(Detalle.NetoItem)))}}</td> <!-- Neto -->
                                    <td style="text-align: center">{{FormatearPrecio(Math.round(parseInt(Detalle.IvaItem)))}}</td> <!-- Iva -->
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Math.round(Detalle.MontoItem)))}}</td>
                                    <td style="text-align: center" v-if="DocumentoSeleccionado.detalle.length > 1">
                                        <v-btn color="error" @click="EliminarItem(Detalle.NroLinDet)">
                                            <v-icon small dark>mdi-archive-remove</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                        <v-row>
                            <v-col cols="6"></v-col>
                            <v-col cols="6">
                                <v-simple-table>
                                  <template v-slot:default>
                                    <tbody>
                                      <tr>
                                        <td style="font-weight: bold">Neto</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(Math.round((DocumentoSeleccionado.total / 1.19)))}} $</td>
                                      </tr>
                                      <tr>
                                        <td style="font-weight: bold">Iva</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(Math.round(DocumentoSeleccionado.total - Math.round((DocumentoSeleccionado.total / 1.19))) )}} $</td>
                                      </tr>
                                      <tr>
                                        <td style="font-weight: bold">Total</td>
                                        <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatearPrecio(DocumentoSeleccionado.total)}} $</td>
                                      </tr>
                                    </tbody>
                                  </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions style="justify-content: right;">
                  <v-btn
                    color="success"
                    class="pa-2"
                    dark
                    text
                    @click="EnviarNotaCredito()"
                  >
                    Realizar Nota de Credito
                  </v-btn>
                  <v-btn
                    color="black"
                    class="pa-2"
                    dark
                    text
                    @click="ModalNotaCredito = false"
                  >
                    Cerrar
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-card v-else-if="LoaderNotaCredito == false && NotaCreditoReady == true">
                <v-col cols="12">
                    <v-alert
                      dense
                      text
                      type="success"
                    >
                      Nota de Credito Realizada con exito!
                    </v-alert>
                </v-col>
              </v-card>
              <v-card v-else>
                <div class="center">
                    <img src="http://localhost:3000/etc/loader.gif" alt="Cargando...">
                </div>
              </v-card>
            </v-dialog>



    </v-row>


        </div>
        <div v-else>
            <div class="center">
                <img src="http://localhost:3000/etc/loader.gif" alt="Cargando...">
            </div>

            <div class="center" v-if="Retry == true">
                <p>Fallo al consultar en el S.I.I. Reintentando...</p>
            </div>
        </div>
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
        tabDos: 1,
        LoaderMain: true,
        //Filter
        modalPicker: false,
        dateFilter: '',
        //Ver detalles modal
        ModalVerDetalles: false,
        DocumentoSeleccionado: null,
        ModalVerDetallesOff: false,
        ModalNotaCredito: false,
        //Campos nota de credito
        CodeNotaCredito: '',
        RazonNotaCredito: '',
        //DTE S.I.I.
        Documentos: [],
        Boletas: [],
        Facturas: [],
        NotaCredito: [],
        GuiaDespacho: [],
        Rechazados: [],
        //Totales DTE
        CantidadTotalErpMasSii: 0,
        TotalBoletas: 0,
        TotalFacturas: 0,
        TotalAbonos: 0,
        TotalNotaCredito: 0,
        TotalGuiaDespacho: 0,
        //Vendedores
        Vendedores: [],
        //Offline
        DocumentosOff: [],
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
        MetodosPago: [],
        //Nota Credito
        NotaCreditoReady: false,
        LoaderNotaCredito: false,
        AlertNotaCredito: '',
        SelectNotaCredito: ["Anular Documento", "Correccion de Monto", "Correccion de Texto"],
        //Error al solicitar los datos
        Retry: false,
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

        async EnviarNotaCredito(){
          let CodeNotaCredito = this.CodeNotaCredito == "Anular Documento" ? '1' : this.CodeNotaCredito == "Correccion de Monto"? '3' : '2' 
          
          this.LoaderNotaCredito = true;
          
          this.DocumentoSeleccionado = {
            ...this.DocumentoSeleccionado,
            CodeNotaCredito: CodeNotaCredito,
            RazonNotaCredito: this.RazonNotaCredito
          }
          
          let Response = await API.POST_NOTACREDITO(this.DocumentoSeleccionado)
        
          if(Response.response == 'EXITO'){
            this.NotaCreditoReady = true;
            this.LoaderNotaCredito = false;
            setTimeout(() => {
              this.ModalNotaCredito = false;
              this.NotaCreditoReady = false;
            }, 3000);
          }else{
            this.AlertNotaCredito = 'No se pudo realizar la nota de credito por favor contacte con soporte.';
            setTimeout(() => {
              this.AlertNotaCredito = '';
            }, 5000);
          }
        
        },


        async RealizarNotaCredito(Documento){
            this.DocumentoSeleccionado = {}
            
            if(!Documento.estado){
              return alert('No puedes realizar nota de credito a un documento sin estado en el SII, vuelve a intentarlo mas tarde.')
            }

            if(Documento?._id && !Documento?.usuario){ // Venta Offline
                Documento.detalle = Documento.Detalles;
                console.log(Documento)
                this.DocumentoSeleccionado = Documento;
                this.ModalNotaCredito = true;
            }else{
                this.ModalNotaCredito = true;
                this.LoaderNotaCredito = true;
                let GetDocumento = await API.POST_DOCUMENTO(Documento);
                this.DocumentoSeleccionado = GetDocumento;
                if(this.DocumentoSeleccionado.tipo.codigo == 33){
                    this.DocumentoSeleccionado.detalle.map(e => {
                        e.PrcItem = (Math.round(parseInt(e.PrcItem) * 1.19)).toString();
                        e.NetoItem = (Math.round(parseInt(e.PrcItem) / 1.19 * parseInt(e.QtyItem))).toString();
                        e.IvaItem = (Math.round(parseInt(e.PrcItem) - (parseInt(e.PrcItem) / 1.19) * parseInt(e.QtyItem))).toString();
                        e.MontoItem = (parseInt(e.NetoItem) + parseInt(e.IvaItem)).toString();
                    })
                    
                this.LoaderNotaCredito = false;
                }else{
                    this.DocumentoSeleccionado.detalle.map(e => {
                        e.NetoItem = (Math.round(parseInt(e.PrcItem) / 1.19 * parseInt(e.QtyItem))).toString();
                        e.IvaItem = (Math.round((parseInt(e.PrcItem) - (parseInt(e.PrcItem) / 1.19)) * parseInt(e.QtyItem))).toString()
                    })
                  this.LoaderNotaCredito = false;
                }
            }
        },

        TotalDocumentoSeleccionado(){
            let MontoTotal = 0;
            this.DocumentoSeleccionado.detalle.map( e => {
               e.QtyItem = e.QtyItem < 1 ? 1 : e.QtyItem;
               if(this.DocumentoSeleccionado.tipo.codigo == 33){
                   e.MontoItem = (parseInt(e.PrcItem) * parseInt(e.QtyItem)).toString();
                   e.NetoItem = (Math.round((parseInt(e.PrcItem) / 1.19) * parseInt(e.QtyItem))).toString();
                   e.IvaItem = (Math.round((parseInt(e.PrcItem) - (e.PrcItem / 1.19)) * parseInt(e.QtyItem))).toString();
                   e.MontoItem = ((parseInt(e.NetoItem) + parseInt(e.IvaItem)) * parseInt(e.QtyItem)).toString();
                   MontoTotal = MontoTotal + parseInt(e.MontoItem);
               }else{
                   e.MontoItem = (parseInt(e.PrcItem) * parseInt(e.QtyItem)).toString();
                   e.NetoItem = (Math.round((parseInt(e.PrcItem) / 1.19) * parseInt(e.QtyItem))).toString();
                   e.IvaItem = (Math.round((parseInt(e.PrcItem) - (e.PrcItem / 1.19)) * parseInt(e.QtyItem))).toString();
                   MontoTotal = MontoTotal + parseInt(e.MontoItem);
               }
            });

            if(this.DocumentoSeleccionado.tipo.codigo == 33){
                this.DocumentoSeleccionado.total = (MontoTotal).toString();
                this.DocumentoSeleccionado.iva = (Math.round((MontoTotal / 1.19))).toString();
                this.DocumentoSeleccionado.neto = (Math.round(MontoTotal - (MontoTotal / 1.19))).toString();
            }else{                
                this.DocumentoSeleccionado.total = (MontoTotal).toString();
                this.DocumentoSeleccionado.iva = (Math.round((MontoTotal / 1.19))).toString();
                this.DocumentoSeleccionado.neto = (Math.round(MontoTotal - (MontoTotal / 1.19))).toString();
            }
        },

        EliminarItem(key){
            this.DocumentoSeleccionado.detalle = this.DocumentoSeleccionado.detalle.filter(e => {
                if(e.NroLinDet != key){
                    return e;
                }
            });
            this.TotalDocumentoSeleccionado()
        },

        //Opciones de los DTE
        async VerDetalles(Documento){
            this.DocumentoSeleccionado = {}
            if(Documento?._id){
                console.log(Documento)
                this.DocumentoSeleccionado = Documento;
                this.ModalVerDetallesOff = true;
            }else{
                this.ModalVerDetalles = true;
                let GetDocumento = await API.POST_DOCUMENTO(Documento);
                if(typeof(GetDocumento?.extra?.dte) === 'undefined'){
                    
                    GetDocumento = {
                        ...GetDocumento,
                        extra: {
                            dte: {
                                Encabezado: {
                                    Emisor: {
                                        CdgVendedor: 'N/A'
                                    },
                                    IdDoc: {
                                        TermPagoGlosa: 'N/A'
                                    }
                                }
                            }
                        }
                    }
                }
                this.DocumentoSeleccionado = GetDocumento;

                if(this.DocumentoSeleccionado.tipo.codigo == 33){
                    this.DocumentoSeleccionado.detalle.map(e => {
                        e.PrcItem = (Math.round(parseInt(e.PrcItem) * 1.19)).toString();
                        e.NetoItem = (Math.round(parseInt(e.PrcItem) / 1.19)).toString();
                        e.IvaItem = (Math.round(parseInt(e.PrcItem)) - Math.round((Math.round(parseInt(e.PrcItem)) / 1.19)) * parseInt(e.QtyItem)).toString()
                        console.log(e.NetoItem, e.IvaItem, e.QtyItem)
                        e.MontoItem = ((parseInt(e.NetoItem) + parseInt(e.IvaItem)) * parseInt(e.QtyItem)).toString();
                        console.log(e.MontoItem)
                    })
                }else{
                    this.DocumentoSeleccionado.detalle.map(e => {
                        e.NetoItem = (Math.round(parseInt(e.PrcItem) / 1.19)).toString();
                        e.IvaItem = (Math.round(parseInt(e.PrcItem)) - Math.round((Math.round(parseInt(e.PrcItem)) / 1.19)) * parseInt(e.QtyItem)).toString()
                    })

                }

            }
        },

        VerificarNotaCredito(){

          if(this.CodeNotaCredito == 'Anular Documento'){
            this.RazonNotaCredito = 'DEVOLUCIÓN MERCADERíA'
          }

        },
        
        Imprimir(Receptor, Dte, Folio, Formato){

        },

        async FilterDateRange(){
            if(this.dateFilter[0] == '' || this.dateFilter[1] == '' || this.dateFilter.length == 0){
                return this.modalPicker = false;
            };
            
            this.dateFilter = this.dateFilter.length == 1 ?  [this.dateFilter[0], this.dateFilter[0]] : this.dateFilter;

            this.dateFilter.sort(function(a,b){return new Date(a).getTime() - new Date(b).getTime()});
            this.$refs.dialog.save(this.dateFilter)

            //Comenzo Api
            this.LoaderMain = true;
            this.modalPicker = false;
            let Res = await API.POST_DOCUMENTOS(this.dateFilter);
            this.Init(Res);
        },

        //Formato de Numeros
        FormatearPrecio (number) {
            const exp = /(\d)(?=(\d{3})+(?!\d))/g;
            const rep = '$1.';
            let arr = number.toString().split(',');
            arr[0] = arr[0].replace(exp,rep);
            return arr[1] ? arr.join(','): arr[0];
          },

        async Init(Res){
            if(Res?.code == "ETIMEDOUT"){
                this.Retry = true;
                let Renew = this.dateFilter == '' || this.dateFilter == null ? await API.POST_DOCUMENTOS(this.dateFilter) : await API.GET_DOCUMENTOS();
                return this.Init(Renew);
            }


        //VALORES POR DEFECTOS
        this.tab = 1;
        this.tabDos = 1;
        this.modalPicker = false;
        this.dateFilter = '';
        this.Documentos = [];
        this.Boletas = [];
        this.Facturas = [];
        this.NotaCredito = [];
        this.GuiaDespacho = [];
        this.Rechazados = [];
        this.CantidadTotalErpMasSii = 0;
        this.TotalBoletas = 0;
        this.TotalFacturas = 0;
        this.TotalAbonos = 0;
        this.TotalNotaCredito = 0;
        this.TotalGuiaDespacho = 0;
        this.Vendedores = [];
        this.DocumentosOff = [];
        this.BoletasOff = [];
        this.FacturasOff = [];
        this.NotaCreditoOff = [];
        this.GuiaDespachoOff = [];
        this.RechazadosOff = [];
        this.Abonos = [];
        this.TotalAbonos = 0;
        this.TotalBoletasOff = 0;
        this.TotalFacturasOff = 0;
        this.TotalNotaCreditoOff = 0;
        this.TotalGuiaDespachoOff = 0;
        this.MetodosPago = [];


        //Existen ventas S.i.i.
        let data = typeof(Res.data) === 'string' ? [] : Res.data;


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
        this.NotaCreditoOff = Res?.DocNotaCreditos ? Res?.DocNotaCreditos : [];
        this.Abonos = Res?.DocAbonos ? Res?.DocAbonos : [];

        
        // TOTALES OFFLINE DTE
        Res?.DocBoletas?.map(e => {
            this.TotalBoletasOff =  this.TotalBoletasOff + e.PrecioTotal
        })

        
        Res?.DocFacturas?.map(e => {
            this.TotalFacturasOff =  this.TotalFacturasOff + e.PrecioTotal
        })


        Res?.DocGuiaDespacho?.map(e => {
            this.TotalGuiaDespachoOff =  this.TotalGuiaDespachoOff + e.PrecioTotal

        })

        Res?.DocNotaCreditos?.map(e => {
            this.TotalNotaCreditoOff =  this.TotalNotaCreditoOff + e.total
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
        let DocumentosOff = [
        ...this.BoletasOff,
        ...this.FacturasOff,
        ...this.GuiaDespachoOff,
        ...this.NotaCreditoOff,
        ...this.Abonos
        ]

        console.log(this.NotaCreditoOff)

        this.DocumentosOff = DocumentosOff;

        //ASIGNAR TOTALES A VENDEDORES SEGUN DOCUMENTO
        this.Vendedores.map(e => {
            for(let i = 0; i < DocumentosOff.length; i++){
                if(e.Usuario == DocumentosOff[i].Usuario || e.Usuario.toLowerCase() == DocumentosOff[i]?.datos_dte?.Encabezado?.Emisor?.CdgVendedor.toLowerCase()){
                    if(DocumentosOff[i].TipoDocumento == 'Boleta'){
                        e.TotalBoletas = e.TotalBoletas + DocumentosOff[i].PrecioTotal;
                    }else if(DocumentosOff[i].TipoDocumento == 'Factura'){
                        e.TotalFacturas = e.TotalFacturas + DocumentosOff[i].PrecioTotal;
                    }else if(DocumentosOff[i].TipoDocumento == 'Nota Credito' ||  DocumentosOff[i].Dte == 61){
                      console.log(DocumentosOff[i])
                        e.TotalNotaCredito = e.TotalNotaCredito + DocumentosOff[i].total;
                    }else if(DocumentosOff[i].TipoDocumento == 'Guia Despacho'){
                        e.TotalGuiaDespacho = e.TotalGuiaDespacho + DocumentosOff[i].PrecioTotal;
                    }else if(DocumentosOff[i].TipoDocumento == 'Abono'){
                        e.TotalAbonos = e.TotalAbonos + DocumentosOff[i].PrecioTotal;
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
            for(let i = 0; i < DocumentosOff.length; i++){ 

                if(DocumentosOff[i].MetodoPagoSeleccionado == "Transferencia y Efectivo"){

                    if(e.MetodoPago == DocumentosOff[i].CuentaBancariaSeleccionada){
                        e.Monto = e.Monto + DocumentosOff[i].MontoTransferido
                    }

                    if(e.MetodoPago == DocumentosOff[i].CajaSeleccionada){
                        e.Monto = e.Monto + DocumentosOff[i].MontoCaja
                    }

                }else if(DocumentosOff[i].MetodoPagoSeleccionado == "Transbank y Efectivo"){

                    if(e.MetodoPago == "Transbank"){
                        e.Monto = e.Monto + DocumentosOff[i].MontoTransbank
                    }

                    if(e.MetodoPago == DocumentosOff[i].CajaSeleccionada){
                        e.Monto = e.Monto + DocumentosOff[i].MontoCaja
                    }

                }else if(DocumentosOff[i].MetodoPagoSeleccionado == "Transbank y Transferencia"){

                    if(e.MetodoPago == "Transbank"){
                        e.Monto = e.Monto + DocumentosOff[i].MontoTransbank
                    }

                    if(e.MetodoPago == DocumentosOff[i].CuentaBancariaSeleccionada){
                        e.Monto = e.Monto + DocumentosOff[i].MontoTransferido
                    }

                }else if(e.MetodoPago == DocumentosOff[i].CajaSeleccionada || e.MetodoPago == DocumentosOff[i].CuentaBancariaSeleccionada || e.MetodoPago == DocumentosOff[i].MetodoPagoSeleccionado){
                      e.Monto = e.Monto + DocumentosOff[i].PrecioTotal;
                }

            }
        })




        let AllDocument = typeof(Res.data) !== 'string' ? Res?.data?.map( e => {
          e.NotaCreditoRef = []
        
            for(var i = 0; i < DocumentosOff.length; i++){ 
                if(e.receptor == DocumentosOff[i].Receptor && e.dte == DocumentosOff[i].Dte && e.folio == DocumentosOff[i].Folio){
                   if(e.dte == 61){
                    e._id = DocumentosOff[i]?._id || 'Offline';
                    e.Receptor = DocumentosOff[i]?.receptor ||'';
                    e.Dte = 'Nota de crédito electrónica';
                    e.Factura = DocumentosOff[i]?.Factura ||'';
                    e.CodeNotaCredito = DocumentosOff[i]?.CodeNotaCredito ||'';
                    e.RazonNotaCredito = DocumentosOff[i]?.RazonNotaCredito ||'';
                    e.dte = DocumentosOff[i]?.dte ||'';
                    e.datos_dte = DocumentosOff[i]?.datos_dte ||'';
                    e.Usuario = e.datos_dte.Encabezado.Emisor.CdgVendedor;
                    console.log(DocumentosOff[i], 'rescatar')
                      console.log(e, 'here');
                    if(e.datos_dte.Detalle.length == null){
                        e.datos_dte.Detalle = [e.datos_dte.Detalle]

                        e.datos_dte.Detalle.map(a => {
                          a.MontoItem = Math.round((parseInt(a.PrcItem) * parseInt(a.QtyItem)) * 1.19)
                        })
                    }

                    e.Folio = DocumentosOff[i]?.folio ||'';
                    e.NotaCreditoRef = [];
                    e.Iva = DocumentosOff[i]?.iva ||'';
                    e.Neto = DocumentosOff[i]?.neto ||'';
                    e.Total = DocumentosOff[i]?.total ||'';
                    e.createdAt = DocumentosOff[i]?.createdAt || '0000-00-00T';
                   }else{
                    e.NotaCreditoRef = DocumentosOff[i].NotaCreditoRef;
                    e._id = DocumentosOff[i]?._id || 'Offline';
                    e.GiroEmpresa = DocumentosOff[i]?.GiroEmpresa || '';
                    e.DireccionEmpresa = DocumentosOff[i]?.DireccionEmpresa || '';
                    e.ComunaEmpresa = DocumentosOff[i]?.ComunaEmpresa || '';
                    e.EntregaSeleccionada = DocumentosOff[i]?.EntregaSeleccionada || '';
                    e.FechaEntrega = DocumentosOff[i]?.FechaEntrega || '';
                    e.RutEmpresa = DocumentosOff[i]?.RutEmpresa || '';
                    e.TipoDocumento = DocumentosOff[i]?.TipoDocumento || '';
                    e.RazonSocialEmpresa = DocumentosOff[i]?.RazonSocialEmpresa || '';
                    e.CajaSeleccionada = DocumentosOff[i]?.CajaSeleccionada || '';
                    e.CuentaBancariaSeleccionada = DocumentosOff[i]?.CuentaBancariaSeleccionada || '';
                    e.MontoTransferido = DocumentosOff[i]?.MontoTransferido || '';
                    e.MontoCaja = DocumentosOff[i]?.MontoCaja || '';
                    e.MontoTransbank = DocumentosOff[i]?.MontoTransbank || '';
                    e.Titular = DocumentosOff[i]?.Titular || '';
                    e.CorreoEmpresa = DocumentosOff[i]?.CorreoEmpresa || '';
                    e.OrdenCompra = DocumentosOff[i]?.OrdenCompra || '';
                    e.InformacionPago = DocumentosOff[i]?.InformacionPago || '';
                    e.Observaciones = DocumentosOff[i]?.Observaciones || '';
                    e.Rut = DocumentosOff[i]?.Rut || '';
                    e.Nombres = DocumentosOff[i]?.Nombres || '';
                    e.Apellidos = DocumentosOff[i]?.Apellidos || '';
                    e.Telefono = DocumentosOff[i]?.Telefono || '';
                    e.RegionSeleccionada = DocumentosOff[i]?.RegionSeleccionada || '';
                    e.ComunaSeleccionada = DocumentosOff[i]?.ComunaSeleccionada || '';
                    e.Calle = DocumentosOff[i]?.Calle || '';
                    e.Numero = DocumentosOff[i]?.Numero || '';
                    e.Departamento = DocumentosOff[i]?.Departamento || '';
                    e.CorreoCliente = DocumentosOff[i]?.CorreoCliente || '';
                    e.AgenciaSeleccionada = DocumentosOff[i]?.AgenciaSeleccionada || '';
                    e.MetodoPagoSeleccionado = DocumentosOff[i]?.MetodoPagoSeleccionado || '';
                    e.Usuario = DocumentosOff[i]?.Usuario || '';
                    e.Neto = DocumentosOff[i]?.Neto || '';
                    e.Iva = DocumentosOff[i]?.Iva || '';
                    e.PrecioTotal = DocumentosOff[i]?.PrecioTotal || '';
                    e.Carrito = DocumentosOff[i]?.Carrito || '';
                    e.Detalles = DocumentosOff[i]?.Detalles || '';
                    e.Receptor = DocumentosOff[i]?.Receptor || '';
                    e.Dte = DocumentosOff[i]?.Dte || '';
                    e.Codigo = DocumentosOff[i]?.Codigo || '';
                    e.Temporal = DocumentosOff[i]?.Temporal || '';
                    e.createdAt = DocumentosOff[i]?.createdAt || '0000-00-00T';
                  
                     if(e.folio == 458){
                       console.log(e, 'este2')
                     }
                  }

                }
            }   
                
            if(e?.Usuario){
                e.Offline = false;
                return e;
            }else{
                e.Offline = true;
                return e;
            }


        }) : DocumentosOff;


        let FormatAbonos = Res.DocAbonos.map(e => {
            e.tipo = 'Abono';
            e.estado = e.Estado || 'Disponible';
            e.folio = e.Folio ? e.Folio : '0';
            e.razon_social = e.Nombres + ' ' + e.Apellidos;
            e.receptor = e.Rut.replaceAll('.', '');
            e.total = e.PrecioTotal;
            e.fecha = e.createdAt.split('T')[0] ? e.createdAt.split('T')[0] : '0000-00-00';
            return e;
        }) 


        let AddDocOffline = DocumentosOff.filter( e => {
            // Res.data
            for(var i = 0; i < Res.data.length; i++){ 
                if(e.Receptor == Res.data[i].receptor && e.Dte == Res.data[i].dte && e.Folio == Res.data[i].folio || e._id == Res.data[i]._id ){
                    e.Existe = true
                }
            }

            if(!e.Existe && e.TipoDocumento != 'Abono'){
                e.tipo = e.TipoDocumento + ' Offline';
                e.estado = e.Estado || 'Offline';
                e.folio = e.Folio ? e.Folio : '0';
                e.razon_social = e.Dte == 33 ?  e.RazonSocialEmpresa : e.Nombres + ' ' + e.Apellidos;
                e.receptor = e.Rut || e.RutEmpresa || 'SIN RUT';
                e.total = e.PrecioTotal;
                e.fecha = e.createdAt.split('T')[0] ? e.createdAt.split('T')[0] : '0000-00-00';
                return e;
            }
        })


        AllDocument = [
            ...AllDocument,
            ...FormatAbonos,
            ...AddDocOffline
        ]

        this.Boletas = AllDocument.filter(e => {
            if(e.tipo == 'Boleta electrónica' || e.tipo == 'Boleta'){
                return e;
            }
        })

        this.Facturas = AllDocument.filter(e => {
            if(e.tipo == 'Factura electrónica' || e.tipo == 'Factura'){
                return e;
            }
        })

        this.GuiaDespacho = AllDocument.filter(e => {
            if(e.tipo == 'Guía de Despacho Electrónica' || e.tipo == 'Guía de Despacho' || e.tipo == 'Guía Despacho'){
                return e;
            }
        })

        this.NotaCredito = AllDocument.filter(e => {
            if(e.tipo == 'Nota de crédito electrónica' || e.tipo == 'Nota de Crédito' || e.tipo == 'Nota Crédito'){
                return e;
            }
        })

        this.Abonos = AllDocument.filter(e => {
            if(e.tipo == 'Abono' || e.tipo == 'Abono Electrónico'){
                return e;
            }
        })


        this.DocumentosOff = AllDocument.filter(e => {
            if(e.estado == 'Offline'){
                return e;
            }
        })

        let CantidadErpMasSii = Math.round(this.TotalBoletasOff + this.TotalFacturasOff - this.TotalNotaCreditoOff);
        

                if(CantidadErpMasSii != 0){
                    for(let i = 0; i < AllDocument.length; i++){ 
                            if(!AllDocument[i].Usuario && AllDocument[i].tipo == 'Factura electrónica' || !AllDocument[i].Usuario && AllDocument[i].tipo == 'Boleta electrónica'){
                                CantidadErpMasSii = CantidadErpMasSii + Math.round(AllDocument[i].total);
                            }
                    }
                }else{
                    CantidadErpMasSii = (this.TotalBoletas + this.TotalFacturas) - this.TotalNotaCredito;
                }

        this.CantidadTotalErpMasSii = CantidadErpMasSii;

        console.log(AllDocument)


        this.Documentos = AllDocument;
        this.LoaderMain = false;

        }



    },

    //Apis
    async created(){
        let Res  = await API.GET_DOCUMENTOS();
        this.Init(Res);
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>