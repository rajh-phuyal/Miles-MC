<template>
  <div>
    <v-card class="rounded outerShell">
      <span
        class="clickable-part"
        @click="clickable ? enterEmployeeProfile(employeeData.id) : ''"
      >
        <v-img height="180" :src="employeeData.avatar"></v-img>
        <v-card-title class="card-title"
          >{{ employeeData.fullName }}</v-card-title
        >
        <v-card-text class="inner-text">
          <h4>{{ employeeData.comment }}</h4>
        </v-card-text>
      </span>
      <v-card-text class="adm-text">
        <h3>{{ employeeData.areaOfWork }}</h3>
        <div class="card-button-wrapper"></div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "WorkspaceCard",
  components: {},
  props: {
    employeeData: {
      type: Object,
      required: true,
    },
    clickable: {
      required: false,
      default: true,
    },
  },
  data() {
    return {
      isUserAdmin: true,
    };
  },
  methods: {
    enterEmployeeProfile(id) {
      if (this.clickable)
        this.$router.push({
          name: "EmployeeProfile",
          params: { employee_id: id },
        });
    },
  },
};
</script>

<style>
.no-mouse {
  pointer-events: none;
}
.card-title {
  font-size: 1.5em;
  border-top: 1px solid rgb(255, 255, 255);
  color: white;
  background-color: rgba(0, 0, 0, 0.907);
}
.outerShell {
  margin: 1em;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 10px 10px rgb(255, 255, 255);
}
.outerShell:hover {
  border: 1px solid rgba(0, 0, 0, 0.481);
}
.clickable-part {
  cursor: pointer;
}
.inner-text {
  min-height: 5em;
  color: rgb(255, 255, 255);
  background-color: rgba(0, 0, 0, 0.907);
}
.inner-text h4 {
  color: rgb(255, 255, 255);
}
.inner-text h3 {
  color: rgb(255, 255, 255);
}
.adm-text {
  display: flex;
  justify-content: space-between;
  padding: 0.8em;
  border-top: 1px solid rgb(255, 255, 255);
  color: rgb(255, 255, 255);
  background-color: rgb(37, 118, 219);
}
.adm-text h3 {
  color: rgb(255, 255, 255);
}
.card-button-wrapper {
  margin: 0.25em 0.3em;
  padding: 0;
}

.edit-button {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.777);
}
</style>