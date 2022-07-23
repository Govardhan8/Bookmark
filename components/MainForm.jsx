import { useFormik, useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import styles from '../styles/Mainform.module.css'
import { TextField } from './utils/TextField'
import { API_URL } from '../pages/index'

export default function MainForm({ handlePageChange }) {
	const [options, setOptions] = useState([])
	useEffect(() => {
		setOptions([
			{ label: 'select a category', value: '' },
			{ label: 'Food', value: 'Food' },
			{ label: 'Business', value: 'Business' },
			{ label: 'Vs code', value: 'VsCode' },
			{ label: 'Websites', value: 'Websites' },
			{ label: 'Dress', value: 'Dress' },
			{ label: 'Personal', value: 'Personal' },
		])
	}, [])

	const sendData = async (values) => {
		await fetch(API_URL, {
			method: 'POST',
			body: JSON.stringify(values),
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}

	const handleClick = (values) => {
		sendData(values)
		handlePageChange()
	}

	const validations = Yup.object().shape({
		name: Yup.string().trim().required('Name is Required'),
		category: Yup.string().required('Category is Required'),
		summary: Yup.string()
			.trim()
			.min(5, 'Please enter atleast 20 characters summary')
			.required('summary required'),
	})

	const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
		useFormik({
			initialValues: {
				name: '',
				category: '',
				summary: '',
			},
			validationSchema: validations,
			onSubmit: (values, { resetForm }) => {
				handleClick(values)
				resetForm({
					name: '',
					category: '',
					summary: '',
				})
			},
		})

	return (
		<>
			<button onClick={handlePageChange}>Close</button>
			<form className={styles.form} autoComplete='off' onSubmit={handleSubmit}>
				<TextField
					text='Name'
					id='name'
					type='text'
					value={values.name}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.name && touched.name}
					helptext={errors.name}
				/>
				<TextField
					text='Category'
					id='category'
					type='text'
					value={values.category}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.category && touched.category}
					helptext={errors.category}
					options={options}
				/>
				<TextField
					text='Summary'
					id='summary'
					type='text'
					value={values.summary}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.summary && touched.summary}
					helptext={errors.summary}
				/>
				<button className={styles.button} type='submit'>
					Add Info
				</button>
			</form>
		</>
	)
}
