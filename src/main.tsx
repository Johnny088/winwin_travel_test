import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClientProvider } from '@tanstack/react-query'

// import { FilterModal } from './components/FilterModal/FilterModal'
import './main.css'
import { App } from './pages/Home'
import { queryClient } from './query'
import './shared/i18n'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			{/* <FilterModal /> */}
		</QueryClientProvider>
	</StrictMode>
)
