fetch("https://6729b8f86d5fa4901b6e13bc.mockapi.io/attractions")

function UrlSearh(name) {
    const url = new URLSearchParams(window.location.search);
    return url.get(name);
}


window.onload = function () {
    const CardId = UrlSearh('id')
    if (CardId) {
        fetch(`https://6729b8f86d5fa4901b6e13bc.mockapi.io/attractions/${CardId}`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
    .then(Response => Response.json())
            .then(desp => render(desp))
            .catch(errors => console.log(errors))
    }

};


function render(desp) {
    const modal = document.getElementById('modal-index4');
    modal.innerHTML = `
                    <div class="modal-index4__box">
                        <h1>${desp.name}</h1>
                        <div style='display: flex; justify-content: space-between;align-items:flex-start;margin:70px 20px;'>
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
                                    <button href=${desp.maps}>На карте</button>
                                </div>
                            </div>
                    </div>
                `;
}


document.getElementById('button-index4').addEventListener('click', function(repindex) {
    window.history.back();
})


