import {observable, action} from 'mobx'

class Store 
{

    // --- timer
    @observable timerStatus = false;
    @observable timerTime = 1500;
    @action timerStatusToggler() 
    {
        this.timerStatus = !this.timerStatus;
        this.timerLoop();
    }
    @action timerRest() 
    {
        this.timerTime = 1500;
    }
    @action timerLoop() 
    {
        setTimeout(() => {
            let isTime = this.timerTime > 0;
            if(isTime) {
                if(this.timerStatus) {
                    this.timerTime--;
                    this.timerLoop();
                } else {
                    this.timerRest();
                }
            } else {
                this.timerRest();
            }
        }, 1000);
    }
    // timer ---

}

export default new Store();