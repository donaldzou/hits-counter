<script setup lang="ts">
const props = defineProps([
	"hitSummary", "hits"
])
</script>

<template>
	<div class="bg-body pt-5 pb-3">
		<div class="container">
			<div class="card rounded-3 text-start " >
				<div class="card-header fw-lighter d-flex">
					<span>
						Tracking
						<strong class="fw-bold">{{ hitSummary.urlCount }}</strong> URLs &
						<strong class="fw-bold">{{ hitSummary.urlTotalHits }}</strong> Hits
					</spaN>
				</div>
				<div class="card-body overflow-scroll" style="height: 500px" >
					<div v-if="hits.length === 0">
						<i class="bi bi-record2-fill me-2 text-danger-emphasis animate__slower animate__animated animate__flash animate__infinite"></i>Waiting...
					</div>
					<div v-for="hit in hits" :key="hit.uuid" class="d-flex align-items-center gap-2">
						<small>{{ hit.time }}</small>
						<RouterLink :to="'/history?url=' + hit.url">
							<span class="badge text-bg-light ">
								<strong>
									{{ hit.url }}
								</strong>
							</span>
						</RouterLink>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<style scoped>

</style>