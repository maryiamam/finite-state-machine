class FSM {
    constructor(config) {
            this.state = "normal";
            this.states = ['normal', 'busy', 'hungry', 'sleeping'];
            this.history = new Array();
            this.history[0] = "normal";
            this.co = 1;
            this.c = 0;
            if (config == undefined) {
                throw new Exception("Config isn't passed.");
            }
    }
    
    getState() {
        return this.state;
    }
    
    changeState(state) {
            var flag = false;
            for (var i = 0; i < 4; i++) {
                if (state == this.states[i]) {
                    flag = true;
                }
            }
            if (!flag) {
                throw new Exception("State isn't exist.");
            }
            this.state = state;
            this.c++;
            this.history[this.c] = state;
            this.co = this.c + 1;
    }
    
    trigger(event) {
            if (this.checkCorrectTrigger(event)) {
                this.changeState(this.goTrig(event));
            } else {
                throw new Exception("Event in current state isn't exist.");
            }
    }
    
    reset() {
        this.changeState("normal");
    }

    getStates(event) {
        if (event == undefined) {
            return this.states;
        }
        switch (event) {
            case "study": {
                return new Array('normal');
            }
            case "get_hungry": {
                return new Array('busy', 'sleeping');
            }
            case "get_tired": {
                return new Array('busy');
            }
            case "get_up": {
                return new Array('sleeping');
            }
            case "eat": {
                return new Array('hungry');
            }
            default:
                return new Array();
        }
    }
   
    undo() {
        if (this.c == 0) {
            return false;
        }
        this.c--;
        this.state = this.history[this.c];
        return true;

    }
    
    redo() {
        if (this.co > this.c + 1) {
            this.c++;
            this.state = this.history[this.c];
            return true;
        }
        return false;
    }

    clearHistory() {
        this.history = new Array(["normal"]);
        this.state = "normal";
        this.co = 1;
        this.c = 0;
    }

    checkCorrectTrigger(eve) {
        if ((this.state == "normal" && eve == "study") ||
            this.state == "busy" && eve == "get_tired" ||
            this.state == "busy" && eve == "get_hungry" ||
            this.state == "hungry" && eve == "eat" ||
            this.state == "sleeping" && eve == "get_hungry" ||
            this.state == "sleeping" && eve == "get_up") {
            return true;
        }
        return false;
    }

    goTrig(eve) {
        switch (eve) {
            case "study": {
                return "busy";
            }
            case "get_tired": {
                return "sleeping";
            }
            case "get_hungry": {
                return "hungry";
            }
            case "eat": {
                return "normal";
            }
            case "get_up": {
                return "normal";
            }
        }
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
