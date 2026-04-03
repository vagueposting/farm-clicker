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
    setIsMounted(true);
  }, []);

  return (
    <Container ref={statConstraintsRef}>
      {isMounted && <PlayerStats dragConstraints={statConstraintsRef} />}
      <Sidebar>
        <p>Test.</p>
        <p>Tell me things about your world.</p>
      </Sidebar>
      <FieldsList />
    </Container>
  );
}

function FieldsList() {
  const fields = useCropStore((state) => state.fields);

  return (
    <div className='z-0 flex-1 grid grid-cols-2 auto-rows-min gap-4 p-4 overflow-auto ml-0 lg:ml-64'>
      {fields.map((field) => (
        <CropPlot key={field.id} field={field} />
      ))}
    </div>
  );
}
