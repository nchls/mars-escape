/* eslint-disable max-len */
const itemsData = [
	{
		id: 1,
		isStock: true,
		name: 'Rover (small)',
		description: 'A chassis and basic parts for a small rover.',
		image: 'img-rover-small',
		cost: 200,
		weight: 300,
		isRover: true,
	},
	{
		id: 2,
		isStock: true,
		name: 'Rover (medium)',
		description: 'A chassis and basic parts for a medium-sized rover.',
		image: 'img-rover-medium',
		cost: 350,
		weight: 400,
		isRover: true,
	},
	{
		id: 3,
		isStock: true,
		name: 'Rover (large)',
		description: 'A chassis and basic parts for a large rover.',
		image: 'img-rover-large',
		cost: 600,
		weight: 500,
		isRover: true,
	},
	{
		id: 4,
		isStock: true,
		name: 'Rover (huge)',
		description: 'A chassis and basic parts for a huge rover, like seriously a heckin chonker.',
		image: 'img-rover-huge',
		cost: 1000,
		weight: 600,
		isRover: true,
	},
	{
		id: 5,
		isStock: true,
		name: 'Motors (basic)',
		weight: 100,
		horsepower: 100,
		powerDraw: 1,
	},
	{
		id: 6,
		name: 'Motors (advanced)',
		description: 'Get where you\'re going! More powerful motors for faster travel and reduced risk of getting stuck in sand.',
		cost: 300,
		weight: 150,
		horsepower: 300,
		powerDraw: 7,
		minSize: 2,
		replaces: [5],
	},
	{
		id: 7,
		isStock: true,
		name: 'Wheels (basic)',
		image: 'img-wheels-basic',
		weight: 50,
		grip: 100,
	},
	{
		id: 8,
		name: 'Wheels (advanced)',
		description: 'More advanced wheels with a patent-pending grip pattern for faster travel and less likelihood of getting stuck somewhere unpleasant.',
		image: 'img-wheels-advanced',
		cost: 200,
		weight: 70,
		grip: 200,
		minSize: 2,
		replaces: [7],
	},
	{
		id: 9,
		isStock: true,
		name: 'Battery (small)',
		image: 'img-battery-small',
		weight: 100,
		capacity: 1,
	},
	{
		id: 10,
		name: 'Battery (medium)',
		description: 'Who wants to run out of power out on the dunes? So embarrassing.',
		image: 'img-battery-medium',
		cost: 250,
		weight: 150,
		capacity: 3,
		minSize: 2,
		replaces: [9, 11],
	},
	{
		id: 11,
		name: 'Battery (large)',
		description: 'You\'ll be roving all day with this one.',
		image: 'img-battery-large',
		cost: 500,
		weight: 200,
		capacity: 5,
		minSize: 3,
		replaces: [9, 10],
	},
	{
		id: 12,
		isStock: true,
		name: 'Compass',
		image: 'img-compass',
		weight: 10,
		effectiveness: 100,
		replaces: [13],
	},
	{
		id: 13,
		name: 'GPS',
		description: 'Never get lost again! PLEASE buy this. We have a pretty large payment coming due for the constellation of GPS satellites we put in orbit around Mars.',
		image: 'img-gps',
		cost: 450,
		weight: 20,
		effectiveness: 300,
		replaces: [12],
	},
	{
		id: 14,
		name: 'Drill (basic)',
		description: 'A wee little drill for knocking chips off of ice and ore deposits.',
		image: 'img-drill-basic',
		cost: 100,
		weight: 150,
		effectiveness: 100,
		powerDraw: 1,
		replaces: [15],
	},
	{
		id: 15,
		name: 'Drill (advanced)',
		description: 'A big, state-of-the-art drill with all the latest drilly features.',
		image: 'img-drill-advanced',
		cost: 350,
		weight: 180,
		effectiveness: 400,
		powerDraw: 8,
		minSize: 3,
		replaces: [14],
	},
	{
		id: 16,
		name: 'Solar panel (small)',
		description: 'Charge your rover while it\'s out working so it doesn\'t spend so much time waiting in the garage! Not too effective in dust storms.',
		image: 'img-solar-small',
		cost: 100,
		weight: 80,
		current: 100,
		replaces: [17, 18],
	},
	{
		id: 17,
		name: 'Solar panel (large)',
		description: 'For keeping those larger rovers with more power-hungry parts charged out in the field.',
		image: 'img-solar-large',
		cost: 150,
		weight: 120,
		current: 300,
		minSize: 3,
		replaces: [16, 18],
	},
	{
		id: 18,
		name: 'Solar array',
		description: 'This seems a little excessive, but hey, the customer is always right!',
		image: 'img-solar-array',
		cost: 300,
		weight: 180,
		current: 700,
		minSize: 4,
		replaces: [16, 17],
	},
	{
		id: 19,
		name: 'Tanks (basic)',
		description: 'Some small, light tanks for storing low volumes of ice, ore, or tiny Martian artifacts.',
		image: 'img-tank-basic',
		cost: 100,
		weight: 100,
		capacity: 1,
		replaces: [20],
	},
	{
		id: 20,
		name: 'Tanks (large)',
		description: 'Bigger tanks means fewer trips out to the mining zone. Just make sure your rover has enough horsepower to haul it all!',
		image: 'img-tank-large',
		cost: 200,
		weight: 150,
		capacity: 2.5,
		minSize: 3,
		replaces: [19],
	},
	{
		id: 21,
		name: 'Camera',
		description: 'Being able to see helps with lots of things, avoiding dust traps and finding the richest mining veins not least among them.',
		image: 'img-camera',
		cost: 200,
		weight: 50,
		effectiveness: 100,
	},
	{
		id: 22,
		name: 'Rescue winch',
		description: 'It\'s gonna happen. If a rover gets stuck or lost, send out another one with this winch to go pull it back.',
		image: 'img-winch',
		weight: 150,
		cost: 150,
	},
	{
		id: 23,
		name: 'RTGenerator',
		description: 'Delivers free energy for the next decade, even in the dark! Just don\'t crack it open.',
		cost: 1100,
		weight: 300,
		minSize: 4,
	},
];

export const getItem = (id) => ({ ...itemsData[id - 1] });

export const getAllItems = () => itemsData.map((item) => ({ ...item }));

export default itemsData;
