import { Component, OnInit } from '@angular/core';
import { RestService } from "../rest.service";
import { ActivatedRoute } from "@angular/router";
import { Constants } from '../app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private rest: RestService, private route: ActivatedRoute, private router: Router) { }
  movieDetail: any;
  id:any;
  relatedMovies:any
  imgBaseUrl:string = Constants.IMG_PATH;
  genres

  max: number = 5;
  isReadonly: boolean = true;
  
  ngOnInit() {
    let detailParams = {
      "language":"en-US",
      "append_to_response":"credits"
    };
    this.id = this.route.snapshot.paramMap.get("id");
    this.rest.getDetails('https://api.themoviedb.org/3/movie/'+this.id,detailParams).subscribe(
      (response) => {
        this.movieDetail = response;
        this.movieDetail.vote_average = response['vote_average'] /2;
        this.movieDetail.director = this.movieDetail.credits.crew.filter((el)=>{
          return el.job == 'Director';
        });
        // console.log(response);
      }, (err) => {
        console.error(err);
      }
    );



    this.rest.getDetails('https://api.themoviedb.org/3/genre/movie/list'
    , {language:'en-US'}).subscribe(
      (response) => {
        this.genres = response['genres'];
        this.relatedMoviesList();
        // console.log("gene",this.genres);
      }, (err) => {
        console.error(err);
      }
    );

  }

  relatedMoviesList(){
    return this.rest.getDetails('https://api.themoviedb.org/3/movie/'+this.id+'/similar?&language=en-US&page=1', {}).subscribe((response)=>{
        this.relatedMovies = response['results'];
        this.relatedMovies.filter((el)=>{
         
          el.vote_average = el.vote_average/2;
          // el.genres = el.genre_ids.filter((e)=>{
          //       this.genres.filter((element)=>{
          //       if(e == element.id){
          //         return element.name;
          //       }
               
          //     });
          // });
          // console.log("eeee",el);
        });
        console.log(this.relatedMovies);
    },(err)=>{
      console.error(err)
    });
  }

  showMore(id){
    this.ngOnInit();
    window.scroll(0,0);
    // this.router.navigateByUrl('/details/'+id, {skipLocationChange: true}).then(()=>
    //  this.router.navigate(['/details'+id])
    // ); 
  }

}
