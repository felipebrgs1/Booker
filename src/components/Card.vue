<template>
    <div class="mt-5 d-flex justify-content-center">
        <ul class="list-group w-75">
            <li v-for="(card, index) in CardData.CurrentCard" :key="card.id" class="list-group-item text-center">
                <div>
                    <h5>{{ card.title }}</h5>
                    <div class="mt-3">
                        <img :src="card.image" class="img-fluid rounded" alt="..." />
                    </div>
                </div>
                <div class="mt-3">
                    <p><b>Gênero:</b> {{ card.genre }}</p>
                    <p><b>Autor:</b> {{ card.author }}</p>
                </div>
                <div>
                    <small>{{ card.friends }}</small>
                </div>
                <div>
                    <button class="btn btn-danger" @click="CardData.blacklistCard(card)">Rejeitar</button>
                    <button class="btn btn-primary mx-2" @click="CardData.addCard(card)">Favoritar</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCardDataStore } from '../stores/CardData';
import { computed } from 'vue';
const CardData = useCardDataStore();

onMounted(() => {
    CardData.generateCards(5);
});


</script>
