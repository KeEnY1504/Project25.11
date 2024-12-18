class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl; // Базовый URL API
    this.currentPage = 1; // Текущая страница
    this.sortBy = ''; // Параметр сортировки
    this.order = ''; // Порядок сортировки
    this.filtr = ''; // Параметр фильтрации
    this.search = ''; // Параметр поиска
  }

  // Метод для формирования URL с параметрами
  buildUrl() {
    const url = new URL(this.apiUrl);
    url.searchParams.append('page', this.currentPage);
    url.searchParams.append('limit', 6);

    if (this.sortBy) {
      url.searchParams.append('sortBy', this.sortBy);
      url.searchParams.append('order', this.order);
    }
    if (this.filtr && this.filtr !== 'all') url.searchParams.append('filter', this.filtr);
    if (this.search) url.searchParams.append('search', this.search);

    return url;
  }

  // Метод для выполнения запроса к API
  fetchData() {
    const url = this.buildUrl();

    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Ошибка при загрузке данных');
      })
      .then(data => {
        this.renderCards(data); // Отображаем карточки
        this.updatePagination(); // Обновляем пагинацию
        this.showResult(); // Отображаем результат
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }

  // Отображение карточек
  renderCards(data) {
    const depCards = document.getElementById('dep__cards');
    depCards.innerHTML = ''; // очистка контейнера

    if (data.length === 0) {
      depCards.innerHTML = '<p>Нет данных для отображения.</p>';
      return;
    }

    data.forEach(item => {
      depCards.innerHTML += `
        <div class="card ${item.filtr}" id="${item.id}">
          <div class="img" style="width: 200px; height: 150px;"><img src='${item.img}' alt='${item.name}'></div>
          <h3>${item.name}</h3>
        </div>
      `;
    });

    // клика по карточек
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', (event) => {
        event.preventDefault();
        const cardId = card.id;
        this.nextIndex(cardId);
      });
    });
  }

  // Метод для обновления пагинации
  updatePagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = `
      <button id="prevButton">&leftarrow;</button>
      <p>${this.currentPage}</p>
      <button id="nextButton">&rightarrow;</button>
    `;

    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    prevButton.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchData();
      }
    });

    nextButton.addEventListener('click', () => {
      this.currentPage++;
      this.fetchData();
    });
  }

  // Метод для отображения результата
  showResult() {
    const result = document.getElementById('result');
    let sortByText = 'Без сортировки';
    let filtrText = 'Все';

    if (this.sortBy === 'rating') {
      sortByText = this.order === 'desc' ? 'По рейтингу (высокий)' : 'По рейтингу (низкий)';
    }

    if (this.filtr === 'bam') {
      filtrText = 'По району';
    } else if (this.filtr === 'bum') {
      filtrText = 'По типу';
    }

    result.innerHTML = `
      <p>Сортировка: ${sortByText}</p>
      <p>Фильтр: ${filtrText}</p>
    `;
  }

  // Метод для перехода на следующую страницу
  nextIndex(cardId) {
    window.location.href = `index4.html?id=${cardId}`;
  }

  // Метод для обновления параметров и запроса данных
  updateSearch(sortBy, filtr, page, order = '', search = '') {
    this.sortBy = sortBy;
    this.filtr = filtr;
    this.currentPage = page;
    this.order = order;
    this.search = search;

    // Обновляем URL без перезагрузки страницы
    const newUrl = `index2.html?sortBy=${sortBy}&filtr=${filtr}&page=${page}&order=${order}&search=${search}#dep`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    this.fetchData(); // Выполняем запрос с новыми параметрами
  }
}

// Инициализация класса
const fetcher = new DataFetcher('https://6729b8f86d5fa4901b6e13bc.mockapi.io/attractions');

// Обработчик изменения сортировки
document.getElementById('sort').addEventListener('change', () => {
  const sortSelect = document.getElementById('sort');
  const selectedOption = sortSelect.options[sortSelect.selectedIndex];
  const selectedText = selectedOption.textContent;

  let sortBy = '';
  let order = 'desc'; // По умолчанию сортировка по убыванию

  if (selectedText === 'По популярности (низкая)') {
    sortBy = 'rating';
    order = 'asc'; // Сортировка по возрастанию
  } else if (selectedText === 'По популярности (высокая)') {
    sortBy = 'rating';
    order = 'desc'; // Сортировка по убыванию
  }

  fetcher.updateSearch(sortBy, fetcher.filtr, 1, order, fetcher.search);
});

// Обработчик изменения фильтра
document.getElementById('filtrs').addEventListener('change', () => {
  const filtrsSelect = document.getElementById('filtrs');
  const selectedOption = filtrsSelect.options[filtrsSelect.selectedIndex];
  const selectedText = selectedOption.textContent;

  let filtr = 'all';
  if (selectedText === 'По району') {
    filtr = 'bam';
  } else if (selectedText === 'По типу') {
    filtr = 'bum';
  }

  fetcher.updateSearch(fetcher.sortBy, filtr, 1, fetcher.order, fetcher.search);
});

// Обработчик события для поиска
document.getElementById('search_input').addEventListener('input', debounce(() => {
  const inputValue = document.getElementById('search_input').value.trim().toLowerCase();
  fetcher.updateSearch(fetcher.sortBy, fetcher.filtr, 1, fetcher.order, inputValue);
}, 300));

// Функция debounce
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Инициализация данных при загрузке страницы
window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sortBy = urlParams.get('sortBy') || '';
  const filtr = urlParams.get('filtr') || '';
  const page = Number(urlParams.get('page')) || 1;
  const order = urlParams.get('order') || '';
  const search = urlParams.get('search') || '';

  fetcher.updateSearch(sortBy, filtr, page, order, search);
});