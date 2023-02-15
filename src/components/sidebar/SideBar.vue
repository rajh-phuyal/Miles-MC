<template>
  <div class="sidebar" style="width: 17em">
    <h2>Mission Control 🚀</h2>
    <hr />
    <SidebarLink to="/" iconName="home">Home</SidebarLink>
    <SidebarLink to="/workspace" iconName="workspaces">Workspaces</SidebarLink>
    <SidebarLink to="/employee" iconName="groups">Employees</SidebarLink>
  </div>
</template>

<script>
import SidebarLink from "./SideBarLink.vue";

export default {
  name: "SideBar",
  components: {
    SidebarLink,
  },
};
</script>


<style>
.sidebar {
  z-index: 99;
  color: white;
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  background-position: center;
  background-size: cover;
  background: url("https://t4.ftcdn.net/jpg/04/90/57/77/360_F_490577775_FJWG0sGo0OLoeBEcAIP4KSYjx1ofQ9o9.jpg");
}

.sidebar h2 {
  font-family: "Franklin Gothic Medium", sans-serif;
  color: rgba(47, 102, 255, 0.802);
  background-color: black;
  text-align: center;
  padding: 1em 0;
  margin: 0;
}

.sidebar hr {
  color: rgba(255, 255, 255, 0.212);
  border: 0.5px solid rgba(255, 255, 255, 0.373);
  margin: 0.2em;
}
</style>