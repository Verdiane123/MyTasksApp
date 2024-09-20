<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const tasks = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:3000/tasks");
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    tasks.value = await response.json();
    console.log(tasks.value);
  } catch (error) {
    console.error('Erreur lors du chargement des tâches:', error);
  }
});

function editTask(taskId) {
  router.push(`/tasks/${taskId}`);
}
</script>

<template>
  <div class="main mt-2">
    <h2 class="mt-4">LISTE DES TÄCHES</h2>
    <div class="table-responsive mt-4 p-3">
      <table class="table table-striped table-bordered">
        <thead class="bg-primary">
          <tr>
            <th class="bg-primary text-white font-weight-bold">Tâche</th>
            <th class="bg-primary text-white font-weight-bold">Description</th>
            <th class="bg-primary text-white font-weight-bold">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task._id">
            <td>{{ task.name }}</td>
            <td>{{ task.description }}</td>
            <td>
              <button
                @click="editTask(task._id)"
                type="button"
                class="btn btn-outline-warning"
              >
                Éditer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.main {
  text-align: center;
  margin: 0 auto;
  padding: 2rem;
}

h2 {
  font-weight: 600;
}

    @media (max-width: 700px) {
    .main {
        padding: 0.5rem;
    }   
    }
</style>
