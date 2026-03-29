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
      <div class='col-start-1 col-end-5 grid grid-cols-2 p-4 gap-2'>
        <CropPlot field={sampleField} />
        <CropPlot field={sampleField} />
        <CropPlot field={sampleField} />
      </div>
      <div class='col-start-5 col-start 6'>
        <p>Test</p>
      </div>
    </Container>
  );
}

export default App;
