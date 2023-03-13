<div class="footer-container">
	<div class="container">
		<div class="footer-columns">
			<div class="footer-column">
				<div class="footer-column-heading">Before the trip</div>
				<div class="footer-column-item">
					<a href="/our-ports">Our ports</a>
				</div>
				<div class="footer-column-item">
					<a href="/privacy-policy" target="_blank">Privacy policy</a>
				</div>
				<div class="footer-column-item">
					<a href="/terms-and-conditions" target="_blank"
						>Terms and conditions</a
					>
				</div>

				<div class="footer-column-item">
					<a href="/timetable">Timetable</a>
				</div>
			</div>
			<div class="footer-column">
				<div class="footer-column-heading">During the trip</div>
				<div class="footer-column-item">
					<a href="/what-can-i-bring-aboard">What can I bring aboard?</a>
				</div>
				<div class="footer-column-item">
					<a href="/onboard-services">Service Aboard</a>
				</div>
			</div>
			<div class="footer-column">
				<div class="footer-column-heading">About us</div>
				<div class="footer-column-item">
					<a href="/about-us">About us</a>
				</div>
			</div>
			<div class="footer-column">
				<div class="footer-column-heading">Contact</div>
				<div class="footer-column-item">
					<a href="/faq">FAQ & Help</a>
				</div>
				<div class="footer-column-item">
					<a href="/contact-information">Contact information</a>
				</div>
			</div>
		</div>
		<hr class="rule" />
		<div class="social-icons">
			<img src="/images/icons/instagram.png" alt="Instagram" /><img
				src="/images/icons/twitter.png"
				alt="Twitter"
			/><img src="/images/icons/facebook.png" alt="Facebook" />
		</div>
		<span class="copyright">© Ragusa Express 2023</span>
	</div>
</div>

<style>
	.footer-container {
		border-top: 0.5px solid #8584875c;
		padding-top: 80px;
		justify-content: center;
		display: flex;
	}

	hr.rule {
		height: 0.5px;
		background: var(--snowfall-blue);
		border: none;
		width: 100%;
		margin: 3rem 0 1.5rem;
	}

	.footer-container .container {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.footer-columns {
		display: flex;
		flex-direction: row;
		gap: 3.5rem;
		width: 100%;
	}

	.footer-column {
		flex-basis: 25%;
		display: flex;
		flex-direction: column;
	}

	.footer-column-heading {
		font-family: 'Playfair Display';
		font-weight: 400;
		font-size: 28px;
		line-height: 52px;
	}

	.footer-column-item {
		font-family: 'Montserrat';
		font-weight: 400;
		font-size: 18px;
		line-height: 32px;
		margin-top: 6px;
	}

	.social-icons {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		margin: 1rem 0 1.5rem 0;
	}

	.copyright {
		font-family: 'Inter';
		font-weight: 500;
		font-size: 16px;
		line-height: 20px;
		letter-spacing: 0.1rem;
		padding-bottom: 2rem;
	}
	a {
		color: var(--snowfall-blue);
		text-decoration: none;
		font-weight: 400;
	}

	a:hover {
		text-decoration: underline;
	}

	/* Add media query */
	@media only screen and (max-width: 768px) {
		.footer-container {
			padding: 35px 40px;
		}
		.footer-columns {
			flex-direction: column;
			gap: 25px;
		}
		.footer-column {
			flex-basis: 100%;
		}

		.footer-column::after {
			content: '';
			display: block;
			width: 40%;
			height: 3px;
			background: #4e4563;
			margin: 35px 0 0 0;
		}
	}
</style>
