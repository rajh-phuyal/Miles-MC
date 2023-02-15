<template>
  <div>
    <div class="top-banner">
      <h1>All Employees</h1>
      <div v-if="newEmployeeForm">
        <v-btn @click="newEmployeeForm = !newEmployeeForm" color="blue">
          <span class="material-icons">cancel</span>
          &nbsp;Cancel
        </v-btn>
      </div>
      <div v-else>
        <v-btn @click="addNewEmployee" color="blue">
          <span class="material-icons">add</span>
          &nbsp;Add New Employee
        </v-btn>
      </div>
    </div>
    <v-row v-if="!employees.length">
      <v-col>
        <h1 style="color: white; margin-left: 2em">No Employees yet</h1>
      </v-col>
    </v-row>
    <v-row v-if="newEmployeeForm" class="new-employee-wrapper">
      <v-col :cols="12">
        <AddEmployeeFrom @addNewEmployee="logNewEmployee" />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="el in employees" :key="el.id" cols="3">
        <EmployeeCard :employeeData="el" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import EmployeeCard from "../components/EmployeeCard.vue";
import AddEmployeeFrom from "../components/AddEmployeeFrom.vue";

export default {
  name: "AllEmployees",
  components: {
    EmployeeCard,
    AddEmployeeFrom,
  },
  data() {
    return {
      newEmployeeForm: false,
      employees: JSON.parse(localStorage.getItem("employees")),
    };
  },
  methods: {
    addNewEmployee() {
      this.newEmployeeForm = true;
    },
    logNewEmployee(allEmployees) {
      this.employees = allEmployees;
      localStorage.setItem("employees", JSON.stringify(this.employees));
      this.newEmployeeForm = false;
    },
  },
  computed: {},
};
</script>
<style>
h1 {
  margin: 0;
  color: white;
}
.top-banner {
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
</style>

