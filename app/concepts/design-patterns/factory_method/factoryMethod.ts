interface IAbstractProduct {
    method(param?: any) : void;
}

class ConcreteProductA implements IAbstractProduct {
    method = (param?: any) => {
        return "This is method of ConcreteProductA";
    }
}

class ConcreteProductB implements IAbstractProduct {
    method = (param?: any) => {
        return "This is method of ConcreteProductB";
    }
}


class ProductFactory {
    public static createProduct(type: string) : IAbstractProduct {
        if (type === "A") {
            return new ConcreteProductA();
        } else if (type === "B") {
            return new ConcreteProductB();
        }

        return null;
    }
}

(function main() {
    var a: IAbstractProduct = ProductFactory.createProduct("A");
    var b: IAbstractProduct = ProductFactory.createProduct("B");

    console.log(a.method());
    console.log(b.method());
}());