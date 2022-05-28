<template lang="">
    <div>
                    <v-alert v-if="rutClienteInvalido" class="mt-2"
                 dense
                 outlined
                 type="error"
               >
                 Rut <strong>Invalido</strong>.
               </v-alert>


            <v-text-field
              label="Rut"
              prepend-icon="mdi-account-box"
              :rules="RutEmpresaRules"
              v-model="RutEmpresa"
              placeholder="Ingrese su rut"
              @blur="Format()"
            >
            </v-text-field>
    </div>
</template>

<script>
export default {
    data() {
        return {
            RutEmpresa: '',
        };
    },

    methods: {

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
        this.RutEmpresa.replaceAll(".", "")
      );

      if (ValidarRut != "Invalido") {
        this.RazonSocialEmpresa = ValidarRut.razon_social;
        this.rutEmpresaInvalido = false;
        this.Loader = false;
      } else {
        this.RazonSocialEmpresa = "";
        this.RutEmpresa = "";
        this.CorreoEmpresa = "";
        this.rutEmpresaInvalido = true;
        this.Loader = false;
        return true;
      }
    },
    },
}
</script>