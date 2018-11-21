import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newRestaurant: any;
  id: String;
  errors: object;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.newRestaurant = { name: "", cuisine: ""}
    // this.errors = {
    //   errors: {
    //     name: {}
    //   }
    // }
    this.errors = {}
    this.errors['errors'] = {}
    // this.errors['errors']['name'] = {}
  }
  onSubmitAddRestaurant() {
    let observable = this._httpService.addRestaurant(this.newRestaurant);
    observable.subscribe (data => {
      console.log('New restaurant created', data);
      if (data['errors']) {
        console.log(data['errors'])
        if (data['errors']['code'] == 11000) {
          this.errors = {
            errors: {
              name: {
                message: "Restaurant already exists"
              }
            }
          }
        } else {
          this.errors = data['errors']
        }
      } else {
        this._router.navigate(['/restaurants'])
      }
    })
    this.newRestaurant = { name: "", cuisine: ""}
  }
}
