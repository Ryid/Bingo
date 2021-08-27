class controller {
    constructor() {
        if (controller.instance) {
            return controller.instance
        }
        controller.instance = this
    }

    userList = new Array();
    getUser() {
        return this.userList;
    }
    postUser(user) {
        if(!this.userList.includes(user)){
            this.userList.push(user);
        }
    }
}

module.exports = new controller();