interface IAbstractProductA {
    methodA(): string;
}
interface IAbstractProductB {
    methodB(): number;
}

interface IAbstractFactory {
    createProductA(param?: any) : IAbstractProductA;
    createProductB() : IAbstractProductB;
}


class ProductA1 implements IAbstractProductA {
    methodA = () => {
        return "This is methodA of ProductA1";
    }
}
class ProductB1 implements IAbstractProductB {
    methodB = () => {
        return 1;
    }
}

class ProductA2 implements IAbstractProductA {
    methodA = () => {
        return "This is methodA of ProductA2";
    }
}
class ProductB2 implements IAbstractProductB {
    methodB = () => {
        return 2;
    }
}


class ConcreteFactory1 implements IAbstractFactory {
    createProductA(param?: any) : IAbstractProductA {
        return new ProductA1();
    }

    createProductB(param?: any) : IAbstractProductB {
        return new ProductB1();
    }
}
class ConcreteFactory2 implements IAbstractFactory {
    createProductA(param?: any) : IAbstractProductA {
        return new ProductA2();
    }

    createProductB(param?: any) : IAbstractProductB {
        return new ProductB2();
    }
}


class Tester {
    private abstractProductA: IAbstractProductA;
    private abstractProductB: IAbstractProductB;

    constructor(factory: IAbstractFactory) {
        this.abstractProductA = factory.createProductA();
        this.abstractProductB = factory.createProductB();
    }

    public test(): void {
        console.log(this.abstractProductA.methodA());
        console.log(this.abstractProductB.methodB());
    }
}

(function main() {

    // Abstract factory1
    var factory1: IAbstractFactory = new ConcreteFactory1();
    var tester1: Tester = new Tester(factory1);
    tester1.test();

    // Abstract factory2
    var factory2: IAbstractFactory = new ConcreteFactory2();
    var tester2: Tester = new Tester(factory2);
    tester2.test();

}());