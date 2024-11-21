
fetch("https://6729b8f86d5fa4901b6e13bc.mockapi.io/attractions")
    .then(Response => Response.json())
    .then(data => {
        bumbumbum = data;
    })



// document.getElementById('search_input').addEventListener('keypress', function(search) {
//     const cardIds = ['1','2', '3', '4', '5', '6', '7', '8', '9', '10'];
//     if (search.key === 'Enter') {
//         const inputValue = this.value.trim(); // Получаем значение из поля ввода

//         if (inputValue === 'Дербентский маяк') {
//             cardIds.forEach(id => document.getElementById(id).classList.toggle("delete"));
//             document.getElementById('1').classList.remove('delete');
//         }
//         else if (inputValue === 'Кырхляр') {
//             cardIds.forEach(id => document.getElementById(id).classList.toggle('delete'))
//             document.getElementById('2').classList.remove('delete');
//         } else if (inputValue === 'Парк имени Низами Гянджеви') {
//             cardIds.forEach(id =>  document.getElementById(id).classList.toggle('delete'))
//             document.getElementById('3').classList.remove('delete');
//         } else if (inputValue === 'Дербентская стена') {
//             cardIds.forEach(id =>  document.getElementById(id).classList.toggle('delete'))
//             document.getElementById('4').classList.remove('delete');
//         } else if (inputValue === 'Нарын-кала') {
//             cardIds.forEach(id =>  document.getElementById(id).classList.toggle('delete'))
//             document.getElementById('5').classList.remove('delete');
//         } else if (inputValue === 'Домик Петра I.') {
//             cardIds.forEach(id =>  document.getElementById(id).classList.toggle('delete'))
//             document.getElementById('6').classList.remove('delete');
//         } else if (inputValue === 'Келе-Нумаз') {
//             cardIds.forEach(id =>  document.getElementById(id).classList.toggle('delete'))
//             document.getElementById('7').classList.remove('delete');
//         } else if (inputValue === 'Церковь Святого Всеспасителя') {
//             cardIds.forEach(id =>  document.getElementById(id).classList.toggle('delete'))
//             document.getElementById('8').classList.remove('delete');
//         } else if (inputValue === 'Дербентская Джума-мечеть') {
//             cardIds.forEach(id =>  document.getElementById(id).classList.toggle('delete'))
//             document.getElementById('9').classList.remove('delete');
//         } else if  (inputValue === '') {
//             cardIds.forEach(id =>  document.getElementById(id).classList.toggle('delete'));
//         } else{
//             alert('bum bum');
//         }
//     }
// });





// document.getElementById('filtr-1').addEventListener('click', function(bam) {
//     const cards = document.getElementsByClassName('card');
//     Array.from(cards).forEach((card) => {
//         card.classList.toggle('delete');
//     });

//     // Удаляем класс 'delete' у всех элементов с классом 'bam'
//     const bamElements = document.getElementsByClassName('bum');
//     Array.from(bamElements).forEach((element) => {
//         element.classList.remove('delete');
//     });
// });


// document.getElementById('filtr-2').addEventListener('click', function() {
//     const cards = document.getElementsByClassName('card');
//     Array.from(cards).forEach((card) => {
//         card.classList.toggle('delete');
//     });

//     // Удаляем класс 'delete' у всех элементов с классом 'bam'
//     const bamElements = document.getElementsByClassName('bam');
//     Array.from(bamElements).forEach((element) => {
//         element.classList.remove('delete');
//     });
// });


// document.getElementById('filtr-3').addEventListener('click', function() {
//     const cards = document.getElementsByClassName('card');
//     Array.from(cards).forEach((card) => {
//         card.classList.remove('delete');
//     })
// })


// function nextIndex(cardId) {
//     window.location.href = `index4.html?id=${cardId}`;
// }


// document.querySelectorAll('.card').forEach(card => {
//     console.log(card)
//     card.addEventListener('click', (event) => {
//         event.preventDefault();
//         const cardId = card.id;
//         nextIndex(cardId);
//     })
// })








let bumbumbum = [];
let currentPage = 1;
const itemsPerPage = 6; // Количество карточек на странице

// Функция для загрузки данных
async function fetchData() {
    try {
        const response = await fetch("https://6729b8f86d5fa4901b6e13bc.mockapi.io/attractions");
        const data = await response.json();
        bumbumbum = data; // Теперь значение будет обновлено
        renderCards(); // Вызов функции для отображения карточек
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

// Функция для отображения карточек
function renderCards() {
    const dep__cards = document.getElementById('dep__cards');
    dep__cards.innerHTML = ''; // Очищаем контейнер перед добавлением новых карточек

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = bumbumbum.slice(start, end);

    paginatedItems.forEach(item => {
        dep__cards.innerHTML += `
            <div class="card ${item.filtr}" id="${item.id}">
                <div class="img" style="width: 200px; height: 150px;"><img src='${item.img}'></div>
                <h3>${item.name}</h3>
            </div>
        `;
    });

    // Добавляем обработчик клика для карточек
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault();
            const cardId = card.id;
            nextIndex(cardId);
        });
    });

    renderPagination(); // Вызов функции для отображения пагинации
}

// Функция для отображения пагинации
function renderPagination() {
    const totalPages = Math.ceil(bumbumbum.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Очищаем контейнер перед добавлением новых элементов




    // Номера страниц
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => {
            currentPage = i;
            renderCards();
        });

        if (i === currentPage) {
            button.classList.add('active');
        }


        pagination.appendChild(button);
    }

    
}

// Функция для перехода на следующую страницу
function nextIndex(cardId) {
    window.location.href = `index4.html?id=${cardId}`;
}

// Обработчик события для поиска
document.getElementById('search_input').addEventListener('keypress', function (search) {
    if (search.key === 'Enter') {
        const inputValue = this.value.trim().toLowerCase();
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const cardText = card.innerText.toLowerCase();
            if (cardText.includes(inputValue)) {
                card.classList.remove('delete');
            } else {
                card.classList.add('delete');
            }
        });

        if (inputValue === '') {
            cards.forEach(card => card.classList.remove('delete')); // Показываем все карточки
        }
    }
});

document.getElementById('filtr-1').addEventListener('click', function() {
    const cards = document.getElementsByClassName('card');
    Array.from(cards).forEach((card) => {
        if (card.classList.contains('bam')) {
            card.classList.add('delete');
        } else if (card.classList.contains('bum')) {
            card.classList.remove('delete');
        } else {
            card.classList.toggle('delete');
        }
    });
});

document.getElementById('filtr-2').addEventListener('click', function() {
    const cards = document.getElementsByClassName('card');
    Array.from(cards).forEach((card) => {
        if (card.classList.contains('bam')) {
            card.classList.remove('delete');
        } else {
            card.classList.toggle('delete');
        }
    });
});

document.getElementById('filtr-3').addEventListener('click', function() {
    const cards = document.getElementsByClassName('card');
    Array.from(cards).forEach((card) => {
        card.classList.remove('delete');
    });
});

// Инициализация
fetchData();
