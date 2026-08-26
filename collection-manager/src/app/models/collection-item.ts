export const Rarities = {
    Common: "Common",
    Uncommon: "Uncommon",
    Rare: "Rare",
    Legendary: "Legendary",
}

export type Rarity = typeof Rarities[keyof typeof Rarities];

export class CollectionItem {
    id = -1;
    name = "";
    description = "";
    rarity: Rarity = Rarities.Common;
    image = "";
    price = 0;

    copy(){
        return Object.assign(new CollectionItem(), this);
    }
}
