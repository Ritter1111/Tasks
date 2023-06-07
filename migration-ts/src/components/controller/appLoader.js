import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '4635dcf20dd14584a3402807405a4ca8', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
