// Функция для выполнения запроса к API
function fetchData(sortBy = '', searchQuery = '', page = 1) {
  const url = new URL('https://6729b8f86d5fa4901b6e13bc.mockapi.io/attractions');
  url.searchParams.append('page', page); // Добавляем параметр страницы
  url.searchParams.append('limit', 6); // Ограничиваем количество элементов на странице

  // Добавляем параметры сортировки и поиска, если они есть
  if (sortBy) url.searchParams.append('sortBy', sortBy);
  if (searchQuery) url.searchParams.append('title', searchQuery);

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
      showResult(sortBy, filtr)
  })
  .catch(error => {
      console.error('Ошибка:', error);
  });
}

// Функция для отображения карточек
function renderCards(data) {
  const dep__cards = document.getElementById('dep__cards');
  dep__cards.innerHTML = ''; // Очищаем контейнер перед добавлением новых карточек

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

  // Обработчик изменения сортировки
  document.getElementById('sort').addEventListener('change', () => {
      const sortSelect = document.getElementById('sort');
      const selectedOption = sortSelect.options[sortSelect.selectedIndex];
      const selectedText = selectedOption.textContent;
    
      let sortBy = '';
      if (selectedText === 'Без сортировки') {
          sortBy = '';
          updateSearch(sortBy);
          showResult(sortBy, '');
      } else if (selectedText === 'По популярности (низкая)') {
          sortBy = '-popularity';
          updateSearch(sortBy);
          showResult(sortBy, '');
      } else if (selectedText === 'По популярности (высокая)') {
          sortBy = 'popularity';
          updateSearch(sortBy);
          showResult(sortBy, '');
      }
    
      fetchData(sortBy); // Передаём параметр сортировки в fetchData
  });

  document.getElementById('filtrs').addEventListener('change', () => {
      const filtrsSekect = document.getElementById('filtrs');
      const selectedOption = filtrsSekect.options[filtrsSekect.selectedIndex];
      const selectedText = selectedOption.textContent;

      let filtr = '';

      if ( selectedText === 'Все') {
        filtr = 'all';
        updateSearch('', filtr);
        showResult('', filtr);
      }else if (selectedText === 'По району') {
        filtr = 'district'
        updateSearch('', filtr);
        showResult('', filtr);
      }else if (selectedOption === 'По типу') {
        filtr = 'type';
        updateSearch('', filtr);
        showResult('', filtr);
      }
      fetchData('',filtr,'')
  })
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

  prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
          fetchData('', '', currentPage - 1); // Переход на предыдущую страницу
      }
  });

  nextButton.addEventListener('click', () => {
      fetchData('', '', currentPage + 1); // Переход на следующую страницу
  });
}

// Функция для вывода результата
function showResult(sortBy, filtr) {
  const result = document.getElementById('result');

  result.innerHTML = `
    <p> ${sortBy}  ${filtr}  </p>
  `
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
function updateSearch(sortBy, filtr) {
  window.location.href = `index2.html?sortBy=${sortBy}&filtr=${filtr}#dep`;
}

// Инициализация данных
fetchData();