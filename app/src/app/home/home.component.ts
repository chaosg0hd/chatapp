import { Component, OnInit } from '@angular/core';
import { swalProviderToken } from '@sweetalert2/ngx-sweetalert2/lib/di';
import { RouterLink, Router } from '@angular/router';

import { DataService } from 'src/app/services/data/dataservice.service';
import { LibraryService } from 'src/app/services/library.service';

import Swal from 'sweetalert2';
import { User , Contact_List, Chats, Chat_Log } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private libraryService: LibraryService,
    private router: Router) { }

  ngOnInit(): void {

    this.loadOnLoop();

    this.getChats();
     

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

  //Load User Data
 
  username = localStorage.getItem("username")
  fname = localStorage.getItem("fname")
  lname = localStorage.getItem("lname")
  imgUrl = localStorage.getItem("imgUrl")
  id = localStorage.getItem("id")
  contact_list: any[] = JSON.parse(localStorage.getItem('contact_list') || '{}')

  chatsPayload: any;
  chatsData: Chats[] = [];

  //Load Chats Data

  getChats() {

    //this.employeesDataSource.data = this.employeesData;

    this.dataService.getAllItem('chats')
      .subscribe((data: any) => {
        console.log(data);
        this.chatsPayload = data;
        this.chatsData = this.chatsPayload;
      });
  }


  



}
