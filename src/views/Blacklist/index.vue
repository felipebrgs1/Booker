<template>
    <div class="container mt-5 rounded shadow bg-white ">
        <div v-if="cards && cards.length">
            <ul class="m-3">
                <li v-for="card in cards" :key="card.id" class="list-group-item m-2">
                    <Card :item="card">
                        <template v-slot:buttons>
                            <button class="btn btn-danger mx-2" @click="CardData.deleteBlacklist(card.cardId, 1)">
                                Rejeitar
                            </button>
                        </template>
                    </Card>
                </li>
            </ul>
        </div>
        <div v-else class="mt-3">
            <p class="text-center h1">Sem cards</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useCardStore } from '../../stores/CardStore';
import Card from '../../components/Card.vue';

const CardData = useCardStore();
const { cards } = storeToRefs(CardData);

onMounted(() => {
    CardData.getBlacklist();

    console.log("Cards:", useCardStore().cards);
});
</script>