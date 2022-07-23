import styles from '../../styles/Utils.module.css'

export const TextField = ({
	id,
	text,
	type,
	value,
	onChange,
	onBlur,
	error,
	helptext,
	options = [],
}) => {
	const isCategory = id === 'category'
	return (
		<section className={styles.textField}>
			<label htmlFor={id} className={styles.label}>
				{text}
			</label>
			{isCategory ? (
				<select
					className={styles.input}
					id={id}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
				>
					{options?.map((opt) => {
						return (
							<option value={opt.value} label={opt.label} key={opt.label}>
								{opt.label}
							</option>
						)
					})}
				</select>
			) : (
				<input
					className={styles.input}
					id={id}
					type={type}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
				/>
			)}
			{error && <span className={styles.span}>{helptext}</span>}
		</section>
	)
}
