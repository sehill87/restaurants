import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { 
  
  }
  getRestaurants(){
    // let tempObservable = this._http.get('/tasks');
    // tempObservable.subscribe(data=> console.log('Got our tasks!', data))
    return this._http.get('api/restaurants');
  }
  getRestaurant(id){
    // let tempObservable = this._http.get('/tasks/5be61addf7319843838a0560')
    // tempObservable.subscribe(data=> console.log('Got one task!!!', data))
    return this._http.get('api/restaurants/' + id)
  }
  addRestaurant(newrestaurant) {
    return this._http.post('api/restaurants', newrestaurant)
  }
  editRestaurant(id, editrestaurant) {
    return this._http.put('api/restaurants/' + id, editrestaurant)
  }
  deleteRestaurant(id) {
    return this._http.delete('api/restaurants/' + id)
  }
  addReview(id, newreview) {
    return this._http.post('api/reviews/new/' + id, newreview)
  }
}


 