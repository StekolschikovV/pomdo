import {observable, action} from 'mobx'

class TestStore {
  @observable loading = true;
  @observable tttt = 'ssss';

  @action loadingCompleted() {
    this.loading = false;
  }

  @action toggleLoading() {
    this.loading = this.loading ? false : true;
    console.log(this.loading);
  }
}

export default new TestStore();