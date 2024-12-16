<template>
    <div class="mt-5 d-flex justify-content-center">
        <ul class="list-group w-75">
            <li v-if="CardData.cards.length > 0" :key="CardData.cards[0].id" class="list-group-item text-center">
                <div>
                    <h5>{{ CardData.cards[0].title }}</h5>
                    <div class="mt-3">
                        <img :src="CardData.cards[0].image" class="img-fluid rounded" alt="..." />
                    </div>
                </div>
                <div class="mt-3">
                    <p><b>Gênero:</b> {{ CardData.cards[0].genre }}</p>
                    <p><b>Autor:</b> {{ CardData.cards[0].author }}</p>
                </div>
                <div>
                    <p><b>Amigos:</b> {{ CardData.cards[0].friends.join(', ') }}</p>
                </div>
                <div>
                    <button class="btn btn-danger"
                        @click="CardData.addCardToBlacklist(CardData.cards[0])">Rejeitar</button>
                    <button class="btn btn-primary mx-2"
                        @click="CardData.addCardToFavorites(CardData.cards[0])">Favoritar</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCardDataStore } from '../stores/CardData';

const CardData = useCardDataStore();

onMounted(() => {
    CardData.generateCards(10); // Carregar apenas 1 card por vez
});
</script>
