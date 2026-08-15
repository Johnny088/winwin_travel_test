import { FilterModal } from '@/components/FilterModal/FilterModal'
import {
	selectIsModalOpen,
	selectSetModalState,
	useFilterStore
} from '@/stores/filterStore'

export const App = () => {
	const isModalOpen = useFilterStore(selectIsModalOpen)
	const setIsModalOpen = useFilterStore(selectSetModalState)
	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center  ">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1
				className="text-6xl text-gray-600 mb-12 cursor-pointer"
				onClick={() => setIsModalOpen(true)}
			>
				WinWinTravel frontend test task
			</h1>

			{isModalOpen && <FilterModal />}
		</section>
	)
}
