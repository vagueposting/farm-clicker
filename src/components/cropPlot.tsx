import { ScoreOperation } from "../logic/types-and-templates/game-operations";
import { ActiveCropField, useCropStore } from "../stores/crop-store";
// import { useEffect } from "react";
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

  /* useEffect(() => {
    console.log("⏱️ CropPlot mounted at:", Date.now());
    console.log("wallet on mount:", wallet);
  }, []); */

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
    <div className='card card-md shadow-md bg-gray-100 flex flex-col justify-center align-middle text-center'>
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
        className='btn bg-gray-300 border-0 p-1 m-2 w-3/6 self-center cursor-pointer'
        onClick={clickFn}
        disabled={disableIf}
      >
        {text}
      </button>
    </>
  );
}
