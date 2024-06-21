<template>
	<footer class="footer">
		<section class="bg-color1 footer-section-top">
			<div class="container d-flex align-items-center">
				<RouterLink to="/" class="logo text-decoration-none color2"
					>Minty</RouterLink
				>

				<ul class="list-unstyled align-items-center d-flex flex-column">
					<li>
						<a class="text-decoration-none color2" href="#">+3730000000</a>
					</li>
					<li>
						<a
							class="text-decoration-none color2"
							href="mailto:example@gmail.com"
							>iulianrusu29@gmail.com</a
						>
					</li>
				</ul>

				<ul class="list-unstyled align-items-center d-flex flex-column">
					<li>
						<a
							class="text-decoration-none color2"
							target="_blank"
							href="https://vuejs.org/"
							>vuejs.org</a
						>
					</li>
					<li>
						<a
							class="text-decoration-none color2"
							target="_blank"
							href="https://getbootstrap.com/"
							>bootstrap.com</a
						>
					</li>
				</ul>
			</div>
		</section>
		<section class="footer-section-bottom">
			<div class="container align-items-center justify-content-between d-flex">
				<p class="text-white-50">
					Copyright @2024 Minty. All Rights Reserved By *******
				</p>

				<div class="d-flex array-policy">
					<a class="text-decoration-none text-white-50" href="#"
						>Privacy Policy</a
					>
					<a class="text-decoration-none text-white-50" href="#"
						>Terms of Use</a
					>
				</div>
			</div>
		</section>
	</footer>
</template>

<style scoped>
.footer {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 134px;
}
.footer-section-top {
	padding: 12px 0;
	height: 84px;
}
.logo {
	margin-bottom: 13px;
}
ul {
	font-weight: 700;
	margin-left: 192px;
	gap: 8px;
}
.social-links {
	gap: 20px;
}
p {
	height: 0;
}
.footer-section-bottom {
	background-color: #242c39;
	height: 50px;
	padding: 10px 0;
}
.array-policy {
	gap: 12px;
}
</style>
