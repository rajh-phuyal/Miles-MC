<template>
  <div class="employee-form-wrapper">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        dark
        v-model="avatar"
        :rules="avatarRules"
        label="Avatar URL"
        required
      ></v-text-field>
      <v-text-field
        dark
        v-model="name"
        :counter="30"
        :rules="nameRules"
        label="Full Name"
        required
      ></v-text-field>
      <v-text-field
        dark
        v-model="email"
        :rules="emailRules"
        label="email"
        required
      ></v-text-field>
      <v-text-field
        dark
        v-model="age"
        :rules="ageRules"
        label="age"
        required
      ></v-text-field>
      <v-text-field
        dark
        v-model="salary"
        :rules="salaryRules"
        label="salary"
        required
      ></v-text-field>
      <v-text-field
        dark
        v-model="area"
        :rules="areaRules"
        label="Area of work"
        :counter="70"
        required
      ></v-text-field>
      <v-select
        dark
        v-model="select"
        :items="workspaces"
        :rules="[(v) => !!v || 'Item is required']"
        label="Workspaces"
        required
        multiple
        chips
      ></v-select>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Submit
      </v-btn>
      <v-btn color="error" class="mr-4" @click="reset">Clear</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    age: "",
    ageRules: [
      (v) => !!v || "age is required",
      (v) => v.length < 3 || "Nobody is that old",
    ],
    salary: "",
    salaryRules: [
      (v) => !!v || "salary is required",
      (v) => v > 600 || "Do you pay that less?",
    ],
    avatar: "",
    avatarRules: [(v) => !!v || "Avatar is required"],
    area: "",
    areaRules: [
      (v) => !!v || "Area of work is required",
    ],
    select: null,
  }),
  computed: {
    workspaces() {
      let workspaces = [];
      let AllWorkspaces = JSON.parse(localStorage.getItem("workspaces"));

      AllWorkspaces.forEach((el) => {
        workspaces.push(el.id + " " + el.title);
      });
      return workspaces;
    },
  },
  methods: {
    validate() {
      let allEmployees = JSON.parse(localStorage.getItem("employees"));
      this.$refs.form.validate();
      if (this.valid) {
        allEmployees.push({
          id: allEmployees[allEmployees.length - 1].id + 1,
          avatar: this.avatar,
          fullName: this.name,
          age: this.age,
          areaOfWork: this.area,
          email: this.email,
          salary: this.salary,
        });
        this.workspaces.forEach((el) => {
          if (this.select.includes(el)) {
            let workspace = JSON.parse(localStorage.getItem("workspaces"));
            let workspaceId = parseInt(el.split(" ")[0]);
            let employeeId = allEmployees[allEmployees.length - 1].id;
            workspace.forEach((el) => {
              if (el.id === workspaceId) {
                el.employees.push(employeeId);
                el.employeeCount++;
              }
            });
            localStorage.setItem("workspaces", JSON.stringify(workspace));
          }
        });
        this.$emit("addNewEmployee", allEmployees);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
.employee-form-wrapper {
  margin: 1em 5em;
  padding: 2em;
  background-color: rgb(76, 126, 178);
  border: 2px solid rgb(0, 255, 251);
  border-radius: 10px;
}
</style>