<template>
    <v-row>
        <v-col cols="12">
            <div class="center">
                <div class="spinner" v-if="spinner"></div>
              </div>
            <div
            v-observe-visibility="{
              callback: visibilityChangedEmit
            }"
          ></div>
        </v-col>
    </v-row>
</template>

<script>
import API from "../../api";

export default {
  name: 'visibility-loader',
  props: ["Productos", "spinner"],
  data() {
      return {
      }
  },
  methods: {
    visibilityChangedEmit(){
        this.$emit('visibilityChanged')
    }
  },

  async created() {
  },
}
</script>