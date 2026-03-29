import "./App.css";
import { CropPlot } from "./components/cropPlot";
import { Container } from "./components/container";
import { useCropStore } from "./stores/crop-store";

function App() {
  return (
    <Container>
      <div class='col-start-1 col-end-5 grid grid-cols-2 p-4 gap-2'>
        <FieldsList />
      </div>
      <div class='col-start-5 col-start 6'>
        <p>Test</p>
      </div>
    </Container>
  );
}

function FieldsList() {
  const fields = useCropStore((state) => state.fields);

  return (
    <div>
      {fields.map((field) => {
        <CropPlot key={field.id} field={field} />;
      })}
    </div>
  );
}

export default App;
