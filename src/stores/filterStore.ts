import { create } from 'zustand'

import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

interface FilterStore {
	filters: SearchRequestFilter | []
	setFilters: (filters: SearchRequestFilter) => void
	resetFilters: () => void
	isModalOpen: boolean
	setModalState: (value: boolean) => void
	isConfirmModalOpen: boolean
	setIsConfirmModalOpen: (value: boolean) => void
	tempFilters: SearchRequestFilter | []
	setTempFilters: (value: SearchRequestFilter) => void
}

export const useFilterStore = create<FilterStore>()(set => ({
	filters: [],
	setFilters: (value: SearchRequestFilter) => set({ filters: value }),
	resetFilters: () => set({ filters: [] }),
	isModalOpen: false,
	setModalState: (value: boolean) => set({ isModalOpen: value }),
	isConfirmModalOpen: false,
	setIsConfirmModalOpen: (value: boolean) => set({ isConfirmModalOpen: value }),
	tempFilters: [],
	setTempFilters: (value: SearchRequestFilter) => set({ tempFilters: value })
}))

export const selectFilters = (state: FilterStore) => state.filters

export const selectSetFilters = (state: FilterStore) => state.setFilters

export const selectResetFilters = (state: FilterStore) => state.resetFilters

export const selectIsModalOpen = (state: FilterStore) => state.isModalOpen

export const selectSetModalState = (state: FilterStore) => state.setModalState

export const selectIsConfirmModalOpen = (state: FilterStore) =>
	state.isConfirmModalOpen

export const selectSetConfirmModalState = (state: FilterStore) =>
	state.setIsConfirmModalOpen

export const selectTempFilters = (state: FilterStore) => state.tempFilters

export const selectSetTempFilters = (state: FilterStore) => state.setTempFilters
