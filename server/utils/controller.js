class controller {
    constructor() {
        if (controller.instance) {
            return controller.instance
        }
        controller.instance = this;
        this.win = false;
        this.winner = '';
    }

    userList = new Array();

    // 取得使用者
    getUser() {
        return this.userList;
    }
    // 新增使用者
    postUser(user) {
        if (!this.userList.includes(user)) {
            this.userList.push(user);
        }
    }

    // 是否有獲勝者    
    checkWinner() {
        return this.win;
    }
    // 產生獲勝者
    getWin() {
        this.win = true;
    }
    // 放入贏家名稱
    setWinnerName(user) {
        this.winner = user;
    }
    getWinnerName() {
        return this.winner;
    }

}

module.exports = new controller();