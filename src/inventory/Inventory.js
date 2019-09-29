import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItem } from '../data/items';
import { addOre } from '../oreCounter/oreCounterModule';
import { removeItemFromInventory } from './inventoryModule';
import './inventory.scss';

/**
 * Group together inventory items, by their count
 * @param {Array} inventory Inventory array
 */
const groupInventory = (inventory) => {
	const groups = {};
	// Collect items together to get a count of each
	for (let i = 0; i < inventory.length; i += 1) {
		const idx = inventory[i].itemId;
		if (groups[idx]) {
			groups[idx].count += 1;
		} else {
			groups[idx] = { ...getItem(idx) };
			groups[idx].count = 1;
		}
	}
	// Now that we have the counts, we'll go through again to put them into a stable order
	return Object.values(groups).sort((a, b) => a.name.localeCompare(b.name));
};

const Item = ({ item, scrap, remove }) => {
	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<div className="list-item inventory-item">
			<span>{item.name} ({item.count})</span>
			{
				item.cost && item.id
					? (
						<button
							className="button inventory-item-scrap"
							onClick={() => {
								remove(item.id);
								scrap(Math.floor(item.cost / 2));
							}}
						>
							Scrap
						</button>
					)
					: null
			}
		</div>
	);
};

const Inventory = ({ inventory, addOre, removeItemFromInventory }) => {
	const groupedInventory = groupInventory(inventory);
	return (
		<>
			<h2 className="title is-5">Inventory</h2>
			{ groupedInventory.length ? (
				<div className="list is-hoverable">
					{groupedInventory.map((item) => (
						<Item key={item.id} item={item} scrap={addOre} remove={removeItemFromInventory} />
					))}
				</div>
			) : null }
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		inventory: state.inventory,
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ addOre, removeItemFromInventory }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
