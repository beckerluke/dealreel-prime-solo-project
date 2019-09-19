import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// will fire off on FETCH_ALL_DEALS
function* fetchAllDeals() {
  try {
    // GET request to get all the deals from the database
    const response = yield axios.get('api/deals');

    yield put({type: 'SET_ALL_DEALS', payload: response.data});
  } catch (error) {
      console.log('Error with getting all deals:', error);
      
      alert('There was an error loading nearby deals')
  }
}

function* dealsSaga() {
  yield takeLatest('FETCH_ALL_DEALS', fetchAllDeals);
}

export default dealsSaga;