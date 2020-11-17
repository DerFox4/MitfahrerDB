function initialisePage() {
    var state = {
        clickEvents: [],
        isFilterOpen: false
    }

    document.addEventListener("click", function(e) {
        if (e.srcElement.id == "filterButton") {
            updateState({...state, isFilterOpen: !state.isFilterOpen})
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

initialisePage()
