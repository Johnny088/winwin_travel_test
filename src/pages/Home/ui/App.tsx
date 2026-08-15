import { FilterModal } from '@components/FilterModal/FilterModal'

export const App = () => {
	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center  ">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-6xl text-gray-600 mb-12">
				WinWinTravel frontend test task
			</h1>

			<FilterModal />
		</section>
	)
}
