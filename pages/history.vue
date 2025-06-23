<script setup lang="ts">
import {
	Chart,
	LineElement,
	BarElement,
	BarController,
	LineController,
	LinearScale,
	Legend,
	Title,
	Tooltip,
	CategoryScale,
	PointElement, Filler
} from 'chart.js';
import { Line, Bar } from 'vue-chartjs'
import annotationPlugin from 'chartjs-plugin-annotation';
import {computed} from "vue";
Chart.register(
	LineElement,
	BarElement,
	BarController,
	LineController,
	LinearScale,
	Legend,
	Title,
	Tooltip,
	CategoryScale,
	PointElement,
	Filler,
	annotationPlugin
);

const url = ref("")
const loadingHistoryData = ref(false)
const loaded = ref(false)
const historyData = ref({
	total_hits: 0,
	today_hits: 0,
	history: []
})
const average = ref(0)
const route = useRoute()



const getHistory = async () => {
	if (url.value){
		loadingHistoryData.value = true;
		loaded.value = false;
		const params = new URLSearchParams({
			url: url.value
		})
		const data = await $fetch('/api/history?' + params.toString())
		historyData.value = data;
		average.value = 0;
		if (historyData.value.history.length > 0){
			average.value = Math.floor(historyData.value.history.map(x => x.hit_count).reduce((x, y) => x + y) / historyData.value.history.length)
		}
		loadingHistoryData.value = false;
		loaded.value = true;
	}
}
const chartOption = computed(() => {
	let annotation = (average.value === 0 ? undefined : {
		annotations: {
			line1: {
				type: 'line',
				yMin: average.value,
				yMax: average.value,
				borderDash: [10],
				borderColor: '#ffffff40',
				borderWidth: 2,
				label: {
					content: `Average: ${average.value}`,
					display: true,
					font: {
						size: 14,
						family: '"JetBrains Mono", monospace'
					},
				}
			}
		}
	})


	return {
		responsive: true,
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				callbacks: {
					label: (tooltipItem) => {
						return `${tooltipItem.formattedValue} Hit(s)`
					}
				}
			},
			annotation: annotation
		},
		scales: {
			x: {
				ticks: {
					display: false,
				},
				grid: {
					display: false
				},
				border: {
					color: "#ffffff"
				},

			},
			y:{
				grid: {
					display: false
				},
				border: {
					color: "#ffffff"
				},
				ticks: {
					font: {
						size: 14,
						family: '"JetBrains Mono", monospace'
					},
					color: "#fff"
				}
			}
		}
	}
})
const historyChartData = computed(() => {
	return {
		labels: historyData.value.history.map(x => x.hit_date),
		datasets: [
			{
				label: 'Hit Count',
				data: historyData.value.history.map(x => x.hit_count),
				fill: {
					target: 'origin',
					below: '#71adf630'
				},
				backgroundColor: 'rgba(113,173,246,0.72)',
				borderColor: '#fff',
				tension: 0,
				pointRadius: 5,
				borderWidth: 1,
			},
		],
	}
})

onMounted(() => {
	if (route.query.url){
		url.value = route.query.url as string
		getHistory()
	}
})

</script>

<template>
<div class="container text-center d-flex flex-grow-1">
	<div class="my-auto flex-grow-1 position-relative">
		<TransitionGroup name="list">
			<div class="mb-5" key="header">
				<h2 class="fw-light mt-5">
					Hit Count History of
				</h2>
				<input class="h1 bg-transparent shadow-none border-0 w-100 p-0 text-center"
				       v-model="url"
				       type="url"
				       style="outline: none"
				       @change="getHistory()"
				       placeholder="Enter URL Here...">
			</div>
			<div class="w-100" key="spinner" v-if="loadingHistoryData">
				<div class="spinner-border"></div>
			</div>
			<div v-if="loaded"  key="data" class="w-100">
				<div class="row mb-4">
					<div class="col-sm">
						<h1 class="display-1">
							{{ historyData.today_hits }}
						</h1>
						<h5>
							Hits Today
						</h5>
					</div>
					<div class="col-sm">
						<h1 class="display-1">
							{{ historyData.total_hits }}
						</h1>
						<h5>
							Hits Total
						</h5>
					</div>
				</div>
				<div class="d-flex flex-column gap-3">
					<h5>
						Historical Hit Count
					</h5>
					<Line
						:options="chartOption"
						:data="historyChartData"
						style="width: 100%; max-height: 400px"
					></Line>
					<div>
						<table class="table table-responsive table-dark">
							<thead>
							<tr>
								<th scope="col">Date</th>
								<th scope="col">Hit Count</th>
							</tr>
							</thead>
							<tbody>
								<tr v-for="x in historyData.history">
									<th scope="row">
										{{ x.hit_date }}
									</th>
									<td>
										{{ x.hit_count }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

		</TransitionGroup>
	</div>
</div>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	filter: blur(8px);
	transform: translateY(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
	position: absolute;
}

.table>:not(caption)>*>*{
	background-color: transparent !important;
}
</style>