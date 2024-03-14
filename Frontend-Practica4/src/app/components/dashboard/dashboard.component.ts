import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [MenuComponent]
})
export class DashboardComponent {

}
