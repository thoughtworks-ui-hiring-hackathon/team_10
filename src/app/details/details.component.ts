import { Component, OnInit } from '@angular/core';
import { RestService } from "../rest.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private rest: RestService, private route: ActivatedRoute) { }
  movieDetail: any;
  id:any;
  relatedMovies:any
  imgBaseUrl:string ='https://image.tmdb.org/t/p/original';
  ngOnInit() {
    let detailParams = {
      "language":"en-US",
      "append_to_response":"credits"
    };
    this.id = this.route.snapshot.paramMap.get("id");
    this.rest.getDetails('https://api.themoviedb.org/3/movie/'+this.id,detailParams).subscribe(
      (response) => {
        this.movieDetail = response;
        console.log(response);
      }, (err) => {
        console.error(err);
      }
    );

    this.rest.getDetails('https://api.themoviedb.org/3/movie/'+this.id+'/similar?&language=en-US&page=1', {}).subscribe((response)=>{
        this.relatedMovies = response;
    },(err)=>{
      console.error(err)
    });
  }

}
