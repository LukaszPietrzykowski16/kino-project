import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'stars-modal',
  standalone: true,
  templateUrl: 'stars-modal.component.html',
  imports: [CommonModule],
})
export class starsModalComponent {
  numberOfStars: Array<number> = [];
  starValue = 0;
  status: boolean = false;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<starsModalComponent>
  ) {}

  setStar(numberOfStar: number) {
    this.status = !this.status;
    this.starValue = numberOfStar;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  sendValue(): void {
    this.dialogRef.close(this.starValue);
  }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.numberOfStars = [...this.numberOfStars, ...[i]];
    }
  }
}
