import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-character',
  templateUrl: './dialog-character.component.html',
  styleUrls: ['./dialog-character.component.scss'],
})
export class DialogCharacterComponent implements OnDestroy, OnInit {
  private timerSubscription: Subscription = new Subscription();
  public timeRemaining: number = 5;

  constructor(
    private matDialogRef: MatDialogRef<DialogCharacterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    const timer$ = timer(1000, 1000);

    this.timerSubscription = timer$.subscribe(() => {
      this.timeRemaining -= 1;
      if (this.timeRemaining <= 0) {
        this.closeDialog();
      }
    });
  }

  closeDialog(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.matDialogRef.close();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
