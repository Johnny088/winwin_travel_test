import { useTranslation } from 'react-i18next'

import { FilterModal } from '@/components/FilterModal/FilterModal'
import {
	selectFilters,
	selectIsModalOpen,
	selectSetModalState,
	useFilterStore
} from '@/stores/filterStore'

export const App = () => {
	const { t } = useTranslation('filter')

	const isModalOpen = useFilterStore(selectIsModalOpen)
	const setIsModalOpen = useFilterStore(selectSetModalState)
	const currentFilters = useFilterStore(selectFilters)
	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center  ">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1
				className="text-6xl text-gray-600 mb-12 cursor-pointer"
				onClick={() => setIsModalOpen(true)}
			>
				{t('mainPage.titleButton')}
			</h1>
			{currentFilters && (
				<pre className="bg-gray-100 p-4  text-sm overflow-auto max-w-2xl w-full rounded-2xl">
					{JSON.stringify(currentFilters, null, 2)}
				</pre>
			)}
			{isModalOpen && <FilterModal />}
		</section>
	)
}
