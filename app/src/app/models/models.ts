export interface User {
  username: string,
  password: string,

  lname: string,
  fname: string,
  mname: string,
  extname: string,

  imgURL: string,

  created_at: Date,
  updated_at: Date,

  number: number,
  contact_list: Contact_List
}

export interface Contact_List {

  contact_name: string

}

export interface Chats {

  _id: string
  users: string[],
  chat_log: Chat_Log,

}

export interface Chat_Log {

  chat_user: string
  chat_date: Date
  chat_content: string

}


