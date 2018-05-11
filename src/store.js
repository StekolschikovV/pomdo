import {observable, action} from 'mobx'

const REST_TIME = 300;
const WORK_TIME = 1500;

class Store 
{

    @observable screenIndex = 0;

    // --- timer
    @observable timerStatus = false;
    @observable timerIsWorkStatus = true;
    @observable timerTime = WORK_TIME;
    @action timerStatusToggler()
    {
        this.timerStatus = !this.timerStatus;
        this.timerLoop();
    }
    @action timerRest() 
    {
        this.timerTime = WORK_TIME;
    }
    @action timerRestToRest()
    {
        this.timerTime = REST_TIME;
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
                if(this.timerIsWorkStatus){
                    this.timerRestToRest();
                    this.timerIsWorkStatus = false;
                    this.timerLoop();
                } else {
                    this.timerRest();
                    this.timerIsWorkStatus = true;
                    this.timerStatus = false;
                }
            }
        }, 1000);
    }
    // timer ---

}

export default new Store();