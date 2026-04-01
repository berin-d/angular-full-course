export class CollectionItem {
    id = -1;
    name = "Green Slime";
    description = "A default very useful green slime";
    rarity = "Legendary";
    image = "img/pngegg-green.png";
    price = 199;

    copy(){
        return Object.assign(new CollectionItem(), this);
    }
}
