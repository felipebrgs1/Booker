<template>
    <div class="container mt-5 rounded shadow bg-white">
        <div>
            <ul class="m-3">
                <li v-for="cardWrapper in CardData.cards" :key="cardWrapper.id" class="m-2">
                    <Card :item="cardWrapper.card">
                        <template v-slot:buttons="">
                            <button class="btn btn-danger mx-2"
                                @click="CardData.deleteBlacklist(cardWrapper.card.id, 1)">Rejeitar</button>
                        </template>
                    </Card>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCardStore } from '../../stores/CardStore';
import Card from '../../components/Card.vue';

const CardData = useCardStore();
onMounted(() => {
    CardData.getBlacklist().then(() => {

        console.log("Cards:", CardData.cards);
    })
});
</script>
<style>
li {
    list-style: none;
}
</style>