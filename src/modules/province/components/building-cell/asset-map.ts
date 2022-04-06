import { Building } from "@app/core/entities/building";

export const assetMap: Record<
	Building["name"],
	{ assetName: string; description: string }
> = {
	admiralty: {
		assetName: "admiralty.webp",
		description:
			"The Admiralty allows exotic resources to be imported into the coastal village",
	},
	armoury: {
		assetName: "armory.webp",
		description:
			"The Armoury is required for training armored units within the town",
	},
	axeSmith: {
		assetName: "axes_mastery.webp",
		description: "The Axe Smith is required for training units armed with axes",
	},
	bakery: {
		assetName: "bakery.webp",
		description:
			"The Bakery increases the ability of the town to support its citizens with pastries. It increases both food storage and food supply",
	},
	ballistaTowers: {
		assetName: "ballista_towers.webp",
		description:
			"The Ballista Towers are equipped with ballistae. During sieges and assaults, they automatically fire missiles towards the enemy",
	},
	beeYard: {
		assetName: "hives.webp",
		description:
			"The Bee Yard features bee-hives, which produce honey and beeswax",
	},
	bulwark: {
		assetName: "bulwark.webp",
		description:
			"The Bulwark is a massive stone wall designed to protect the town. It increases the amount of time needed for the enemy to take the town by siege. It also reduces the attrition amongst the defenders",
	},
	butcher: {
		assetName: "butchery.webp",
		description:
			"The Butcher supplies the citizens with fresh meat. This ensures that the towns will endure longer when under siege",
	},
	catapults: {
		assetName: "catapults.webp",
		description:
			"The Catapults are placed on the drum towers. They increase the attrition that the enemy armies suffer during sieges. The catapults on the towers are very deadly and shoot automatically during assaults",
	},
	cathedral: {
		assetName: "cathedral.webp",
		description:
			"The Cathedral raises more piety in your province than a simple church. Orthodox Christians need a cathedral to be able to claim independence from the church",
	},
	cattleFarm: {
		assetName: "cattle_farm.webp",
		description:
			"The Cattle Farm supplies cattle, which can be used to strengthen the economy of the town",
	},
	cauldrons: {
		assetName: "cauldrons.webp",
		description:
			"The Cauldrons are placed on top of the gates. During assaults, they cause deadly damage to enemies who try to breach the gates",
	},
	chainMailWorkshop: {
		assetName: "chain_mail.webp",
		description:
			"The Chain Mail Workshop is required for training chainmail-wearing units within the town",
	},
	church: {
		assetName: "church.webp",
		description:
			"The Church increases and raises piety in the provinces. It also raises the price for religious conversions in this province",
	},
	coastGuard: {
		assetName: "coast_guard.webp",
		description:
			"The Coast Guard watches for enemy ships in the nearby coastal waters. If the enemy attempts to land on this realm's coastline, the Coast Guards will rise to prevent the landing",
	},
	cornerTowers: {
		assetName: "corner_towers.webp",
		description:
			"The Corner Towers strengthen the town's fortifications. They increase the attrition suffered by the besieging enemy. They also provide outstanding tactical positions for the defending archers during assaults",
	},
	docks: {
		assetName: "docks.webp",
		description:
			"The Docks allow small trading ships to moor in coastal villages, making them more profitable. As a result, the food supply for the town is also increased",
	},
	drumTowers: {
		assetName: "wall_platforms.webp",
		description:
			"The Drum Towers are half-round towers set in the walls, which create additional space for units. Drum towers increase the attrition that the enemy army suffers during sieges",
	},
	dyesWorkshop: {
		assetName: "dyes_workshop.webp",
		description: "The Dyes Workshop processes minerals and prepares dyes",
	},
	fishmongery: {
		assetName: "fisherman.webp",
		description: "The Fishmongery increases the food supply in the town",
	},
	fletcher: {
		assetName: "fletcher.webp",
		description:
			"The Fletcher crafts bows and arrows. He is necessary in order to train ranged units within the town",
	},
	gateTowers: {
		assetName: "gate_towers.webp",
		description:
			"The Gate Towers strengthen the town's gates. Gates protected by towers are much harder to breach. They also provide defending archers with an outstanding tactical position for shooting at enemies",
	},
	granary: {
		assetName: "granary.webp",
		description:
			"The Granary increases the town's food storage. Increased food storage allows the town to endure enemy sieges for a much longer period of time",
	},
	halberdMastersmithy: {
		assetName: "halberd_master.webp",
		description:
			"The Halberd Mastersmithy is required to train units armed with halberds",
	},
	harbour: {
		assetName: "harbour.webp",
		description:
			"The Harbour allows bigger ships to anchor in the province, which in turn increases the gold income",
	},
	hempField: {
		assetName: "hemp_field.webp",
		description:
			"The Hemp Field is an area of fields that grow hemp. Hemp is used for making linen",
	},
	hostel: {
		assetName: "hostel.webp",
		description:
			"The Hostel provides more space for travelers and workers. It also increases the number of workers in the province. The citizens gather here to entertain themselves, which increases the town's overall happiness",
	},
	huntersHuts: {
		assetName: "hunters_huts.webp",
		description:
			"The Hunter's Huts are where the hunters skin and prepare their hunted animals",
	},
	inkMaker: {
		assetName: "ink_maker.webp",
		description: "The Ink Maker is where ink is produced",
	},
	inn: {
		assetName: "inn.webp",
		description:
			"The Inn provides basic space for travelers and workers. It also increases the number of serfs in the province. The citizens spend time here drinking ale and singing, increasing the town's overall happiness",
	},
	library: {
		assetName: "library.webp",
		description:
			"The Library is where enlightened scribes work to increase the number of books written in the kingdom",
	},
	market: {
		assetName: "market.webp",
		description:
			"The Market provides space for traders to exchange their goods, increasing the town's gold income",
	},
	merchantGuild: {
		assetName: "merchant_guild.webp",
		description:
			"The Merchant Guild provides the wealthiest merchants in town with a place to create rules in order to enhance their profits. It increases the town's gold income",
	},
	moat: {
		assetName: "trench.webp",
		description:
			"The Moat is a trench full of water encircling the citadel and can only be crossed via a drawbridge. Moats are the most sophisticated form of fortification and make the town almost invincible against enemy assault",
	},
	palisade: {
		assetName: "palisade.webp",
		description:
			"The Palisade is the most basic shelter for citizens during times of enemy invasion. Without it, towns are instantly invaded, which usually results in many casualties",
	},
	parchmentMaker: {
		assetName: "parchment_maker.webp",
		description:
			"The Parchment Maker is where parchment is made from sheep skin",
	},
	pickler: {
		assetName: "pickler.webp",
		description:
			"The Pickler uses salt to preserve fresh fish, thereby increasing food storage and the food supply for the town",
	},
	plateArmourer: {
		assetName: "plate_armor.webp",
		description:
			"The Plate Armourer crafts the most sophisticated pieces of medieval harness. He is required to train high-class units within the town",
	},
	quarry: {
		assetName: "quarry.webp",
		description:
			"The Quarry is a particular type of opencast mine from which marble is extracted",
	},
	riggersStore: {
		assetName: "tackling_maker.webp",
		description:
			"The Rigger's Store is where riggers produce and sell tackling",
	},
	saltMine: {
		assetName: "brinepit_mine.webp",
		description:
			"The Salt Mine extracts salt from brine. Salt was very important in medieval daily life for preserving and flavoring food",
	},
	scaleArmourer: {
		assetName: "scale_armor.webp",
		description:
			"The Scale Armourer is needed to train scale mail-wearing units within the town",
	},
	scribesOffice: {
		assetName: "scribe.webp",
		description:
			"The Scribe's Office gathers the most talented and ambitious members of the clergy",
	},
	sculptorsGuild: {
		assetName: "sculptors_guild.webp",
		description:
			"The Sculptors Guild is where sculptors can gather together to sculpt and sell statues",
	},
	sheepFarm: {
		assetName: "sheep_farm.webp",
		description:
			"The Sculptor's Guild is where sculptors can gather together to sculpt and sell statues",
	},
	siegeWorkshop: {
		assetName: "siege_workshop.webp",
		description:
			"The Siege Workshop is required to build siege equipment within the town",
	},
	silverMine: {
		assetName: "silver_mine.webp",
		description:
			"The Silver Mine extracts pure silver from silver ore. Silver is a rare commodity and strengthens the town's economy, increasing its gold income",
	},
	spearMaker: {
		assetName: "spear_master.webp",
		description: "The Spear Maker is required to train units armed with spears",
	},
	spinningMill: {
		assetName: "spinnig_wheel.webp",
		description:
			"The Spinning Mill is a place with spinning wheels, which process sheep wool into yarn",
	},
	stable: {
		assetName: "stable.webp",
		description:
			"The Stable is required to train mounted units within the town",
	},
	stonemason: {
		assetName: "stonemason.webp",
		description:
			"The Stone Wall causes enemies to suffer attrition during sieges",
	},
	stoneWall: {
		assetName: "stone_wall.webp",
		description: "The Stonemason is where masons craft stone columns",
	},
	stud: {
		assetName: "horse_breed.webp",
		description: "The Stud is an area of fields used for breeding horses",
	},
	swordMastersmithy: {
		assetName: "swords_master.webp",
		description:
			"In Sword Mastersmithy, highly skilled smiths forge advanced swords, which are required to train high-class units within the town",
	},
	swordsmith: {
		assetName: "swordsmith.webp",
		description:
			"The Swordsmith is required to train units armed with a sword within the town",
	},
	tailor: {
		assetName: "tailor.webp",
		description: "The Tailor sews clothing for the citizens",
	},
	tannery: {
		assetName: "tannery.webp",
		description:
			"The Tannery is where the tanner makes leather from cattle hides",
	},
	taxCollectorsOffice: {
		assetName: "tax_collector_office.webp",
		description:
			"The Tax Collector's Office is the office of the King's tax collectors. It increases the town's gold income",
	},
	toolSmithy: {
		assetName: "toolsmith.webp",
		description:
			"The Tool Smithy supplies the town with quality tools. It increases the number of serfs available in the province",
	},
	townWatchHouse: {
		assetName: "town_watch.webp",
		description:
			"The Town Watch House hosts the Town Guards. The larger the town, the greater the number of guards hosted here. Town Guards are very strong and are very helpful during enemy assaults",
	},
	trainingGrounds: {
		assetName: "training_grounds.webp",
		description:
			"The Training Grounds are required to train any military units other than Peasants",
	},
	university: {
		assetName: "university.webp",
		description:
			"The University allows talented and ambitious authors to write many books",
	},
	vineyard: {
		assetName: "vineyard.webp",
		description: "The Vineyard is an area with yards to grow vines for grapes",
	},
	waxMaker: {
		assetName: "wax_maker.webp",
		description:
			"The Wax Maker is the building where beeswax is processed into much more usable forms",
	},
	weavingMill: {
		assetName: "weaver.webp",
		description:
			"The Weaving Mill is a building where the weavers create linen from hemp",
	},
	winery: {
		assetName: "winery.webp",
		description:
			"The Winery is where grapes are pressed and the juices are made into wine",
	},
};
