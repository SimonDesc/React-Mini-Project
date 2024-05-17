import logo from './react_table.png';
import { useState } from "react"
import { Input } from "./components/forms/Input"
import { Checkbox } from "./components/forms/Checkbox"
import { Range } from "./components/forms/Range"
import { ProductCategoryRow } from "./components/products/ProductCategoryRow"
import { ProductRow } from "./components/products/ProductRow"

const PRODUCTS = [
	{ category: "Components", price: "$400", stocked: true, name: "NVIDIA GeForce RTX 3080 Graphics Card" },
	{ category: "Components", price: "$300", stocked: false, name: "AMD Ryzen 9 5900X Processor" },
	{ category: "Components", price: "$200", stocked: true, name: "ASUS ROG Strix Z690-E Gaming Motherboard" },
	{ category: "Components", price: "$150", stocked: true, name: "Corsair Vengeance RGB Pro 16GB RAM" },
	{ category: "Components", price: "$100", stocked: false, name: "Samsung 970 EVO Plus 1TB NVMe SSD" },
	{ category: "Peripherals", price: "$80", stocked: true, name: "Logitech G502 HERO Gaming Mouse" },
	{ category: "Peripherals", price: "$150", stocked: false, name: "Razer BlackWidow Elite Mechanical Gaming Keyboard" },
	{ category: "Peripherals", price: "$100", stocked: true, name: "SteelSeries Arctis 7 Wireless Gaming Headset" },
	{ category: "Peripherals", price: "$50", stocked: true, name: "Logitech C920 HD Pro Webcam" },
	{ category: "Peripherals", price: "$30", stocked: true, name: "AmazonBasics Laptop Stand" },
	{ category: "Laptops", price: "$1200", stocked: true, name: "Dell XPS 15" },
	{ category: "Laptops", price: "$900", stocked: false, name: "HP Pavilion 14" },
	{ category: "Laptops", price: "$1500", stocked: true, name: "Apple MacBook Pro 13" },
	{ category: "Monitors", price: "$300", stocked: true, name: "Dell S2721QS 27-Inch 4K Monitor" },
	{ category: "Monitors", price: "$400", stocked: false, name: "LG 34GN850-B 34-Inch UltraWide QHD Monitor" },
	{ category: "Monitors", price: "$200", stocked: true, name: "Acer SB220Q bi 21.5-Inch Full HD Monitor" },
	{ category: "Networking", price: "$100", stocked: true, name: "TP-Link Archer AX21 Wi-Fi 6 Router" },
	{ category: "Networking", price: "$50", stocked: true, name: "NETGEAR Nighthawk Smart Wi-Fi Router (R6700)" },
	{ category: "Networking", price: "$80", stocked: false, name: "ASUS RT-AX3000 Dual Band Wi-Fi 6 Router" }
];


function App() {

	const [showStockedOnly, setShowStockedOnly] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

	const [rangeValue, setRangeValue] = useState(1500)
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
		if (Number(rangeValue) < Number(price[1])) {
			return false
		}
		return true
	})


	return <div className="container my-2">
		<img src={logo} alt="Logo" className="img-fluid mx-auto d-block" />
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
				placeholder="Search..."
			/>
			<Checkbox
				checked={showStockedOnly}
				onChange={onStockedOnlyChange}
				label="Only display products in stock"
				id="stocked"
			/>
			
			<div className="mt-4">
				<Range
					value={rangeValue}
					onChange={onChangeRange}
					min={30}
					max={1500}
					step={5}
				/>
				<p>Max. price: {rangeValue}$</p>
			</div>
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
				<th>Name</th>
				<th>Price</th>
			</tr>
		</thead>
		<tbody>
			{rows}
		</tbody>
	</table>
}


export default App
