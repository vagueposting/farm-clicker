import "./App.css";
import { CropPlot } from "./components/cropPlot";
import { CropField, CropType } from "./logic/crops";
import { PriceHandling } from "./logic/priceHandling";
import { Currencies } from "./logic/types-and-templates/game-operations";
import { Container } from "./components/container";

function App() {
  const sampleField = new CropField(
    "Corn",
    20,
    new CropType(
      "Corn",
      "A nice crop",
      {
        buy: new PriceHandling(10, Currencies.MONEY),
        sell: new PriceHandling(15, Currencies.MONEY),
      },
      30,
      true,
    ),
  );

  return (
    <Container>
      <CropPlot field={sampleField} />
    </Container>
  );
}

export default App;
