class controller {
    constructor() {
        if (controller.instance) {
            return controller.instance
        }
        controller.instance = this;
        // 亂數模式
        this.win = false;
        this.winner = '';
        // 玩家選擇模式
        this.winPC = false;
        this.winnerPC = '';
        // 玩家選擇模式目前輪次&判定寫入
        this.now = 0;
        this.write = false;
    }

    userList = new Array();
    userListPC = new Array();

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

    // 取得PlayerChoice模式使用者
    getUserPC() {
        return this.userListPC;
    }
    // 新增使用者
    postUserPC(user) {
        if (!this.userListPC.includes(user)) {
            this.userListPC.push(user);
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
    // 得到贏家名稱
    getWinnerName() {
        return this.winner;
    }

    // 是否有獲勝者-playerChoice模式    
    checkWinnerPC() {
        return this.winPC;
    }
    // 產生獲勝者-player   
    getWinPC() {
        this.winPC = true;
    }
    // 放入贏家名稱-player   
    setWinnerNamePC(user) {
        this.winnerPC = user;
    }
    // 得到贏家名稱-player   
    getWinnerNamePC() {
        return this.winnerPC;
    }

    // 判定目前是誰要輸入數字
    nowGamer() {
        return this.userListPC[this.now]
    }
    // 輪到下一位使用者
    nextGamer() {
        if (this.now < this.userListPC.length - 1) {
            return this.now += 1;
        } else {
            return this.now = parseInt(0);
        }
    }
    // 放入數字
    setNumber(num) {
        return this.num = num;
    }
    // 取出數字
    getNumber() {
        return this.num;
    }
    // 判斷是否要寫入數字
    checkWrite() {
        return this.write;
    }
    setWrite() {
        return this.write = !this.write;
    }

}

module.exports = new controller();