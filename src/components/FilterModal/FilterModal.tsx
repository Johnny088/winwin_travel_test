import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/query'
import { FilterType } from '@/shared/api/types/Filter'
import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import {
	selectIsConfirmModalOpen,
	selectResetFilters,
	selectSetConfirmModalState,
	selectSetModalState,
	useFilterStore
} from '@/stores/filterStore'

import { ConfirmModal } from '../ConfirmModal/ConfirmModal'

export const FilterModal = () => {
	const { t } = useTranslation('filter')
	const fieldsetClass = 'border-b pb-6 mb-8 flex flex-wrap gap-y-4'
	const labelClass = 'flex w-1/3'
	const labelTwoColls = 'flex w-1/2'
	const legentClass = 'mb-6'
	const inputClass = 'me-4'

	const [tempFilters, setTempFilters] = useState<SearchRequestFilter | []>([])

	const resetFilters = useFilterStore(selectResetFilters)
	const setIsModalOpen = useFilterStore(selectSetModalState)

	const isConfirmModalOpen = useFilterStore(selectIsConfirmModalOpen)
	const setConfirmModal = useFilterStore(selectSetConfirmModalState)

	const formHandler = (values: FormData) => {
		const uniqueKeys = Array.from(new Set(values.keys()))

		const data: SearchRequestFilter = uniqueKeys
			.map(id => ({
				id,
				type: FilterType.OPTION,
				optionsIds: values.getAll(id) as string[]
			}))
			.filter(filterItem => filterItem.optionsIds.length > 0)

		setTempFilters(data)
		setConfirmModal(true)
	}

	const formRef = useRef<HTMLFormElement>(null)

	const resetForm = () => {
		resetFilters()
		formRef.current?.reset()
	}

	const { data: currentFilters } = useQuery({
		queryKey: ['filters'],
		queryFn: async () => useFilterStore.getState().filters
	})

	const { mutate: clearFilters } = useMutation({
		mutationFn: async () => [],
		onSuccess() {
			resetForm()
			queryClient.setQueryData(['filters'], [])
		}
	})

	const isChecked = (groupId: string, optionId: string): boolean => {
		const value = currentFilters?.find(item => item.id === groupId)
		return value ? value.optionsIds.includes(optionId) : false
	}

	useEffect(() => {
		const keyDownHandler = (event: KeyboardEvent) => {
			if (event.code === 'Escape') {
				setIsModalOpen(false)
			}
		}
		document.addEventListener('keydown', keyDownHandler)

		return () => document.removeEventListener('keydown', keyDownHandler)
	}, [])

	return (
		<div className="flex justify-center fixed z-50 overflow-y-auto inset-0 backdrop-blur-xl bg-black/25">
			<div className="flex flex-col w-7xl  p-8  rounded-2xl mt-20  absolute bg-white">
				<h2 className="text-center border-b pb-6 mb-8 mx-8">
					{t('filterModal.filter')}
				</h2>
				<form
					ref={formRef}
					className="mx-8"
					action={formHandler}
				>
					<fieldset className={fieldsetClass}>
						<legend className={legentClass}>
							{t('filterModal.preliminaryFilter')}
						</legend>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="preliminaryFilter"
								defaultChecked={isChecked(
									'preliminaryFilter',
									'Distance to the center 1 km'
								)}
								value="Distance to the center 1 km"
								className={inputClass}
							/>
							{t('filterModal.distanceToCenter1km')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="preliminaryFilter"
								defaultChecked={isChecked(
									'preliminaryFilter',
									'Guest rating 9+'
								)}
								value="Guest rating 9+"
								className={inputClass}
							/>
							{t('filterModal.guestrating9Plus')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="preliminaryFilter"
								defaultChecked={isChecked('preliminaryFilter', 'Hotels')}
								value="Hotels"
								className={inputClass}
							/>
							{t('filterModal.hotels')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="preliminaryFilter"
								defaultChecked={isChecked(
									'preliminaryFilter',
									'Distance to the center 3 km'
								)}
								value="Distance to the center 3 km"
								className={inputClass}
							/>
							{t('filterModal.distanceToCenter3km')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="preliminaryFilter"
								defaultChecked={isChecked('preliminaryFilter', '5 stars')}
								value="5 stars"
								className={inputClass}
							/>
							{t('filterModal.fiveStars')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="preliminaryFilter"
								defaultChecked={isChecked(
									'preliminaryFilter',
									'Breakfast is included'
								)}
								value="Breakfast is included"
								className={inputClass}
							/>
							{t('filterModal.breakfastIsIncluded')}
						</label>
					</fieldset>
					<fieldset className={fieldsetClass}>
						<legend className={legentClass}>
							{t('filterModal.popularFilters')}
						</legend>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="popularFilters"
								defaultChecked={isChecked('popularFilters', '5 stars')}
								value="5 stars"
								className={inputClass}
							/>
							{t('filterModal.fiveStars')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="popularFilters"
								defaultChecked={isChecked(
									'popularFilters',
									'Breakfast is included'
								)}
								value="Breakfast is included"
								className={inputClass}
							/>
							{t('filterModal.breakfastIsIncluded')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="popularFilters"
								defaultChecked={isChecked('popularFilters', 'Free booking')}
								value="Free booking"
								className={inputClass}
							/>
							{t('filterModal.freeBooking')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="popularFilters"
								defaultChecked={isChecked('popularFilters', '4 stars')}
								value="4 stars"
								className={inputClass}
							/>
							{t('filterModal.fourStars')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="popularFilters"
								defaultChecked={isChecked(
									'popularFilters',
									'Distance to the center 3 km'
								)}
								value="Distance to the center 3 km"
								className={inputClass}
							/>
							{t('filterModal.distanceToCenter3km')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="popularFilters"
								defaultChecked={isChecked('popularFilters', 'Guest rating 8+')}
								value="Guest rating 8+"
								className={inputClass}
							/>
							{t('filterModal.guestRatingEightPlus')}
						</label>
					</fieldset>
					<fieldset className={fieldsetClass}>
						<legend className={legentClass}>
							{t('filterModal.amenitiesOfTheAccommodationFacility')}
						</legend>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked(
									'amenities',
									'Transfer to/from the hotel'
								)}
								value="Transfer to/from the hotel"
								className={inputClass}
							/>
							{t('filterModal.transferToFromTheHotel')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Breakfast included')}
								value="Breakfast included"
								className={inputClass}
							/>
							{t('filterModal.breakfastIncluded')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Smoking area')}
								value="Smoking area"
								className={inputClass}
							/>
							{t('filterModal.smokingArea')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked(
									'amenities',
									'Round-the-clock reception'
								)}
								value="Round-the-clock reception"
								className={inputClass}
							/>
							{t('filterModal.roundTheClockReception')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Restaurant')}
								value="Restaurant"
								className={inputClass}
							/>
							{t('filterModal.restaurant')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', "Children's playground")}
								value="Children's playground"
								className={inputClass}
							/>
							{t('filterModal.kidsPlayground')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Early check-in')}
								value="Early check-in"
								className={inputClass}
							/>
							{t('filterModal.earlyCheckIn')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Swimming pool')}
								value="Swimming pool"
								className={inputClass}
							/>
							{t('filterModal.swimmingPool')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Internet')}
								value="Internet"
								className={inputClass}
							/>
							{t('filterModal.internet')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Late check-in')}
								value="Late check-in"
								className={inputClass}
							/>
							{t('filterModal.lateCheckIn')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Spa center/sauna')}
								value="Spa center/sauna"
								className={inputClass}
							/>
							{t('filterModal.spa')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Security')}
								value="Security"
								className={inputClass}
							/>
							{t('filterModal.security')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Pets are allowed')}
								value="Pets are allowed"
								className={inputClass}
							/>
							{t('filterModal.petsAreAllowed')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Gym/fitness room')}
								value="Gym/fitness room"
								className={inputClass}
							/>
							{t('filterModal.gym')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Lift')}
								value="Lift"
								className={inputClass}
							/>
							{t('filterModal.lift')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Parking')}
								value="Parking"
								className={inputClass}
							/>
							{t('filterModal.parking')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Conference rooms')}
								value="Conference rooms"
								className={inputClass}
							/>
							{t('filterModal.conferenceRooms')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'Eco-responsibility')}
								value="Eco-responsibility"
								className={inputClass}
							/>
							{t('filterModal.ecoResponsibility')}
						</label>
					</fieldset>
					<fieldset className={fieldsetClass}>
						<legend className={legentClass}>
							{t('filterModal.amenitiesForPeopleWithDisabilities')}
						</legend>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenitiesDisabilities"
								defaultChecked={isChecked(
									'amenitiesDisabilities',
									'Entrance without steps'
								)}
								value="Entrance without steps"
								className={inputClass}
							/>
							{t('filterModal.entranceWithoutSteps')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenitiesDisabilities"
								defaultChecked={isChecked('amenitiesDisabilities', 'Parking')}
								value="Parking"
								className={inputClass}
							/>
							{t('filterModal.parking')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenitiesDisabilities"
								defaultChecked={isChecked('amenitiesDisabilities', 'Lift')}
								value="Lift"
								className={inputClass}
							/>
							{t('filterModal.lift')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenitiesDisabilities"
								defaultChecked={isChecked(
									'amenitiesDisabilities',
									'Entrance 81 cm wide'
								)}
								value="Entrance 81 cm wide"
								className={inputClass}
							/>
							{t('filterModal.entrance81CmWide')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenitiesDisabilities"
								defaultChecked={isChecked(
									'amenitiesDisabilities',
									'Availability of a ramp'
								)}
								value="Availability of a ramp"
								className={inputClass}
							/>
							{t('filterModal.availabilityOfRamp')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenitiesDisabilities"
								defaultChecked={isChecked('amenitiesDisabilities', 'Handrails')}
								value="Handrails"
								className={inputClass}
							/>
							{t('filterModal.handrails')}
						</label>
					</fieldset>
					<fieldset className={fieldsetClass}>
						<legend className={legentClass}>
							{t('filterModal.roomFacilities')}
						</legend>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'Bath')}
								value="Bath"
								className={inputClass}
							/>
							{t('filterModal.bath')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'Kitchen')}
								value="Kitchen"
								className={inputClass}
							/>
							{t('filterModal.kitchen')}
						</label>
						<label>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked(
									'roomFacilities',
									'Underfloor heating'
								)}
								value="Underfloor heating"
								className={inputClass}
							/>
							{t('filterModal.underfloorHeating')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'Shower')}
								value="Shower"
								className={inputClass}
							/>
							{t('filterModal.shower')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'Air Conditioning')}
								value="Air Conditioning"
								className={inputClass}
							/>
							{t('filterModal.airConditioning')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'Pets allowed')}
								value="Pets allowed"
								className={inputClass}
							/>
							{t('filterModal.petsAllowedSecondOption')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'Coffee machine')}
								value="Coffee machine"
								className={inputClass}
							/>
							{t('filterModal.coffeeMachine')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'Iron')}
								value="Iron"
								className={inputClass}
							/>
							{t('filterModal.iron')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'Baby bed')}
								value="Baby bed"
								className={inputClass}
							/>
							{t('filterModal.babyBed')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'Kettle')}
								value="Kettle"
								className={inputClass}
							/>
							{t('filterModal.kettle')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'Internet')}
								value="Internet"
								className={inputClass}
							/>
							{t('filterModal.internet')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'Balcony')}
								value="Balcony"
								className={inputClass}
							/>
							{t('filterModal.balcony')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'Fridge')}
								value="Fridge"
								className={inputClass}
							/>
							{t('filterModal.fridge')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'Workplace')}
								value="Workplace"
								className={inputClass}
							/>
							{t('filterModal.workplace')}
						</label>
					</fieldset>
					<fieldset className={fieldsetClass}>
						<legend className={legentClass}>
							{t('filterModal.roomForPeopleWithDisabilities')}
						</legend>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomWithDisabilities"
								defaultChecked={isChecked(
									'roomWithDisabilities',
									'Main door entrance width 81 cm'
								)}
								value="Main door entrance width 81 cm"
								className={inputClass}
							/>
							{t('filterModal.entranceWide81')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomWithDisabilities"
								defaultChecked={isChecked(
									'roomWithDisabilities',
									'Handrail in the shower'
								)}
								value="Handrail in the shower"
								className={inputClass}
							/>
							{t('filterModal.handrailInShower')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomWithDisabilities"
								defaultChecked={isChecked(
									'roomWithDisabilities',
									'High toilet bowl'
								)}
								value="High toilet bowl"
								className={inputClass}
							/>
							{t('filterModal.highToiletBowl')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomWithDisabilities"
								defaultChecked={isChecked(
									'roomWithDisabilities',
									'Interior door width 81 cm'
								)}
								value="Interior door width 81 cm"
								className={inputClass}
							/>
							{t('filterModal.doorWide81')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomWithDisabilities"
								defaultChecked={isChecked(
									'roomWithDisabilities',
									'Bath/shower chair'
								)}
								value="Bath/shower chair"
								className={inputClass}
							/>
							{t('filterModal.showerChair')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomWithDisabilities"
								defaultChecked={isChecked(
									'roomWithDisabilities',
									'Emergency cord in the bathroom'
								)}
								value="Emergency cord in the bathroom"
								className={inputClass}
							/>
							{t('filterModal.emergencyCord')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomWithDisabilities"
								defaultChecked={isChecked(
									'roomWithDisabilities',
									'Handrail near the toilet'
								)}
								value="Handrail near the toilet"
								className={inputClass}
							/>
							{t('filterModal.handrailNearToilet')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomWithDisabilities"
								defaultChecked={isChecked(
									'roomWithDisabilities',
									'Low washbasin'
								)}
								value="Low washbasin"
								className={inputClass}
							/>
							{t('filterModal.lowWashbasin')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomWithDisabilities"
								defaultChecked={isChecked(
									'roomWithDisabilities',
									'Emergency cord by the bedside'
								)}
								value="Emergency cord by the bedside"
								className={inputClass}
							/>
							{t('filterModal.emergencyCordBedside')}
						</label>
					</fieldset>
					<fieldset className={fieldsetClass}>
						<legend className={legentClass}>
							{t('filterModal.nutrition')}
						</legend>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="nutrition"
								defaultChecked={isChecked('nutrition', 'Room without meals')}
								value="Room without meals"
								className={inputClass}
							/>
							{t('filterModal.roomWithoutMeals')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="nutrition"
								defaultChecked={isChecked('nutrition', 'Breakfast and dinner')}
								value="Breakfast and dinner"
								className={inputClass}
							/>
							{t('filterModal.breakfastAndDinner')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="nutrition"
								defaultChecked={isChecked('nutrition', 'All inclusive')}
								value="All inclusive"
								className={inputClass}
							/>
							{t('filterModal.allInclusive')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="nutrition"
								defaultChecked={isChecked('nutrition', 'Breakfast included')}
								value="Breakfast included"
								className={inputClass}
							/>
							{t('filterModal.breakfastIncluded')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="nutrition"
								defaultChecked={isChecked(
									'nutrition',
									'Breakfast, lunch, dinner'
								)}
								value="Breakfast, lunch, dinner"
								className={inputClass}
							/>
							{t('filterModal.breakfastLunchDinner')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="nutrition"
								defaultChecked={isChecked('nutrition', 'Ultra all inclusive')}
								value="Ultra all inclusive"
								className={inputClass}
							/>
							{t('filterModal.ultraAllInclusive')}
						</label>
					</fieldset>
					<fieldset className={fieldsetClass}>
						<legend className={legentClass}>
							{t('filterModal.reservationCancellationPolicy')}
						</legend>
						<label className={labelTwoColls}>
							<input
								type="checkbox"
								name="reservation"
								defaultChecked={isChecked(
									'reservation',
									'Free cancellation before check-in'
								)}
								value="Free cancellation before check-in"
								className={inputClass}
							/>
							{t('filterModal.cancellationFree')}
						</label>
						<label className={labelTwoColls}>
							<input
								type="checkbox"
								name="reservation"
								defaultChecked={isChecked(
									'reservation',
									'Free cancellation one week before check-in'
								)}
								value="Free cancellation one week before check-in"
								className={inputClass}
							/>
							{t('filterModal.cancellationOneWeekFree')}
						</label>
						<label className={labelTwoColls}>
							<input
								type="checkbox"
								name="reservation"
								defaultChecked={isChecked(
									'reservation',
									'Free cancellation up to 3 days before check-in'
								)}
								value="Free cancellation up to 3 days before check-in"
								className={inputClass}
							/>
							{t('filterModal.cancellationThreeDaysFree')}
						</label>
						<label className={labelTwoColls}>
							<input
								type="checkbox"
								name="reservation"
								defaultChecked={isChecked(
									'reservation',
									'No possibility of cancellation'
								)}
								value="No possibility of cancellation"
								className={inputClass}
							/>
							{t('filterModal.cancellationNotAllowed')}
						</label>
					</fieldset>
					<fieldset className={fieldsetClass}>
						<legend className={legentClass}>
							{t('filterModal.prepayment')}
						</legend>
						<label className={labelTwoColls}>
							<input
								type="checkbox"
								name="prepayment"
								defaultChecked={isChecked(
									'prepayment',
									'Booking without a credit card'
								)}
								value="Booking without a credit card"
								className={inputClass}
							/>
							{t('filterModal.bookingWithoutCreditCard')}
						</label>
						<label className={labelTwoColls}>
							<input
								type="checkbox"
								name="prepayment"
								defaultChecked={isChecked('prepayment', 'Partial prepayment')}
								value="Partial prepayment"
								className={inputClass}
							/>
							{t('filterModal.partialPrepayment')}
						</label>
						<label className={labelTwoColls}>
							<input
								type="checkbox"
								name="prepayment"
								defaultChecked={isChecked(
									'prepayment',
									'Booking without prepayment'
								)}
								value="Booking without prepayment"
								className={inputClass}
							/>
							{t('filterModal.bookingWithoutPrepayment')}
						</label>
						<label className={labelTwoColls}>
							<input
								type="checkbox"
								name="prepayment"
								defaultChecked={isChecked('prepayment', 'Full prepayment')}
								value="Full prepayment"
								className={inputClass}
							/>
							{t('filterModal.fullPrepayment')}
						</label>
					</fieldset>
					<fieldset className={fieldsetClass}>
						<legend className={legentClass}>
							{' '}
							{t('filterModal.formOfPayment')}
						</legend>
						<label className="w-full">
							<input
								type="checkbox"
								name="payment"
								defaultChecked={isChecked('payment', 'Payment in cash')}
								value="Payment in cash"
								className={inputClass}
							/>
							{t('filterModal.paymentInCash')}
						</label>
						<label className="w-full">
							<input
								type="checkbox"
								name="payment"
								defaultChecked={isChecked('payment', 'Payment by card')}
								value="Payment by card"
								className={inputClass}
							/>
							{t('filterModal.paymentByCard')}
						</label>
					</fieldset>
					<fieldset className={fieldsetClass}>
						<legend className={legentClass}>
							{' '}
							{t('filterModal.specialOffersAndDiscounts')}
						</legend>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="specialOffers"
								defaultChecked={isChecked('specialOffers', 'Discounts of 50%')}
								value="Discounts of 50%"
								className={inputClass}
							/>
							{t('filterModal.discountsFiftyPersents')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="specialOffers"
								defaultChecked={isChecked('specialOffers', 'Hot offers')}
								value="Hot offers"
								className={inputClass}
							/>
							{t('filterModal.hotOffers')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="specialOffers"
								defaultChecked={isChecked(
									'specialOffers',
									'Cheap options for relocation'
								)}
								value="Cheap options for relocation"
								className={inputClass}
							/>
							{t('filterModal.cheapOptionsForRelocation')}
						</label>
					</fieldset>
					<div className="flex">
						<button
							className="ms-96 me-100 px-17 py-6 bg-[#FF5F00] text-white rounded-2xl font-['Inter'] font-semibold
							text-[16px] hover:cursor-pointer hover:bg-amber-500 duration-300"
							type="submit"
						>
							{t('filterModal.apply')}
						</button>
						<button
							type="button"
							onClick={() => clearFilters()}
							className="text-[#078691] text-[16px] font-medium decoration-solid hover:cursor-pointer"
						>
							{t('filterModal.clearAll')}
						</button>
					</div>
				</form>
				{isConfirmModalOpen && <ConfirmModal data={tempFilters} />}
			</div>
		</div>
	)
}
