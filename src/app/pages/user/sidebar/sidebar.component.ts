import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories:any;
  constructor(
    private _catService: CategoryService,
    private _snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._catService.getCategories().subscribe((data:any)=> {
      this.categories = data;
    }, 
    (error) => {
      this._snack.open('Error in loading categories from server','close',{
        duration:3000
      });
    });
  }

}
