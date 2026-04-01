import "./App.css";
import { init } from "./utils/init";
import { CropPlot } from "./components/cropPlot";
import { Container } from "./components/container";
import { Inventory } from "./components/inventory";
import { PlayerStats } from "./components/playerStats";
import { useEffect } from "react";
import { useCropStore } from "./stores/crop-store";
import { Sidebar } from "./components/sidebar";

function App() {
  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <Sidebar>
        <p>Test.</p>
      </Sidebar>
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
