import { ActiveCropField, useCropStore } from "../stores/crop-store";

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

  function handleHarvest(fieldID: number) {
    harvestCrops(fieldID);
  }

  function handlePlanting(fieldID: number, crops = 1) {
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
