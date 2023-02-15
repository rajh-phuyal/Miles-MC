<template>
  <div class="card-form">
    <v-row class="input-holder">
      <v-col cols="12">
        <v-text-field
          color="secondary"
          label="Image URL"
          outlined
          rounded
          clearable
          :rules="[(value) => !!value || 'Required.']"
          :value="workspaceData.imageUrl"
          @input="emitImageChanges($event)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="input-holder">
      <v-col cols="12">
        <v-text-field
          color="secondary"
          label="Workspace name"
          outlined
          rounded
          counter="30"
          clearable
          hint="Min 5 characters"
          :rules="[validateName]"
          :value="workspaceData.title"
          @input="emitNameChanges($event)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="input-holder">
      <v-col cols="12">
        <v-textarea
          auto-grow
          filled
          color="secondary"
          outlined
          rounded
          label="Description"
          rows="3"
          counter="120"
          clearable
          :rules="[validateDescription]"
          :value="workspaceData.description"
          @input="emitDescChanges($event)"
        ></v-textarea>
      </v-col>
    </v-row>
    <div v-if="displayEmployees">
      <v-row>
        <v-col cols="8">
          <v-select
            clearable
            chips
            label="Add employees"
            :items="availableEmployees"
            multiple
            variant="solo"
            color="black"
            v-model="select"
          ></v-select>
        </v-col>
        <v-btn @click="saveSelected" class="add-employees">
          <span class="material-icons">save</span>
          Save
        </v-btn>
      </v-row>
      <h2
        v-if="thisWorkspaceEmployees.length === 0"
        style="color: #121212; margin: 5px"
      >
        No Employees yet
      </h2>
      <h3 v-else style="color: #121212; margin: 10px 5px">
        Employees in this workspace
      </h3>
      <v-row class="left-scrolable">
        <v-col
          v-for="el in thisWorkspaceEmployees"
          :key="el.id"
          class="employee-wrapper"
          cols="4"
        >
          <v-card elevation="12">
            <span @click="redirectEmployee(el.id)">
              <v-img :src="el.avatar" height="200px" cover></v-img>
              <v-card-title> {{ el.fullName }} </v-card-title>
              <v-card-subtitle> {{ el.comment }} </v-card-subtitle>
            </span>
            <v-card-actions>
              <v-btn @click="removeEmployee(el.id)" color="red" variant="text">
                <span class="material-icons" @click="removeEmployee(el.id)"
                  >delete</span
                >
                Remove
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardCRUD",
  props: {
    workspaceData: {
      type: Object,
      required: true,
    },
    displayEmployees: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  watch: {},
  data() {
    return {
      select: [],
      allEmployees: JSON.parse(localStorage.getItem("employees")),
    };
  },
  computed: {
    thisWorkspaceEmployees() {
      let workspaceEmployees = [];
      let employeesList = this.workspaceData.employees;

      this.allEmployees.forEach((el) => {
        if (employeesList.includes(el.id)) {
          workspaceEmployees.push(el);
        }
      });
      return workspaceEmployees;
    },
    availableEmployees() {
      let empAvailable = [];

      this.allEmployees.forEach((el) => {
        if (!this.workspaceData.employees.includes(el.id)) {
          empAvailable.push(el.fullName);
        }
      });
      return empAvailable;
    },
  },
  methods: {
    emitNameChanges(value) {
      this.$emit("inputName", value);
    },
    emitDescChanges(value) {
      this.$emit("inputDesc", value);
    },
    emitImageChanges(value) {
      this.$emit("inputImg", value);
    },
    validateName(value) {
      if (value.length < 5) {
        this.$emit("bad-form-input");
        return "Min 5 characters";
      } else if (value.length > 30) {
        this.$emit("bad-form-input");
        return "Max 30 characters";
      } else {
        this.$emit("good-form-input");
        return true;
      }
    },
    validateDescription(value) {
      if (value.length < 5) {
        this.$emit("bad-form-input");
        return "Min 5 characters";
      } else if (value.length > 120) {
        this.$emit("bad-form-input");
        return "Max 30 characters";
      } else {
        this.$emit("good-form-input");
        return true;
      }
    },
    saveSelected() {
      let tempEmpData = undefined;
      let fullNames = this.select;
      console.log(fullNames);
      fullNames.forEach((el) => {
        tempEmpData = this._.findLastIndex(this.allEmployees, ["fullName", el]);
        console.log(tempEmpData);
        this.$emit("addNewEmployees", this.allEmployees[tempEmpData].id);
        this.select = 0;
      });
    },
    redirectEmployee(id) {
      this.$router.push({
        name: "EmployeeProfile",
        params: { employee_id: id },
      });
    },
    removeEmployee(id) {
      this.$emit("removeEmployee", id);
    },
  },
};
</script>

<style>
.card-form {
  padding: 2em;
  background-color: #5ea0e6c7;
  border-radius: 0.5em;
}
.input-holder {
  margin: 0px;
  padding: 0;
}
.left-scrolable {
  margin: 1em;
}
.avatars {
  cursor: pointer;
  margin: 1em;
  padding: 1em;
}
.avatars img {
  width: 3em;
  border-radius: 10px;
}
.add-employees {
  margin: 1.5em;
}
</style>