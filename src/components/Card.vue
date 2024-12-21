<template>
    <div class="container mt-5 d-flex justify-content-center">
        <ul class="w-75 rounded mb-3 shadow">
            <li v-if="resolvedItem" class="text-center p-3 my-1">
                <div>
                    <h5>{{ resolvedItem.title }}</h5>
                    <div class="mt-3">
                        <img src="https://m.media-amazon.com/images/I/616e4-9bv0S._SY522_.jpg" class="img-fluid rounded"
                            alt="Card Image" />
                    </div>
                </div>
                <div class="mt-3">
                    <p><b>Gênero:</b> {{ resolvedItem.genre }}</p>
                    <p><b>Autor:</b> {{ resolvedItem.author }}</p>
                    <p><b>Descrição:</b> {{ resolvedItem.description }}</p>
                </div>
                <div>
                    <slot name="buttons" />
                </div>
            </li>
            <li v-else class="text-center p-3 my-1">
                <h5>Carregando...</h5>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },

});

const resolvedItem = computed(() => (props.item.card ? props.item.card : props.item));
</script>

<style scoped>
li {
    list-style: none;
}
</style>
<script lang="ts">
export default {
    name: 'Card'
}
</script>