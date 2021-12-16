import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css']
})
export class NavUserComponent implements OnInit {

  navLinks = [
    {path: "/login", label: "Logar"},
    {path: "/register", label: "Registrar"}
  ]

  constructor() { }
  
  ngOnInit(): void {
  }

}
