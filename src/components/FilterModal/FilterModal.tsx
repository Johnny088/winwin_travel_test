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
	selectSetFilters,
	selectSetModalState,
	selectSetTempFilters,
	selectTempFilters,
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

	const setFilters = useFilterStore(selectSetFilters)
	const resetFilters = useFilterStore(selectResetFilters)
	const setIsModalOpen = useFilterStore(selectSetModalState)

	const isConfirmModalOpen = useFilterStore(selectIsConfirmModalOpen)
	const setConfirmModal = useFilterStore(selectSetConfirmModalState)
	// const tempFilters = useFilterStore(selectTempFilters)
	// const setTempFilters = useFilterStore(selectSetTempFilters)

	const formHandler = (values: FormData) => {
		const uniqueKeys = Array.from(new Set(values.keys()))

		const data: SearchRequestFilter = uniqueKeys
			.map(id => ({
				id,
				type: FilterType.OPTION,
				optionsIds: values.getAll(id) as string[]
			}))
			.filter(filterItem => filterItem.optionsIds.length > 0)

		// console.log(data)
		// setFilters(data)

		setTempFilters(data)
		setConfirmModal(true)
		// queryClient.setQueryData(['filters'], data)

		// setIsModalOpen(false)
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
								defaultChecked={isChecked('preliminaryFilter', 'dist1km')}
								value="dist1km"
								className={inputClass}
							/>
							{t('filterModal.distanceToCenter1km')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="preliminaryFilter"
								defaultChecked={isChecked('preliminaryFilter', 'rating9+')}
								value="rating9+"
								className={inputClass}
							/>
							{t('filterModal.guestrating9Plus')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="preliminaryFilter"
								defaultChecked={isChecked('preliminaryFilter', 'hotels')}
								value="hotels"
								className={inputClass}
							/>
							{t('filterModal.hotels')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="preliminaryFilter"
								defaultChecked={isChecked('preliminaryFilter', 'dist3km')}
								value="dist3km"
								className={inputClass}
							/>
							{t('filterModal.distanceToCenter3km')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="preliminaryFilter"
								defaultChecked={isChecked('preliminaryFilter', 'fiveStars')}
								value="fiveStars"
								className={inputClass}
							/>
							{t('filterModal.fiveStars')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="preliminaryFilter"
								defaultChecked={isChecked('preliminaryFilter', 'hasBreakfast')}
								value="hasBreakfast"
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
								defaultChecked={isChecked('popularFilters', 'fiveStars')}
								value="fiveStars"
								className={inputClass}
							/>
							{t('filterModal.fiveStars')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="popularFilters"
								defaultChecked={isChecked('popularFilters', 'hasBreakfast')}
								value="hasBreakfast"
								className={inputClass}
							/>
							{t('filterModal.breakfastIsIncluded')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="popularFilters"
								defaultChecked={isChecked('popularFilters', 'freeBooking')}
								value="freeBooking"
								className={inputClass}
							/>
							{t('filterModal.freeBooking')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="popularFilters"
								defaultChecked={isChecked('popularFilters', 'fourStars')}
								value="fourStars"
								className={inputClass}
							/>
							{t('filterModal.fourStars')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="popularFilters"
								defaultChecked={isChecked('popularFilters', '4stars')}
								value="dist_3km"
								className={inputClass}
							/>
							{t('filterModal.distanceToCenter3km')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="popularFilters"
								defaultChecked={isChecked('popularFilters', 'rating8+')}
								value="rating8+"
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
								defaultChecked={isChecked('amenities', 'hasTransfer')}
								value="hasTransfer"
								className={inputClass}
							/>
							{t('filterModal.transferToFromTheHotel')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'hasBreakfast')}
								value="hasBreakfast"
								className={inputClass}
							/>
							{t('filterModal.breakfastIncluded')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'SmokingArea')}
								value="SmokingArea"
								className={inputClass}
							/>
							{t('filterModal.smokingArea')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', '24hReception')}
								value="24hReception"
								className={inputClass}
							/>
							{t('filterModal.roundTheClockReception')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'restaurant')}
								value="restaurant"
								className={inputClass}
							/>
							{t('filterModal.restaurant')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'kidsPlayground')}
								value="kidsPlayground"
								className={inputClass}
							/>
							{t('filterModal.kidsPlayground')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'earlyCheckIn')}
								value="earlyCheckIn"
								className={inputClass}
							/>
							{t('filterModal.earlyCheckIn')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'swimmingPool')}
								value="swimmingPool"
								className={inputClass}
							/>
							{t('filterModal.swimmingPool')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'internet')}
								value="internet"
								className={inputClass}
							/>
							{t('filterModal.internet')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'lateCheckIn')}
								value="lateCheckIn"
								className={inputClass}
							/>
							{t('filterModal.lateCheckIn')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'spa')}
								value="spa"
								className={inputClass}
							/>
							{t('filterModal.spa')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'security')}
								value="security"
								className={inputClass}
							/>
							{t('filterModal.security')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'isPetsAllowed')}
								value="isPetsAllowed"
								className={inputClass}
							/>
							{t('filterModal.petsAreAllowed')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'gym')}
								value="gym"
								className={inputClass}
							/>
							{t('filterModal.gym')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'lift')}
								value="lift"
								className={inputClass}
							/>
							{t('filterModal.lift')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'parking')}
								value="parking"
								className={inputClass}
							/>
							{t('filterModal.parking')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'conferenceRooms')}
								value="conferenceRooms"
								className={inputClass}
							/>
							{t('filterModal.conferenceRooms')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenities"
								defaultChecked={isChecked('amenities', 'ecoResponsibility')}
								value="ecoResponsibility"
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
									'entranceWithoutSteps'
								)}
								value="entranceWithoutSteps"
								className={inputClass}
							/>
							{t('filterModal.entranceWithoutSteps')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenitiesDisabilities"
								defaultChecked={isChecked('amenitiesDisabilities', 'parking')}
								value="parking"
								className={inputClass}
							/>
							{t('filterModal.parking')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenitiesDisabilities"
								defaultChecked={isChecked('amenitiesDisabilities', 'lift')}
								value="lift"
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
									'EntranceEightyOnewide'
								)}
								value="EntranceEightyOnewide"
								className={inputClass}
							/>
							{t('filterModal.entrance81CmWide')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenitiesDisabilities"
								defaultChecked={isChecked('amenitiesDisabilities', 'ramp')}
								value="ramp"
								className={inputClass}
							/>
							{t('filterModal.availabilityOfRamp')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="amenitiesDisabilities"
								defaultChecked={isChecked('amenitiesDisabilities', 'handrails')}
								value="handrails"
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
								defaultChecked={isChecked('roomFacilities', 'bath')}
								value="bath"
								className={inputClass}
							/>
							{t('filterModal.bath')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'kitchen')}
								value="kitchen"
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
									'underfloorHeating'
								)}
								value="underfloorHeating"
								className={inputClass}
							/>
							{t('filterModal.underfloorHeating')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'shower')}
								value="shower"
								className={inputClass}
							/>
							{t('filterModal.shower')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'airConditioning')}
								value="airConditioning"
								className={inputClass}
							/>
							{t('filterModal.airConditioning')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'petsAllowed')}
								value="petsAllowed"
								className={inputClass}
							/>
							{t('filterModal.petsAllowedSecondOption')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'coffeeMachine')}
								value="coffeeMachine"
								className={inputClass}
							/>
							{t('filterModal.coffeeMachine')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'iron')}
								value="iron"
								className={inputClass}
							/>
							{t('filterModal.iron')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'babyBed')}
								value="babyBed"
								className={inputClass}
							/>
							{t('filterModal.babyBed')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'kettle')}
								value="kettle"
								className={inputClass}
							/>
							{t('filterModal.kettle')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'internet')}
								value="internet"
								className={inputClass}
							/>
							{t('filterModal.internet')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'balcony')}
								value="balcony"
								className={inputClass}
							/>
							{t('filterModal.balcony')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'fridge')}
								value="fridge"
								className={inputClass}
							/>
							{t('filterModal.fridge')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomFacilities"
								defaultChecked={isChecked('roomFacilities', 'workplace')}
								value="workplace"
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
									'entranceWide81'
								)}
								value="entranceWide81"
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
									'handrailInShower'
								)}
								value="handrailInShower"
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
									'highToiletBowl'
								)}
								value="highToiletBowl"
								className={inputClass}
							/>
							{t('filterModal.highToiletBowl')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="roomWithDisabilities"
								defaultChecked={isChecked('roomWithDisabilities', 'doorWide81')}
								value="doorWide81"
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
									'showerChair'
								)}
								value="showerChair"
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
									'emergencyCord'
								)}
								value="emergencyCord"
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
									'handrailNearToilet'
								)}
								value="handrailNearToilet"
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
									'lowWashbasin'
								)}
								value="lowWashbasin"
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
									'emergencyCordBedside'
								)}
								value="emergencyCordBedside"
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
								defaultChecked={isChecked('nutrition', 'withoutMeal')}
								value="withoutMeal"
								className={inputClass}
							/>
							{t('filterModal.roomWithoutMeals')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="nutrition"
								defaultChecked={isChecked('nutrition', 'BreakfastAndDinner')}
								value="BreakfastAndDinner"
								className={inputClass}
							/>
							{t('filterModal.breakfastAndDinner')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="nutrition"
								defaultChecked={isChecked('nutrition', 'allInclusive')}
								value="allInclusive"
								className={inputClass}
							/>
							{t('filterModal.allInclusive')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="nutrition"
								defaultChecked={isChecked('nutrition', 'breakfastIncluded')}
								value="breakfastIncluded"
								className={inputClass}
							/>
							{t('filterModal.breakfastIncluded')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="nutrition"
								defaultChecked={isChecked('nutrition', 'BreakfastLunchDinner')}
								value="BreakfastLunchDinner"
								className={inputClass}
							/>
							{t('filterModal.breakfastLunchDinner')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="nutrition"
								defaultChecked={isChecked('nutrition', 'ultraAllInclusive')}
								value="ultraAllInclusive"
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
								defaultChecked={isChecked('reservation', 'cancellationFree')}
								value="cancellationFree"
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
									'cancellationOneWeekFree'
								)}
								value="cancellationOneWeekFree"
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
									'cancellationThreeDaysFree'
								)}
								value="cancellationThreeDaysFree"
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
									'cancellationNotAllowed'
								)}
								value="cancellationNotAllowed"
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
								defaultChecked={isChecked('prepayment', 'withoutCreditCard')}
								value="withoutCreditCard"
								className={inputClass}
							/>
							{t('filterModal.bookingWithoutCreditCard')}
						</label>
						<label className={labelTwoColls}>
							<input
								type="checkbox"
								name="prepayment"
								defaultChecked={isChecked('prepayment', 'partialPrepayment')}
								value="partialPrepayment"
								className={inputClass}
							/>
							{t('filterModal.partialPrepayment')}
						</label>
						<label className={labelTwoColls}>
							<input
								type="checkbox"
								name="prepayment"
								defaultChecked={isChecked('prepayment', 'withoutPrepayment')}
								value="withoutPrepayment"
								className={inputClass}
							/>
							{t('filterModal.bookingWithoutPrepayment')}
						</label>
						<label className={labelTwoColls}>
							<input
								type="checkbox"
								name="prepayment"
								defaultChecked={isChecked('prepayment', 'fullPrepayment')}
								value="fullPrepayment"
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
								defaultChecked={isChecked('payment', 'paymentInCash')}
								value="paymentInCash"
								className={inputClass}
							/>
							{t('filterModal.paymentInCash')}
						</label>
						<label className="w-full">
							<input
								type="checkbox"
								name="payment"
								defaultChecked={isChecked('payment', 'paymentByCard')}
								value="paymentByCard"
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
								defaultChecked={isChecked(
									'specialOffers',
									'discountsFiftyPersents'
								)}
								value="discountsFiftyPersents"
								className={inputClass}
							/>
							{t('filterModal.discountsFiftyPersents')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="specialOffers"
								defaultChecked={isChecked('specialOffers', 'hotOffers')}
								value="hotOffers"
								className={inputClass}
							/>
							{t('filterModal.hotOffers')}
						</label>
						<label className={labelClass}>
							<input
								type="checkbox"
								name="specialOffers"
								defaultChecked={isChecked('specialOffers', 'cheapRelocation')}
								value="cheapRelocation"
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
