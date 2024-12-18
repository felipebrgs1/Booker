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
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCardStore } from '../../stores/CardStore';
import Card from '../../components/Card.vue';

const CardData = useCardStore();
const { cards } = storeToRefs(CardData);

const currentIndex = ref(0);

const currentCard = computed(() => cards.value[currentIndex.value]);

const handleAction = (action: 'blacklist' | 'favorite') => {
    if (action === 'blacklist') {
        CardData.postBlacklist(currentCard.value.id, 1);
    } else if (action === 'favorite') {
        CardData.postFavorite(currentCard.value.id, 1);
    }

    if (currentIndex.value < cards.value.length - 1) {
        currentIndex.value++;
    }
};

onMounted(() => {
    CardData.getCards().then(() => {
        console.log("Cards carregados:", CardData.cards);
    });
});
</script>
