import { create } from 'zustand'

import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

interface FilterStore {
	filters: SearchRequestFilter | []
	setFilters: (filters: SearchRequestFilter) => void
	resetFilters: () => void
	isModalOpen: boolean
	setModalState: (value: boolean) => void
}

export const useFilterStore = create<FilterStore>()(set => ({
	filters: [],
	setFilters: (value: SearchRequestFilter) => set({ filters: value }),
	resetFilters: () => set({ filters: [] }),
	isModalOpen: false,
	setModalState: (value: boolean) => set({ isModalOpen: value })
}))

export const selectFilters = (state: FilterStore) => state.filters

export const selectSetFilters = (state: FilterStore) => state.setFilters

export const selectResetFilters = (state: FilterStore) => state.resetFilters

export const selectIsModalOpen = (state: FilterStore) => state.isModalOpen

export const selectSetModalState = (state: FilterStore) => state.setModalState
