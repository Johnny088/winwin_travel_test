import { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { queryClient } from '@/query'
import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import {
	selectSetConfirmModalState,
	selectSetFilters,
	selectSetModalState,
	useFilterStore
} from '@/stores/filterStore'

interface Props {
	data: SearchRequestFilter
}

export const ConfirmModal = ({ data }: Props) => {
	const setIsModalOpen = useFilterStore(selectSetModalState)
	const setIsConfirmModalOpen = useFilterStore(selectSetConfirmModalState)

	const setFIlters = useFilterStore(selectSetFilters)

	const setOldFilter = () => {
		setIsConfirmModalOpen(false)
		setIsModalOpen(false)
	}

	const setNewfilters = () => {
		setFIlters(data)
		queryClient.setQueryData(['filters'], data)
		setIsConfirmModalOpen(false)
		setIsModalOpen(false)
	}

	useEffect(() => {
		const keyDownHandler = (event: KeyboardEvent) => {
			if (event.code === 'Escape') {
				setIsConfirmModalOpen(false)
			}
		}
		document.addEventListener('keydown', keyDownHandler)
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', keyDownHandler)
			document.body.style.overflow = 'unset'
		}
	}, [])

	return createPortal(
		<div className="flex justify-center min-h-screen z-[60] inset-0 backdrop-blur-xl fixed w-screen">
			<div className="bg-white flex flex-col items-center fixed justify-center w-7xl rounded-2xl p-8">
				<h2 className="mb-30 text-[40px] text-['#31393C'] ">
					Do you want to apply new filter
				</h2>
				<ul className="flex justify-center">
					<li>
						<button
							className="bg-white border border-solid rounded-2xl border-[#B4B4B4] me-8 text-[#474747]
                                text-base font-semibold w-[280px] h-[64px]"
							onClick={() => setOldFilter()}
						>
							Use old filter
						</button>
					</li>
					<li>
						{/* px-20 py-6  */}
						<button
							className="bg-[#FF5F00] text-white text-base font-semibold w-[280px] h-[64px] rounded-2xl"
							onClick={() => setNewfilters()}
						>
							Apply new filter
						</button>
					</li>
				</ul>
			</div>
		</div>,
		document.body
	)
}
