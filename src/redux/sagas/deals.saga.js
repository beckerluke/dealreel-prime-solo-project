import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import geoLocation from '../../services/GetLocation/GetLocation';

// will fire off on FETCH_ALL_DEALS
function* fetchAllDeals() {
  try {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
    

    // userGeoLoc is equal to resolve object holding lat and long 
    const userGeoLoc = yield geoLocation();

    // GET request to get all the deals from the database
    // waits until geoLocation resolves getting user coordinates before 
    // initiating GET req to server 
    const response = yield axios.get(`api/deals/?lat=${userGeoLoc.lat}&lng=${userGeoLoc.lng}`, config);

    // Response from server of all active deals with distance data
    // dispatch to store in deals reducer
    yield put({type: 'SET_ALL_DEALS', payload: response.data});
  } catch (error) {
      console.log('Error with getting all deals:', error);
  }
} // end fetchAllDeals

// will fire off on FETCH_ADMIN_DEALS
function* fetchAdminDeals(action) {
    try {
      const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
      // GET request to get all of a business's deals from the database
      const response = yield axios.get(`/api/deals/admin`, config);
  
      yield put({type: 'SET_ADMIN_DEALS', payload: response.data});
    } catch (error) {
        console.log('Error with getting admin deals:', error);
    }
  } // end fetchAdminDeals
  
// will fire off on ADD_DEAL 
function* addAdminDeal(action) {
    try {
        yield axios.post('/api/deals/admin/add/deal', action.payload);
        yield put({type:'FETCH_ALL_DEALS'})
    } catch (error) {
        console.log('Error with posting admin deal:', error);
    }
}

function* dealsSaga() {
  yield takeLatest('FETCH_ALL_DEALS', fetchAllDeals);
  yield takeLatest('FETCH_ADMIN_DEALS', fetchAdminDeals);
  yield takeLatest('ADD_DEAL', addAdminDeal);
  
}

export default dealsSaga;