import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Tasks from "../components/Tasks.vue";
import CreateTask from "../components/CreateTask.vue";
import EditTask from "../components/EditTask.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
    },
    {
      path: "/tasks",
      name: "Tasks",
      component: Tasks,
    },
    {
      path: "/create-task",
      name: "CreateTask",
      component: CreateTask,
    },
    {
      path: "/tasks/:id",
      name: "EditTask",
      component: EditTask,
    },
  ],
});

export default router;
