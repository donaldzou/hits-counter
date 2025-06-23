<script setup lang="ts">
import IconPicker from "~/components/icon-picker.vue";
import ColorPicker from "~/components/color-picker.vue";
import dayjs from 'dayjs';
import { v4 } from "uuid";
import Livestream from "~/components/livestream.vue";
import {onMounted, type Reactive} from "vue";
import type {Badge} from "~/interfaces/badge";
import type { Hit } from "~/interfaces/hit"
import type {HitSummary} from "~/interfaces/hitSummary";
import type {Timeout} from "unenv/node/internal/timers/timeout";


const badgeData: Reactive<Badge> = reactive({
	url: "",
	label: "",
	icon: "",
	color: "",
	message: '',
	style: "flat",
	tz: "UTC"
})
const preview = ref(false)
const query = ref("")
const generate = async () => {
	query.value = new URLSearchParams(badgeData).toString()
	preview.value = true;
}
const hits: Ref<Hit[]> = ref([])
const { $socket } = useNuxtApp()
if ($socket){
	if ($socket.disconnected){
		$socket.connect()
	}
	$socket.on("hit", (url: string) => {
		hitSummary.urlTotalHits += 1
		hits.value.unshift({
			uuid: v4().toString(),
			time: dayjs().format('YYYY-MM-DD HH:mm:ss:SSS'),
			url: url
		})
	});
	$socket.on('newUrl', () => {
		hitSummary.urlCount += 1
	})
}
onBeforeRouteLeave(() => {
	$socket.disconnect();
})
const hitSummary: HitSummary = reactive({
	urlCount: 0,
	urlTotalHits: 0
})
let timezones: Array<string> = []
await useFetch("/api/availableTimezones").then(res => {
	timezones = res.data.value as Array<string>
})
useFetch("/api/hitSummary").then(res => {
	let value = res.data.value as HitSummary
	hitSummary.urlCount = value.urlCount;
	hitSummary.urlTotalHits = value.urlTotalHits;
})

onMounted(() => {
	let debounceTimeout: Timeout<number>;
	watch(badgeData, (newValue) => {
		if (debounceTimeout) clearTimeout(debounceTimeout)
		if (newValue.url){
			debounceTimeout = setTimeout(() => {
				generate()
			}, 300)
		}
	})
})
</script>

<template>
	<div class="flex-grow-1 d-flex">
		<div class="w-100 d-flex flex-column gap-5">
			<div class="bg-body-secondary">
				<div class="container py-5">
					<div class="mb-5 animate__animated animate__fadeIn">
						<h1 class="display-1 fw-bold">
							Hits Counter<span class="h-100 bg-white d-inline-block ms-3"
							                   style="width: 40px; height: 1rem !important;"> </span>
						</h1>
						<p class="fw-lighter h5 mb-5">
							Create a badge to track visits on your websites / GitHub Profile / GitHub Repo / anything that can host a image, no JavaScript requirement (i.e. Google Analytics).
						</p>
						<p class="fw-lighter h5 my-3 d-flex align-items-center gap-2 mb-2">
							A Badge like this <img src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Fhitscounter.dev&label=Visitors&icon=heart-fill&color=%23ff7575" alt="Badge">
						</p>
						<p class="fw-lighter h5">
							Containing [Icon] [Label] [# of Hits Today] [# of Hits Total]
						</p>
					</div>
					<p class="text-muted animate__animated animate__fadeIn">
						Due to the recent close down of
						<a href="https://github.com/gjbae1212/hit-counter">hits.seeyoufarm.com</a>, I've decided to recreate one based on it. <br>Thanks <a href="https://github.com/gjbae1212">@gjbae1212</a> for the hardworking.
					</p>
				</div>
			</div>
			<div class="container">
				<h4 class="mb-4">Create Your Badge</h4>
				<div class="row gy-3">
					<div class="col-sm-4 d-flex flex-column gap-3 align-items-center" id="createBadgeForm">
						<div class="alert alert-success rounded-3 mb-0">
							If you would like to have your count start at some other value, please open an <a target="_blank" href="https://github.com/donaldzou/hits-counter/issues/new/choose">issue</a> and I will update it for you ASAP.
						</div>
						<div class="form-floating">
							<input type="url" class="form-control rounded-3" id="content"
							       v-model="badgeData.url"
							       placeholder="URL you want to track">
							<label for="label">URL you want to track</label>
						</div>
						<div class="form-floating">
							<input type="text" class="form-control rounded-3" id="label"
							       v-model="badgeData.label"
							       placeholder="Visitor">
							<label for="label">Label</label>
						</div>
						<div class="d-flex gap-3 flex-column">
							<suspense>
								<IconPicker @icon="icon => badgeData.icon = icon"></IconPicker>
							</suspense>
							<ColorPicker @color="color => badgeData.color = color"></ColorPicker>
						</div>
						<div class="row gx-3">
							<div class="col-6 ps-0">
								<div class="form-floating">
									<select class="form-select rounded-3" id="timezone"
									        v-model="badgeData.style"
									>
										<option value="flat">Flat</option>
										<option value="flat-square">Flat Square</option>
										<option value="for-the-badge">For-the-Badge</option>
										<option value="social">Social</option>
										<option value="plastic">Plastic</option>
									</select>
									<label for="label">Style</label>
								</div>
							</div>
							<div class="col-6 pe-0">
								<div class="form-floating">
									<select class="form-select rounded-3" id="timezone"
									        v-model="badgeData.tz"
									>
										<option v-for="tz in timezones" :value="tz">
											{{ tz }}
										</option>
									</select>
									<label for="label">Timezone</label>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-8">
						<Transition name="page" mode="out-in">
							<Preview v-if="preview" :params="query"></Preview>
							<div v-else class="w-100 h-100 bg-body rounded-3 p-3 d-flex">
								<h6 class="m-auto text-muted">Fill in form to generate your badge</h6>
							</div>
						</Transition>
					</div>
				</div>
			</div>
			<Livestream :hitSummary="hitSummary" :hits="hits"></Livestream>
		</div>
	</div>
</template>

<style scoped>

</style>