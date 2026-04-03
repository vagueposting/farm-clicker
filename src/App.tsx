import "./App.css";
import { init } from "./utils/init";
import { CropPlot } from "./components/cropPlot";
import { Container } from "./components/container";
import { Inventory } from "./components/inventory";
import { PlayerStats } from "./components/playerStats";
import { useEffect, useRef, useState } from "react";
import { useCropStore } from "./stores/crop-store";
import { Sidebar } from "./components/sidebar";
import "material-icons/iconfont/round.css";

export default function App() {
  const statConstraintsRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    init();
    setIsMounted(true); // Signal that the ref is ready
  }, []);

  return (
    <Container ref={statConstraintsRef}>
      <Sidebar>
        <p>Test.</p>
        <p>Tell me things about your world.</p>
      </Sidebar>
      {isMounted && <PlayerStats dragConstraints={statConstraintsRef} />}
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
