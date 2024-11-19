
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





document.getElementById('filtr-1').addEventListener('click', function(bam) {
    const cards = document.getElementsByClassName('card');
    Array.from(cards).forEach((card) => {
        card.classList.toggle('delete');
    });

    // Удаляем класс 'delete' у всех элементов с классом 'bam'
    const bamElements = document.getElementByIds('bam');
    Array.from(bamElements).forEach((element) => {
        element.classList.remove('delete');
    });
});


document.getElementById('filtr-2').addEventListener('click', function() {
    const cards = document.getElementsByClassName('card');
    Array.from(cards).forEach((card) => {
        card.classList.toggle('delete');
    });

    // Удаляем класс 'delete' у всех элементов с классом 'bam'
    const bamElements = document.getElementsByClassName('bam');
    Array.from(bamElements).forEach((element) => {
        element.classList.remove('delete');
    });
});


document.getElementById('filtr-3').addEventListener('click', function() {
    const cards = document.getElementsByClassName('card');
    Array.from(cards).forEach((card) => {
        card.classList.remove('delete');
    })
})


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







let bumbumbum = '';
fetch("https://6729b8f86d5fa4901b6e13bc.mockapi.io/attractions")
    .then(response => response.json())
    .then(data => {
        bumbumbum = data;
        renderCards(); // Вызов функции для отображения карточек
    });

document.getElementById('search_input').addEventListener('keypress', function (search) {
    const cardIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    if (search.key === 'Enter') {
        const inputValue = this.value.trim();
        cardIds.forEach(id => document.getElementById(id).classList.add("delete")); // Скрываем все карточки

        // Удаляем класс 'delete' у карточки, соответствующей введенному значению
        const foundCard = cardIds.find(id => {
            const card = document.getElementById(id);
            return card && card.innerText.includes(inputValue);
        });

        if (foundCard) {
            document.getElementById(foundCard).classList.remove('delete');
        } else if (inputValue === '') {
            cardIds.forEach(id => document.getElementById(id).classList.remove('delete')); // Показываем все карточки
        } else {
            
        }
    }
});


function nextIndex(cardId) {
    window.location.href = `index4.html?id=${cardId}`;
}

async function fetchData() {
    try {
        const response = await fetch("https://6729b8f86d5fa4901b6e13bc.mockapi.io/attractions");
        const data = await response.json();
        bumbumbum = data; // Теперь значение будет обновлено
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

function renderCards() {
    const dep__cards = document.getElementById('dep__cards');
    bumbumbum.forEach(item => {
        dep__cards.innerHTML += `
            <div class="card ${item.filtr}" id="${item.id}">
                <div class="img" style="background-color: black; width: 200px; height: 150px;"></div>
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
}

fetchData();



