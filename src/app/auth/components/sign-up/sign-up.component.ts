import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  isVisible = true;

  submitForm(): void {}

  handleCancel(): void {
    console.log('Button cancel clicked');
    this.isVisible = false;
  }
}
