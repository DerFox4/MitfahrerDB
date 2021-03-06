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
        } else if (e.srcElement.id.includes("_JoinTour")) {
            const idName = e.srcElement.id
            const idNr = idName.slice(0,-9)
            console.log("Join Tour " + idNr)
        } else if (e.srcElement.id.includes("_DeleteTour")) {
            const idName = e.srcElement.id
            const idNr = idName.slice(0,-11)
            console.log("Delete Tour " + idNr)
        } else if (e.srcElement.id.includes("_ConfigTour")) {
            const idName = e.srcElement.id
            const idNr = idName.slice(0,-11)
            console.log("Config Tour " + idNr)
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

    console.log(getValuesFromForm())

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

    cardBlock.innerHTML = ""

    const mappedData = data.map(viewCard)
    const htmlData = mappedData.join('')
    cardBlock.innerHTML = htmlData
}

function viewCard(dataInfo) {
    const cardBlock = document.getElementById("cardBlock")

    const newCard =
        `
            <div class="col-lg-6 mb-3">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <div>
                            <h5 class="card-title">Anfahrt - 50769 - 07:45</h5>
                        </div>
                        <div>
                            <button id=${dataInfo.tourId}_ConfigTour class="btn btn-secondary">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-gear" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"/>
                                    <path fill-rule="evenodd" d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"/>
                                </svg>
                            </button>
                            <button id=${dataInfo.tourId}_DeleteTour class="btn btn-danger">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </button>
                        </div>
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
                            <button id=${dataInfo.tourId}_JoinTour class="btn btn-success"> Teilnehmen </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    return newCard
}

function getValuesFromForm() {
    const dayButtons = document.getElementsByName('CreateDay')
    const day = dayButtons.forEach(x => {
        if (x.checked) return(x.id)
    })

    const nrOfDrivers = document.getElementsByName('CreateNr')
    const nrOfDriver = nrOfDrivers.forEach(x => {
        if (x.checked) return(x.id)
    })

    const startPlz = document.getElementById('CreateStartPLZ').value
    const destinationPlz = document.getElementById('CreateDestinationPLZ').value

    const cost = document.getElementById('CreateCost').value

    const time = (document.getElementById('CreateTime').value)

    const isAnfahrt = document.getElementById('CreateFahrt').checked
    const isSmoker = document.getElementById('RaucherAuto').checked
    const withLuggage = document.getElementById('Gepäck').checked
    const isAnimalFree = document.getElementById('CreateTiere').checked

    const genders = document.getElementsByName('gender')
    const gender = "Both"

    const description = document.getElementById('description').value

    const json =
        {
            "animal": isAnimalFree,
            "arriveDrive": isAnfahrt,
            "cost": cost,
            "dateTime": "2020-11-19T00:18:00",
            "destinationPlz": destinationPlz,
            "discription": description,
            "luggage": withLuggage,
            "provider": 5,
            "size": nrOfDriver,
            "smoking": isSmoker,
            "startPlz": startPlz,
            "wishedPersonId": "FEMALE"
        }

    return JSON.stringify(json)
}

initialisePage()
