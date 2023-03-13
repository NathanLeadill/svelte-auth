<script lang="ts">
	import BlueHeadingSection from '../_components/blue-heading-section.svelte'
</script>

<div class="page-layout">
	<BlueHeadingSection>
		<h1>Terms and conditions for purchasing / travel</h1>
	</BlueHeadingSection>
	<div class="terms-and-conditions">
		<p class="body">
			Adriatic Fast Ferries d.o.o (called AFF here under), Croatia with web site
			www.splitexpress.com, Terms and Conditions for Purchasing (the “Terms”)
			apply to all contracts for purchase of travel and associated additional
			services entered with AFF. You can purchase a ticket on our website
			www.splitexpress.com or via agents in our ports. You, the Customer, are
			responsible for ensuring that your booking is correct. You are also
			responsible to have enough time if you have a connection. Read these Terms
			and check your booking details. You should also familiarise yourself with
			Conditions for the Carriage of Passengers by Sea. Select “Pay” to complete
			the purchase. Once you have completed the purchase you have accepted the
			Terms. The Terms apply to all purchases of tickets directly from AFF on
			our website www.splitexpress.com . When you purchase a ticket from a
			travel agent or other agent, the terms and conditions applicable to that
			purchase shall apply but with minimum requirement stated in our term here,
			the price can differ from www.splitexpress.com When travelling with us,
			AFF General Terms and Conditions for the Carriage of Passengers by Sea
			apply. AFF does not assume liability for losses that passengers have to
			sustain due to delay or cancellation of the transportation, events that
			are caused randomly, by force majeure, bad weather conditions, strikes,
			technical faults due to force majeure or other reasons beyond the
			company’s scope of influence. The Master is entitled to change the
			intended course of the ship if events occur that may put the safety of the
			ship and the passengers at risk. The published offers und conditions may
			be subject to changes until the boarding cards are distributed. Passengers
			are responsible for their luggage and the items contained therein until
			the moment of embarkation. The scheduled crossing times are approximated
			values and their calculation is based on the distance between two ports
			and good weather conditions. Published timetables and prices are subject
			to change. AFF company does not assume liability for delays due to
			measures taken by port staff
		</p>
		<span class="terms-header"> About your ticket </span>

		<p class="body">
			<span class="sub-heading"> Types of tickets </span>We sell both tickets
			that are changeable (LowFarePlus, FlexPlus) /refundable (FlexPLus) and
			tickets that are non-changeable/non-refundable (LowFare). The passenger
			must have a valid ticket to travel. A passenger who boards a Ferry must
			have a valid ticket. The passenger must be ready to board the Ferry at
			least 15 minutes before departure otherwise we cannot guarantee the
			reserved seat. You can buy a ticket on our website www.splitexpress.com
			.You can usually also buy a ticket from the departure port or if possible
			on-board. The prices may vary from prices at www.splitexpress.com You
			might be asked to show a valid form of personal identification (“ID”).
			LUGGAGE, PUSHCHAIRS, WHEELCHAIRS, GUIDE DOGS/SERVICE DOGS/PETS ETC. AFF
			General Terms and Conditions for the Carriage of Passengers by Sea include
			provisions on travelling with luggage and pets. Brief overview: The
			passenger may, free of charge, take as hand luggage items that are easy
			for him/her to carry, of reasonable circumference and, on each mode of
			transport, may be stowed in a designated or appropriate space. A guideline
			for what constitutes hand luggage of reasonable circumference is 1 piece
			of luggage measuring approximately 800 x 500 x 35 mm and weighing no more
			than 20 kg. You may also take a smaller bag (handbag, laptop etc).
			Pushchairs, wheelchairs (including powered wheelchairs), walking frames
			and similar aids are permitted if space allows. Pushchairs shall be folded
			and stowed in a designated area. Mobility scooters are permitted if space
			allows. A space must be reserved prior to departure in connection with
			booking the ticket. Contact the customer support. Where a passenger wishes
			to bring a wheelchair, walking frame or similar aids onboard the Ferry
			during their journey, the passenger must ensure, prior to booking a
			ticket, that the wheelchair etc. is of a length, width and weight that may
			be taken onboard and used in the train. This also applies to mobility
			scooters. (The following size and weight restrictions apply onboard: width
			800 mm, length: 1200 mm, weight: 350 kg. The applicable ground clearance
			must be a minimum of 50 mm.) Bicycles (including electrical bicycles),
			electrical scooters, mopeds and similar vehicles are not permitted on the
			Ferry. Pets are not allowed on board the Ferry. Guide dogs and service
			dogs for personal assistance of passengers with disabilities may always be
			brought free of charge. There is no need to reserve a space for them. A
			guide dog or service dog may be placed on the floor next to the passenger.
			<span class="sub-heading"> Booking fee </span>
			Where applicable, the booking fee will be specified on the ticket. AFF does
			not charge any booking fee for tickets purchased on our website www.splitexpress.com
			if you buy your ticket from an agent or in the ports prices can vary.
			<span class="sub-heading"> Personal tickets </span>
			A personal ticket may only be used by the person identified on the ticket.
			You must be able to show valid ID** on the Ferry. Without valid ID a passenger
			may be deemed to not have a valid ticket. Personal tickets may not be transferred
			or resold to anyone else. CREDIT REPORTING When you buy a ticket on our website
			www.splitexpress.com we transfer your debt from us to a business partner. For
			this reason, a credit report may be obtained regarding the person identified
			as responsible for payment of the purchase. PERSONAL DATA AFF Ltd is the data
			controller for the processing of the passenger’s personal data. Further details
			about how we process personal data under data protection legislation are available
			in our privacy policy on www.splitexpress.com
		</p>
	</div>
</div>

<style>
	/* TODO Move this header to blue layout too? 
	Wanted a customisable one but i guess its probs not needed */
	h1 {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 400;
		font-size: 32px;
		line-height: 42px;
		display: flex;
		align-items: center;
		color: #ffffff;
	}
	.terms-and-conditions {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.body {
		margin: 0 auto;
		font-family: 'Montserrat';
		font-size: 21px;
		font-weight: 500;
		line-height: 39px;
	}
	.terms-header {
		font-family: 'Montserrat';
		font-size: 24px;
		font-weight: 700;
		line-height: 39px;
		margin-top: 35px;
		text-align: start;
	}
	.sub-heading {
		display: block;
		font-weight: 600;
		font-size: 20px;
		margin-top: 18px;
	}
</style>
