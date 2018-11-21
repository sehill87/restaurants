import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  restaurants;
  restaurant;
  parentId: string;
  reviews: Array<object>;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    console.log(this.parentId);
    this.getRestaurantsFromService()
  }
  getRestaurantsFromService() {
    let observable = this._httpService.getRestaurants()
    observable.subscribe(data => {
      console.log("Got our restaurants!", data)

      for (var idx in data) {
        let currRestaurant = data[idx];
        var sum = 0;
        for (var rev of currRestaurant['reviews']) {
          sum += rev['stars'];
        }
        console.log(sum)
        if (sum === 0) {
          var avg = sum
          data[idx]['average'] = avg;
        } else {
          avg = sum / currRestaurant['reviews'].length
          data[idx]['average'] = avg;
        }
        
      }

      this.restaurants = data;
      console.log(this.restaurants)
    });
  }
  deleteRestaurantFromService(id) {
    console.log('Click will delete', id)
    let observable = this._httpService.deleteRestaurant(id);
    observable.subscribe(data => {
      this.getRestaurantsFromService();
    })
  }
  showEdit(idFromButton) {
    this.parentId = idFromButton;
    console.log(this.parentId);
  }
  dataFromChild(eventData) {
    this.parentId = eventData;
    this.getRestaurantsFromService();
  }
  
}
