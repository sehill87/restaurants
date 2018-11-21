import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  restaurant: object;
  reviews: Array<object>;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.restaurant = {};
    this.getRestaurantFromServiceById();
  }

  getRestaurantFromServiceById() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
  
      let observable = this._httpService.getRestaurant(params['id'])
      observable.subscribe(data =>  {
        console.log("Got our restaurant!", data)
        this.restaurant = data;
        this.reviews = data['reviews'];
        this.reviews.sort(this.compare);
        console.log(this.reviews)
        var sum = 0;
        for (var rev of this.reviews) {
          sum += rev['stars'];
        }
        console.log(sum);
        var avg = sum / this.reviews.length
        console.log(avg)
      });
    });
  }

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const genreA = a.stars;
    const genreB = b.stars;
  
    let comparison = 0;
    if (genreA < genreB) {
      comparison = 1;
    } else if (genreA > genreB) {
      comparison = -1;
    }
    return comparison;
  }
  
}
