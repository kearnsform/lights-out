class Button {
    constructor(actionCallback) {
        this.isOn = false;
        this.actionCallback = actionCallback;
    }

    toggle() {
        if (this.isOn) {
            this.turnOff();
        } else {
            this.turnOn();
        }
    }

    turnOff() {
        this.isOn = false;
        this.actionCallback(this);
    }

    turnOn() {
        this.isOn = true;
        this.actionCallback(this);
    }
}