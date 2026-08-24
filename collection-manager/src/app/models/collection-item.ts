export const Rarities = {
    Common: "Common",
    Uncommon: "Uncommon",
    Rare: "Rare",
    Legendary: "Legendary",
}

export type Rarity = typeof Rarities[keyof typeof Rarities];

export class CollectionItem {
    id = -1;
    name = "Green Slime";
    description = "A default very useful green slime";
    rarity: Rarity = Rarities.Legendary;
    image = "img/pngegg-green.png";
    price = 199;

    copy(){
        return Object.assign(new CollectionItem(), this);
    }
}
