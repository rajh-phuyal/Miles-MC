<template>
  <div>
    <div class="employeeProfile">
      <v-row>
        <v-col cols="4">
          <img
            class="employeeImg"
            :src="currentEmployee.avatar"
            :alt="currentEmployee.fullName"
          />
        </v-col>
        <v-col cols="4">
          <h2>{{ currentEmployee.fullName }} | {{ currentEmployee.age }}</h2>
          <h2>Email: {{ currentEmployee.email }}</h2>
        </v-col>
        <v-col cols="4">
          <h2>Area of work: {{ currentEmployee.areaOfWork }}</h2>
          <div class="show-salary">
            <v-text-field
              class="show-salary-input"
              v-if="!showSalary"
              placeholder=" Password for salary"
              dark
              :error="invalidPass"
              color="secondary"
              :append-icon="value ? 'visibility_off' : 'visibility'"
              @click:append="() => (value = !value)"
              :type="value ? 'password' : 'text'"
              @input="validatePass($event)"
            >
            </v-text-field>
            <h2 v-else>Salary: {{ currentEmployee.salary }}</h2>
          </div>
        </v-col>
      </v-row>
      <v-row style="margin: 10px">
        <v-col cols="12">
          <v-textarea
            auto-grow
            filled
            dark
            color="secondary"
            outlined
            rounded
            label="Comment"
            rows="3"
            counter="120"
            clearable
            :rules="[(value) => !!value || 'Required.']"
            :value="currentEmployee.comment"
            @input="logCommentChanges($event)"
          ></v-textarea>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "EmployeeProfile",
  data() {
    const employees = JSON.parse(localStorage.getItem("employees"));
    let currentEmployee =
      employees[
        this._.findIndex(employees, [
          "id",
          parseInt(this.$route.params.employee_id),
        ])
      ];
    return {
      value: String,
      invalidPass: false,
      showSalary: false,
      employees,
      currentEmployee,
    };
  },
  methods: {
    validatePass(pass) {
      if (pass === "show me the money") {
        this.showSalary = true;
      } else {
        this.invalidPass = true;
      }
    },
    logCommentChanges(value) {
      this.currentEmployee.comment = value;
      localStorage.setItem("employees", JSON.stringify(this.employees));
    },
  },
};
</script>
<style>
.employeeProfile {
  background-color: #000000;
  border: 1px solid white;
  border-radius: 20px;
  margin: 3em 10em;
  padding: 1em;
}

.employeeImg {
  margin: 2em;
  width: auto;
  height: auto;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 10px;
}

.show-salary-input {
  margin: 1em 2em;
  text-align: center;
  max-width: 15em;
  border-radius: 5px;
}
h2 {
  margin: 2em;
  color: white;
}
</style>