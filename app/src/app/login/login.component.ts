import { Component, OnInit } from '@angular/core';
import { swalProviderToken } from '@sweetalert2/ngx-sweetalert2/lib/di';
import { RouterLink, Router } from '@angular/router';

import { DataService } from 'src/app/services/data/dataservice.service';
import { LibraryService } from 'src/app/services/library.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private libraryService: LibraryService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadOnLoop()
  }

  async loadOnLoop() {

    //Event Loop Starts Here
    this.checkIfMobile();


    await this.delay(1000);
    this.reloadLoop();
    //Event Loop End Here
  }

  reloadLoop() {
    this.loadOnLoop()
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isMobile: boolean = false

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile();
  }


  username: any
  password: any

  loginData: any = {}

  login() {
    this.loginData.username = this.username
    this.loginData.password = this.password

    console.log(this.loginData);

    //createitem atm is POST and not Full Auth
    this.dataService.createItem('users/login', this.loginData).subscribe((data: any) => {

      console.log(data);
      /*localStorage.clear;*/

      localStorage.setItem('id', data.user._id);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('imgUrl', data.user.imgUrl);
      localStorage.setItem('lname', data.user.lname);
      localStorage.setItem('fname', data.user.fname);
      localStorage.setItem('mname', data.user.mname);
      localStorage.setItem('imgUrl', data.user.imgUrl);
      localStorage.setItem('contact_list', JSON.stringify( data.user.contact_list));

      console.log(localStorage.getItem('username'))
      console.log(localStorage.getItem('fname'))

      var username = localStorage.getItem('username');

      if (username != '') {
        var name = localStorage.getItem('fname') + ' ' + localStorage.getItem('lname')
        Swal.fire(
          'Logged in Successfully!',
          'Welcome ' + name,
          'success'
        )
        this.router.navigate(['home'])
      } else {

      }

    }, (error: any) => {
      Swal.fire(
        'Credentials does not match!',
        '',
        'error'
      )
    })
  }
}
