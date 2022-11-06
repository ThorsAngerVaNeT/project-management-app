import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  handleOk(): void {
    console.log('Button ok clicked');
  }

  handleCancel(): void {
    console.log('Button cancel clicked');
  }
}
