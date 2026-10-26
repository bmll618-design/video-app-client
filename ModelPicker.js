import Chips from './Chips';

// Chooses between available models (Wan / Seedance).
export default function ModelPicker({ models, value, onChange }) {
  const labelOf = (id) => models.find((m) => m.id === id)?.label ?? id;
  return <Chips label="מודל" options={models.map((m) => m.id)} value={value} onChange={onChange} format={labelOf} />;
}
