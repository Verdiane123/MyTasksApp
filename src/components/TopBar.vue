<template>
  <nav class="navbar navbar-expand-sm" style="background-color: #0d6efd">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"
        ><i style="font-weight: bold"
          ><span style="color: white">My </span
          ><span style="color: #ffc107">TasksApp</span></i
        ></router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" style="color: white" to="/create-task">Créer une tâche</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" style="color: white" to="/">Liste des tâches</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
