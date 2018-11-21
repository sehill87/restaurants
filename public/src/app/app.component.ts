import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  newRestaurant: any;
  editRestaurant: any;
  restaurants;
  restaurant;
  id: String;

  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    this.newRestaurant = { name: "", cuisine: ""}
    this.editRestaurant = { _id: "", name: "", cuisine: ""}
    this.getRestaurantsFromService();
    // this.getTaskFromService();
  }
  getRestaurantsFromService() {
    let observable = this._httpService.getRestaurants()
    observable.subscribe(data =>  {
      console.log("Got our restaurants!", data)
      this.restaurants = data;
      console.log(this.restaurants)

    });
  }
  getRestaurantFromService(id) {
    let observable = this._httpService.getRestaurant(id)
    observable.subscribe(data => {
      console.log("Got the restaurant!", data)
      this.restaurant = data;
    });
  }
  
  
  
  
}
