<template>
	<div data-bs-theme="dark" class="d-flex flex-column bg-body-tertiary text-body" style="min-height: 100vh">
		<nav class="navbar navbar-expand-lg sticky-top border-bottom bg-body-tertiary" style="backdrop-filter: blur(8px); background-color: rgb(43 48 53 / 70%) !important">
			<div class="container-fluid">
				<NuxtLink class="navbar-brand" to="/">Hits Counter</NuxtLink>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div class="navbar-nav ms-auto">
						<NuxtLink to="/history" class="nav-link" aria-disabled="true">
							<i class="bi bi-clock-history me-2"></i>History
						</NuxtLink>
						<a class="nav-link" aria-disabled="true"
						   target="_blank"
						   href="https://github.com/donaldzou/hits-counter">
							<i class="bi bi-github me-2"></i>GitHub
						</a>
					</div>
				</div>
			</div>
		</nav>
		<NuxtPage></NuxtPage>
		<footer class="bg-body mt-auto">
			<div class="container py-3 d-flex">
				<small>
					Made with <i class="bi bi-heart-fill"></i> by <a href="https://github.com/donaldzou">Donald Zou</a>
				</small>
			</div>
		</footer>
	</div>

</template>
<script setup lang="ts">

useSeoMeta({
	title: 'Hits Counter | Track Website Visits with a badge',
	ogTitle: 'Hits Counter | Track Website Visits with an badge',
	description: 'Track your website or GitHub profile / repo with an badge. No JavaScript required.',
	ogDescription: 'Track your website or GitHub profile / repo with an badge. No JavaScript required.',
	ogImage: 'https://hitscounter.dev/seo.png',
})

</script>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.5s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(8px);
}
</style>