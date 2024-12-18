<template>
    <div>
        <ul>
            <li v-for="card in CardData.GetFriends" :key="card.id">
                <div>
                    <p><b>Nome:</b> {{ card.name }}</p>
                </div>
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
import { useCardDataStore } from '../../stores/CardStore';
import Card from '../../components/Card.vue';

const CardData = useCardDataStore();

</script>
