<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();


defineProps({
  tasks: Array,
});

const form = ref({
  name: "",
  description: "",
});

async function createTask() {
  try {
    const response = await fetch("http://localhost:3000/create-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });

    const result = await response.json();
    if (response.ok) {
      alert(`Génial !🥳 Tâche créée avec l'ID: ${result.id}`);
      router.push('/');
      form.value.name = "";
      form.value.description = "";
    } else {
      alert(`Erreur: ${result.error}`);
    }
  } catch (error) {
    console.error("Petit souci lors de la création de la tâche:", error);
    alert("Petit souci lors de la création de la tâche");
  }
}
</script>

<template>
  <div class="main mt-4 pt-4">
    <h3>FORMULAIRE DE CRÉATION D'UNE TÄCHE</h3>
    <form>
      <div class="form-group mb-4">
        <label class="mb-2" for="name"><h5>Nom de la tâche</h5></label>
        <input type="text" id="name" class="form-control" v-model="form.name" />
      </div>

      <div class="form-group mb-4">
        <label class="mb-2" for="description"><h5>Sa description</h5></label>
        <textarea
          class="form-control"
          id="description"
          rows="4"
          v-model="form.description"
        ></textarea>
      </div>

      <button
        @click="createTask()"
        type="button"
        class="btn btn-primary btn-block mb-4"
      >
        Valider
      </button>
    </form>
  </div>
</template>

<style scoped>
  #app {
    margin-top: 0;
  }

  .main {
    margin: 0;
  }
  
  form {
    padding: 6rem 8rem;
  }

h3,
h5 {
  text-align: center;
  font-weight: 600;
}

@media (max-width: 700px) {
  form {
    padding: 4rem 1rem;
  }
}
</style>
