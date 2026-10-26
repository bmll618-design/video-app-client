import Chips from './Chips';

// Duration / resolution / ratio, driven by the selected model's options.
export default function ParamsPanel({ model, params, onChange }) {
  if (!model) return null;
  const set = (key) => (v) => onChange({ ...params, [key]: v });
  return (
    <>
      <Chips label="משך" options={model.durations} value={params.duration} onChange={set('duration')} format={(d) => `${d} שנ׳`} />
      {model.resolutions.length > 0 && <Chips label="רזולוציה" options={model.resolutions} value={params.resolution} onChange={set('resolution')} />}
      {model.ratios.length > 0 && <Chips label="יחס מסך" options={model.ratios} value={params.ratio} onChange={set('ratio')} />}
    </>
  );
}
