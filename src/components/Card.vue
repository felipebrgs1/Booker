<template>
    <div class="container mt-5 d-flex justify-content-center">
        <ul class="w-75 rounded mb-3 shadow">
            <li v-if="!item || Object.keys(item).length === 0" class="text-center">
                <p class="text-danger">Carregando...</p>
            </li>
            <li v-else class="text-center p-3 my-1">
                <div>
                    <h5>{{ item.title }}</h5>
                    <div class="mt-3">
                        <img src="https://m.media-amazon.com/images/I/616e4-9bv0S._SY522_.jpg" class="img-fluid rounded"
                            alt="Card Image" />
                    </div>
                </div>
                <div class="mt-3">
                    <p><b>Gênero:</b> {{ item.genre }}</p>
                    <p><b>Autor:</b> {{ item.author }}</p>
                </div>
                <div v-if="!hasCustomButtons">
                    <slot name="buttons" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const hasCustomButtons = ref(false);

onMounted(() => {
    hasCustomButtons.value = !!document.querySelector('[data-v-slot="buttons"]');

});
</script>
<style>
li {
    list-style: none;
}
</style>