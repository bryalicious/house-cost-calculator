const TYPES = {
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  MULTIPLE: 'multiple',
}

const items = [
  {
    "item": "Additional Double Socket - White",
    "price": 71,
    "category": "Electrical Items",
    "type": TYPES.MULTIPLE
  },
  {
    "item": "Additional Double Socket with USB - White",
    "price": 100,
    "category": "Electrical Items",
    "type": TYPES.MULTIPLE
  },
  {
    "item": "Additional Double Socket - Satin",
    "price": 86,
    "category": "Electrical Items",
    "type": TYPES.MULTIPLE
  },
  {
    "item": "Additional Double Socket with USB - Satin",
    "price": 114,
    "category": "Electrical Items",
    "type": TYPES.MULTIPLE
  },
  {
    "item": "Downlights - White",
    "price": 107,
    "category": "Electrical Items",
    "type": TYPES.RADIO,
    "group": "Downlight"
  },
  {
    "item": "Downlights - Satin Chrome",
    "price": 107,
    "category": "Electrical Items",
    "type": TYPES.RADIO,
    "group": "Downlight"
  },
  {
    "item": "Additional TV Aerial",
    "price": 79,
    "category": "Electrical Items",
    "type": TYPES.MULTIPLE
  },
  {
    "item": "Socket & Sheathing Ply (Wall Mounted TV)",
    "price": 561,
    "category": "Electrical Items",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Additional BT Points",
    "price": 79,
    "category": "Electrical Items",
    "type": TYPES.MULTIPLE
  },
  {
    "item": "Chrome Accessories - Whole House",
    "price": 1604,
    "category": "Electrical Items",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Chrome Accessories - Ground Floor",
    "price": 959,
    "category": "Electrical Items",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Chrome Accessories - First Floor",
    "price": 767,
    "category": "Electrical Items",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "External Double Socket",
    "price": 135,
    "category": "Electrical Items",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Electric Car Charger",
    "price": 0,
    "category": "Electrical Items",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "IMMS Wireless Alarm with Key Fobs",
    "price": 1400,
    "category": "Electrical Items",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Kitchen Doors - Standard",
    "price": 0,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Doors"
  },
  {
    "item": "Kitchen Doors - Lomond",
    "price": 90,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Doors"
  },
  {
    "item": "Kitchen Doors - Cambridge",
    "price": 368,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Doors"
  },
  {
    "item": "Kitchen Doors - Antonine",
    "price": 422,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Doors"
  },
  {
    "item": "Kitchen Doors - Zola",
    "price": 576,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Doors"
  },
  {
    "item": "Standard Worktops",
    "price": 0,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Worktops"
  },
  {
    "item": "Stone Worktop Group 1",
    "price": 3629,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Worktops"
  },
  {
    "item": "Stone Worktop Group 2",
    "price": 3739,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Worktops"
  },
  {
    "item": "Stone Worktop Group 3",
    "price": 3974,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Worktops"
  },
  {
    "item": "Stone Worktop Group 4",
    "price": 4206,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Worktops"
  },
  {
    "item": "Stone Worktop Group 5",
    "price": 4871,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Worktops"
  },
  {
    "item": "Door Handles - Standard Range of Handles",
    "price": 0,
    "category": "Kitchen",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Kitchen Worktop Lighting - Standard",
    "price": 0,
    "category": "Kitchen",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Cooker Splashback - Standard",
    "price": 0,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Cooker Splashback"
  },
  {
    "item": "Cooker Splashback - Upgrade to Glass",
    "price": 222,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Cooker Splashback"
  },
  {
    "item": "Kitchen Sink - Standard",
    "price": 0,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Sink"
  },
  {
    "item": "Kitchen Sink - Upgrade 1 (1.5)",
    "price": 439,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Sink"
  },
  {
    "item": "Kitchen Sink - Upgrade 2 (1.0)",
    "price": 451,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Sink"
  },
  {
    "item": "Kitchen Tap - Standard",
    "price": 0,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Tap"
  },
  {
    "item": "Kitchen Tap - Upgrade",
    "price": 185,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Kitchen Tap"
  },
  {
    "item": "Standard Hob",
    "price": 0,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Hob"
  },
  {
    "item": "Standard Oven",
    "price": 0,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Oven"
  },
  {
    "item": "Standard Hood",
    "price": 0,
    "category": "Kitchen",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Integrated Washer / Dryer",
    "price": null,
    "category": "Kitchen",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Integrated Washing Machine",
    "price": null,
    "category": "Kitchen",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Double Oven - Built Under",
    "price": 532,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Oven"
  },
  {
    "item": "Double Oven - Built In",
    "price": null,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Oven"
  },
  {
    "item": "Integrated Dishwasher",
    "price": 952,
    "category": "Kitchen",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Integrated Fridge Freezer - 70/30",
    "price": 1406,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Fridge Freezer"
  },
  {
    "item": "Integrated Fridge Freezer - 50/50",
    "price": 1416,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Fridge Freezer"
  },
  {
    "item": "Built in Combi Micro",
    "price": null,
    "category": "Kitchen",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "80cm 5 zone Ceramic Hob",
    "price": 709,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Hob"
  },
  {
    "item": "60cm 4 zone Induction Hob",
    "price": 453,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Hob"
  },
  {
    "item": "80cm 5 zone Induction Hob",
    "price": 1115,
    "category": "Kitchen",
    "type": TYPES.RADIO,
    "group": "Hob"
  },
  {
    "item": "Freestanding Washing Machine",
    "price": 625,
    "category": "Kitchen",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Freestanding Tumble Dryer",
    "price": 668,
    "category": "Kitchen",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Carousel - Chrome (180)",
    "price": null,
    "category": "Kitchen",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Linea 330L Pull Out Waste Bin",
    "price": 225,
    "category": "Kitchen",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Additional Base unit in lieu of appliance",
    "price": 331,
    "category": "Kitchen",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Standard Ceramic - WC",
    "price": 0,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "WC Tiling"
  },
  {
    "item": "Standard Ceramic - Bathroom",
    "price": 0,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Bathroom Tiling"
  },
  {
    "item": "Standard Ceramic - Ensuite 1",
    "price": null,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Ensuite 1 Tiling"
  },
  {
    "item": "Standard Ceramic - Ensuite 2",
    "price": null,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Ensuite 2 Tiling"
  },
  {
    "item": "Full Height Upgrade - WC",
    "price": 1349,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "WC Tiling"
  },
  {
    "item": "Full Height Upgrade - Bathroom",
    "price": 1349,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Bathroom Tiling"
  },
  {
    "item": "Full Height Upgrade - Ensuite 1",
    "price": null,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Ensuite 1 Tiling"
  },
  {
    "item": "Full Height Upgrade - Ensuite 2",
    "price": null,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Ensuite 2 Tiling"
  },
  {
    "item": "Half Height Upgrade - WC",
    "price": 497,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "WC Tiling"
  },
  {
    "item": "Half Height Upgrade - Bathroom",
    "price": 675,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Bathroom Tiling"
  },
  {
    "item": "Half Height Upgrade - Ensuite 1",
    "price": null,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Ensuite 1 Tiling"
  },
  {
    "item": "Half Height Upgrade - Ensuite 2",
    "price": null,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Ensuite 2 Tiling"
  },
  {
    "item": "Bulkhead Upgrade - WC",
    "price": 213,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "WC Tiling"
  },
  {
    "item": "Bulkhead Upgrade - Bathroom",
    "price": 213,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Bathroom Tiling"
  },
  {
    "item": "Bulkhead Upgrade - Ensuite 1",
    "price": null,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Ensuite 1 Tiling"
  },
  {
    "item": "Bulkhead Upgrade - Ensuite 2",
    "price": null,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Ensuite 2 Tiling"
  },
  {
    "item": "Chrome Trim - WC",
    "price": 171,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "WC Tiling"
  },
  {
    "item": "Chrome Trim - Bathroom",
    "price": 171,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Bathroom Tiling"
  },
  {
    "item": "Chrome Trim - Ensuite 1",
    "price": null,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Ensuite 1 Tiling"
  },
  {
    "item": "Chrome Trim - Ensuite 2",
    "price": null,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.RADIO,
    "group": "Ensuite 2 Tiling"
  },
  {
    "item": "Towel Radiator - WC",
    "price": 284,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Towel Radiator - Bathroom",
    "price": 284,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Towel Radiator - Ensuite 1",
    "price": null,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Towel Radiator - Ensuite 2",
    "price": null,
    "category": "Bathroom Selections / Tiling",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Bronze Selection - Vinyl (Bathrooms)",
    "price": 150,
    "category": "Flooring",
    "type": TYPES.RADIO,
    "group": "Bathroom Flooring"
  },
  {
    "item": "Bronze Selection - Vinyl",
    "price": 1083,
    "category": "Flooring",
    "type": TYPES.RADIO,
    "group": "Other Flooring"
  },
  {
    "item": "Bronze Selection - Carpets (1)",
    "price": 1889,
    "category": "Flooring",
    "type": TYPES.RADIO,
    "group": "Other Flooring"
  },
  {
    "item": "Bronze Living Room Selection",
    "price": null,
    "category": "Flooring",
    "type": TYPES.RADIO,
    "group": "Living Room Flooring"
  },
  {
    "item": "Silver Selection - LVT (Bathrooms)",
    "price": 483,
    "category": "Flooring",
    "type": TYPES.RADIO,
    "group": "Bathroom Flooring"
  },
  {
    "item": "Silver Selection - LVT",
    "price": 2593,
    "category": "Flooring",
    "type": TYPES.RADIO,
    "group": "Other Flooring"
  },
  {
    "item": "Silver Selection - Carpets (1)",
    "price": 2218,
    "category": "Flooring",
    "type": TYPES.RADIO,
    "group": "Other Flooring"
  },
  {
    "item": "Silver Selection - LVT Upgrade to Living Room",
    "price": 977,
    "category": "Flooring",
    "type": TYPES.RADIO,
    "group": "Living Room Flooring"
  },
  {
    "item": "Gold Selection - LVT (Bathrooms)",
    "price": 647,
    "category": "Flooring",
    "type": TYPES.RADIO,
    "group": "Bathroom Flooring"
  },
  {
    "item": "Gold Selection - LVT",
    "price": 3571,
    "category": "Flooring",
    "type": TYPES.RADIO,
    "group": "Other Flooring"
  },
  {
    "item": "Gold Selection - Carpets (1)",
    "price": 2444,
    "category": "Flooring",
    "type": TYPES.RADIO,
    "group": "Other Flooring"
  },
  {
    "item": "Gold Selection - LVT Upgrade to Living Room",
    "price": 1352,
    "category": "Flooring",
    "type": TYPES.RADIO,
    "group": "Living Room Flooring"
  },
  {
    "item": "Turf to Rear Gardens",
    "price": 1880,
    "category": "Garden & Externals",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "External Tap",
    "price": 213,
    "category": "Garden & Externals",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Bedroom 1 Wardrobe",
    "price": 0,
    "category": "Wardrobes",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Bedroom 2 Wardrobe",
    "price": 1584,
    "category": "Wardrobes",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Bedroom 3 Wardrobe",
    "price": null,
    "category": "Wardrobes",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Bedroom 4 Wardrobe",
    "price": null,
    "category": "Wardrobes",
    "type": TYPES.CHECKBOX
  },
  {
    "item": "Bedroom 5 Wardrobe",
    "price": null,
    "category": "Wardrobes",
    "type": TYPES.CHECKBOX
  },
];



export default items
