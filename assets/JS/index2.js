// Функция для выполнения запроса к API
function fetchData(sortBy = '', filtr = '', page = 1) {
  const url = new URL('https://6729b8f86d5fa4901b6e13bc.mockapi.io/attractions');
  url.searchParams.append('page', page); // Добавляем параметр страницы
  url.searchParams.append('limit', 6); // Ограничиваем количество элементов на странице

  // Добавляем параметры сортировки и поиска, если они есть
  if (sortBy) url.searchParams.append('sortBy', sortBy);
  if (filtr && filtr !== 'all') url.searchParams.append('filter', filtr);

  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Ошибка при загрузке данных');
    })
    .then(data => {
      renderCards(data); // Отображаем карточки
      updatePagination(page); // Обновляем пагинацию
      showResult(sortBy, filtr); // Отображаем результат
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}

// Функция для отображения карточек
function renderCards(data) {
  const dep__cards = document.getElementById('dep__cards');
  dep__cards.innerHTML = ''; // Очищаем контейнер перед добавлением новых карточек

  if (data.length === 0) {
    dep__cards.innerHTML = '<p>Нет данных для отображения.</p>';
    return;
  }

  data.forEach(item => {
    dep__cards.innerHTML += `
      <div class="card ${item.filtr}" id="${item.id}">
        <div class="img" style="width: 200px; height: 150px;"><img src='${item.img}' alt='${item.name}'></div>
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

// Функция для обновления пагинации
function updatePagination(currentPage) {
  const list = document.getElementById('pagination');



  list.innerHTML = `
    <button id="prevButton">&leftarrow;</button>
    <p>${currentPage}</p>
    <button id="nextButton">&rightarrow;</button>
  `;
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  
  currentPage = Number(currentPage);

  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      fetchData(getUrlParam('sortBy'), getUrlParam('filtr'), currentPage - 1); // Переход на предыдущую страницу
    }
  });

  nextButton.addEventListener('click', () => {
    fetchData(getUrlParam('sortBy'), getUrlParam('filtr'), currentPage + 1); // Переход на следующую страницу
  });
}

// Функция для вывода результата
function showResult(sortBy, filtr) {
  const result = document.getElementById('result');

  if (sortBy === '') {
    sortBy = 'Без сортировки';
  } else if (sortBy === 'rating') {
    sortBy = 'По рейтингу (сначала высокий)';
  } else if (sortBy === '-rating') {
    sortBy = 'По рейтингу (сначала низкий)';
  }

  if (filtr === '') {
    filtr = 'Без фильтрации';
  } else if( filtr === 'bam') {
    filtr = 'По району';
  } else if( filtr === 'bum') {
    filtr = 'По типу';
  }

  result.innerHTML = `
    <p>Сортировка: ${sortBy || 'Без сортировки'}</p>
    <p>Фильтр: ${filtr || 'Все'}</p>
  `;
}

// Функция для перехода на следующую страницу
function nextIndex(cardId) {
  window.location.href = `index4.html?id=${cardId}`;
}

// Функция для получения параметра из URL
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Функция для обновления URL с параметром сортировки
function updateSearch(sortBy, filtr, page ) {
  // Создаем новый URL с обновленными параметрами
  const newUrl = `index2.html?sortBy=${sortBy}&filtr=${filtr}&page=${page}#dep`;

  // Обновляем URL без перезагрузки страницы
  window.history.pushState({ path: newUrl }, '', newUrl);

  // Вызываем функцию fetchData для обновления данных
  fetchData(sortBy, filtr, page);
}

// Обработчик изменения сортировки
document.getElementById('sort').addEventListener('change', () => {
  const sortSelect = document.getElementById('sort');
  const selectedOption = sortSelect.options[sortSelect.selectedIndex];
  const selectedText = selectedOption.textContent;

  let sortBy = '';
  if (selectedText === 'Без сортировки') {
    sortBy = '';
  } else if (selectedText === 'По популярности (низкая)') {
    sortBy = '-rating';
  } else if (selectedText === 'По популярности (высокая)') {
    sortBy = 'rating';
  }
  updateSearch(sortBy, getUrlParam('filtr') || 'all', getUrlParam('page') || 1);
});

// Обработчик изменения фильтра
document.getElementById('filtrs').addEventListener('change', () => {
  const filtrsSelect = document.getElementById('filtrs');
  const selectedOption = filtrsSelect.options[filtrsSelect.selectedIndex];
  const selectedText = selectedOption.textContent;

  let filtr = '';
  if (selectedText === 'Все') {
    filtr = 'all';
  } else if (selectedText === 'По району') {
    filtr = 'bam';
  } else if (selectedText === 'По типу') {
    filtr = 'bum';
  }else if (selectedText === ''){
    filtr = ''
  }
  updateSearch(getUrlParam('sortBy') || '', filtr, getUrlParam('page') || 1);
});

// Инициализация данных
fetchData(getUrlParam('sortBy'), getUrlParam('filtr'), getUrlParam('page') || 1);