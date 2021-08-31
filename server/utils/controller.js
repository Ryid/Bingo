class controller {
    constructor() {
        if (controller.instance) {
            return controller.instance
        }
        controller.instance = this;
        this.win = false;
        this.winner = '';
        this.now = 0;
        this.write= false;
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
    // 得到贏家名稱
    getWinnerName() {
        return this.winner;
    }

    // 判定目前是誰要輸入數字
    nowGamer() {
        return this.userList[this.now]
    }
    // 輪到下一位使用者
    nextGamer() {
        if (this.now < this.userList.length - 1) {
            return this.now += 1;
        } else {
            return this.now = parseInt(0);
        }
    }
    // 放入數字
    setNumber(num){
        return this.num=num;
    }
    // 取出數字
    getNumber(){
        return this.num;
    }
    // 判斷是否要寫入數字
    checkWrite(){
        return this.write;
    }
    setWrite(){
        return !this.write;      
    }

}

module.exports = new controller();