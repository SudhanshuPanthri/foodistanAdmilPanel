import AddFood from "./components/AddFood";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderSection from "./components/order/OrderSection";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import ShowDetails from "./components/showDetails/ShowDetails";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/orders" exact element={<OrderSection />} />
          <Route path="/addFood" element={<AddFood />} />
          <Route path="/showDetail/:orderId" element={<ShowDetails />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
