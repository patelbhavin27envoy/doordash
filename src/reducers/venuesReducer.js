import constants  from '../constants';

let initialState = {
    venues: null
};

export default (state = initialState, action) => {

    switch (action.type) {

        case constants.VENUES_RECEIVED:
            console.log("reducer is called", JSON.stringify(action.venues));
            let updatedVenues = Object.assign({}, state);
            updatedVenues['venues'] = action.venues;
            return updatedVenues;

        default:
            return false;
    }
}
