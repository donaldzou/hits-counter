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
</script>

<template>
	<div class="d-flex gap-3 flex-column">
		<hr>
		<div>
			<h5>Preview</h5>
			<img :src="'/api/previewBadge?'+params" alt="badge">
		</div>
		<h5></h5>
		<div class="d-flex gap-2 flex-column">
			<div class="card">
				<div class="card-header">
					URL
				</div>
				<div class="card-body">
					<samp>
						{{getHost()}}/api/hit?{{params}}
					</samp>
				</div>
			</div>
		</div>
		<div class="d-flex gap-2 flex-column">
			<div class="card">
				<div class="card-header">
					Markdown
				</div>
				<div class="card-body">
					<samp>
						![Badge]({{getHost()}}/api/hit?{{params}})
					</samp>
				</div>
			</div>
		</div>
		<div class="d-flex gap-2 flex-column">
			<div class="card">
				<div class="card-header">
					HTML
				</div>
				<div class="card-body">
					<samp v-text="getHtml">

					</samp>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>