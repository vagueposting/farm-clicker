import { CropField } from "../logic/crops";

interface CropPlotProps {
  field: CropField;
}

interface PlotButtonProps {
  text: string;
}

export function CropPlot({ field }: CropPlotProps) {
  return (
    <div className='flex flex-col justify-center align-middle text-center border-2 border-black w-auto'>
      <p>{field.name}</p>
      <p>
        {field.amount.planted} / {field.amount.capacity}
      </p>
      <PlotButton text='Plant' />
      <PlotButton text='Harvest' />
    </div>
  );
}

function PlotButton({ text }: PlotButtonProps) {
  return (
    <>
      <button className='bg-gray-200 p-1 m-2 cursor-pointer'>{text}</button>
    </>
  );
}
