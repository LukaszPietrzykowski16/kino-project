import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface RatingValue {
  value: number;
}

interface BooleanValue {
  isValue: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class RatingValueService {}
