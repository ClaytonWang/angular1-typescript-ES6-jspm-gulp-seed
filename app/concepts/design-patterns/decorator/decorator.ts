interface IComponent {
    operation(): void;
}

class ConcreteComponent implements IComponent {
    private s: String;

    constructor(s: String) {
        this.s = s;
    }

    public operation(): void {
        console.log("`operation` of ConcreteComponent", this.s, " is being called!");
    }
}

class AbstractDecorator implements IComponent {
    private component: IComponent;
    private id: Number;

    constructor(id: Number, component: IComponent) {
        this.id = id;
        this.component = component;
    }

    public get Id(): Number {
        return this.id;
    }

    public operation(): void {
        console.log("`operation` of Decorator", this.id, " is being called!");
        this.component.operation();
    }
}

class ConcreteDecorator extends AbstractDecorator {
    constructor(id: Number, component: IComponent) {
        super(id, component);
    }

    public operation(): void {
        super.operation();
        console.log("`operation` of ConcreteDecorator", this.Id, " is being called!");
    }
}

(function main() {
    var decorator1: AbstractDecorator = new ConcreteDecorator(1, new ConcreteComponent("Comp1"));

    decorator1.operation();
}());