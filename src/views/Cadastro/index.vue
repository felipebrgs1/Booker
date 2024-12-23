<template>
  <v-container>
    <v-row class="text-center my-8 bg-white">
      <v-col cols="6" class="align-self-center">
        <input type="text" v-model="person.name" placeholder="nome" class="form-control my-2" />
        <input type="text" v-model="person.email" placeholder="email" class="form-control my-2" />
        <button class="btn btn-primary" @click="PersonData.addPerson(person)">
          Adicionar Pessoa
        </button>
      </v-col>
      <v-col cols="6" class="align-self-center">
        <label for="num" class="mr-3">
          <p>Deletar Pessoa</p>
        </label>
        <input type="number" v-model="id" placeholder="Id para remoçao" class="bg-grey-lighten-1 text-center" />
        <button class="btn btn-danger" @click="PersonData.deletePerson(id)">
          Remover Pessoa
        </button>
      </v-col>
    </v-row>
    <v-row class="text-center my-8 bg-white">
      <v-col cols="6" class="py-4">
        <label for="num" class="mr-3">
          <p>Adicionar Amigo</p>
        </label>
        <input type="number" v-model="amigo.amigo1" placeholder="Pessoa 1" class="bg-grey-lighten-1 text-center m-1" />

        <input type="number" v-model="amigo.amigo2" placeholder="Pessoa 2" class="bg-grey-lighten-1 text-center" />
        <button class="btn btn-primary my-4" @click="PersonData.addFriend(amigo.amigo1, amigo.amigo2)">
          Adicionar Amigo
        </button>
      </v-col>

      <v-col cols="6" class="py-4">
        <label for="num" class="mr-3">
          <p>Deletar Amigo</p>
        </label>
        <input type="number" v-model="amigo.amigo1" placeholder="Pessoa 1" class="bg-grey-lighten-1 text-center m-1" />

        <input type="number" v-model="amigo.amigo2" placeholder="Pessoa 2" class="bg-grey-lighten-1 text-center" />
        <button class="btn btn-danger my-4" @click="PersonData.deleteFriend(amigo.amigo1, amigo.amigo2)">
          Remover Amigo
        </button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePeopleStore } from '../../stores/PersonStore';
const PersonData = usePeopleStore();
const person = PersonData.person;
let id = ref();

let amigo = PersonData.amigo;

</script>
