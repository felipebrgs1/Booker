import { defineStore } from "pinia";
import axios from "axios";
import type { Person } from "@prisma/client";
import { ref } from "vue";

export const usePeopleStore = defineStore("personData", {
  state: () => ({
    people: {} as Person,
    person: {} as Person,
    amigo:{
      amigo1:ref(0),
      amigo2:ref(0),
    },
    }),
    actions: {
      async getAllPeople() {
        const response = await axios.get("http://localhost:3000/people");
        this.people = response.data;
      },
      async addPerson(person: Person) {
        try{
        let response = await axios.post("http://localhost:3000/people", person);
        console.log("Resposta do servidor:", response.data);
        } catch (error) {
          console.error("Erro ao adicionar pessoa:", error);
        }
      },
      async getPerson(id: number) {
        try {
          let response = await axios.get(`http://localhost:3000/people/${id}`);
          this.person = response.data;
        } catch (error) {
          console.error("Erro ao buscar pessoa:", error);
        }
      },
      async deletePerson(id: number) {
        try {
          await axios.delete(`http://localhost:3000/people/${id}`);
        } catch (error) {
          console.error("Erro ao deletar pessoa:", error);
        }
      },
      async addFriend(personId: number, friendId: number) {
        try {
          let response = await axios.post(`http://localhost:3000/people/${personId}/friends/${friendId}`);
          console.log("Resposta do servidor:", response.data);
        } catch (error) {
          console.error("Erro ao adicionar amigo:", error);
        }
      },
      async deleteFriend(personId: number, friendId: number) {
        try {
          await axios.delete(`http://localhost:3000/people/${personId}/friends/${friendId}`);
        } catch (error) {
          console.error("Erro ao deletar amigo:", error);
        }
      },
      async getFriends(personId: number) {
        try {
          let response = await axios.get(`http://localhost:3000/people/${personId}/friends`);
          this.person = response.data;
        } catch (error) {
          console.error("Erro ao buscar amigos:", error);
        }
      },
    },
});