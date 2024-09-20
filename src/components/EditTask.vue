<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const form = ref({
  name: '',
  description: '',
});

async function loadTask() {
  try {
    const taskId = route.params.id; 
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
    if (!response.ok) throw new Error('Petite erreur lors du chargement de la tâche');
    const task = await response.json();
    form.value.name = task.name;
    form.value.description = task.description;
  } catch (error) {
    console.error('Petite erreur lors du chargement de la tâche:', error);
  }
}

onMounted(loadTask);

async function updateTask() {
  try {
    const taskId = route.params.id; 
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value),
    });

    if (response.ok) {
      alert('Yep ! 😇 Mise à jour réussie');
      router.push('/');
    } else {
      console.error('Petite erreur lors de la MAJ de la tâche');
    }
  } catch (error) {
    console.error('Petite erreur lors de la MAJ de la tâche:', error);
  }
}
</script>

<template>
  <div class="main mt-4 pt-4">
    <h3>FORMULAIRE D'ÉDITION D'UNE TÄCHE</h3>
    <form @submit.prevent="updateTask">
      <div class="form-group mb-4">
        <label for="name" class="mb-2"><h5>Nom de la tâche</h5></label>
        <input type="text" v-model="form.name" class="form-control" id="name" placeholder="Nom de la tâche" />
      </div>

      <div class="form-group">
        <label for="description" class="mb-2"><h5>Sa description</h5></label>
        <textarea v-model="form.description" class="form-control" id="description" rows="3" placeholder="Description"></textarea>
      </div>

      <button type="submit" class="btn btn-primary mt-3">Valider la modification</button>
    </form>
  </div>
</template>

<style scoped>

    .main {
        margin: 0 auto;
    }

    h3, h5 {
        text-align: center;
        font-weight: 600;
    }

    form {
        padding: 4rem 6rem;
    }

    @media (max-width: 700px) {
    form {
        padding: 4rem 1rem;
    }   
    }
</style>
