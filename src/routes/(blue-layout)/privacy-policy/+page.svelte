<script lang="ts">
	import BlueHeadingSection from '../_components/blue-heading-section.svelte'
</script>

<div class="page-layout">
	<BlueHeadingSection>
		<h1>Privacy Policy</h1>
	</BlueHeadingSection>
	<div class="privacy-policy">
		<p class="body">
			www.splitexpress.com of Adriatic Fast Ferries d.o.o. (called AFF below)
			This privacy policy will explain how our organization uses the personal
			data we collect from you when you use our website.
		</p>
		<span class="terms-header"> Topics: </span>
		<ul>
			<li>What data do we collect?</li>
			<li>How do we collect your data?</li>
			<li>How will we use your data?</li>
			<li>How do we store your data?</li>
			<li>Marketing</li>
			<li>What are your data protection rights?</li>
			<li>What are cookies?</li>
			<li>How do we use cookies?</li>
			<li>What types of cookies do we use?</li>
			<li>How to manage your cookies</li>
			<li>Privacy policies of other websites</li>
			<li>Changes to our privacy policy</li>
			<li>How to contact us</li>
			<li>How to contact the appropriate authorities</li>
		</ul>
		<span class="terms-header">What data do we collect?</span>
		<span class="sub-heading">AFF collections the following data:</span>
		<ul>
			<li>
				Personal identification information (Name, email address, phone number,
				etc.)
			</li>
		</ul>
		<span class="terms-header">How do we collect your data?</span>

		<p>
			You directly provide AFF with most of the data we collect. We collect data
			and process data when you:
		</p>

		<ul>
			<li>Register online or make a booking for any of services</li>
			<li>
				Voluntarily complete a customer survey or provide feedback on any of our
				message boards or via email
			</li>
			<li>Contact our support center via phone or e-mail</li>
			<li>Use or view our website via your browser's cookies</li>
		</ul>
	</div>
</div>

<style>
	.body {
		/* width: 80%; */
		margin: 0 auto;
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		line-height: 39px;
	}
	.privacy-policy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.terms-header {
		font-family: 'Montserrat';
		font-size: 24px;
		font-weight: 700;
		line-height: 39px;
		/* margin: 0 auto; */
		margin-top: 35px;
	}
	.sub-heading {
		display: block;
		font-weight: 600;
		font-size: 18px;
		margin-top: 18px;
	}
	p {
		margin-bottom: 0;
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		line-height: 39px;
	}
	ul {
		margin-top: 10px;
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		line-height: 39px;
	}

	li {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		line-height: 39px;
	}
	h1 {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 400;
		font-size: 54px;
		line-height: 72px;

		display: flex;
		align-items: center;
		color: #ffffff;
	}
</style>
