<template>
    <div>
        <ul>
            <li v-for="card in CardData.cards" :key="card.id">
                <Card :item="card">
                    <template v-slot:buttons="{ item }">
                        <button class="btn btn-danger" @click="CardData.addCardToBlacklist(card)">Rejeitar</button>
                    </template>
                </Card>
            </li>
        </ul>

    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCardDataStore } from '../../stores/CardData';
import Card from '../../components/Card.vue';

const CardData = useCardDataStore();

onMounted(() => {
    CardData.generateCards(10);
});
</script>
