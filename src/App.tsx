import "./App.css";
import { init } from "./utils/init";
import { CropPlot } from "./components/cropPlot";
import { Container } from "./components/container";
import { Inventory } from "./components/inventory";
import { PlayerStats } from "./components/playerStats";
import { useEffect } from "react";
import { useCropStore } from "./stores/crop-store";
import { Sidebar } from "./components/sidebar";
import "material-icons/iconfont/round.css";

function App() {
  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <Sidebar>
        <p>Test.</p>
      </Sidebar>
      <PlayerStats position='col-start-9 col-end-11 row-start-1 row-end-4 m-2' />
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
