<template>
  <div id="AllWorkspaces">
    <div class="WorkspaceTools">
      <h1 style="border: none; margin: 0">All Workspaces</h1>
      <div v-if="newWorkspaceForm" class="top-button">
        <v-btn @click="isFormValid ? saveNewWorkspace() : ''" color="green">
          <span class="material-icons">save</span>
          &nbsp;Save Workspace
        </v-btn>
        <v-btn @click="cancelNewForm" color="blue">
          <span class="material-icons">cancel</span>
          &nbsp;Cancel
        </v-btn>
      </div>
      <div v-else>
        <v-btn @click="addNewWorkspace" color="blue">
          <span class="material-icons">add</span>
          &nbsp;Add New Workspace
        </v-btn>
      </div>
    </div>
    <v-row v-if="!rows.length">
      <v-col>
        <h1 style="color: white; margin-left: 2em">No Workspaces yet</h1>
      </v-col>
    </v-row>
    <v-row v-if="newWorkspaceForm" class="new-workspace-wrapper">
      <v-col :cols="4">
        <WorkspaceCard :cardData="newWorkspace" :clickable="false" />
      </v-col>
      <v-col :cols="8">
        <CardCRUD
          @inputImg="logImgChange"
          @inputName="logNameChange"
          @inputDesc="logDescChange"
          @bad-form-input="isFormValid = false"
          @good-form-input="isFormValid = true"
          :workspaceData="newWorkspace"
          :displayEmployees="false"
        />
      </v-col>
    </v-row>
    <v-row v-for="(row, index) in rows" :key="index">
      <v-col v-for="card in row" :key="card.id" :cols="colsPerCard">
        <WorkspaceCard
          @deleteWorkspace="deleteWorkspace"
          :cardData="card"
          :clickable="true"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WorkspaceCard from "../components/WorkspaceCard.vue";
import CardCRUD from "../components/CardCRUD.vue";

export default {
  name: "AllWorkspaces",
  components: {
    WorkspaceCard,
    CardCRUD,
  },
  data() {
    return {
      newWorkspaceForm: false,
      cards: JSON.parse(localStorage.getItem("workspaces")),
      emptyWorkspace: {
        id: 0,
        title: "",
        description: "",
        employeeCount: 0,
        admin: "",
        imageUrl: "",
        employees: [],
      },
      newWorkspace: {
        id: 0,
        title: "",
        description: "",
        employeeCount: 0,
        admin: "",
        imageUrl: "",
        employees: [],
      },
      isFormValid: true,
    };
  },
  methods: {
    addNewWorkspace() {
      this.newWorkspaceForm = true;
    },
    deleteWorkspace(id) {
      const currentWorkspaceIndex = this._.findIndex(this.cards, ["id", id]);
      this.cards.splice(currentWorkspaceIndex, 1);
      localStorage.setItem("workspaces", JSON.stringify(this.cards));
    },
    logImgChange(data) {
      this.newWorkspace.imageUrl = data;
    },
    logNameChange(data) {
      this.newWorkspace.title = data;
    },
    logDescChange(data) {
      this.newWorkspace.description = data;
    },
    saveNewWorkspace() {
      if (this.cards.length == 0) this.newWorkspace.id = 1;
      else this.newWorkspace.id = this.cards[this.cards.length - 1].id + 1;
      if (this.newWorkspace.imageUrl == "")
        this.newWorkspace.imageUrl =
          "https://cdn.discordapp.com/attachments/997270158362034308/1071776970335068271/The_Skeleton_mission_control_center_of_a_ship_in_the_middle_of__19292231-3850-4143-959f-c82cef56d60f.png";
      this.cards.push(this.newWorkspace);
      localStorage.setItem("workspaces", JSON.stringify(this.cards));
      this.newWorkspaceForm = false;
      this.newWorkspace = this.emptyWorkspace;
    },
    cancelNewForm() {
      this.newWorkspace = this.emptyWorkspace;
      this.newWorkspaceForm = false;
    },
  },
  computed: {
    colsPerCard() {
      if (this.$vuetify.breakpoint.mdAndDown) return 4;
      return 3;
    },

    rows() {
      let rows = [];
      let row = [];
      this.cards.forEach((card, index) => {
        row.push(card);
        if ((index + 1) % (12 / this.colsPerCard) === 0) {
          rows.push(row);
          row = [];
        }
      });
      if (row.length > 0) {
        rows.push(row);
      }
      return rows;
    },
  },
};
</script>

<style>
#AllWorkspaces {
  margin: 0;
  padding: 1em;
}
.WorkspaceTools {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1em 1em 3em 1em;
  padding: 1em;
  width: 98%;
  height: 5em;
  background-color: transparent;
  color: white;
  border-bottom: 1px solid white;
}
.top-button {
  display: flex;
  flex-wrap: auto;
}
.new-workspace-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1em 1em 3em 1em;
  padding: 1em;
  background-color: transparent;
  color: white;
  border-bottom: 1px solid white;
  animation: fade 0.5s linear forwards;
}
@keyframes fade {
  from {
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}
.v-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-content: space-between;
}
.v-col {
  flex: 1 1 calc(33.33% - 16px);
  margin: 2em;
}
</style>