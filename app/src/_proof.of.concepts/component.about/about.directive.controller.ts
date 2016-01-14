'use strict';

class AboutDirectiveController {


    static $inject = ['$scope'];

    static controllerFactory($scope) {
        return new AboutDirectiveController($scope);
    }

    constructor($scope) {
        console.log('I am the about component! I know what I am about!');
    }

    testMethod() {
        console.log('who clicked me!');
    }

    addUp(a: number, b: number) {
        return a + b;
    }

}

export {AboutDirectiveController}
