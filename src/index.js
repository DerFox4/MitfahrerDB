function initialisePage() {
    var state = {
        clickEvents: [],
        isFilterOpen: false,
        data: []
    }

    document.addEventListener("click", function(e) {
        if (e.srcElement.id == "filterButton") {
            updateState({...state, isFilterOpen: !state.isFilterOpen})
        } else if (e.srcElement.id == "Search") {
            httpRequest('Data.json', 'GET', function (responseText) {
                const data = JSON.parse(responseText)
                updateState({...state, data: data})
            })
        } else if (e.srcElement.id == "Filter") {
            viewCardBlock(state.data)
        }
        state.clickEvents.push(e)
    })

    function getState() {
        return state;
    }

    function updateState(updatedState) {
        state = updatedState
    }

    const intervalId = setInterval(loop, 200, getState, updateState)
}

function loop(getState, updateState) {
    const state = getState()

    const filterButton = document.getElementById("filterButton")
    const filterContainer = document.getElementById("FilterContainer")

    if (state.isFilterOpen) {
        filterContainer.className = ""
    } else {
        filterContainer.className = "displayNone"
    }

    updateState({...state, clickEvents: []})
}

function switchFilterState(filterButton){
    if (filterButton.className.includes("inactive")) {
        filterButton.className = "btn btn-primary active"
    } else {
        filterButton.className = "btn btn-primary inactive"
    }
}

function httpRequest(url, method, callback) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, url, true);

    xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200 ) {
            return callback(this.responseText)
         }
     };

    xmlhttp.send();
}

function viewCardBlock(data) {
    const cardBlock = document.getElementById("cardBlock")

    console.log(cardBlock.innerHTML)

    cardBlock.innerHTML = ""

    const mappedData = data.map(viewCard)
    const htmlData = mappedData.join('')
    cardBlock.innerHTML = htmlData

    console.log("Ausgeführt")
}

function viewCard(dataInfo) {
    const cardBlock = document.getElementById("cardBlock")

    const newCard =
        `
            <div class="col-lg-6 mb-3">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">${dataInfo.an_abfahrt} - ${dataInfo.start_PLZ} -> ${dataInfo.ziel_PLZ} - ${dataInfo.zeit}</h5>
                    </div>
                    <div class="card-body">
                        <div class="d-flex">
                            <ul class="mr-3 w-50" >
                                <li> Tag: ${dataInfo.wochentag} (${dataInfo.datum}) </li>
                                <li> Uhrzeit: ${dataInfo.zeit} </li>
                                <li> Typ: ${dataInfo.an_abfahrt} </li>
                                <li> Raucher Auto: ${dataInfo.raucherAuto} </li>
                                <li> Gepäck: ${dataInfo.gepäck} </li>
                                <li> Tierfrei: ${dataInfo.tierfrei} </li>
                                <li> Kosten für die Fahrt: ${dataInfo.kosten}€</li>
                            </ul>

                            <div class="descriptionBox pl-3 w-50">
                                ${dataInfo.description}
                            </div>
                        </div>

                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-secondary"> Teilnehmen </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    console.log(newCard)
    return newCard
}

initialisePage()
