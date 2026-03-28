import { CropField } from "../logic/crops";

interface CropPlotProps {
  field: CropField;
}

export function CropPlot({ field }: CropPlotProps) {
  return (
    <div className='flex flex-col justify-center align-middle text-center border-4 border-black w-3/6'>
      <p>{field.name}</p>
      <p>
        {field.amount.planted} / {field.amount.capacity}
      </p>
      <button className='bg-gray-200 p-1 m-2 cursor-pointer'>Plant</button>
    </div>
  );
}
