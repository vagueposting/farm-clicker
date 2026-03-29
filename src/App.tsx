import "./App.css";
import { init } from "./init";
import { CropPlot } from "./components/cropPlot";
import { Container } from "./components/container";
import { Inventory } from "./components/inventory";
import { useEffect } from "react";
import { useCropStore } from "./stores/crop-store";

function App() {
  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <div className='col-start-1 col-end-5 grid grid-cols-2 p-4 gap-2'>
        <FieldsList />
      </div>
      <div className='col-start-5 col-start 6 p-2'>
        <Inventory />
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
