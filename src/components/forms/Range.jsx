export function Range({ value, onChange, min, max, step}) {
	return <div>
		<input
			value={value}
			onChange={onChange}
			type="range"
			className="form-range"
			min={min}
			max={max}
			step={step}
		/>
	</div>
}
