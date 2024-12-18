<template>
    <div class="container mt-4 rounded shadow bg-white">
        <div class="d-flex flex-column align-items-center">
            <Card v-if="currentCard" :item="currentCard">
                <template v-slot:buttons>
                    <button class="btn btn-danger mx-2" @click="handleAction('blacklist')">
                        Rejeitar
                    </button>
                    <button class="btn btn-primary mx-2" @click="handleAction('favorite')">
                        Favoritar
                    </button>
                </template>
            </Card>
            <div v-else class="mt-3">Carregando mais cards...</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCardStore } from '../../stores/CardStore';
import Card from '../../components/Card.vue';

const CardData = useCardStore();
const { cards } = storeToRefs(CardData);

let currentIndex = CardData.currentCardIndex;

const currentCard = computed(() => cards.value[currentIndex]);

const handleAction = async (action: 'blacklist' | 'favorite') => {
    if (currentCard.value) {
        if (action === 'blacklist') {
            await CardData.postBlacklist(currentCard.value.id, 1);
        } else if (action === 'favorite') {
            await CardData.postFavorite(currentCard.value.id, 1);
        }

        currentIndex++;

        if (currentIndex >= cards.value.length) {
            currentIndex = 0;
            await CardData.getCards();
        }
    }
};

onMounted(async () => {
    await CardData.getCards();
});
</script>
