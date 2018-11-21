import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router, ChildActivationEnd } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editRestaurant: any;
  restaurants;
  restaurant;
  id: String;
  errors: Object;
  @Output() closeForm = new EventEmitter();

  @Input() childId: String;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.editRestaurant = { _id: "", name: "", cuisine: ""}
    this.getRestaurantFromServiceById();

    this.errors = {}
    this.errors['errors'] = {}
    console.log(this.childId);
  }
  getRestaurantFromServiceById() {
      let observable = this._httpService.getRestaurant(this.childId)
      observable.subscribe(data =>  {
        console.log("Got our restaurant!", data)
        this.editRestaurant = data;
        console.log(this.editRestaurant)

      });
  }
  // onEditRestaurant(id, name, cuisine) {
  //   this.editRestaurant._id = id;
  //   this.editRestaurant.name = name;
  //   this.editRestaurant.cuisine = cuisine;
  // }
  onSubmitEditRestaurant() {
    console.log("this will edit a restaurant")
    let observable = this._httpService.editRestaurant(this.editRestaurant._id, this.editRestaurant);
    observable.subscribe (data => {
      console.log(data)
      if (data['errors']) {
        console.log(data['errors'])
        this.errors = data['errors']
      } else {
        this._router.navigate(['/restaurants'])
        this.closeForm.emit(null);
      }
    })
  }
  tellParentToCloseForm() {
    this.closeForm.emit(null);
  }
}
