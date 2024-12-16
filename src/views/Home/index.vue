<template>
    <div>
        <Card :item="currentCard">
            <template v-slot:buttons="{ item }">
                <button class="btn btn-danger me-2" @click="CardData.addCardToBlacklist(currentCard)">Rejeitar</button>
                <button class="btn btn-primary" @click="CardData.addCardToFavorites(currentCard)">Favoritar</button>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useCardDataStore } from '../../stores/CardData';
import Card from '../../components/Card.vue';

const CardData = useCardDataStore();
const currentCard = computed(() => CardData.currentCard);
onMounted(() => {
    CardData.generateCards(10);
});

</script>
