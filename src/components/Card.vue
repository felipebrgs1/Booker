<template>
    <div class="mt-5 d-flex justify-content-center">
        <ul class="list-group w-75">
            <li v-if="item" :key="item.id" class="list-group-item text-center">
                <div>
                    <h5>{{ item.title }}</h5>
                    <div class="mt-3">
                        <img :src="item.image" class="img-fluid rounded" alt="..." />
                    </div>
                </div>
                <div class="mt-3">
                    <p><b>Gênero:</b> {{ item.genre }}</p>
                    <p><b>Autor:</b> {{ item.author }}</p>
                </div>
                <div>
                    <p><b>Amigos:</b> {{ item.friends.join(', ') }}</p>
                </div>
                <div v-if="!hasCustomButtons">
                    <slot name="buttons" :item="item" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    item: Object,

});

const hasCustomButtons = ref(false);

onMounted(() => {
    hasCustomButtons.value = !!document.querySelector('[data-v-slot="buttons"]');
});
</script>
