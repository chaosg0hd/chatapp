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
     

  }

  async loadOnLoop() {

    //Event Loop Starts Here
    this.checkIfMobile();

    this.getChats(this.username);


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
  id = localStorage.getItem("userid")
  contact_list: any[] = JSON.parse(localStorage.getItem('contact_list') || '{}')

  chatsPayload: Chats[] = [];
  chatsData: Chats[] = [];
  chatsDataTemp: Chats[] = [];

  //Load Chats Data

  getChats(user: any) {
    this.dataService.getChat('chats', user)
      .subscribe((data: any) => {               
        this.chatsPayload = data;

        //This is poorly optimized

        this.chatsDataTemp = []
        for (let chats of this.chatsPayload) {
          for (let chat_user of chats.users) {   
            if (chat_user == this.username) {               
              this.chatsDataTemp.push(chats)    
            }                               
          }         
        }
        if (this.chatsData.length == 0) {
          this.chatsData = this.chatsDataTemp
        }

        //Poor JSON Checking

        if (JSON.stringify(this.chatsDataTemp) != JSON.stringify(this.chatsData)) {
          this.chatsData = this.chatsDataTemp
          this.reloadActiveMessage()
        }
      });    
  }

  //Gets Last Messsage

  getChatsContentsLast(chat_log: any, id: any) {
    var last_chat
    for (var chat_log of chat_log) {
      last_chat = chat_log.chat_content   
    }
    if (localStorage.getItem(id) == null) {
      localStorage.setItem(id, last_chat)
    }
    if (last_chat != localStorage.getItem(id)) {
      localStorage.setItem(id + "Status", "HasChanged")
      if (localStorage.getItem(id + "Clicked") === "Clicked") {
        localStorage.setItem(id, last_chat)
        localStorage.setItem(id + "Clicked", "NotClicked")
      }
    }
    else if (last_chat == localStorage.getItem(id)){
      localStorage.setItem(id + "Status", "HasNotChanged")
    }
    return last_chat
  }

  //Check if New Messsage

  checkIfChanged(id: any) {
    return localStorage.getItem(id + "Status")
  }

  //Load Data of Selected Chat

  activeChat: any;
  activeChatID: any;
  activeChatContent: Chat_Log[] = [];
  activeChatContentTemp: any = {};

  onMessageClick(id: any, user: any, chat_log: any) {
    this.activeChatID = id
    this.activeChat = user
    this.activeChatContent = chat_log

    localStorage.setItem(id + "Clicked", "Clicked")
  }

  //Reload View when change occurs

  reloadActiveMessage() {
        for (let chat of this.chatsData) {
      if (chat._id == this.activeChatID) {
        this.activeChatContentTemp = chat.chat_log
        this.activeChatContent = this.activeChatContentTemp        
      }
    }
  }

  //Chat CRUD

  sendBoxContent : any
  addChat: any = {}
  onSend(activeChatContent: any) {   
    this.addChat.chat_log = activeChatContent
    this.addChat.chat_log.push({ chat_content: this.sendBoxContent, chat_date: new Date(), chat_user: this.username })
    for (let chats of this.chatsData) {
      if (chats._id == this.activeChatID) {
        this.dataService.updateItem('chats', this.activeChatID, chats)
        .subscribe((data: any) => {
        });
      }
    }
    this.sendBoxContent = ""    
  }

  //Log Out

  logOut() {

    localStorage.clear
    localStorage.removeItem("userid")
    this.router.navigate(['login'])

  }


  



}
