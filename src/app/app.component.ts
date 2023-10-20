import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Observable,
  Subscriber,
  Subscription,
  of,
  tap,
  throwError,
} from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';
import { UsersService } from './users.service';
import { DialogCharacterComponent } from './dialog-character/dialog-character.component';
import { MatDialog } from '@angular/material/dialog';

import { timer } from 'rxjs';

interface TypeCharacter {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  typeCharacter: TypeCharacter[] = [
    { value: 'Human', viewValue: 'Human' },
    { value: 'Alien', viewValue: 'Alien' },
  ];

  suscription: Subscription = new Subscription();
  characters: any;

  constructor(
    private userService: UsersService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.suscription = this.userService.getUsers().subscribe((data) => {
      this.characters = data.results;
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  filterData(value: string) {
    if (!value) {
      this.suscription = this.userService.getUsers().subscribe((data) => {
        this.characters = data.results;
      });
    } else {
      this.suscription = this.userService
        .getUsers()
        .pipe(
          map((data: any) => {
            return data.results.filter((user: any) => {
              return user.species === value;
            });
          })
        )
        .subscribe((filteredCharacters: any) => {
          this.characters = filteredCharacters;
        });
    }
  }

  openDialog(character: any): void {
    const dialogRef = this.matDialog.open(DialogCharacterComponent, {
      data: character,
    });
  }
}
