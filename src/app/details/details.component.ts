import { Component, OnInit } from '@angular/core';
import { RestService } from "../rest.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private rest: RestService) { }
  movieDetail: any;
  ngOnInit() {
    let detailParams = {
      "language":"en-US",
      "append_to_response":"credits"
    };
    this.rest.getDetails('https://api.themoviedb.org/3/movie/508',detailParams).subscribe(
      (response) => {
        this.movieDetail = response;
        console.log(response);
      }, (err) => {
        console.error(err);
      }
    );
  }

}
