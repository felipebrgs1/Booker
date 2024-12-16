<template>
    <div>
        <p>Contador: {{ useCounterStore().count }}</p>
        <button @click="useCounterStore().increment">Incrementar</button>
        <button @click="useCounterStore().decrement">Decrementar</button>
    </div>
</template>
<script setup>
import { defineComponent } from 'vue';
import { useCounterStore } from '../stores/Counter';


</script>