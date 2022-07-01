<style scope>
    .container-center {
        min-height: 100vh;
        display: flex;
        align-items: center;
        place-content: center;
    }
    .v-input__prepend-outer {
        margin-right: 0.5rem;
    }.center {
    text-align: center;
    justify-content: center;
    justify-self: center;
    justify-items: center;
    text-align: -webkit-center;
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    min-width: 36px;
    min-height: 36px;
    border-radius: 50%;
    margin-left: 1.2rem;
    border-left-color: #09f;
    animation: spin 1s ease infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<template>
    <v-app id="inspire" clipped-left>
<div v-if="Login == true">
    <v-app id="inspire">
  
        <v-navigation-drawer
          v-model="drawer"
          app
        >
          <v-sheet
            color="indigo darken-4 text-white"
            class="pa-4 aling-center" style="text-align: -webkit-center;"
          >
            <v-avatar
              class="mb-4"
              size="64"
            >
            <v-img :src="'http://143.198.165.86:3000/avatars/' + Usuario.Avatar"></v-img>
            </v-avatar>
    
            <div>Bienvenido<br>
            <div class="font-weight-bold">{{ Usuario.Nombre }} {{ Usuario.Apellido}}</div>
            </div>
          </v-sheet>
    
          <v-divider></v-divider>
    

<v-list>
<!-- simple  -->
      <v-list-item-group
        color="primary"
      >
        <v-list-item @click="controller('Inicio')">
          <v-list-item-icon>
            <v-icon class="mdi-spin">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
<!-- simple  -->
      <v-list-item-group
        color="primary"
        v-if="Usuario.Rol == 'Director' || Usuario.Rol == 'Administrador' || Usuario.Rol == 'Vendedor'"
      >
        <v-list-item @click="controller('Carrito')">
          <v-list-item-icon>
            <v-icon>mdi-cart-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Carrito <v-chip
            class="ml-5"
      color="red"
      text-color="white"
    >
      {{ CantidadTotal }}
    </v-chip></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
<!-- collapse  -->
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        v-if="item.rol.includes(Usuario.Rol)"
      >
      
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          link @click="controller(child.title)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title" :to="child.link"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

<!-- simple  -->
      <v-list-item-group
        color="primary"
      >
        <v-list-item @click="controller('Salir')">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>


    </v-list>
        </v-navigation-drawer>
    
        <v-main>
          <v-container
            class="py-8 px-6 grey lighten-4"
            fluid
          >
          
                  <v-card class="pa-5 ">
                  <!-- Routers Aqui po  -->
                  <router-view 
                    @AgregarAlCarrito="AgregarAlCarrito"
                    @RestarCarrito="RestarCarrito"
                    :CantidadMinima="CantidadMinima"
                    :CantidadMaxima="CantidadMaxima"
                    :CantidadAgregada="CantidadAgregada"
                    :spinnerCantidad="spinnerCantidad"
                    :Carrito="Carrito"
                    :Usuario="Usuario"
                    :Login="Login"
                  ></router-view>
          
                  </v-card>


  <v-row justify="center">
    <v-dialog
      v-model="dialogCarrito"
      persistent
      max-width="1200px"
    >
      <v-card>
        <v-card-text>
          <v-container>

            <v-row>
              <v-col cols="12" v-if="LoaderDte == true">
                <div class="center">
                  <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
                  <p>Enviando, Por favor espere...</p>
                </div>
              </v-col>
            </v-row>

      <v-row v-if="DteEnviado == false && LoaderDte == false">
        <v-form ref="formCarrito" lazy-validation>
<div v-if="Carrito.length > 0">

          <v-col cols="12">
            <v-alert
              shaped
              dense
              dark
              color="grey"
            >
              Seleccione Tipo de Documento.
            </v-alert>
                <v-select
                  v-model="TipoDocumento"
                  :items="['Boleta', 'Factura', 'Abono']"
                  label="Seleccione un tipo de Documento"
                  prepend-icon="mdi-cash"
                  persistent-hint
                  single-line
                  dense></v-select>
          </v-col>


          <!-- Cliente Empresa   -->
          <div v-if="TipoDocumento == 'Factura' || TipoDocumento == 'Guia Despacho'">
            <v-alert
              shaped
              dense
              dark
              color="grey"
            >
              Información de la {{ TipoDocumento }}
            </v-alert>
            <v-row>
            <v-col cols="12" v-if="rutEmpresaInvalido">
              <v-alert class="mt-2"
              dense
              outlined
              type="error"
              >
                 Rut <strong>Invalido, por favor ingrese un rut de empresa</strong>.
              </v-alert>
            </v-col>
            <v-col cols="12" v-if="Loader === true">
            <div class="center">
              <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
              <p>verificando rut, por favor espere...</p>
            </div>
            </v-col>
            <div v-else>
              <v-row>
                <v-col cols="4">
              <v-text-field
                label="Rut Empresa"
                @blur="Format()"
                v-model="RutEmpresa"
                autocomplete="off"
                :rules="RutEmpresaRules"
                prepend-icon="mdi-account-box"
                placeholder="Ingrese un Rut de empresa"
              ></v-text-field>

                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Razon Social"
                    :rules="RazonSocialEmpresaRules"
                    prepend-icon="mdi-factory"
                    v-model="RazonSocialEmpresa"
                    placeholder="Razon Social"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Correo Empresa"
                    :rules="CorreoEmpresaRules"
                    v-model="CorreoEmpresa"
                    prepend-icon="mdi-mailbox"
                    placeholder="Ingrese el correo de la empresa"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            </v-row>
          </div>

          <!-- Cliente Natural -->
          <div v-if="TipoDocumento == 'Boleta' || TipoDocumento == 'Abono' || TipoDocumento == 'Orden de Compra'">
            <v-alert
              shaped
              dense
              dark
              color="grey"
            >
              Información del cliente que retira el producto
            </v-alert>
                <v-alert v-if="rutClienteInvalido" class="mt-2"
                  dense
                  outlined
                  type="error"
                >
                Rut <strong>Invalido</strong>.
                </v-alert>
              <v-row v-if="loaderCliente == false">
    <v-col cols="2">
        <v-text-field
        label="Rut"
        prepend-icon="mdi-account-box"
        :rules="RutRules"
        v-model="Rut"
        placeholder="Ingrese su rut"
        @blur="FormatearRut()"
        >
        </v-text-field>
    </v-col>
    <v-col cols="2">
        <v-text-field
          label="Nombres"
          :rules="NombresRules"
          v-model="Nombres"
          prepend-icon="mdi-account"
          placeholder="Ingrese sus nombres"
        >
        </v-text-field>
    </v-col>
    <v-col cols="2">
        <v-text-field
          label="Apellidos"
          :rules="ApellidosRules"
          v-model="Apellidos"
          prepend-icon="mdi-account"
          placeholder="Ingrese sus apellidos"
        >
        </v-text-field>
    </v-col>
    <v-col cols="2">
        <v-text-field
          label="Telefono"
          :rules="TelefonoRules"
          v-model="Telefono"
          prepend-icon="mdi-phone"
          placeholder="Ingrese su telefono"
        ></v-text-field>
    </v-col>
    <v-col cols="4">
        <v-text-field
          label="Correo"
          :rules="CorreoClienteRules"
          v-model="CorreoCliente"
          prepend-icon="mdi-mailbox"
          placeholder="Ingrese Correo"
        ></v-text-field>
    </v-col>
              </v-row>
              <v-row v-else-if="loaderCliente == true">
                <v-col cols="12" class="center">
                  <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
                    <p>verificando rut, por favor espere...</p>
                </v-col>
              </v-row>


          </div>

          <!-- Cotización -->
          <div v-if="TipoDocumento == 'Cotización'">
            <v-alert
              shaped
              dense
              dark
              color="grey"
            >
              Información del Cliente o Empresa
            </v-alert>
                <v-alert v-if="rutClienteInvalido" class="mt-2"
                  dense
                  outlined
                  type="error"
                >
                Rut <strong>Invalido</strong>.
                </v-alert>
              <v-row>
            <v-col cols="6">
                <v-text-field
                label="Rut"
                prepend-icon="mdi-account-box"
                :rules="RutRules"
                v-model="Rut"
                placeholder="Ingrese su rut"
                @blur="FormatearRut()"
                >
                </v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field
                  label="Nombre Completo o Razon Social"
                  :rules="NombresRules"
                  v-model="Nombres"
                  prepend-icon="mdi-account"
                  placeholder="Ingrese sus nombres"
                >
                </v-text-field>
            </v-col>
              </v-row>
          </div>


          <!-- Informacion de Pago -->
          <div v-if="TipoDocumento == 'Factura' || TipoDocumento == 'Boleta' || TipoDocumento == 'Abono'">
            <v-alert
              shaped
              dense
              dark
              color="grey"
            >
              Metodo de Pago
            </v-alert>
              <v-row>
                <v-col cols="12">
                    <v-select
                      v-model="MetodoPagoSeleccionado"
                      :rules="MetodoPagoRules"
                      :items="MetodoPagos"
                      label="Seleccione un metodo de Pago"
                      prepend-icon="mdi-cash"
                      persistent-hint
                      return-object
                      single-line
                      dense></v-select>
                </v-col>
              </v-row>
          </div>
          <!-- Efectivo -->
          <div v-if="MetodoPagoSeleccionado == 'Efectivo' || MetodoPagoSeleccionado == 'Transferencia y Efectivo' || MetodoPagoSeleccionado == 'Transbank y Efectivo'">
            <v-alert
              shaped
              dense
              dark
              color="grey"
            >
              Información de Pago en {{ MetodoPagoSeleccionado }}
            </v-alert>
              <v-row>
               <v-col cols="6">
                  <v-select
                      v-model="CajaSeleccionada"
                      :rules="CajaRules"
                      :items="Cajas"
                      label="Seleccione una Caja"
                      prepend-icon="mdi-cash-register"
                      persistent-hint
                      return-object
                      single-line
                      dense
                      style="margin-top: 1.3rem"></v-select>
               </v-col>
               <v-col cols="6">
                  <v-text-field
                  label="Monto en Efectivo"
                  :rules="MontoRules"
                  v-model="MontoCaja"
                  prepend-icon="mdi-cash-100"
                  placeholder="Ingrese Monto en Efectivo"
                  >
                  </v-text-field>
               </v-col>
              </v-row>
          </div>
          <!-- Transferencia -->
          <div v-if="MetodoPagoSeleccionado == 'Transferencia' || MetodoPagoSeleccionado == 'Transferencia y Efectivo' ||  MetodoPagoSeleccionado == 'Transbank y Transferencia'">
            <v-alert
              shaped
              dense
              dark
              color="grey"
            >
              Información de la {{ MetodoPagoSeleccionado }}
            </v-alert>
            <v-row>
                <v-col cols="3">
                    <v-select
                        v-model="CuentaBancariaSeleccionada"
                        :rules="CuentaBancariaRules"
                        :items="CuentasBancarias"
                        label="Seleccione Cuenta Bancaria"
                        prepend-icon="mdi-cash-register"
                        persistent-hint
                        return-object
                        single-line
                        dense
                        style="margin-top: 1.3rem"></v-select>
                </v-col>
                <v-col cols="3">
                  <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        :rules="FechaTransferenciaRules"
                        label="Sleccione fecha de transferencia"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      :rules="FechaTransferenciaRules"
                      no-title
                      scrollable>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                    label="Titular"
                    :rules="TitularRules"
                    v-model="Titular"
                    prepend-icon="mdi-user"
                    placeholder="Titular de la transferencia"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                    label="Monto Transferido"
                    :rules="MontoRules"
                    v-model="MontoTransferido"
                    prepend-icon="mdi-cash-100"
                    placeholder="Monto Transferido"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
          </div>

          <!-- Webpay -->
          <div v-if="MetodoPagoSeleccionado == 'Webpay'">
            <v-alert
              shaped
              dense
              dark
              color="grey"
            >
              Información de Pago con {{ MetodoPagoSeleccionado }}
            </v-alert>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                    label="Orden de Compra"
                    :rules="OrdenCompraRules"
                    v-model="OrdenCompra"
                    prepend-icon="mdi-cash-100"
                    placeholder="Ingrese Numero de Orden"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
          </div>


          <!-- Transbank -->
          <div v-if="MetodoPagoSeleccionado == 'Transbank y Efectivo' || MetodoPagoSeleccionado == 'Transbank y Transferencia'">
            <v-alert
              shaped
              dense
              dark
              color="grey"
            >
              Información de Pago con {{ MetodoPagoSeleccionado }}
            </v-alert>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                    label="Orden de Compra"
                    :rules="OrdenCompraRules"
                    v-model="MontoTransbank"
                    prepend-icon="mdi-card-bulleted"
                    placeholder="Monto en Transbank"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
          </div>

          <!-- Personalizado -->
          <div v-if="MetodoPagoSeleccionado == 'Personalizado'">
            <v-alert
              shaped
              dense
              dark
              color="grey"
            >
              Información de Pago en {{ MetodoPagoSeleccionado }}
            </v-alert>
            <v-row>
                <v-col cols="12">
                    <v-textarea
                      label="Informacion de Pago"
                      :rules="InformacionPagoRules"
                      v-model="InformacionPago"
                      no-resize
                      rows="3"
                      placeholder="Explique como pago el cliente, si pago una parte con transferencia bancaria indique la fecha y el titular de la transferencia y a que cuenta de la emrpresa se transfirio."
                    ></v-textarea>
                </v-col>
            </v-row>
          </div>


          <!-- Entrega -->
          <div v-if="TipoDocumento == 'Factura' || TipoDocumento == 'Boleta' || TipoDocumento == 'Orden de Compra'">
            <v-alert
              shaped
              dense
              dark
              color="grey"
            >
              Información de Entrega
            </v-alert>
            <v-row>
                <v-col cols="12">
                    <v-select
                      v-model="EntregaSeleccionada"
                      :rules="EntregaRules"
                      :items="Entrega"
                      label="Seleccione una opción"
                      prepend-icon="mdi-map-marker"
                      persistent-hint
                      return-object
                      single-line
                      dense
                      @change="EntregaChange()"
                      style="margin-top: 1.3rem"
                    >
                    </v-select>
                </v-col>
            </v-row>
          </div>

          <!-- Delivery Santiago -->
          <div v-if="EntregaSeleccionada == 'Delivery Santiago'">
            <v-alert
              shaped
              dense
              dark
              color="grey"
            >
              Información {{ EntregaSeleccionada }}
            </v-alert>
              <v-row>
                  <v-col cols="3">
                      <v-select
                      v-model="ComunaSeleccionada"
                      :rules="ComunaRules"
                      :items="Comunas"
                      label="Seleccione Comuna"
                      prepend-icon="mdi-map-marker"
                      persistent-hint
                      return-object
                      single-line
                      dense
                      style="margin-top: 1.3rem"
                      ></v-select>
                  </v-col>
                  <v-col cols="5">
                      <v-text-field
                      label="Calle"
                      :rules="CalleRules"
                      v-model="Calle"
                      prepend-icon="mdi-road"
                      placeholder="Nombre de la calle"
                      >
                      </v-text-field>
                  </v-col>
                  <v-col cols="2">
                      <v-text-field
                      label="Numeración"
                      :rules="NumeroRules"
                      v-model="Numero"
                      prepend-icon="mdi-numeric"
                      placeholder="Numeración de la calle"
                      ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                      <v-text-field
                      label="Departamento (Opcional)"
                      prepend-icon="mdi-city"
                      :rules="DepartamentoRules"
                      v-model="Departamento"
                      placeholder="Numero de departamento (Opcional)"
                      ></v-text-field>
                  </v-col>
              </v-row>
          </div>

          <!-- Envio a Region -->
          <div v-if="EntregaSeleccionada == 'Envío a región'">
            <v-alert
              shaped
              dense
              dark
              color="grey"
            >
              Información {{ EntregaSeleccionada }}
            </v-alert>
              <v-row>
                  <v-col cols="3">
                      <v-select
                        v-model="RegionSeleccionada"
                        :rules="RegionRules"
                        :items="Regiones"
                        label="Seleccione una region"
                        prepend-icon="mdi-map"
                        persistent-hint
                        return-object
                        single-line
                        dense
                        @change="RegionChange()"
                        style="margin-top: 1.3rem"
                      ></v-select>
                  </v-col>
                  <v-col cols="2">
                      <v-select
                        v-model="ComunaSeleccionada"
                        :rules="ComunaRules"
                        :items="Comunas"
                        label="Seleccione Comuna"
                        prepend-icon="mdi-map-marker"
                        persistent-hint
                        return-object
                        single-line
                        dense
                        style="margin-top: 1.3rem"
                      ></v-select>
                  </v-col>
                  <v-col cols="3">
                      <v-text-field
                        label="Calle"
                        :rules="CalleRules"
                        v-model="Calle"
                        prepend-icon="mdi-road"
                        placeholder="Nombre de la calle"
                      >
                      </v-text-field>
                  </v-col>
                  <v-col cols="1">
                      <v-text-field
                        label="Numeración"
                        :rules="NumeroRules"
                        v-model="Numero"
                        prepend-icon="mdi-numeric"
                        placeholder="Numeración de la calle"
                      >
                      </v-text-field>
                  </v-col>
                  <v-col cols="1">
                      <v-text-field
                        label="Departamento"
                        :rules="DepartamentoRules"
                        v-model="Departamento"
                        prepend-icon="mdi-city"
                        placeholder="Numero de departamento (Opcional)"
                      ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                      <v-select
                        v-model="AgenciaSeleccionada"
                        :rules="AgenciaRules"
                        :items="Agencias"
                        label="Agencia de envío"
                        prepend-icon="mdi-truck-delivery"
                        persistent-hint
                        return-object
                        single-line
                        dense
                        style="margin-top: 1.3rem"
                      ></v-select>
                  </v-col>
              </v-row>
          </div>
</div>
<v-divider></v-divider>

<v-row>
  <v-col cols="4">
    <v-text-field
      label="Ingrese Codigo"
      v-model="CodigoCarrito"
      autocomplete="off"
      prepend-icon="mdi-car-pickup"
      placeholder="Ingrese el Codigo de Producto"
    ></v-text-field>
  </v-col>
  <v-col cols="2">
    <v-btn color="info" class="mt-3" @click="AgregarAlCarrito('CodigoCarrito', 1, 'No Informado')">Añadir Al Carrito</v-btn>
  </v-col>
</v-row>


<v-divider></v-divider>



<!-- Carrito  -->
<div v-if="Carrito.length > 0 && CarritoLoader == false">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Nº
          </th>
          <th class="text-left">
            Codigo
          </th>
          <th class="text-left">
            Producto
          </th>
          <th class="text-left">
            Cantidad
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Precio Total
          </th>
          <th class="text-left">
            Eliminar
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Producto, i in Carrito"
          :key="Producto._id"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ Producto.CodigoProducto }}</td>
          <td>{{ Producto.Descripcion }}</td>
          <td> 
            <v-text-field
              :value="Producto.Cantidad"
              type="number"
              @blur="ActualizarCarrito(Producto.CodigoImportadora, $event.target.value)"
            style="max-width: 4rem"></v-text-field>
          </td>
          <td>{{ FormatPrecio(Producto.Precio) }}</td>
          <td>{{ Producto.Total }}</td>
          <td>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="red"
                  v-bind="attrs"
                  dark
                  v-on="on"
                  @click="RestarCarrito(Producto.CodigoImportadora, 99)"
                >
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
<v-divider></v-divider>
<v-row>
  <v-col cols="6">
        <v-textarea
          label="Observaciones"
          v-model="Observaciones"
          outlined
        ></v-textarea>
  </v-col>
  <v-col cols="6">
    <div v-if="Carrito.length > 0 && CarritoLoader == false">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td style="font-weight: bold">Neto</td>
              <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatPrecio(Math.round(PrecioTotal / 1.19))}} $</td>
            </tr>
            <tr>
              <td style="font-weight: bold">Iva</td>
              <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatPrecio(Math.round(PrecioTotal - Math.round((PrecioTotal / 1.19))) )}} $</td>
            </tr>
            <tr>
              <td style="font-weight: bold">Total</td>
              <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatPrecio(Math.round(PrecioTotal))}} $</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
</div>
    
  </v-col>
</v-row>
</div>
<v-col cols="12" v-if="CarritoLoader == true">
<div class="center">
  <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
  <p>Cargando, por favor espere...</p>
</div>
</v-col>

<div v-if="Carrito.length == 0 && CarritoLoader == false">
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Nº
          </th>
          <th class="text-left">
            Codigo
          </th>
          <th class="text-left">
            Producto
          </th>
          <th class="text-left">
            Cantidad
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Precio Total
          </th>
          <th class="text-left">
            Eliminar
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="7" class="center">No hay productos añadidos al carro.</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</div>


<v-divider></v-divider>


<v-btn
      class="ma-2"
      color="grey"
      dark
      @click="CerrarCarrito()"
    >
      Cerrar
</v-btn>

<v-btn
      class="ma-2"
      color="error"
      @click="VaciarCarrito()"
      v-if="Carrito.length > 0"
    >
      Vaciar Carrito
</v-btn>


<v-btn
      class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="primary"
      @click="GenerarDocumento()"
      v-if="TipoDocumento != null"
    >
      Generar {{ TipoDocumento }}
</v-btn>

        </v-form>
      </v-row>

      <!-- Imprimir Documento -->
        <v-row v-if="DteEnviado == true && LoaderDte == false">
          <v-col cols="12">
    <v-alert
      dense
      text
      type="success"
    >
      Documento Generado!
    </v-alert>
          </v-col>
          
          <object data='' type='' style="width:50%; height:calc(100vh - 3rem)"></object>



<v-btn
      class="ma-2"
      color="grey"
      dark
      @click="CerrarCarrito()"
    >
      Cerrar
</v-btn>


        </v-row>

          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>


<!-- Notificacion -->
<v-snackbar
      v-model="Snackbar"
      :timeout="Timeout"
      dark
      color="white"
    >
    <v-row>
      <v-col cols="2">
        <v-icon :style="SnackbarColor">mdi-information</v-icon>
      </v-col>
      <v-col cols="10">
        <p :style="SnackbarColor" style="padding: 0; margin: 0;padding-top: 0.2rem;">{{ SnackbarAlert }}</p>
      </v-col>
    </v-row>

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          dark
          v-bind="attrs"
          @click="Snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>



          </v-container>
        </v-main>
      </v-app>
</div>


<div v-else>
    <div class="container container-center">
        <v-card
        elevation="2"
        outlined class="center" style="padding: 1rem;min-width: 20rem">
        
        <h3 :style="{'font-family': FontTitle }">Admin</h3>

        <v-form ref="formLogin" lazy-validation>

            <v-alert
            dense
            outlined
            type="error"
            class="aling-left"
            v-if="alert != null" style="text-align: left;"
          >
          <strong>{{ alert }}</strong>
          </v-alert>



        <v-text-field
        label="Usuario"
        :rules="UsuarioLoginRules"
        v-model="UsuarioLogin"
        prepend-icon="mdi-account"
        placeholder="Ingrese su usuario"
      >
      </v-text-field>

      
      <v-text-field
      label="Correo"
      :rules="CorreoRules"
      v-model="Correo"
      prepend-icon="mdi-mail"
      placeholder="Ingrese su correo"
    >
    </v-text-field>
    
      <v-text-field
      v-model="Contraseña"
      name="Contraseña"
      label="Contraseña"
      :rules="ContraseñaRules"
      type="password"
      prepend-icon="mdi-shield"
      placeholder="Ingrese su contraseña"
      required
    ></v-text-field>
    
    </v-form>
    
    <v-btn
    class="mt-5 mb-3"
    color="primary"
    elevation="2"
    raised
    @click="Init()"
    >
      <v-icon left>
        mdi-flag
      </v-icon>
      Iniciar Sesion
    </v-btn>


    </v-card>
    </div>
</div>





</v-app>
</template>
  <script>
    import API from "./api";
    import { MargenPrecio } from './views/global-function/margen-precio.js';
    import { DefinirImagenes } from './views/global-function/definir-imagenes.js';
    import { FormatearPrecio } from './views/global-function/formatear-precio.js';
    import ICountUp from 'vue-countup-v2';

    export default {
      name: 'app',
      components: {
        ICountUp
      },
      data: () => ({
        //DOCUMENTO VALIDADO CON EXITO
        DteEnviado: false,
        LoaderDte: false,
        //Notificacion
        Snackbar: true,
        Timeout: 5000,
        SnackbarAlert: 'Recuerda mantener el distanciamiento social y uso de mascarilla obligatorio.',
        SnackbarColor: 'color: #389da3',
        //Datos Documentos
        EntregaSeleccionada: null,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), // Fecha de Transferencia
        Empresa: {},
        RutEmpresa: null,
        TipoDocumento: null,
        RazonSocialEmpresa: null,
        CajaSeleccionada: null,
        CuentaBancariaSeleccionada: null,
        Monto: null,
        MontoTransferido: null,
        MontoCaja: null,
        MontoTransbank: null,
        Titular: null,
        CorreoEmpresa: null,
        OrdenCompra: null,
        InformacionPago: null,
        Observaciones: "Sin Observaciones.",
        Rut: null,
        Nombres: null,
        Apellidos: null,
        Telefono: "+56",
        RegionSeleccionada: null,
        ComunaSeleccionada: null,
        Calle: null,
        Numero: null,
        Departamento: null,
        Correo: null,
        AgenciaSeleccionada: null,
        MetodoPago: null,
        //Fecha de transferencias
        menu: false,
        modal: false,
        FechaTransferenciaRules: [(v) => !!v || "Seleccione una fecha"],
        //Carrito
        loader: null,
        loading: false,
        CarritoLoader: false,
        dialogCarrito: false,
        CodigoCarrito: null,
        Login: false,
        TipoDocumentoRules: [(v) => !!v || "Tipo de Documento es Requerido"],
        //forumario
        Comunas: [],
        Regiones: [],
        Agencias: [
          "Pullman",
          "Starken",
          "Chilexpress",
          "Cruz del Sur",
          "Correos de Chile",
        ],
        Entrega: ["Envío a región", "Delivery Santiago", "Retiro en tienda"],
        rutEmpresaInvalido: false,
        rutClienteInvalido: false, 
        //Carga
        Loader: false,
        loaderCliente: false,
        //Factura datos
        RutEmpresa: null,
        MetodoPagoSeleccionado: null,
        RutEmpresaRules: [
          (v) => !!v || "Ingrese un rut valido",
          (v) => (v && v.length > 7) || "Rut Invalido",
        ],
        MetodoPagoRules:  [(v) => !!v || "Seleccione un Metodo de Pago"],
        MetodoPagos: ["Transferencia", "Efectivo", "Transbank", "Webpay", "Transferencia y Efectivo", "Transbank y Efectivo", "Transbank y Transferencia", "Personalizado"],
        CuentasBancarias: ["Santander", "Banco Estado"],
        CuentaBancariaRules: [(v) => !!v || "Seleccione una Cuenta Bancaria"],
        RazonSocialEmpresaRules: [(v) => !!v || "Ingrese una razon social"],
        Cajas: ["Caja Ejercito 62"],
        CajaRules: [(v) => !!v || "Seleccione una caja"],
        MontoRules: [(v) => !!v || "Ingrese un Monto"],
        TitularRules:  [(v) => !!v || "Ingrese el titular de la transferencia"],
        OrdenCompraRules: [(v) => !!v || "Ingrese el numero de orden de compra"],
        InformacionPagoRules: [(v) => !!v || "Ingrese la información del pago"],
        CorreoEmpresaRules: [(v) => !!v || "Ingrese su Correo",
         v => /.+@.+\..+/.test(v) || 'Correo Invalido',],
        //Datos Envios
        EntregaRules: [(v) => !!v || "Seleccione metodo de entrega"],
        RutRules: [(v) => !!v || "Ingrese su rut",
          (v) => (v && v.length > 7) || "Rut Invalido"],
        NombresRules: [(v) => !!v || "Ingrese sus nombres",
        v => (v && v.length >= 2) || 'Nombre invalido',],
        ApellidosRules: [(v) => !!v || "Ingrese sus apellidos"],
        TelefonoRules: [(v) => !!v || "Ingrese su telefono",
        v => (v && v.length >= 11) || 'Telefono incompleto',
        v => /.+56./.test(v) || 'Correo Invalido',],
        RegionRules: [(v) => !!v || "Seleccione una región"],
        ComunaRules: [(v) => !!v || "Seleccione una comuna"],
        CalleRules: [(v) => !!v || "Ingrese direccion de la Calle"],
        NumeroRules: [(v) => !!v || "Ingrese la numeración"],
        DepartamentoRules: [],
        CorreoRules: [(v) => !!v || "Ingrese su Correo",
         v => /.+@.+\..+/.test(v) || 'Correo Invalido',],
        CorreoCliente: null,
        CorreoClienteRules: [(v) => !!v || "Ingrese su Correo",
         v => /.+@.+\..+/.test(v) || 'Correo Invalido',],
        AgenciaRules: [(v) => !!v || "Seleccione agencia de su preferencia"],
        //Metodo de pago
        MetodoPagoRules: [(v) => !!v || "Seleccione metodo de pago"],
        //Otros
        alert: null,
        cards: ['Today', 'Yesterday'],
        drawer: null,
        items: [
                // {
                //   action: 'mdi-code-json',
                //   title: 'Developer',
                //   items: [
                //     { title: 'Agregar Repuestos' },
                //     { title: 'Gestionar Imagenes' },
                //   ],
                // },
                {
                  rol: ["Vendedor", "Director", "Administrador"],
                  action: 'mdi-car-door',
                  title: 'Productos',
                  items: [
                    { title: 'Buscador' },
                    { title: 'Modelo' },
                    { title: 'Linea' },
                    // { title: 'Marca' },
                  ],
                },
                // {
                //   action: 'mdi-account-group',
                //   title: 'Clientes',
                //   items: [
                //     { title: 'Gestionar Clientes' },
                //   ],
                // },
                {
                  rol: ["Bodeguero", "Finanzas", "Director", "Administrador"],
                  action: 'mdi-folder-account',
                  title: 'Proveedores',
                  items: [
                    { title: 'Gestionar Proovedores' },
                  ],
                },
                {
                  rol: ["Vendedor", "Finanzas", "Director", "Administrador"],
                  action: 'mdi-cash-register',
                  title: 'Ventas',
                  items: [
                    { title: 'Libro Venta' },
                    // { title: 'Guia Despacho' },
                  ],
                },
                // {
                //   action: 'mdi-rocket-launch',
                //   title: 'Ecommerce',
                //   items: [
                //     { title: 'Ventas Ecommerce' },
                //     { title: 'Seguimientos' },
                //   ],
                // },
                {
                  rol: ["Bodeguero", "Director", "Administrador"],
                  action: 'mdi-human-dolly',
                  title: 'Bodega',
                  items: [
                    { title: 'Gestionar Bodegas' },
                    { title: 'Gestionar Mercaderia' },
                  ],
                },
                // {
                //   action: 'mdi-package',
                //   title: 'Pedidos',
                //   items: [
                //     { title: 'Gestionar Pedidos' },
                //   ],
                // },
                // {
                //   action: 'mdi-poll',
                //   title: 'Estadisticas',
                //   items: [
                //     { title: 'Rentabilidad' },
                //     { title: 'Productos' },
                //     { title: 'Ecommerce' },
                //     { title: 'Bodega' },
                //     { title: 'Vendedores' },
                //   ],
                // },
                // {
                //   action: 'mdi-github',
                //   title: 'Soporte',
                //   items: [
                //     { title: 'Crear Ticket' },
                //     { title: 'Mis Ticket' },
                //   ],
                // },
                // {
                //   action: 'mdi-cog',
                //   title: 'Configuracion',
                //   items: [
                //     { title: 'Mis Datos' },
                //     { title: 'Sucursales' },
                //   ],
                // },
              ],
        UsuarioLogin: null,
        UsuarioLoginRules: [(v) => !!v || "Ingrese su Usuario"],
        Correo: null,
        CorreoRules: [(v) => !!v || "Ingrese su Correo",
         v => /.+@.+\..+/.test(v) || 'Correo Invalido',],
        Contraseña: null,
        ContraseñaRules: [(v) => !!v || "Ingrese su Contraseña"],
        //Default datas
        Overlay: true,
        Usuario: [],
        FontTitle: 'Audiowide',
        PrecioTotal: 0,
        CantidadTotal: 0,
        Carrito: [],
        CantidadAgregada: [],
        CantidadMaxima: 4,
        CantidadMinima: 1,
        spinnerCantidad: false,
        location: document.location.pathname,
        ip: {},
        // Countup
        delay: 1000,
        PagePedidos: false,
        endVal: 0,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: '.',
          decimal: ',',
          prefix: null,
          suffix: null
        }
      }),
      
      methods: {

        async CerrarCarrito(){
            this.dialogCarrito = false    
            this.EntregaSeleccionada = null,
            this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), // Fecha de Transferencia
            this.Empresa = {},
            this.RutEmpresa = null;
            this.TipoDocumento = null;
            this.RazonSocialEmpresa = null;
            this.CajaSeleccionada = null;
            this.CuentaBancariaSeleccionada = null;
            this.Monto = null;
            this.MontoTransferido = null;
            this.MontoCaja = null;
            this.MontoTransbank = null;
            this.Titular = null;
            this.CorreoEmpresa = null;
            this.OrdenCompra = null;
            this.InformacionPago = null;
            this.Observaciones = "Sin Observaciones.",
            this.Rut = null;
            this.Nombres = null;
            this.Apellidos = null;
            this.Telefono = "+56",
            this.RegionSeleccionada = null;
            this.ComunaSeleccionada = null;
            this.Calle = null;
            this.Numero = null;
            this.Departamento = null;
            this.Correo = null;
            this.AgenciaSeleccionada = null;
            this.MetodoPago = null;
            this.DteEnviado = false;
            this.CarritoLoader = false;

            this.$refs.formCarrito.resetValidation()

        },

        async VaciarCarrito(){
          this.CarritoLoader = true;
          await API.REMOVE_TO_CART('todo', 1)
          this.getCarrito()
          this.CarritoLoader = false;
        },

        async AgregarAlCarrito(CodigoImportadora, Cantidad = 1, Modelo){
          

          if(CodigoImportadora == 'CodigoCarrito'){
            CodigoImportadora = this.CodigoCarrito;
          }

          if(CodigoImportadora == '' || CodigoImportadora == null){
            console.log('No se puede enviar un codigo Vacio.')
            return 'No se puede enviar un codigo Vacio.'
          }


          if(Cantidad < 1){
            console.log('Cantidad no puede ser menor a 1')
            return 'Cantidad no puede ser menor a 1';
          }

            this.spinnerCantidad = true;
            
            this.RepuestoSeleccionado = CodigoImportadora;

              if(this.CantidadAgregada.length == 0){
                this.CantidadAgregada.push({CodigoImportadora, Cantidad})
              }else{
                let e = this.CantidadAgregada.length;
                for(var i = 0; i < e; i++){
                  if(this.CantidadAgregada[i].CodigoImportadora == CodigoImportadora){
                    //Cantidad Maxima
                    if((this.CantidadAgregada[i].Cantidad + Cantidad) > this.CantidadMaxima){
                        console.log('Exede la cantidad maxima')
                        this.spinnerCantidad = false;
                        return 'Excede la cantidad maxima permitida.'
                    }
                    this.CantidadAgregada[i].Cantidad = this.CantidadAgregada[i].Cantidad + Cantidad;
                  }else{
                    this.CantidadAgregada.push({CodigoImportadora, Cantidad})
                  }
                }
              }

            var Add = await API.ADD_TO_CART(CodigoImportadora, Cantidad, Modelo)

            await this.getCarrito()
            

            this.spinnerCantidad = false;
            
            this.RepuestoSeleccionado = null;
            
            console.log('Se agrego al carrito.')
            return 'Se agrego al carrito.'
          },

          async RestarCarrito(CodigoImportadora, Cantidad = 1){

            this.spinnerCantidad = true;
            this.CarritoLoader = true;

            this.RepuestoSeleccionado = CodigoImportadora;
            console.log(Cantidad, 'cantidad')
            var Remove = await API.REMOVE_TO_CART(CodigoImportadora, Cantidad)

            await this.getCarrito()

            this.RepuestoSeleccionado = null;
               
            this.spinnerCantidad = false;
            this.CarritoLoader = false;
            
            
            return 'Se resto del carrito.'

          },

          async ActualizarCarrito(CodigoImportadora, Cantidad){
            this.CarritoLoader = true
            if(Cantidad < 1){
              setTimeout(() => {
                this.CarritoLoader = false
              }, 500)
              return true;
            }
            
            await API.UPDATE_CART(CodigoImportadora, Cantidad)

            await this.getCarrito()

            
            this.CarritoLoader = false
            
            return 'Se resto del carrito.'

          },



    formatRUT(rut) {
      var actual = rut.replace(/^0+/, "");
      actual = actual.replace(/-/, "");
      actual = actual.replace(/\s/g, "");
      if (actual != "" && actual.length > 1) {
        var sinPuntos = actual.replace(/\./g, "");
        var actualLimpio = sinPuntos.replace(/-/g, "");
        var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        var rutPuntos = "";
        var i = 0;
        var j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
          var letra = inicio.charAt(i);
          rutPuntos = letra + rutPuntos;
          if (j % 3 == 0 && j <= inicio.length - 1) {
            rutPuntos = "." + rutPuntos;
          }
          j++;
        }
        var dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
      }
      return rutPuntos;
    },


    async Format() {
      if (
        this.RutEmpresa == "" ||
        this.RutEmpresa == null ||
        this.RutEmpresa == undefined
      ) {
        return true;
      }
      this.RutEmpresa = this.formatRUT(this.RutEmpresa);

      this.Loader = true;

      //Verificar rut empresa
      var ValidarRut = await API.POST_RUTEMPRESA(
        this.RutEmpresa.replaceAll(".", '')
      );

      if (ValidarRut != "Invalido") {
        this.RazonSocialEmpresa = ValidarRut.razon_social;
        this.rutEmpresaInvalido = false;
        this.CorreoEmpresa = ValidarRut?.email ? ValidarRut?.email : ValidarRut?.config_email_intercambio_user ? ValidarRut?.config_email_intercambio_user :'sin@correo.com';
        this.Empresa = ValidarRut;
        this.Loader = false;
      } else {
        this.RazonSocialEmpresa = null;
        this.RutEmpresa = null;
        this.CorreoEmpresa = null;
        this.rutEmpresaInvalido = true;
        this.Loader = false;
        return true;
      }
    },

    
    async FormatearRut(){
        this.Rut = this.formatRUT(this.Rut);
        let validar = this.validarRUN(this.Rut)

        if(validar == false){
            this.rutClienteInvalido = true;
            this.Rut = null;
        }else if(this.TipoDocumento == 'Cotización' ){
            this.loaderCliente = true;
            this.rutClienteInvalido = false;
        }else{
            this.loaderCliente = true;
            this.rutClienteInvalido = false;
            var res = await API.GET_CLIENT(this.Rut)
            console.log(res)
            if(res.data){
            this.Nombres = res.data.nombres
            this.Apellidos = res.data.apellidoPrimario + ' ' + res.data.apellidoSecundario
            this.loaderCliente = false;
            return true;
            }
            if(res == 'ERROR'){
              this.Rut = null
              this.rutClienteInvalido = true
              this.loaderCliente = false;
              return true;
            }

            this.Nombres = res.Nombres
            this.Apellidos = res.Apellidos
            this.CorreoCliente = res.Correo
            this.Telefono = res.Telefono
            this.loaderCliente = false;
            this.Titular = res.Nombres + ' ' + res.Apellidos
            this.RegionSeleccionada = res.RegionSeleccionada
            this.ComunaSeleccionada = res.ComunaSeleccionada
            this.Calle = res.Calle
            this.Numero = res.Numero
            this.Departamento = res.Departamento
            this.CorreoCliente = res.Correo
            this.AgenciaSeleccionada = res.AgenciaSeleccionada
        }
    },


    validarRUN(rut) {
      if (rut) {
        let rutCompleto = rut.replace("‐", "-").replace(/\./g, '');
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) {
          return false;
        }
        var tmp = rutCompleto.split("-");
        var digv = tmp[1];
        var rut = tmp[0];
        if (digv == "K") {
          digv = "k";
        }
        return this.calculaDV(rut) == digv;
      }
      return false;
    },

    calculaDV(T) {
      var M = 0,
        S = 1;
      for (; T; T = Math.floor(T / 10))
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
      return S ? S - 1 : "k";
    },

    async EntregaChange() {
      if (this.EntregaSeleccionada == "Envío a región") {
        var Comunas = [];

        var Regiones = await API.GET_REGIONES();

        Regiones.map((e) => {
          this.Regiones.push(e.Region);
        });

        var Comunas = await API.POST_COMUNA(this.RegionSeleccionada);

        this.Comunas = Comunas.Comunas;
      } else if (this.EntregaSeleccionada == "Retiro en tienda") {
        var Comunas = [];
      } else if (this.EntregaSeleccionada == "Delivery Santiago") {

        var Comunas = await API.POST_COMUNA("Metropolitana de Santiago");

        this.Comunas = Comunas.Comunas;


      }
    },

    FormatPrecio (number) {
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1.';
        let arr = number.toString().split(',');
        arr[0] = arr[0].replace(exp,rep);
        return arr[1] ? arr.join(','): arr[0];
      },

    async RegionChange() {
      var Region = this.RegionSeleccionada;

      this.ComunaSeleccionada = "Cargando Comunas...";

      var Comunas = await API.POST_COMUNA(Region);

      this.Comunas = Comunas.Comunas;

      this.ComunaSeleccionada = "Seleccione una comuna";
    },


          async getCarrito(){
          this.Carrito = await API.GET_CERRITO_SESSION();

          this.PrecioTotal = 0;
          this.CantidadTotal = 0;
          this.CantidadAgregada = [];

          this.Carrito.map(e => { 
            this.PrecioTotal = this.PrecioTotal + e.Total;
            this.CantidadTotal = this.CantidadTotal + e.Cantidad;
            e.Total = FormatearPrecio(e.Total)
            this.CantidadAgregada.push({ CodigoImportadora: e.CodigoImportadora, Cantidad: e.Cantidad})
           })

           console.log(this.CantidadAgregada,'CantidadAgregada')

          // console.log(this.Carrito)

          },


        async Init(){
            await this.getCarrito()
            this.$refs.formLogin.validate();
            console.log(this.$refs.formLogin.validate());
            if (this.$refs.formLogin.validate() == true) {
              var User = await API.USER_LOGIN_ADMIN(this.UsuarioLogin, this.Correo, this.Contraseña, this.ip)
              if(typeof(User) !== 'string'){
                    this.Usuario = User;
                    this.Login = true
                }else{
                    this.alert = User;
                }
            }
        },

          async radius() {
            this.EntregaSeleccionada = null;
            this.RutEmpresa = null;
            this.RazonSocialEmpresa = null;
            this.Monto = this.PrecioTotal;
            this.Titular = null;
            this.CorreoEmpresa = null;
            this.OrdenCompra = null;
            this.InformacionPago = null;
            this.Rut = null;
            this.Nombres = null;
            this.Apellidos = null;
            this.Telefono = null;
            this.RegionSeleccionada = null;
            this.ComunaSeleccionada = null;
            this.Departamento = null;
            this.CorreoCliente = null;
            this.CuentaBancariaSeleccionada = null;
            this.CajaSeleccionada = null;
            this.MetodoPagoSeleccionado = null;
            this.$refs.formCarrito.resetValidation()

          },

        async controller(text){
            console.log(text)
            if(text == 'Salir'){
                await API.DELETE_SESSION();
                this.Usuario = [];
                this.UsuarioLogin = null;
                this.Correo = null;
                this.Contraseña = null;
                this.alert = null;
                this.Login = false;
            }else if(text == 'Inicio'){
              this.$router.push({ path: "/" });
            }else if(text == 'Carrito'){
              this.dialogCarrito = true;
            }else if(text == 'Agregar Repuestos'){
              this.$router.push({ path: "/dev/importar-productos" });  
            }else if(text == 'Gestionar Imagenes'){
              this.$router.push({ path: "/dev/gestionar-imagenes" });
            }else if(text == 'Modelo'){
              this.$router.push({ path: "/productos/catalogo" });
            }else if(text == 'Buscador'){
              this.$router.push({ path: "/productos/buscador" });
            }else if(text == 'Marca'){
              this.$router.push({ path: "/productos/marca" });
            }else if(text == 'Linea'){
              this.$router.push({ path: "/productos/lineas" });  
            }else if(text == 'Gestionar Bodegas'){
              this.$router.push({ path: "/bodega/gestionar-bodegas" });
            }else if(text == 'Gestionar Mercaderia'){
              this.$router.push({ path: "/bodega/ingresar-mercaderia" });
            }else if(text == 'Movimientos'){
              this.$router.push({ path: "/bodega/movimientos" });
            }else if(text == 'Buscar Factura'){
              this.$router.push({ path: "/bodega/buscar-factura" });
            }else if(text == 'Gestion de Productos'){
              this.$router.push({ path: "/bodega/gestion-de-productos" });
            }else if(text == 'Libro Venta'){
              this.$router.push({ path: "/ventas/libro-venta" });
            }else if(text == 'Guia Despacho'){
              this.$router.push({ path: "/ventas/guia-despacho" });
            }else if(text == 'Gestionar Pedidos'){
              this.$router.push({ path: "/pedidos/gestionar-pedidos" });
            }else if(text == 'Ventas Ecommerce'){
              this.$router.push({ path: "/ecommerce/ventas-ecommerce" });
            }else if(text == 'Seguimientos'){
              this.$router.push({ path: "/ecommerce/seguimiento" });
            }else if(text == 'Crear Ticket'){
              this.$router.push({ path: "/soporte/crear-ticket" });
            }else if(text == 'Mis Ticket'){
              this.$router.push({ path: "/soporte/mis-ticket" });
            }else if(text == 'Mis Datos'){
              this.$router.push({ path: "/configuracion/mis-datos" });
            }else if(text == 'Rentabilidad'){
              this.$router.push({ path: "/estadisticas/rentabilidad" });
            }else if(text == 'Productos'){
              this.$router.push({ path: "/estadisticas/productos" });
            }else if(text == 'Ecommerce'){
              this.$router.push({ path: "/estadisticas/ecommerce" });
            }else if(text == 'Bodega'){
              this.$router.push({ path: "/estadisticas/bodega" });
            }else if(text == 'Vendedores'){
              this.$router.push({ path: "/estadisticas/vendedores" });
            }else if(text == 'Gestionar Clientes'){
              this.$router.push({ path: "/clientes/gestionar-clientes" });
            }else if(text == 'Gestionar Proovedores'){
              this.$router.push({ path: "/proveedores/gestionar-proveedores" });
            }else if(text == 'Sucursales'){
              this.$router.push({ path: "/configuracion/gestionar-sucursales" });
            }
        },
    async GenerarDocumento(){


        this.CarritoLoader = true;

        var Documento = {
          //Empresa
          ComunaEmpresa: this.Empresa?.comuna_glosa || null,
          GiroEmpresa: this.Empresa?.giro || null,
          DireccionEmpresa: this.Empresa?.direccion ||null,
          EntregaSeleccionada: this.EntregaSeleccionada,
          FechaEntrega: this.date,
          RutEmpresa: this.RutEmpresa,
          TipoDocumento: this.TipoDocumento,
          RazonSocialEmpresa: this.RazonSocialEmpresa,
          CajaSeleccionada: this.CajaSeleccionada,
          CuentaBancariaSeleccionada: this.CuentaBancariaSeleccionada,
          Monto: this.Monto,
          Titular: this.Titular,
          CorreoEmpresa: this.CorreoEmpresa,
          OrdenCompra: this.OrdenCompra,
          InformacionPago: this.InformacionPago,
          Observaciones: this.Observaciones,
          Rut: this.Rut,
          Nombres: this.Nombres,
          Apellidos: this.Apellidos,
          Telefono: this.Telefono,
          RegionSeleccionada: this.RegionSeleccionada,
          ComunaSeleccionada: this.ComunaSeleccionada,
          Calle: this.Calle,
          Numero: this.Numero,
          Departamento: this.Departamento,
          CorreoCliente: this.CorreoCliente,
          AgenciaSeleccionada: this.AgenciaSeleccionada,
          MetodoPagoSeleccionado: this.MetodoPagoSeleccionado,
          Usuario: this.Usuario.Nombre + ' ' + this.Usuario.Apellido,
          Neto: Math.round((this.PrecioTotal / 1.19)),
          Iva: this.PrecioTotal - Math.round((this.PrecioTotal / 1.19)),
          PrecioTotal: this.PrecioTotal,
          Carrito: this.Carrito,
          MontoTransferido: this.MontoTransferido,
          MontoCaja: this.MontoCaja,
          MontoTransbank: this.MontoTransbank
        }


        let Response = await API.POST_EMITIR_DOCUMENTO(Documento)

        if (typeof (Response) === 'object'){

        console.log(Response)

        fetch("http://localhost:3000/api/certificado/Letter/" + Response._id + "/" + Response.TipoDocumento, {method:'GET',  headers: {'Content-Type': 'application/json'} })
            .then( (r) => r.json())
            .then( d => {
                
                let obj = document.querySelector("object");
                
                obj.setAttribute("data", "data:application/pdf;base64," + d.data.base64);
  
        })

        }else if(typeof (Response) === 'string'){
          this.Snackbar = true;
          this.CarritoLoader = false;
          this.SnackbarAlert = Response;
          return this.SnackbarColor = 'color: red';
        }else if(Response == true){
          this.Snackbar = true;
          this.SnackbarAlert = 'Cotización Descargada.';
          this.CarritoLoader = false;
          return this.SnackbarColor = 'color: blue';
        }else{
          this.Snackbar = true;
          this.SnackbarAlert = 'Error Desconocido';
          this.CarritoLoader = false;
          return this.SnackbarColor = 'color: red';
        }

          this.DteEnviado = true;
          this.CarritoLoader = false;


      },

      },
      async beforeCreate() {
    //     static async USER_LOGIN_ADMIN(Correo, Contraseña, ip){
    //     const res = await axios.post(url+ '/user-login_admin', {
    //         Correo: Correo,
    //         Contraseña: Contraseña,
    //         ip: ip
    //     });
    //     return res.data;
    // }

    // static async GET_USER_TOKEN_ADMIN(){
    //     const res = await axios.post(url+ '/user_token_admin');
    //     return res.data;
    // }
     let User = await API.GET_USER_TOKEN_ADMIN()

      console.log(User, 'User')

    if(typeof(User) !== 'string'){
        this.Usuario = User[0];
        this.Login = true
    }else{
      
    }

      },


      async created(){
        this.getCarrito()
      },



    }
  </script>