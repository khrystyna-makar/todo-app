import Todos from './components/Todos';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Todos />
      </QueryClientProvider>
    </>
  )
}

export default App
