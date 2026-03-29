import "./App.css";
import { init } from "./utils/init";
import { CropPlot } from "./components/cropPlot";
import { Container } from "./components/container";
import { Inventory } from "./components/inventory";
import { PlayerStats } from "./components/playerStats";
import { useEffect } from "react";
import { useCropStore } from "./stores/crop-store";

function App() {
  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <div className='col-start-1 col-end-5 row-start-1 row-end-5 grid grid-cols-2 p-4 gap-2'>
        <FieldsList />
      </div>
      <div className='col-start-5 col-end-6 row-start-1 row-end-5'>
        <Inventory />
      </div>
      <div className='col-start-1 col-end-6 row-start-5 row-end-6 bg-gray-300 p-5'>
        <PlayerStats />
      </div>
    </Container>
  );
}

function FieldsList() {
  const fields = useCropStore((state) => state.fields);

  return (
    <div>
      {fields.map((field) => (
        <CropPlot key={field.id} field={field} />
      ))}
    </div>
  );
}

export default App;
