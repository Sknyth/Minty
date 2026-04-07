<template>
	<footer class="footer">
		<section class="bg-color1 footer-section-top">
			<div class="container d-flex align-items-center">
				<RouterLink to="/" class="logo text-decoration-none color2"
					>Minty</RouterLink
				>

				<div class="info-boxes d-flex justify-content-between align-items-center flex-wrap ">
					<ul class="list-unstyled align-items-center d-flex flex-column fw-bold gap-3">
						<li>
							<a class="text-decoration-none color2" href="#">+3730000000</a>
						</li>
						<li>
							<a
								class="text-decoration-none color2"
								href="mailto:iulianrusu29@gmail.com"
								>iulianrusu29@gmail.com</a
							>
						</li>
					</ul>

					<ul class="list-unstyled align-items-center d-flex flex-column fw-bold gap-3">
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
			</div>
		</section>
		<section class="footer-section-bottom">
			<div class="container align-items-center justify-content-between d-flex flex-wrap">
				<p class="text-white-50 copyright">
					Copyright @2026 Minty. All Rights Reserved By *******
				</p>

				<div class="d-flex array-policy gap-3 justify-content-end align-items-center">
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
}
.info-boxes {
    margin-left: auto;
    gap: 60px;
}
p {
	padding: 0;
	margin: 0;
}
.footer-section-top {
	padding: 12px 0;
}
.footer-section-bottom {
	background-color: #242c39;
	padding: 10px 0;
}
@media (max-width: 991px) {
	.array-policy, .copyright {
		justify-content: center !important;
		text-align: center !important;
		align-items: center !important;
	}
	.footer-section-bottom .container {
    justify-content: center !important;
    gap: 8px;
  }
	.footer-section-top .container {
        justify-content: center !important;
    }
    .info-boxes {
        justify-content: center;
    }
}
</style>
