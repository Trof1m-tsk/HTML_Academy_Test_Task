const main = document.querySelector('.main');

const DATA = [
    {
        "title": "Как убрать косточку на ноге",
        "author": "User235235",
        "time": "2011-04-22 18:25:43",
        "text": "Чтобы убрать косточку на ноге нужно всего лишь...",
        "link": "https://wikipedia.com",
        "isRead": false,
    },
    {  
        "title": "Как скинуть 30кг за ночь",
        "author": "Travolta",
        "time": "2012-04-23 11:16:03",
        "text": "На ночь выпейте стакан воды с...",
        "link": "https://wikipedia.com",
        "isRead": false,
    },
    {
        "title": "Женщина дожила до 200 лет",
        "author": "pazan666",
        "time": "2012-05-23 07:23:35",
        "text": "Каждое утро пере едой она делала...",
        "link": "https://wikipedia.com",
        "isRead": false,
    },
    {
        "title": "Подборка анекдотов",
        "author": "chika01",
        "time": "2012-07-20 19:35:34",
        "text": "Приходит петька к Василию Ивановичу и говорит...",
        "link": "https://wikipedia.com",
        "isRead": false,
    }
];

function renderIcon(data) {
    const messageIcon = document.createElement('div');

    messageIcon.classList.add('message_icon', 'message_icon--hidden')
    messageIcon.textContent = data.length;
    main.append(messageIcon);

    messageIcon.addEventListener('click', () => {
        const renderedNews = document.querySelector('.news');

        if (!renderedNews) {
            renderNewsWidget(data);
            hideIcon();
        } else if (renderedNews.classList.contains('news--hidden')) {
            showNewsWidget();
            hideIcon();
        } else {
            hideNewsWidget();
            showIcon();
        }
    });

    //имитация задержки поучения данных с сервера.
    setTimeout(() => {
        messageIcon.classList.remove('message_icon--hidden');
    }, 1000);
}

function showIcon() {
    document.querySelector('.message_icon').classList
        .remove('message_icon--hidden');
}

function hideIcon() {
    document.querySelector('.message_icon').classList
        .add('message_icon--hidden');
}

function renderNewsWidget(data) {
    const news = document.createElement('section');
    const newsTitle = document.createElement('h2');
    const newsCloseBtn = document.createElement('button');
    const newsContainer = document.createElement('div');

    news.classList.add('news', 'news--hidden');
    newsTitle.textContent = 'лента';
    newsTitle.classList.add('news__title');
    newsCloseBtn.classList.add('news__close_btn');
    newsContainer.classList.add('news__container');
    news.append(newsTitle);
    news.append(newsCloseBtn);

    data.forEach(el => {
        newsContainer.append(renderMessage(el));
    });
    news.append(newsContainer);
    main.append(news);

    newsCloseBtn.addEventListener('click', () => {
        hideNewsWidget();
        showIcon();
    })

    window.addEventListener('keydown', function(evt) {
        if (evt.key === 'Escape') {
            hideNewsWidget();
            showIcon();
        }
    })

    setTimeout(() => {
        showNewsWidget(news)
    }, 200)
}

function showNewsWidget(news) {
    document.querySelector('.news').classList.remove('news--hidden');
}

function hideNewsWidget(news) {
    document.querySelector('.news').classList.add('news--hidden');
}

function renderMessage(data) {
    const newItem = document.createElement('div');
    const newTitle = document.createElement('h3');
    const newText = document.createElement('p');
    const newTimeAuthorWrpr = document.createElement('div');
    const newAuthor = document.createElement('p');
    const newTime = document.createElement('p');
    const newLink = document.createElement('a');

    newItem.classList.add('news__new', 'news__new--not-read');
    newTitle.classList.add('news__mew_title');
    newText.classList.add('news__mew_text');
    newTimeAuthorWrpr.classList.add('news__new_time-author-wrpr');
    newAuthor.classList.add('news__new_author');
    newTime.classList.add('news__new_time');
    newLink.classList.add('news__new_link');

    newTitle.textContent = data.title;
    newText.textContent = data.text;
    newAuthor.textContent = data.author;
    newTime.textContent = data.date;
    newLink.textContent = 'Подробнее...'
    newLink.setAttribute('href', data.link);
    newLink.setAttribute('target', '__blank');

    newTimeAuthorWrpr.append(newAuthor);
    newTimeAuthorWrpr.append(newTime);
    newItem.append(newTitle);
    newItem.append(newText);
    newItem.append(newLink);
    newItem.append(newTimeAuthorWrpr);

    newItem.addEventListener('click', () => {
        newItem.classList.remove('news__new--not-read');

        const unreadMessagesNum = document.querySelectorAll('.news__new--not-read').length;

        document.querySelector('.message_icon').textContent =
            unreadMessagesNum > 0 ? unreadMessagesNum : null;
    });

    return newItem;
}

renderIcon(DATA);
