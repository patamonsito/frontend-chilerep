<template>
    <div>
        <v-col cols="2" class="text-center d-flex justify-center">
          <v-container
          class="px-0"
          fluid
        >
          <v-switch
            v-model="switchRepetidos"
            label="Ocultar Repetidos"
            @click="Repetidos"
          ></v-switch>
        </v-container>
        </v-col>
    </div>
</template>