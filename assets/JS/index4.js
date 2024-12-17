function UrlSearh(name) {
    const url = new URLSearchParams(window.location.search);
    return url.get(name);
}

window.onload = function () {
    const CardId = UrlSearh('id');
    if (CardId) {
        fetch(`https://6729b8f86d5fa4901b6e13bc.mockapi.io/attractions/${CardId}`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(response => response.json())
        .then(desp => {
            render(desp); // Рендерим данные о достопримечательности
            loadReviews(desp.id); // Загружаем отзывы
        })
        .catch(error => console.log(error));
    }
};

function render(desp) {
    const modal = document.getElementById('modal-index4');
    modal.innerHTML = `
        <div class="modal-index4__box">
            <button id="button-index4">
                <a href='index2.html' style='width: 100%;height:100%;display:flex'>
                    <img src="./assets/img/Arrow left(1).svg" alt="">
                </a>
            </button>
            <h1>${desp.name}</h1>
            <div id='box' style='display: flex; justify-content: space-between;align-items:flex-start;margin:70px 20px;'>
                <div class="modal-index4__box-left">    
                    <div class="modal-index4__box-img"> 
                        <img src="${desp.img2}">
                    </div>
                </div>
                <!-- Описание достопримечательности-->
                <div class='modal-index4__box-right'>
                    <div class='modal-index4__box-right_title'>
                        <p>${desp.description}</p>
                    </div>
                    <!-- Кнопка для переадресации на карту-->
                    <div class='modal-index4__box-right_button'>
                        <a href='${desp.maps}'>На карте</a>
                    </div>
                </div>       
            </div>
        </div>
    `;

    // Обработчик отправки формы
    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('review-name').value;
        const text = document.getElementById('review-text').value;

        if (name && text) {
            const review = {
                name: name,
                text: text,
                attractionId: desp.id // ID достопримечательности
            };

            saveReview(review); // Сохраняем отзыв
            reviewForm.reset(); // Очищаем форму
        }
    });
}

// Функция для сохранения отзыва 
function saveReview(review) {
    fetch('https://6729b8f86d5fa4901b6e13bc.mockapi.io/Rewievr', {
        method: 'POST', // Метод POST для создания нового отзыва
        headers: {
            'Content-Type': 'application/json' // Указываем, что отправляем JSON
        },
        body: JSON.stringify(review) // Преобразуем объект отзыва в JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Отзыв успешно сохранен:', data);
        loadReviews(review.attractionId); // Обновляем список отзывов
    })
    .catch(error => {
        console.error('Ошибка при сохранении отзыва:', error);
    });
}
function deleteReview(reviewId) {
    fetch(`https://6729b8f86d5fa4901b6e13bc.mockapi.io/Rewievr/${reviewId}`, {
        method: 'DELETE', // Метод DELETE для удаления записи
        headers: {
            'Content-Type': 'application/json' // Указываем, что отправляем JSON
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Отзыв успешно удален');
            // После удаления обновляем список отзывов
            const attractionId = UrlSearh('id'); // Получаем ID достопримечательности из URL
            loadReviews(attractionId); // Обновляем список отзывов
        } else {
            console.error('Ошибка при удалении отзыва');
        }
    })
    .catch(error => {
        console.error('Ошибка при удалении отзыва:', error);
    });
}

function loadReviews(attractionId) {
    fetch(`https://6729b8f86d5fa4901b6e13bc.mockapi.io/Rewievr?attractionId=${attractionId}`)
        .then(response => response.json())
        .then(reviews => {
            const reviewsList = document.getElementById('reviews-list');
            reviewsList.innerHTML = ''; // Очищаем список

            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('review');
                reviewElement.innerHTML = `
                    <div class='rev'>
                        <h3>${review.name}</h3>
                        <p>${review.text}</p>
                    </div>
                    <div class='delete'>
                        <button onclick="deleteReview('${review.id}')">Удалить</button>
                    </div>
                `;
                reviewsList.appendChild(reviewElement);
            });
        })
        .catch(error => console.error('Ошибка загрузки отзывов:', error));
}


document.getElementById('openReviews').addEventListener('click', () => {
    document.getElementById('review-form').classList.toggle('open')
})

document.getElementById('close_modal_review').addEventListener('click',() => {    
    document.getElementById('review-form').classList.remove('open')
})
document.getElementById('close_modal').addEventListener('click',() => {    
    document.getElementById('review-form').classList.remove('open')
})