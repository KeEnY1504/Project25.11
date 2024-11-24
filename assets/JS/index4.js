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
                    <button id="button-index4"><a href='index2.html' style='width: 100%;height:100%;display:flex'><img src="./assets/img/Arrow left(1).svg" alt=""></a></button>
                        <h1>${desp.name}</h1>
                        <div id='box'>
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





