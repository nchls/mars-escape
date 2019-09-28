import React from 'react';
import { connect } from 'react-redux';

import './inventory.scss';

import { getItem } from '../data/items';

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

const Item = ({ item }) => {
	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<a className="list-item" href="#">
			{item.name} ({item.count})
		</a>
	);
};

const Inventory = ({ inventory }) => {
	const groupedInventory = groupInventory(inventory);
	return (
		<>
			<p>Inventory</p>
			<div className="list is-hoverable">
				{groupedInventory.map((item) => <Item key={item.id} item={item} />)}
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		inventory: state.inventory,
	};
};

export default connect(mapStateToProps)(Inventory);
