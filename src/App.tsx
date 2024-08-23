import Table from "./components/Table";
import Basket from "./components/Basket";
import { BasketProvider } from './Contexts/BasketStates';

export const App = () => {
  return (
    <div>
      <BasketProvider>
        <Table />
        <Basket />
      </BasketProvider>
    </div>
  )
}