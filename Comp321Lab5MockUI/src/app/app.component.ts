import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponentComponent } from "./components/home-page-component/home-page-component.component";

@Component({
  selector: 'app-root',
  imports: [HomePageComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Comp321Lab5MockUI';
}
