<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
	params: {
		type: String,
		default: ""
	}
})

const getHost = () => {
	return window.location.protocol + "//" + window.location.host
}

const getHtml = computed(() => {
	return `<img src="${getHost()}/api/hit?${props.params}">`
})
const jsonOutput = ref(false)
</script>

<template>
	<div class="d-flex gap-3 flex-column">
		<div>
			<div class="p-3 border border-white d-flex align-items-center rounded-3">
				<h5 class="mb-0 me-auto">Result</h5>
				<img :src="'/api/previewBadge?'+params" alt="badge">
			</div>
		</div>
		<div class="p-3 border border-white rounded-3 d-flex gap-3 flex-column">
			<h5 class="mb-0">Copy & paste it in your file</h5>
			<div class="card rounded-3">
				<div class="card-header d-flex align-items-center">
					URL
					<div class="form-check form-switch ms-auto">
						<label class="form-check-label" for="jsonOutput">
							<small>JSON</small>
						</label>
						<input v-model="jsonOutput" class="form-check-input" type="checkbox" role="switch" id="jsonOutput">
					</div>
				</div>
				<div class="card-body">
					<pre class="mb-0">{{getHost()}}/api/hit?{{(jsonOutput ? 'output=json&':'') + params}}</pre>
				</div>
			</div>
			<div class="card rounded-3">
				<div class="card-header">
					Markdown
				</div>
				<div class="card-body">
					<pre class="mb-0">![Badge]({{getHost()}}/api/hit?{{params}})</pre>
				</div>
			</div>
			<div class="card rounded-3">
				<div class="card-header">
					HTML
				</div>
				<div class="card-body">
					<pre class="mb-0" v-text="getHtml"></pre>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>