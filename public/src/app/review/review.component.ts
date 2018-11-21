import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  restaurant: object;
  newReview: object;
  errors: Object;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.newReview = {};
    this.restaurant = {};
    this.getRestaurantFromServiceById();
    this.errors = {
      errors: {
        customer: '',
        stars: '',
        review: ''
      }
    }
  }

  getRestaurantFromServiceById() {
    this._route.params.subscribe((params: Params) => {
      let observable = this._httpService.getRestaurant(params['id'])
      observable.subscribe(data =>  {
        console.log("Got our restaurant!", data)
        this.restaurant = data;
      });
    });
  }
  onSubmitAddReview() {
    console.log(this.restaurant['_id']);
    console.log(this.newReview);
    let observable = this._httpService.addReview(this.restaurant['_id'], this.newReview);
    observable.subscribe (data => {
      console.log('New review created', data);
      if (data['errors']) {
        console.log(data['errors'])
        this.errors = data['errors']
      } else {
        this._router.navigate(['/restaurants/reviews/'+this.restaurant['_id']])
      }
    })
    // this.newReview = { customer: "", stars: "", review: ""}
  }
}
