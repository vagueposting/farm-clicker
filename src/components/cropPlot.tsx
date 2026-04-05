import { ScoreOperation } from "../logic/types-and-templates/game-operations";
import { ActiveCropField, useCropStore } from "../stores/crop-store";
import { useEffect, useState, useMemo, use } from "react";
import { usePlayerStore } from "../stores/player-store";
import { useGrowthLoop } from "../hooks/useGrowthLoop";

// TODO: Implement "wait to grow" cycle
// TODO: implement being able to plan 1/5/10/max

interface PlotNameProps {
  field: ActiveCropField;
}

interface PlotButtonProps {
  text: string;
  clickFn: () => void;
  disableIf?: boolean;
}

interface CropPlotProps {
  field: ActiveCropField;
}

export function CropPlot({ field }: CropPlotProps) {
  const { plantCrop, harvestCrops } = useCropStore();
  const { wallet, modifyWallet } = usePlayerStore();
  const [growthProgress, setGrowthProgress] = useState(0);

  // Start the growth loop
  useGrowthLoop();

  // Calculate growth percentage for visual feedback
  useEffect(() => {
    if (!field.plantedTimestamps || field.plantedTimestamps.length === 0) {
      setGrowthProgress(0);
      return;
    }

    const now = Date.now();
    const oldestPlant = Math.min(...field.plantedTimestamps);
    const timeElapsed = now - oldestPlant;
    const totalTime = field.assignedCrop.growTime * 1000;
    const progress = Math.min((timeElapsed / totalTime) * 100, 100);

    setGrowthProgress(progress);
  }, [field.plantedTimestamps, field.assignedCrop.growTime]);

  function handleHarvest(fieldID: number) {
    harvestCrops(fieldID);
  }

  async function handlePlanting(fieldID: number, crops = 1) {
    const cost = field.assignedCrop.value.buy.finalPrice;
    const pocket = field.assignedCrop.value.buy.currency;

    if (wallet.money - cost < -500) return;

    modifyWallet(pocket, crops * cost, ScoreOperation.minus);
    plantCrop(fieldID, crops);
  }

  const isFull = useMemo(() => {
    return (
      field.amount.planted + field.amount.sprouted === field.amount.capacity
    );
  }, [field.amount.planted, field.amount.sprouted, field.amount.capacity]);

  const isEmpty = useMemo(() => {
    return field.amount.planted + field.amount.sprouted === 0;
  }, [field.amount.planted, field.amount.sprouted]);

  return (
    <div className='card card-md shadow-md bg-gray-100 flex flex-col justify-center align-middle text-center'>
      <PlotName field={field} />
      <div className='grid grid-cols-2 grid-rows-2 h-9/12'>
        <p>
          <span className='font-bold'>Growing</span>
          <br />
          {field.amount.planted}
        </p>
        <p>
          <span className='font-bold'>Sprouted</span>
          <br />
          {field.amount.sprouted}
        </p>
        <div className='row-start-2 row-end-3 col-start-1 col-end-3 flex flex-col -mt-2 p-0'>
          <div className='divider divider-start bg-gray-400 h-px w-6/12 self-center -mb-0.5'></div>
          <span className='text-gray-400 text-sm'>{field.amount.capacity}</span>
        </div>
      </div>

      {/* TODO: Add a loading bar around here.*/}

      <div className='flex flex-row justify-evenly m-2 -mt-2 gap-2'>
        <PlotButton
          text='Plant'
          clickFn={() => handlePlanting(field.id)}
          disableIf={isFull}
        />
        <PlotButton
          text='Harvest'
          clickFn={() => handleHarvest(field.id)}
          disableIf={isEmpty}
        />
      </div>
    </div>
  );
}

function PlotName({ field }: PlotNameProps) {
  const { renameField } = useCropStore();
  const [isInputField, setInputFieldState] = useState(false);

  function changeInput() {
    setInputFieldState(!isInputField);
  }

  function handleNameChange(fieldID: number, newName: string) {
    renameField(fieldID, newName);
  }

  return (
    <>
      {!isInputField && (
        <>
          <p className='text-xl font-bold' onDoubleClick={changeInput}>
            {field.name}
          </p>
          <div className='divider divider-start mt-0 mb-0 bg-black h-px w-8/12 self-center'></div>
          <p className='text-md'>{field.assignedCrop.name}</p>
        </>
      )}
      {isInputField && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const newName = formData.get("fieldName") as string;
            handleNameChange(field.id, newName);
            changeInput();
          }}
        >
          <input
            className='bg-white p-1 mt-2 text-lg font-bold text-center rounded border border-black shadow-inner outline-black'
            type='text'
            name='fieldName'
            defaultValue={field.name}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
            autoFocus
          />
        </form>
      )}
    </>
  );
}

function PlotButton({ text, clickFn, disableIf }: PlotButtonProps) {
  return (
    <>
      <button
        className='btn bg-gray-300 border-0 flex-1 h-auto pt-1 pb-1 self-center cursor-pointer'
        onClick={clickFn}
        disabled={disableIf}
      >
        {text}
      </button>
    </>
  );
}
