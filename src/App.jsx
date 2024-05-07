import { useState } from "react"
import { Input } from "./components/forms/Input"
import { Checkbox } from "./components/forms/Checkbox"
import { ProductCategoryRow } from "./components/products/ProductCategoryRow"
import { ProductRow } from "./components/products/ProductRow"

const PRODUCTS = [
	{ category: "Fruits", price: "$1", stocked: true, name: "Apple" },
	{ category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
	{ category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
	{ category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
	{ category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
	{ category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function App() {

	const [showStockedOnly, setShowStockedOnly] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

	const [rangeValue, setRangeValue] = useState(3)
	const handleRangeValue = e => {
		setRangeValue(e.target.value)
	}

	const visibleProducts = PRODUCTS.filter(product => {
		let productName = product.name.toUpperCase()
		let search = searchTerm.toUpperCase()
		let price = product.price.split('$')

		if (showStockedOnly && !product.stocked) {
			return false
		}
		if (search && !productName.includes(search)) {
			return false
		}
		if (rangeValue > price[1]) {
			return false
		}
		return true
	})


	return <div className="container my-5">
		<SearchBar
			rangeValue={rangeValue}
			onChangeRange={handleRangeValue}
			searchTerm={searchTerm}
			onSearchChange={setSearchTerm}
			showStockedOnly={showStockedOnly}
			onStockedOnlyChange={setShowStockedOnly} />
		<ProductTable
			products={visibleProducts} />
	</div>
}

function SearchBar({ rangeValue, onChangeRange, searchTerm, onSearchChange, showStockedOnly, onStockedOnlyChange }) {
	return <div>
		<div className="mb-3">
			<Input
				value={searchTerm}
				onChange={onSearchChange}
				placeholder="Rechercher..."
			/>
			<p>Prix max : {rangeValue}$</p>
			<input value={rangeValue} onChange={onChangeRange} type="range" className="form-range" min={0} max={5} step={1} />

			<Checkbox
				checked={showStockedOnly}
				onChange={onStockedOnlyChange}
				label="N'afficher que les produits en stock"
				id="stocked"
			/>
		</div>
	</div>
}

function ProductTable({ products }) {

	const rows = []
	let lastCategory = null

	for (let product of products) {

		if (product.category !== lastCategory) {
			rows.push(<ProductCategoryRow key={product.category} name={product.category} />)
		}

		lastCategory = product.category

		rows.push(<ProductRow product={product} key={product.name} />)
	}

	return <table className="table">
		<thead>
			<tr>
				<th>Nom</th>
				<th>Prix</th>
			</tr>
		</thead>
		<tbody>
			{rows}
		</tbody>
	</table>
}


export default App
