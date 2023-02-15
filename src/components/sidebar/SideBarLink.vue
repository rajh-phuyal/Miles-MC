<template>
  <div class="sidebarLinks">
    <router-link :to="to" class="link" active-class="active" exact>
      <span class="material-icons">{{ iconName }}</span>
      <slot />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SidebarLink",
  props: {
    to: { type: String, required: true },
    iconName: { type: String, required: true },
  },
};
</script>

<style>
.sidebarLinks .link {
  color: rgb(255, 255, 255);
  text-decoration: inherit;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-size: 1.4em;
  font-weight: 600;
  user-select: none;
  margin: 0.5em;
  padding: 1.6em 0.8em;
  border-radius: 0.25em;
  height: 2em;
}
.sidebarLinks .link:hover {
  text-decoration: none;
  color: black;
  background-color: rgb(255, 255, 255);
}
.sidebarLinks .link.active {
  text-decoration: none;
  color: black;
  background-color: rgb(255, 255, 255);
}

.sidebarLinks .material-icons {
  font-size: 1.3em;
  flex-shrink: 0;
  width: 1.8em;
  height: 1.1em;
  color: rgb(0, 91, 237);
  text-decoration: none;
}
</style>