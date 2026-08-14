export const FilterModal = () => {
	const fieldsetClass = 'border-b pb-6 mb-8 flex flex-wrap gap-y-4'
	const labelClass = 'flex w-1/3'
	const legentClass = 'mb-6'
	const inputClass = 'me-4'
	const formHandler = (values: FormData) => {
		const preminaryFilters = values.getAll('preliminaryFilter')
		const popularFilters = values.getAll('popularFilters')
		const amenitiesBase = values.getAll('amenities')
		const amenitiesDisabilities = values.getAll('amenitiesDisabilities')
		const roomFacilities = values.getAll('roomFacilities')
		const nutrition = values.getAll('nutrition')
		const reservation = values.getAll('reservation')
		const prepayment = values.getAll('prepayment')
		const payment = values.getAll('payment')
		const specialOffers = values.getAll('specialOffers')
	}
	return (
		<div className="flex flex-col w-7xl p-8 m-auto">
			<h1 className="text-center border-b pb-6 mb-8 mx-8">Filter</h1>
			<form
				className="mx-8"
				action={formHandler}
			>
				<fieldset className={fieldsetClass}>
					<legend className={legentClass}>Preliminary filter</legend>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="preliminaryFilter"
							value="Distance to the center 1 km"
							className={inputClass}
						/>
						Distance to the center 1 km
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="preliminaryFilter"
							value="guestRating 9+"
							className={inputClass}
						/>
						Guest rating 9+
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="preliminaryFilter"
							value="hotels"
							className={inputClass}
						/>
						Hotels
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="preliminaryFilter"
							value="Distance to the center 3 km"
							className={inputClass}
						/>
						Distance to the center 3 km
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="preliminaryFilter"
							value="5 stars"
							className={inputClass}
						/>
						5 stars
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="preliminaryFilter"
							value="Breakfast is included"
							className={inputClass}
						/>
						Breakfast is included
					</label>
				</fieldset>
				<fieldset className={fieldsetClass}>
					<legend className={legentClass}>Popular filters</legend>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="popularFilters"
							value="5 stars"
							className={inputClass}
						/>
						5 stars
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="popularFilters"
							value="Breakfast is included"
							className={inputClass}
						/>
						Breakfast is included
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="popularFilters"
							value="Free booking"
							className={inputClass}
						/>
						Free booking
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="popularFilters"
							value="4 stars"
							className={inputClass}
						/>
						4 stars
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="popularFilters"
							value="Distance to the center 3 km"
							className={inputClass}
						/>
						Free booking
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="popularFilters"
							value="Guest rating 8+"
							className={inputClass}
						/>
						Free booking
					</label>
				</fieldset>
				<fieldset className={fieldsetClass}>
					<legend className={legentClass}>
						Amenities of the accommodation facility
					</legend>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Transfer to/from the hotel"
							className={inputClass}
						/>
						Transfer to/from the hotel
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Breakfast included"
							className={inputClass}
						/>
						Breakfast included
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Smoking area"
							className={inputClass}
						/>
						Smoking area
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Round-the-clock reception"
							className={inputClass}
						/>
						Round-the-clock reception
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Restaurant"
							className={inputClass}
						/>
						Restaurant
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Children's playground"
							className={inputClass}
						/>
						Children's playground
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Early check-in"
							className={inputClass}
						/>
						Early check-in
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Swimming pool"
							className={inputClass}
						/>
						Swimming pool
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Internet"
							className={inputClass}
						/>
						Internet
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Late check-in"
							className={inputClass}
						/>
						Late check-in
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Spa center/sauna"
							className={inputClass}
						/>
						Spa center/sauna
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Security"
							className={inputClass}
						/>
						Security
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Pets are allowed"
							className={inputClass}
						/>
						Pets are allowed
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Gym/fitness room"
							className={inputClass}
						/>
						Gym/fitness room
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Lift"
							className={inputClass}
						/>
						Lift
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Parking"
							className={inputClass}
						/>
						Parking
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Conference rooms"
							className={inputClass}
						/>
						Conference rooms
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenities"
							value="Eco-responsibility"
							className={inputClass}
						/>
						Eco-responsibility
					</label>
				</fieldset>
				<fieldset className={fieldsetClass}>
					<legend className={legentClass}>
						Amenities for people with disabilities
					</legend>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenitiesDisabilities"
							value="Entrance without steps"
							className={inputClass}
						/>
						Entrance without steps
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenitiesDisabilities"
							value="Parking"
							className={inputClass}
						/>
						Parking
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenitiesDisabilities"
							value="Lift"
							className={inputClass}
						/>
						Lift
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenitiesDisabilities"
							value="Entrance 81 cm wide"
							className={inputClass}
						/>
						Entrance 81 cm wide
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenitiesDisabilities"
							value="Availability of a ramp"
							className={inputClass}
						/>
						Availability of a ramp
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="amenitiesDisabilities"
							value="Handrails"
							className={inputClass}
						/>
						Handrails
					</label>
				</fieldset>
				<fieldset className={fieldsetClass}>
					<legend className={legentClass}>Room facilities</legend>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Bath"
							className={inputClass}
						/>
						Bath
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Kitchen"
							className={inputClass}
						/>
						Kitchen
					</label>
					<label>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Underfloor heating"
							className={inputClass}
						/>
						Underfloor heating
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Shower"
							className={inputClass}
						/>
						Shower
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Air Conditioning"
							className={inputClass}
						/>
						Air Conditioning
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Pets allowed"
							className={inputClass}
						/>
						Pets allowed
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Coffee machine"
							className={inputClass}
						/>
						Coffee machine
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Iron"
							className={inputClass}
						/>
						Iron
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Baby bed"
							className={inputClass}
						/>
						Baby bed
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Kettle"
							className={inputClass}
						/>
						Kettle
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Internet"
							className={inputClass}
						/>
						Internet
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Balcony"
							className={inputClass}
						/>
						Balcony
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Fridge"
							className={inputClass}
						/>
						Fridge
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="roomFacilities"
							value="Workplace"
							className={inputClass}
						/>
						Workplace
					</label>
				</fieldset>
				<fieldset className={fieldsetClass}>
					<legend className={legentClass}>Nutrition</legend>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="nutrition"
							value="Room without meals"
							className={inputClass}
						/>
						Room without meals
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="nutrition"
							value="Breakfast and dinner"
							className={inputClass}
						/>
						Breakfast and dinner
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="nutrition"
							value="All inclusive"
							className={inputClass}
						/>
						All inclusive
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="nutrition"
							value="Breakfast included"
							className={inputClass}
						/>
						Breakfast included
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="nutrition"
							value="Breakfast, lunch, dinner"
							className={inputClass}
						/>
						Breakfast, lunch, dinner
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="nutrition"
							value="Ultra all inclusive"
							className={inputClass}
						/>
						Ultra all inclusive
					</label>
				</fieldset>
				<fieldset className={fieldsetClass}>
					<legend className={legentClass}>
						Reservation cancellation policy
					</legend>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="reservation"
							value="Free cancellation before check-in"
							className={inputClass}
						/>
						Free cancellation before check-in
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="reservation"
							value="Free cancellation one week before check-in"
							className={inputClass}
						/>
						Free cancellation one week before check-in
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="reservation"
							value="Free cancellation up to 3 days before check-in"
							className={inputClass}
						/>
						Free cancellation up to 3 days before check-in
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="reservation"
							value="No possibility of cancellation"
							className={inputClass}
						/>
						No possibility of cancellation
					</label>
				</fieldset>
				<fieldset className={fieldsetClass}>
					<legend className={legentClass}>Prepayment</legend>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="prepayment"
							value="Booking without a credit card"
							className={inputClass}
						/>
						Booking without a credit card
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="prepayment"
							value="Partial prepayment"
							className={inputClass}
						/>
						Partial prepayment
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="prepayment"
							value="Booking without prepayment"
							className={inputClass}
						/>
						Booking without prepayment
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="prepayment"
							value="Full prepayment"
							className={inputClass}
						/>
						Full prepayment
					</label>
				</fieldset>
				<fieldset className={fieldsetClass}>
					<legend className={legentClass}>Form of payment</legend>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="payment"
							value="Payment in cash"
							className={inputClass}
						/>
						Payment in cash
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="payment"
							value="Payment by card"
							className={inputClass}
						/>
						Payment by card
					</label>
				</fieldset>
				<fieldset className={fieldsetClass}>
					<legend className={legentClass}>Special offers and discounts</legend>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="specialOffers"
							value="Discounts of 50%"
							className={inputClass}
						/>
						Discounts of 50%
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="specialOffers"
							value="Hot offers"
							className={inputClass}
						/>
						Hot offers
					</label>
					<label className={labelClass}>
						<input
							type="checkbox"
							name="specialOffers"
							value="Cheap options for relocation"
							className={inputClass}
						/>
						Cheap options for relocation
					</label>
				</fieldset>
				<div className="flex">
					<button
						className=" ms-137 me-100"
						type="submit"
					>
						Apply
					</button>
					<button
						type="button"
						onClick={() => {}}
					>
						Clear all parameters
					</button>
				</div>
			</form>
		</div>
	)
}
