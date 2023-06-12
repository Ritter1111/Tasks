import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: '82e15d18d1a54f738fe3b52d2b6d9d57', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;

// 4635dcf20dd14584a3402807405a4ca8
