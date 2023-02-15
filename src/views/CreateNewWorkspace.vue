<template>
  <div class="change-area">
    <h1>{{ this.currentWorkspace.title }}</h1>
    <v-row>
      <v-col :cols="4">
        <div class="visualPreview">
          <v-lazy>
            <WorkspaceCard
              :cardData="this.currentWorkspace"
              :clickable="false"
            />
          </v-lazy>
        </div>
      </v-col>
      <v-col :cols="7">
        <div class="form-wrapper">
          <CardCRUD
            @inputName="logNameChange"
            @inputDesc="logDescChange"
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
  name: "CreateNewWorkspace",
  components: {
    WorkspaceCard,
    CardCRUD,
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
      this.allCardData[this.allCardData.lenght - 1].title = data;
      localStorage.setItem("workspaces", JSON.stringify(this.allCardData));
    },
    logDescChange(data) {
      this.currentWorkspace.description = data;
      this.allCardData[this.currentWorkspaceIndex].description = data;
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