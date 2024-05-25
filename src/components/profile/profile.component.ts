import { Component } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { User } from '../../models/user';
import { EncryptionService } from '../../services/encryption.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './profile.component.html',
  // styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user = new User();

  constructor(private encryption: EncryptionService) {
    
    this.user  = this.encryption.decrypt(localStorage.getItem('currentUser')!);
  }

}
