<template>
	<v-row justify="center">
		<v-btn
		color="primary"
		@click.stop="dialog = true"
		>
		<span class="material-icons delete-button">delete</span>
		</v-btn>

		<v-dialog
		v-model="dialog"
		max-width="300"
		>
		<v-card style="background-color: #F06765">
			<v-card-title style="color: white" class="text-h5">
			Delete the Workspace?
			</v-card-title>
			<v-card-text style="color: white">
			This action is not reversable!
			</v-card-text>
			<v-card-actions>
			<v-spacer></v-spacer>

			<v-btn
				color="black darken-1"
				text
				@click="dialog = false"
			>
				Cancel
			</v-btn>

			<v-btn
				style="background-color: white;"
				color="red darken-1"
				text
				@click="deleteWorkspace"
			>
				Delete forever
			</v-btn>
			</v-card-actions>
		</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
  export default {
	name: 'DeletePrompt',
    data () {
      return {
        dialog: false,
      }
    },
	methods: {
		deleteWorkspace () {
			this.dialog = false
			this.$emit('deleteWorkspace')
		}
	}
  }
</script>

<style>
  .delete-button {
	color: rgba(255, 0, 0, 0.769);
	cursor: pointer;
	font-size: 1.5rem;
  }
</style>