<?php
// Static data for products, categories, and brands

// Categories array
$categories = [
    'fashionmen' => [
        'id' => 'fashionmen',
        'name' => 'Men\'s Fashion',
        'description' => 'Clothing and accessories for men'
    ],
    'fashionwomen' => [
        'id' => 'fashionwomen',
        'name' => 'Women\'s Fashion',
        'description' => 'Clothing and accessories for women'
    ],
    'appliances' => [
        'id' => 'appliances',
        'name' => 'Appliances',
        'description' => 'Home and kitchen appliances'
    ],
    'accessories' => [
        'id' => 'accessories',
        'name' => 'Accessories',
        'description' => 'Fashion accessories and jewelry'
    ],
    'babies' => [
        'id' => 'babies',
        'name' => 'Baby Products',
        'description' => 'Products for babies and toddlers'
    ],
    'automotive' => [
        'id' => 'automotive',
        'name' => 'Automotive',
        'description' => 'Car parts and accessories'
    ],
    'gadgets' => [
        'id' => 'gadgets',
        'name' => 'Gadgets',
        'description' => 'Electronic gadgets and devices'
    ],
    'groceries' => [
        'id' => 'groceries',
        'name' => 'Groceries',
        'description' => 'Food and household items'
    ],
    'healthandbeauty' => [
        'id' => 'healthandbeauty',
        'name' => 'Health & Beauty',
        'description' => 'Health and beauty products'
    ],
    'homeandliving' => [
        'id' => 'homeandliving',
        'name' => 'Home & Living',
        'description' => 'Home decor and furniture'
    ],
    'pets' => [
        'id' => 'pets',
        'name' => 'Pet Supplies',
        'description' => 'Products for pets'
    ],
    'schoolsupplies' => [
        'id' => 'schoolsupplies',
        'name' => 'School Supplies',
        'description' => 'Educational and school items'
    ],
    'sportsandlifestyle' => [
        'id' => 'sportsandlifestyle',
        'name' => 'Sports & Lifestyle',
        'description' => 'Sports equipment and lifestyle products'
    ],
    'toysandcollectibles' => [
        'id' => 'toysandcollectibles',
        'name' => 'Toys & Collectibles',
        'description' => 'Toys and collectible items'
    ]
];

// Brands array
$brands = [
    'apple' => [
        'id' => 'apple',
        'name' => 'Apple',
        'description' => 'Premium technology products'
    ],
    'samsung' => [
        'id' => 'samsung',
        'name' => 'Samsung',
        'description' => 'Global electronics manufacturer'
    ],
    'sony' => [
        'id' => 'sony',
        'name' => 'Sony',
        'description' => 'Entertainment and electronics'
    ],
    'nike' => [
        'id' => 'nike',
        'name' => 'Nike',
        'description' => 'Sports and athletic wear'
    ],
    'adidas' => [
        'id' => 'adidas',
        'name' => 'Adidas',
        'description' => 'Sportswear and footwear'
    ],
    'lg' => [
        'id' => 'lg',
        'name' => 'LG',
        'description' => 'Home appliances and electronics'
    ],
    'puma' => [
        'id' => 'puma',
        'name' => 'Puma',
        'description' => 'Sportswear and lifestyle'
    ],
    'gucci' => [
        'id' => 'gucci',
        'name' => 'Gucci',
        'description' => 'Luxury fashion and accessories'
    ]
];

// Products array
$products = [
    'blackshoes' => [
        'id' => 'blackshoes',
        'name' => 'Black Leather Shoes',
        'price' => 129.99,
        'image' => 'data/images/fashionmen/blackshoes_300.png',
        'category' => 'fashionmen',
        'brand' => 'nike',
        'description' => 'Premium black leather shoes perfect for formal occasions',
        'sizes' => ['7', '8', '9', '10', '11', '12', '13']
    ],
    'menbackpack' => [
        'id' => 'menbackpack',
        'name' => 'Men\'s Backpack',
        'price' => 89.99,
        'image' => 'data/images/fashionmen/menbackpack_300.png',
        'category' => 'fashionmen',
        'brand' => 'adidas',
        'description' => 'Durable waterproof backpack for daily use',
        'colors' => ['Black', 'Blue', 'Gray']
    ],
    'television' => [
        'id' => 'television',
        'name' => '4K Smart TV',
        'price' => 799.99,
        'image' => 'data/images/appliances/television_300.png',
        'category' => 'appliances',
        'brand' => 'samsung',
        'description' => '55-inch 4K UHD Smart TV with HDR',
        'specs' => ['55"', '4K UHD', 'Smart TV', 'HDR']
    ],
    'stroller' => [
        'id' => 'stroller',
        'name' => 'Baby Stroller',
        'price' => 249.99,
        'image' => 'data/images/babies/stroller_300.png',
        'category' => 'babies',
        'brand' => '',
        'description' => 'Lightweight and foldable baby stroller',
        'colors' => ['Black', 'Blue', 'Pink']
    ],
    'hoodie' => [
        'id' => 'hoodie',
        'name' => 'Men\'s Hoodie',
        'price' => 59.99,
        'image' => 'data/images/fashionmen/hoodie_300.png',
        'category' => 'fashionmen',
        'brand' => 'puma',
        'description' => 'Comfortable cotton hoodie for casual wear',
        'sizes' => ['S', 'M', 'L', 'XL', 'XXL'],
        'colors' => ['Black', 'Gray', 'Navy']
    ],
    'menjeans' => [
        'id' => 'menjeans',
        'name' => 'Men\'s Jeans',
        'price' => 79.99,
        'image' => 'data/images/fashionmen/menjeans_300.png',
        'category' => 'fashionmen',
        'brand' => 'adidas',
        'description' => 'Classic fit denim jeans',
        'sizes' => ['30', '32', '34', '36', '38'],
        'colors' => ['Blue', 'Black', 'Gray']
    ],
    'speaker' => [
        'id' => 'speaker',
        'name' => 'Bluetooth Speaker',
        'price' => 129.99,
        'image' => 'data/images/appliances/speaker_300.png',
        'category' => 'appliances',
        'brand' => 'sony',
        'description' => 'Portable Bluetooth speaker with excellent sound quality',
        'specs' => ['Bluetooth 5.0', '10W', 'Waterproof', '20hr battery']
    ],
    'microwave' => [
        'id' => 'microwave',
        'name' => 'Microwave Oven',
        'price' => 299.99,
        'image' => 'data/images/appliances/microwave_300.png',
        'category' => 'appliances',
        'brand' => 'lg',
        'description' => '1.2 cu ft countertop microwave with multiple cooking functions',
        'specs' => ['1.2 cu ft', '1000W', '10 power levels', 'Digital controls']
    ],
    'refrigerator' => [
        'id' => 'refrigerator',
        'name' => 'Refrigerator',
        'price' => 1299.99,
        'image' => 'data/images/appliances/refrigerator_300.png',
        'category' => 'appliances',
        'brand' => 'samsung',
        'description' => '25.5 cu ft French door refrigerator with smart features',
        'specs' => ['25.5 cu ft', 'French door', 'Smart features', 'LED lighting']
    ],
    'watch' => [
        'id' => 'watch',
        'name' => 'Men\'s Watch',
        'price' => 199.99,
        'image' => 'data/images/accessories/watch_300.png',
        'category' => 'accessories',
        'brand' => 'gucci',
        'description' => 'Elegant stainless steel watch with leather strap',
        'specs' => ['Stainless steel', 'Leather strap', 'Water resistant', 'Quartz movement']
    ],
    'sunglasses' => [
        'id' => 'sunglasses',
        'name' => 'Sunglasses',
        'price' => 89.99,
        'image' => 'data/images/accessories/sunglasses_300.png',
        'category' => 'accessories',
        'brand' => '',
        'description' => 'UV protection sunglasses with polarized lenses',
        'colors' => ['Black', 'Brown', 'Clear']
    ],
    'eyeglasses' => [
        'id' => 'eyeglasses',
        'name' => 'Eyeglasses',
        'price' => 149.99,
        'image' => 'data/images/accessories/eyeglasses_300.png',
        'category' => 'accessories',
        'brand' => '',
        'description' => 'Comfortable prescription eyeglasses with anti-reflective coating',
        'colors' => ['Black', 'Tortoise', 'Silver']
    ],
    'bangle' => [
        'id' => 'bangle',
        'name' => 'Silver Bangle',
        'price' => 79.99,
        'image' => 'data/images/accessories/bangle_300.png',
        'category' => 'accessories',
        'brand' => '',
        'description' => 'Elegant silver bangle bracelet perfect for any occasion',
        'colors' => ['Silver', 'Gold']
    ],
    'bracelet' => [
        'id' => 'bracelet',
        'name' => 'Leather Bracelet',
        'price' => 49.99,
        'image' => 'data/images/accessories/bracelet_300.png',
        'category' => 'accessories',
        'brand' => '',
        'description' => 'Stylish leather bracelet with metal accents',
        'colors' => ['Brown', 'Black']
    ],
    'cap' => [
        'id' => 'cap',
        'name' => 'Baseball Cap',
        'price' => 29.99,
        'image' => 'data/images/accessories/cap_300.png',
        'category' => 'accessories',
        'brand' => 'nike',
        'description' => 'Classic baseball cap with adjustable strap',
        'colors' => ['Navy', 'Black', 'Gray']
    ],
    'earring' => [
        'id' => 'earring',
        'name' => 'Gold Earrings',
        'price' => 39.99,
        'image' => 'data/images/accessories/earring_300.png',
        'category' => 'accessories',
        'brand' => '',
        'description' => 'Beautiful gold hoop earrings',
        'colors' => ['Gold', 'Silver']
    ],
    'headband' => [
        'id' => 'headband',
        'name' => 'Sports Headband',
        'price' => 19.99,
        'image' => 'data/images/accessories/headband_300.png',
        'category' => 'accessories',
        'brand' => '',
        'description' => 'Moisture-wicking sports headband',
        'colors' => ['Black', 'White', 'Blue']
    ],
    'necklace' => [
        'id' => 'necklace',
        'name' => 'Pearl Necklace',
        'price' => 89.99,
        'image' => 'data/images/accessories/necklace_300.png',
        'category' => 'accessories',
        'brand' => '',
        'description' => 'Elegant pearl necklace with gold chain',
        'colors' => ['White', 'Cream']
    ],
    'ring' => [
        'id' => 'ring',
        'name' => 'Diamond Ring',
        'price' => 299.99,
        'image' => 'data/images/accessories/ring_300.png',
        'category' => 'accessories',
        'brand' => '',
        'description' => 'Beautiful diamond engagement ring',
        'colors' => ['Silver', 'Gold']
    ],
    'airconditioner' => [
        'id' => 'airconditioner',
        'name' => 'Split AC',
        'price' => 2499.99,
        'image' => 'data/images/appliances/airconditioner_300.png',
        'category' => 'appliances',
        'brand' => 'lg',
        'description' => '1.5 ton split air conditioner with inverter technology',
        'specs' => ['1.5 ton', 'Inverter', 'Energy efficient', 'Copper condenser']
    ],
    'coffeemachine' => [
        'id' => 'coffeemachine',
        'name' => 'Coffee Maker',
        'price' => 149.99,
        'image' => 'data/images/appliances/coffeemachine_300.png',
        'category' => 'appliances',
        'brand' => '',
        'description' => '12-cup programmable coffee maker',
        'specs' => ['12-cup', 'Programmable', 'Auto shut-off', 'Thermal carafe']
    ],
    'dryer' => [
        'id' => 'dryer',
        'name' => 'Hair Dryer',
        'price' => 79.99,
        'image' => 'data/images/appliances/dryer_300.png',
        'category' => 'appliances',
        'brand' => '',
        'description' => 'Professional ionic hair dryer with multiple heat settings',
        'specs' => ['Ionic technology', '3 heat settings', '2 speed settings', 'Concentrator nozzle']
    ],
    'humidifier' => [
        'id' => 'humidifier',
        'name' => 'Air Humidifier',
        'price' => 59.99,
        'image' => 'data/images/appliances/humidifier_300.png',
        'category' => 'appliances',
        'brand' => '',
        'description' => 'Ultrasonic cool mist humidifier for healthy air',
        'specs' => ['Ultrasonic', 'Cool mist', '7L tank', 'Auto shut-off']
    ],
    'mop' => [
        'id' => 'mop',
        'name' => 'Electric Mop',
        'price' => 199.99,
        'image' => 'data/images/appliances/mop_300.png',
        'category' => 'appliances',
        'brand' => '',
        'description' => 'Cordless electric mop with rechargeable battery',
        'specs' => ['Cordless', 'Rechargeable', 'Spin mop', 'Large cleaning area']
    ],
    'soundbar' => [
        'id' => 'soundbar',
        'name' => 'Soundbar Speaker',
        'price' => 349.99,
        'image' => 'data/images/appliances/soundbar_300.png',
        'category' => 'appliances',
        'brand' => 'sony',
        'description' => 'Wireless soundbar with subwoofer for immersive audio',
        'specs' => ['Wireless', 'Subwoofer included', 'Bluetooth', 'HDMI ARC']
    ],
    'standfan' => [
        'id' => 'standfan',
        'name' => 'Standing Fan',
        'price' => 89.99,
        'image' => 'data/images/appliances/standfan_300.png',
        'category' => 'appliances',
        'brand' => '',
        'description' => '16-inch oscillating standing fan with 3 speeds',
        'specs' => ['16-inch', 'Oscillating', '3 speeds', 'Height adjustable']
    ],
    'stove' => [
        'id' => 'stove',
        'name' => 'Electric Stove',
        'price' => 299.99,
        'image' => 'data/images/appliances/stove_300.png',
        'category' => 'appliances',
        'brand' => '',
        'description' => '4-burner electric stove with ceramic glass cooktop',
        'specs' => ['4 burners', 'Ceramic glass', 'Digital controls', 'Child lock']
    ],
    'toaster' => [
        'id' => 'toaster',
        'name' => 'Electric Toaster',
        'price' => 49.99,
        'image' => 'data/images/appliances/toaster_300.png',
        'category' => 'appliances',
        'brand' => '',
        'description' => '4-slice toaster with variable browning control',
        'specs' => ['4-slice', 'Variable browning', 'Auto pop-up', 'Removable crumb tray']
    ],
    'vacuumcleaner' => [
        'id' => 'vacuumcleaner',
        'name' => 'Vacuum Cleaner',
        'price' => 199.99,
        'image' => 'data/images/appliances/vacuumcleaner_300.png',
        'category' => 'appliances',
        'brand' => '',
        'description' => 'Lightweight cordless vacuum with HEPA filter',
        'specs' => ['Cordless', 'HEPA filter', 'Lightweight', 'Long battery life']
    ],
    'wallfan' => [
        'id' => 'wallfan',
        'name' => 'Wall Mount Fan',
        'price' => 69.99,
        'image' => 'data/images/appliances/wallfan_300.png',
        'category' => 'appliances',
        'brand' => '',
        'description' => '12-inch wall mount fan with remote control',
        'specs' => ['12-inch', 'Wall mount', 'Remote control', '3 speeds']
    ],
    'washingmachine' => [
        'id' => 'washingmachine',
        'name' => 'Washing Machine',
        'price' => 599.99,
        'image' => 'data/images/appliances/washingmachine_300.png',
        'category' => 'appliances',
        'brand' => 'samsung',
        'description' => '7kg front load washing machine with smart features',
        'specs' => ['7kg capacity', 'Front load', 'Smart wash', 'Energy efficient']
    ],
    'contactlenses' => [
        'id' => 'contactlenses',
        'name' => 'Contact Lenses',
        'price' => 39.99,
        'image' => 'data/images/accessories/contactlenses_300.png',
        'category' => 'accessories',
        'brand' => '',
        'description' => 'Monthly disposable contact lenses for clear vision',
        'specs' => ['Monthly', 'Disposable', 'UV protection', 'Comfort formula']
    ],
    'babybottle' => [
        'id' => 'babybottle',
        'name' => 'Baby Bottle',
        'price' => 12.99,
        'image' => 'data/images/babies/babybottle_300.png',
        'category' => 'babies',
        'brand' => '',
        'description' => 'Anti-colic baby bottle with slow flow nipple',
        'specs' => ['Anti-colic', 'Slow flow', 'BPA free', '8oz capacity']
    ],
    'babyboydress' => [
        'id' => 'babyboydress',
        'name' => 'Baby Boy Dress',
        'price' => 24.99,
        'image' => 'data/images/babies/babyboydress_300.png',
        'category' => 'babies',
        'brand' => '',
        'description' => 'Cute baby boy outfit with matching hat',
        'sizes' => ['0-3 months', '3-6 months', '6-9 months'],
        'colors' => ['Blue', 'Green', 'Yellow']
    ],
    'babygirldress' => [
        'id' => 'babygirldress',
        'name' => 'Baby Girl Dress',
        'price' => 29.99,
        'image' => 'data/images/babies/babygirldress_300.png',
        'category' => 'babies',
        'brand' => '',
        'description' => 'Adorable baby girl dress with bow details',
        'sizes' => ['0-3 months', '3-6 months', '6-9 months'],
        'colors' => ['Pink', 'Purple', 'White']
    ],
    'crib' => [
        'id' => 'crib',
        'name' => 'Baby Crib',
        'price' => 199.99,
        'image' => 'data/images/babies/crib_300.png',
        'category' => 'babies',
        'brand' => '',
        'description' => 'Convertible baby crib that grows with your child',
        'specs' => ['Convertible', 'Solid wood', 'Safety rails', 'Toddler bed conversion']
    ],
    'diaper' => [
        'id' => 'diaper',
        'name' => 'Baby Diapers',
        'price' => 19.99,
        'image' => 'data/images/babies/diaper_300.png',
        'category' => 'babies',
        'brand' => '',
        'description' => 'Ultra absorbent baby diapers with leak protection',
        'sizes' => ['Size 1 (8-14 lbs)', 'Size 2 (12-18 lbs)', 'Size 3 (16-28 lbs)'],
        'specs' => ['Ultra absorbent', 'Leak protection', 'Sensitive skin formula']
    ],
    'milkformula' => [
        'id' => 'milkformula',
        'name' => 'Baby Formula',
        'price' => 34.99,
        'image' => 'data/images/babies/milkformula_300.png',
        'category' => 'babies',
        'brand' => '',
        'description' => 'Infant milk formula with essential nutrients',
        'specs' => ['Complete nutrition', 'Iron fortified', 'Probiotics', 'Easy to digest']
    ],
    'slingcarrier' => [
        'id' => 'slingcarrier',
        'name' => 'Baby Sling Carrier',
        'price' => 49.99,
        'image' => 'data/images/babies/slingcarrier_300.png',
        'category' => 'babies',
        'brand' => '',
        'description' => 'Adjustable baby sling carrier for hands-free parenting',
        'specs' => ['Adjustable', 'Ergonomic', 'Machine washable', 'Multiple carrying positions']
    ],
    'belt' => [
        'id' => 'belt',
        'name' => 'Men\'s Leather Belt',
        'price' => 39.99,
        'image' => 'data/images/fashionmen/belt_300.png',
        'category' => 'fashionmen',
        'brand' => '',
        'description' => 'Genuine leather belt with classic buckle',
        'sizes' => ['32"', '34"', '36"', '38"', '40"'],
        'colors' => ['Black', 'Brown', 'Tan']
    ],
    'coat' => [
        'id' => 'coat',
        'name' => 'Winter Coat',
        'price' => 149.99,
        'image' => 'data/images/fashionmen/coat_300.png',
        'category' => 'fashionmen',
        'brand' => '',
        'description' => 'Warm winter coat with waterproof finish',
        'sizes' => ['S', 'M', 'L', 'XL', 'XXL'],
        'colors' => ['Black', 'Navy', 'Gray']
    ],
    'formalpants' => [
        'id' => 'formalpants',
        'name' => 'Formal Pants',
        'price' => 69.99,
        'image' => 'data/images/fashionmen/formalpants_300.png',
        'category' => 'fashionmen',
        'brand' => '',
        'description' => 'Professional formal pants with perfect fit',
        'sizes' => ['30x32', '32x32', '34x32', '36x32', '38x32'],
        'colors' => ['Black', 'Navy', 'Gray']
    ],
    'loafers' => [
        'id' => 'loafers',
        'name' => 'Leather Loafers',
        'price' => 89.99,
        'image' => 'data/images/fashionmen/loafers_300.png',
        'category' => 'fashionmen',
        'brand' => '',
        'description' => 'Comfortable leather loafers for office wear',
        'sizes' => ['7', '8', '9', '10', '11', '12'],
        'colors' => ['Black', 'Brown', 'Tan']
    ],
    'menbackpack' => [
        'id' => 'menbackpack',
        'name' => 'Men\'s Backpack',
        'price' => 89.99,
        'image' => 'data/images/fashionmen/menbackpack_300.png',
        'category' => 'fashionmen',
        'brand' => 'adidas',
        'description' => 'Durable waterproof backpack for daily use',
        'colors' => ['Black', 'Blue', 'Gray']
    ],
    'menjacket' => [
        'id' => 'menjacket',
        'name' => 'Men\'s Jacket',
        'price' => 119.99,
        'image' => 'data/images/fashionmen/menjacket_300.png',
        'category' => 'fashionmen',
        'brand' => '',
        'description' => 'Stylish bomber jacket with modern design',
        'sizes' => ['S', 'M', 'L', 'XL', 'XXL'],
        'colors' => ['Black', 'Navy', 'Olive']
    ],
    'mensandals' => [
        'id' => 'mensandals',
        'name' => 'Men\'s Sandals',
        'price' => 49.99,
        'image' => 'data/images/fashionmen/mensandals_300.png',
        'category' => 'fashionmen',
        'brand' => '',
        'description' => 'Comfortable leather sandals for casual wear',
        'sizes' => ['7', '8', '9', '10', '11', '12'],
        'colors' => ['Brown', 'Black', 'Tan']
    ],
    'menshorts' => [
        'id' => 'menshorts',
        'name' => 'Men\'s Shorts',
        'price' => 39.99,
        'image' => 'data/images/fashionmen/menshorts_300.png',
        'category' => 'fashionmen',
        'brand' => '',
        'description' => 'Comfortable cotton shorts for summer',
        'sizes' => ['30', '32', '34', '36', '38'],
        'colors' => ['Khaki', 'Navy', 'Black']
    ],
    'menwallet' => [
        'id' => 'menwallet',
        'name' => 'Men\'s Wallet',
        'price' => 34.99,
        'image' => 'data/images/fashionmen/menwallet_300.png',
        'category' => 'fashionmen',
        'brand' => '',
        'description' => 'Genuine leather wallet with multiple card slots',
        'colors' => ['Black', 'Brown', 'Tan']
    ],
    'messengerbag' => [
        'id' => 'messengerbag',
        'name' => 'Messenger Bag',
        'price' => 79.99,
        'image' => 'data/images/fashionmen/messengerbag_300.png',
        'category' => 'fashionmen',
        'brand' => '',
        'description' => 'Professional messenger bag with laptop compartment',
        'colors' => ['Black', 'Brown', 'Gray']
    ],
    'anti-freeze' => [
        'id' => 'anti-freeze',
        'name' => 'Anti-Freeze Coolant',
        'price' => 24.99,
        'image' => 'data/images/automotive/anti-freeze_300.png',
        'category' => 'automotive',
        'brand' => '',
        'description' => 'Premium anti-freeze coolant for vehicle engines',
        'specs' => ['-34°F protection', 'Long life formula', 'Compatible with all vehicles']
    ],
    'brakefluid' => [
        'id' => 'brakefluid',
        'name' => 'Brake Fluid',
        'price' => 14.99,
        'image' => 'data/images/automotive/brakefluid_300.png',
        'category' => 'automotive',
        'brand' => '',
        'description' => 'High performance DOT 4 brake fluid',
        'specs' => ['DOT 4', 'High boiling point', 'Corrosion protection', '32oz bottle']
    ],
    'engineoil' => [
        'id' => 'engineoil',
        'name' => 'Engine Oil',
        'price' => 29.99,
        'image' => 'data/images/automotive/engineoil_300.png',
        'category' => 'automotive',
        'brand' => '',
        'description' => 'Synthetic motor oil for high performance engines',
        'specs' => ['Full synthetic', '5W-30', 'API certified', '5 quart jug']
    ],
    'grease' => [
        'id' => 'grease',
        'name' => 'Wheel Bearing Grease',
        'price' => 12.99,
        'image' => 'data/images/automotive/grease_300.png',
        'category' => 'automotive',
        'brand' => '',
        'description' => 'High temperature wheel bearing grease',
        'specs' => ['High temperature', 'Water resistant', '14oz cartridge']
    ],
    'helmet' => [
        'id' => 'helmet',
        'name' => 'Motorcycle Helmet',
        'price' => 89.99,
        'image' => 'data/images/automotive/helmet_300.png',
        'category' => 'automotive',
        'brand' => '',
        'description' => 'Full face motorcycle helmet with safety certification',
        'specs' => ['DOT certified', 'Full face', 'Ventilation system', 'Adjustable padding']
    ],
    'motorcycle' => [
        'id' => 'motorcycle',
        'name' => 'Motorcycle',
        'price' => 2499.99,
        'image' => 'data/images/automotive/motorcycle_300.png',
        'category' => 'automotive',
        'brand' => '',
        'description' => '125cc commuter motorcycle with fuel efficiency',
        'specs' => ['125cc engine', 'Fuel efficient', 'Electric start', 'ABS brakes']
    ],
    'powersteeringfluid' => [
        'id' => 'powersteeringfluid',
        'name' => 'Power Steering Fluid',
        'price' => 16.99,
        'image' => 'data/images/automotive/powersteeringfluid_300.png',
        'category' => 'automotive',
        'brand' => '',
        'description' => 'Universal power steering fluid for most vehicles',
        'specs' => ['Universal formula', 'High performance', '32oz bottle']
    ],
    'sealer' => [
        'id' => 'sealer',
        'name' => 'Tire Sealant',
        'price' => 19.99,
        'image' => 'data/images/automotive/sealer_300.png',
        'category' => 'automotive',
        'brand' => '',
        'description' => 'Quick tire repair sealant for emergency fixes',
        'specs' => ['Quick repair', 'Emergency use', '16oz can', 'Works on all tires']
    ],
    'transmissionfluid' => [
        'id' => 'transmissionfluid',
        'name' => 'Transmission Fluid',
        'price' => 34.99,
        'image' => 'data/images/automotive/transmissionfluid_300.png',
        'category' => 'automotive',
        'brand' => '',
        'description' => 'Automatic transmission fluid for smooth shifting',
        'specs' => ['Automatic transmission', 'Smooth shifting', 'Wear protection', '1 gallon']
    ]
];
?>
