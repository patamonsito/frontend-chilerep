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
                                        <div align="left">$ {{ FormatearPrecio(Math.round((TotalBoletas + TotalFacturas - TotalNotaCredito))) }} (ERP)</div>
                                    </td>
                                    <td width="15%" class="texto">
                                        <div align="left">$ {{ FormatearPrecio(Math.round((TotalBoletasOff + TotalFacturasOff - TotalNotaCreditoOff))) }}<br>$ {{ FormatearPrecio(Math.round((CantidadTotalErpMasSii))) }} (S.I.I. + ERP)</div>
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

                  <v-tab href="#tabdos-2">
                    Boletas
                    <v-icon>mdi-account-cash</v-icon>
                  </v-tab>

                  <v-tab href="#tabdos-3">
                    Facturas
                    <v-icon>mdi-sitemap-outline</v-icon>
                  </v-tab>
                  <v-tab href="#tabdos-4">
                    Guias Despacho
                    <v-icon>mdi-sitemap-outline</v-icon>
                  </v-tab>
                  <v-tab href="#tabdos-5">
                    Nota Credito
                    <v-icon>mdi-sitemap-outline</v-icon>
                  </v-tab>
                  <v-tab href="#tabdos-6">
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
                                <tr v-for="Documento, e in Documentos" :key="e">
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
                                            <v-list-item link>
                                              <v-list-item-title @click="VerDetalles(Documento)">Ver Detalles</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item link>
                                              <v-list-item-title @click="RealizarNotaCredito(Documento.receptor, Documento.dte, Documento.folio)">Nota de Credito</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item link>
                                              <v-list-item-title @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">Imprimir Letter</v-list-item-title>
                                            </v-list-item>
                                          </v-list>
                                        </v-menu>
                                    </td>
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
                                <tr v-for="Documento, e in Boletas" :key="e">
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
                                                <v-list-item link>
                                                  <v-list-item-title @click="VerDetalles(Documento)">Ver Detalles</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link>
                                                  <v-list-item-title @click="RealizarNotaCredito(Documento.receptor, Documento.dte, Documento.folio)">Nota de Credito</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link>
                                                  <v-list-item-title @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">Imprimir Letter</v-list-item-title>
                                                </v-list-item>
                                              </v-list>
                                            </v-menu>
                                        </td>
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
                                <tr v-for="Documento, e in Facturas" :key="e">
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
                                                <v-list-item link>
                                                  <v-list-item-title @click="VerDetalles(Documento)">Ver Detalles</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link>
                                                  <v-list-item-title @click="RealizarNotaCredito(Documento.receptor, Documento.dte, Documento.folio)">Nota de Credito</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link>
                                                  <v-list-item-title @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">Imprimir Letter</v-list-item-title>
                                                </v-list-item>
                                              </v-list>
                                            </v-menu>
                                        </td>
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
                                                <v-list-item link>
                                                  <v-list-item-title @click="VerDetalles(Documento)">Ver Detalles</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link>
                                                  <v-list-item-title @click="RealizarNotaCredito(Documento.receptor, Documento.dte, Documento.folio)">Nota de Credito</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link>
                                                  <v-list-item-title @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">Imprimir Letter</v-list-item-title>
                                                </v-list-item>
                                              </v-list>
                                            </v-menu>
                                        </td>
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
                                                <v-list-item link>
                                                  <v-list-item-title @click="VerDetalles(Documento)">Ver Detalles</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link>
                                                  <v-list-item-title @click="RealizarNotaCredito(Documento.receptor, Documento.dte, Documento.folio)">Nota de Credito</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link>
                                                  <v-list-item-title @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">Imprimir Letter</v-list-item-title>
                                                </v-list-item>
                                              </v-list>
                                            </v-menu>
                                        </td>
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
                                                <v-list-item link>
                                                  <v-list-item-title @click="VerDetalles(Documento)">Ver Detalles</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link>
                                                  <v-list-item-title @click="RealizarNotaCredito(Documento.receptor, Documento.dte, Documento.folio)">Nota de Credito</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link>
                                                  <v-list-item-title @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">Imprimir Letter</v-list-item-title>
                                                </v-list-item>
                                              </v-list>
                                            </v-menu>
                                        </td>
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
                                                <v-list-item link>
                                                  <v-list-item-title @click="VerDetalles(Documento)">Ver Detalles</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link>
                                                  <v-list-item-title @click="RealizarNotaCredito(Documento.receptor, Documento.dte, Documento.folio)">Nota de Credito</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link>
                                                  <v-list-item-title @click="Imprimir(Documento.receptor, Documento.dte, Documento.folio, 'Letter')">Imprimir Letter</v-list-item-title>
                                                </v-list-item>
                                              </v-list>
                                            </v-menu>
                                        </td>
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

            <v-dialog
              v-model="ModalVerDetalles"
              scrollable
              max-width="1200px"
             v-if="ModalVerDetalles == true">
              <v-card>
                <v-card-title>{{ DocumentoSeleccionado.tipo.dte_tipo }} #{{ DocumentoSeleccionado.folio}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                
                <v-row style="margin-top: 1rem">
                    <v-col cols="6">
                       <v-text-field
                         label="Cliente"
                         placeholder="Placeholder"
                         :value="DocumentoSeleccionado.datos_dte.Encabezado.Receptor.RUTRecep + ' ' + DocumentoSeleccionado.datos_dte.Encabezado.Receptor.RznSocRecep "
                         :disabled="true"
                         outlined
                       ></v-text-field>
                       
                       <v-text-field
                         label="Fecha y Hora"
                         placeholder="Placeholder"
                         :value="DocumentoSeleccionado.fecha_hora_creacion"
                         :disabled="true"
                         outlined
                       ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                          label="Vendedor"
                          placeholder="Placeholder"
                          :value="DocumentoSeleccionado.extra.dte.Encabezado.Emisor.CdgVendedor"
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
                                <th style="padding-left: 1rem">Descripcion</th>
                                <th style="text-align: center">Cant.</th>
                                <th style="text-align: center">Precio</th>
                            </thead>
                            <tbody>
                                <tr v-for="Detalle, i in DocumentoSeleccionado.detalle" :key="i">
                                    <td style="text-align: center">{{Detalle.NroLinDet}}</td>
                                    <td>{{Detalle.NmbItem}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Detalle.QtyItem))}}</td>
                                    <td style="text-align: center">{{FormatearPrecio(parseInt(Detalle.PrcItem))}}</td>
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
            </v-dialog>
    </v-row>


        </div>
        <div v-else>
            <div class="center">
                <img src="http://localhost:3000/etc/loader.gif" alt="Cargando...">
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


        //Opciones de los DTE
        async VerDetalles(Documento){
            if(Documento?._id){
                this.DocumentoSeleccionado = Documento;
                this.ModalVerDetalles = true;
            }else{
                let GetDocumento = await API.POST_DOCUMENTO(Documento)
                this.DocumentoSeleccionado = GetDocumento;
                this.ModalVerDetalles = true;
            }
        },


        
        RealizarNotaCredito(Receptor, Dte, Folio){
            console.log(Receptor, Dte, Folio)
        },
        
        Imprimir(Receptor, Dte, Folio, Formato){
            console.log(Receptor, Dte, Folio, Formato)
        },

        async FilterDateRange(){
            if(this.dateFilter[0] == '' || this.dateFilter[1] == '' || this.dateFilter.length < 2){
                return this.modalPicker = false;
            };

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

        Init(Res){
            


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
            console.log(e.total)
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
        let DocumentosOff = [
        ...this.BoletasOff,
        ...this.FacturasOff,
        ...this.GuiaDespachoOff,
        ...this.NotaCreditoOff,
        ...this.Abonos
        ]

        this.DocumentosOff = DocumentosOff;

        //ASIGNAR TOTALES A VENDEDORES SEGUN DOCUMENTO
        this.Vendedores.map(e => {
            for(let i = 0; i < DocumentosOff.length; i++){
                if(e.Usuario == DocumentosOff[i].Usuario){
                    if(DocumentosOff[i].TipoDocumento == 'Boleta'){
                        e.TotalBoletas = e.TotalBoletas + DocumentosOff[i].PrecioTotal;
                    }else if(DocumentosOff[i].TipoDocumento == 'Factura'){
                        e.TotalFacturas = e.TotalFacturas + DocumentosOff[i].PrecioTotal;
                    }else if(DocumentosOff[i].TipoDocumento == 'Nota Credito'){
                        e.TotalNotaCredito = e.TotalNotaCredito + DocumentosOff[i].PrecioTotal;
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




        let AllDocument = Res.data.map( e => {
        
            for(var i = 0; i < DocumentosOff.length; i++){ 
                if(e.receptor == DocumentosOff[i].Receptor && e.dte == DocumentosOff[i].Dte && e.folio == DocumentosOff[i].Folio){
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
                }
            }   
                
            if(e?.Usuario){
                e.Offline = false;
                return e;
            }else{
                e.Offline = true;
                return e;
            }


        })


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
                if(e.Receptor == Res.data[i].receptor && e.Dte == Res.data[i].dte && e.Folio == Res.data[i].folio){
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
            if(e.tipo == 'Nota de Crédito Electrónica' || e.tipo == 'Nota de Crédito' || e.tipo == 'Nota Crédito'){
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