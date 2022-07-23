import { useEffect, useState } from 'react'
import { API_URL } from '../pages'

export default function DisplayContent({ onClick }) {
	const [info, setInfo] = useState([])

	const getData = async () => {
		const response = await fetch(API_URL)
		const data = await response.json()
		setInfo(data)
	}

	const categories = [
		'Food',
		'Business',
		'Websites',
		'VsCode',
		'Dress',
		'Personal',
	]

	useEffect(() => {
		getData()
	}, [])

	return (
		<section>
			<ul>
				{info.map((info) => (
					<li key={info.id}>
						{info.name}
						{'   '}
						{info.category}
						{'   '}
						{info.summary}
					</li>
				))}
			</ul>
			<button onClick={onClick}>+ ADD INFO</button>
		</section>
	)
}
