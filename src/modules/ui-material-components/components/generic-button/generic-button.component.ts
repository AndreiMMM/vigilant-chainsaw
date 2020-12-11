import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.css'],
})
export class GenericButtonComponent implements OnInit {
  @Input() public readonly text: string;
  @Input() public readonly disabled: boolean;

  @Output()
  public readonly clickEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  public ngOnInit(): void {}

  public emitClickEvent(): void {
    if (!this.disabled) {
      this.clickEvent.emit();
    }
  }
}
