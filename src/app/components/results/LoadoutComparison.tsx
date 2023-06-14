import React, {useMemo, useState} from 'react';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart, Legend, Line
} from 'recharts';
import {observer} from 'mobx-react-lite';
import {useStore} from '@/state';
import Select from "@/app/components/generic/Select";

enum XAxisType {
  MONSTER_DEF,
  BASE_LEVEL,
}

enum YAxisType {
  TTK,
  DPS,
  DAMAGE_TAKEN
}

const XAxisOptions = [
  {label: 'Monster defence level', value: XAxisType.MONSTER_DEF},
  {label: 'Player base levels', value: XAxisType.BASE_LEVEL},
]

const YAxisOptions = [
  {label: 'Damage-per-second', value: YAxisType.DPS},
  {label: 'Time-to-kill', value: YAxisType.TTK},
  {label: 'Damage taken', value: YAxisType.DAMAGE_TAKEN}
]

const LoadoutComparison: React.FC = observer(() => {
  const store = useStore();
  const {loadouts} = store;

  const [xAxisType, setXAxisType] = useState<{ label: string, value: XAxisType } | null | undefined>(XAxisOptions[0]);
  const [yAxisType, setYAxisType] = useState<{ label: string, value: YAxisType } | null | undefined>(YAxisOptions[0]);

  const data = useMemo(() => {
    const x = xAxisType?.value;
    const y = yAxisType?.value;

    // When the X axis type or Y axis type changes, re-calculate the data
    // TODO @cook (e.g (if x === XAxisType.TTK) { doSomething; }
    return [
      {name: 0, 'Loadout 1': 1, 'Loadout 2': 5, 'Loadout 3': 2, 'Loadout 4': 4, 'Loadout 5': 1},
      {name: 1, 'Loadout 1': 7, 'Loadout 2': 9, 'Loadout 3': 12, 'Loadout 4': 2, 'Loadout 5': 10},
      {name: 2, 'Loadout 1': 3, 'Loadout 2': 1, 'Loadout 3': 13, 'Loadout 4': 6, 'Loadout 5': 12},
      {name: 3, 'Loadout 1': 4, 'Loadout 2': 2, 'Loadout 3': 4, 'Loadout 4': 8, 'Loadout 5': 14},
      {name: 4, 'Loadout 1': 8, 'Loadout 2': 10, 'Loadout 3': 8, 'Loadout 4': 3, 'Loadout 5': 0},
      {name: 5, 'Loadout 1': 2, 'Loadout 2': 14, 'Loadout 3': 3, 'Loadout 4': 3, 'Loadout 5': 2},
    ]
  }, [xAxisType, yAxisType]);

  const generateLines = () => {
    let lines: React.ReactNode[] = [];
    let strokeColours = ['red', 'blue', 'purple', 'green', 'sienna'];

    for (let i=0; i < loadouts.length; i++) {
      let colour = strokeColours.shift() || 'red';
      lines.push(<Line key={i} type="monotone" dataKey={`Loadout ${i+1}`} stroke={colour} />);
      strokeColours.push(colour);
    }
    return lines;
  }

  return (
    <>
      <ResponsiveContainer width={'100%'} height={200}>
        <LineChart
          data={data}
        >
          <CartesianGrid strokeDasharray="5 3" />
          <XAxis
            dataKey="name"
            stroke="#777777"
          />
          <YAxis
            stroke="#777777"
            domain={[0, 'dataMax']}
          />
          <Tooltip />
          <Legend />
          {generateLines()}
        </LineChart>
      </ResponsiveContainer>
      <div className={'my-4 flex gap-4 max-w-lg m-auto dark:text-white'}>
        <div className={'basis-1/2'}>
          <h3 className={'font-serif font-bold mb-2'}>X axis</h3>
          <Select
            id={'loadout-comparison-x'}
            items={XAxisOptions}
            value={xAxisType || undefined}
            onSelectedItemChange={(i) => {
              setXAxisType(i)
            }}
          />
        </div>
        <div className={'basis-1/2'}>
          <h3 className={'font-serif font-bold mb-2'}>Y axis</h3>
          <Select
            id={'loadout-comparison-y'}
            items={YAxisOptions}
            value={yAxisType || undefined}
            onSelectedItemChange={(i) => {
              setYAxisType(i)
            }}
          />
        </div>
      </div>
    </>
  )
})

export default LoadoutComparison;