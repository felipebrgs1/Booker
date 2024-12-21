<template>
    <div class="text-center my-8">
        <h1 class="text-white">Gerenciador de cards</h1>
    </div>

    <v-container class="bg-light">
        <v-row>
            <v-col cols="6" class="align-self-center">
                <v-form>
                    <input type="text" v-model="obj.title" placeholder="Titulo" class="form-control my-2" />
                    <input type="text" v-model="obj.genre" placeholder="Genero Textual" class="form-control my-2" />
                    <input type="text" v-model="obj.author" placeholder="Autor" class="form-control my-2" />
                    <input type="text" v-model="obj.image" placeholder="Imagem" class="form-control my-2" />
                    <textarea v-model="obj.description" placeholder="Descrição" class="form-control my-2"></textarea>
                    <button class="btn btn-primary" @click="CardData.addCard(obj)">
                        Adicionar Card
                    </button>

                </v-form>
            </v-col>

            <v-col cols="6" class="bg-light">
                <Card :item="obj" />
            </v-col>
        </v-row>
        <hr />
        <div class="text-center bg-grey-lighten-2 p-3">
            <label for="num" class="mr-3">
                <p>Deletar Card </p>
            </label>
            <input type="number" v-model="num" placeholder="Id para remoçao" class="bg-white" />

            <button class="btn btn-danger" @click="CardData.deleteCard(num)">
                Remover Card
            </button>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCardStore } from '../../stores/CardStore';
import Card from '../../components/Card.vue';

const CardData = useCardStore();
let obj = CardData.obj;
let num = ref();
onMounted(async () => {
    await CardData.getCards().then(() => { });
});
</script>
