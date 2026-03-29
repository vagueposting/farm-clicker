import { ScoreOperation } from "../logic/types-and-templates/game-operations";
import { ActiveCropField, useCropStore } from "../stores/crop-store";
import { usePlayerStore } from "../stores/player-store";

// TODO: Implement "wait to grow" cycle
// TODO: implement being able to plan 1/5/10/max

interface CropPlotProps {
  field: ActiveCropField;
}

interface PlotButtonProps {
  text: string;
  clickFn: () => void;
  disableIf?: boolean;
}

export function CropPlot({ field }: CropPlotProps) {
  const { plantCrop, harvestCrops } = useCropStore();
  const { wallet, modifyWallet } = usePlayerStore();

  function handleHarvest(fieldID: number) {
    harvestCrops(fieldID);
  }

  async function handlePlanting(fieldID: number, crops = 1) {
    setTimeout(() => {}, 500);
    const cost = field.assignedCrop.value.buy.finalPrice;
    const pocket = field.assignedCrop.value.buy.currency;

    if (wallet.money === -500 || wallet.money - cost < -500) return;

    modifyWallet(pocket, crops * cost, ScoreOperation.minus);
    plantCrop(fieldID, crops);
  }

  return (
    <div className='flex flex-col justify-center align-middle text-center border-2 border-black w-auto'>
      <p>{field.name}</p>
      <p>
        {field.amount.planted} / {field.amount.capacity}
      </p>
      <PlotButton
        text='Plant'
        clickFn={() => handlePlanting(field.id)}
        disableIf={field.amount.planted === field.amount.capacity}
      />
      <PlotButton text='Harvest' clickFn={() => handleHarvest(field.id)} />
    </div>
  );
}

function PlotButton({ text, clickFn, disableIf }: PlotButtonProps) {
  return (
    <>
      <button
        className='bg-gray-200 p-1 m-2 cursor-pointer'
        onClick={clickFn}
        disabled={disableIf}
      >
        {text}
      </button>
    </>
  );
}
