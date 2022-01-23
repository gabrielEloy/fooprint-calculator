import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CalculateEmissions } from "./routes/CalculateEmissions";
import { Home } from './routes/Home';

type Props = {};

export const routes = [{
  key: '/',
  label: 'Home',
},
{
  key: '/calculate-emissions',
  label: 'Calculate emissions',
},
]

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/calculate-emissions" element={<CalculateEmissions />} />
      </Routes>
    </BrowserRouter>
  )
};


export default App;
