<template>
  <div class="change-area">
    <h1>{{ this.currentWorkspace.title }}</h1>
    <v-row>
      <v-col :cols="4">
        <div class="visualPreview">
          <WorkspaceCard :cardData="this.currentWorkspace" :clickable="false" />
        </div>
      </v-col>
      <v-col :cols="7">
        <div class="form-wrapper">
          <CardCRUD
            @inputName="logNameChange"
            @inputDesc="logDescChange"
            @addNewEmployees="logNewEmployees"
            @removeEmployee="removeEmployees"
            :workspaceData="this.currentWorkspace"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import WorkspaceCard from "@/components/WorkspaceCard.vue";
import CardCRUD from "@/components/CardCRUD.vue";

export default {
  name: "SingleWorkspace",
  components: {
    WorkspaceCard,
    CardCRUD,
  },
  props: {
    toCreate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const allCardData = JSON.parse(localStorage.getItem("workspaces"));
    const currentWorkspaceIndex = this._.findIndex(allCardData, [
      "id",
      parseInt(this.$route.params.workspace_id),
    ]);
    let currentWorkspace = allCardData[currentWorkspaceIndex];
    return {
      allCardData,
      currentWorkspaceIndex,
      currentWorkspace,
    };
  },
  methods: {
    logNameChange(data) {
      this.currentWorkspace.title = data;
      this.allCardData[this.currentWorkspaceIndex].title = data;
      localStorage.setItem("workspaces", JSON.stringify(this.allCardData));
    },
    logDescChange(data) {
      this.currentWorkspace.description = data;
      this.allCardData[this.currentWorkspaceIndex].description = data;
      localStorage.setItem("workspaces", JSON.stringify(this.allCardData));
    },
    logNewEmployees(data) {
      this.currentWorkspace.employees.push(data);
      this.currentWorkspace.employeeCount =
        this.currentWorkspace.employees.length;
      localStorage.setItem("workspaces", JSON.stringify(this.allCardData));
    },
    removeEmployees(id) {
      this.currentWorkspace.employees = this.currentWorkspace.employees.filter(
        (el) => el !== id
      );
      this.currentWorkspace.employeeCount =
        this.currentWorkspace.employees.length;
      localStorage.setItem("workspaces", JSON.stringify(this.allCardData));
    },
  },
};
</script>
<style>
.wrapper {
  margin: 0;
  padding: 0;
  position: relative;
}

.change-area {
  background-color: transparent;
  color: white;
  margin: 0;
  padding: 2em;
}

.change-area h1 {
  font-size: 2em;
  margin-bottom: 1em;
  border-bottom: 1px solid white;
}
.form-wrapper {
  margin: 0;
  padding: 0.7em;
}
</style>