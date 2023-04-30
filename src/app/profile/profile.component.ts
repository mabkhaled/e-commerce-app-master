import { Component } from '@angular/core';
import { authUser } from '../model/UserAuth';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/Product';
import { ProductList } from '../model/Product.DataSource';
import Swal from 'sweetalert2';
import { UserList } from '../model/User.DataSource';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  index: any;
  Swal = Swal;

  constructor(private router: Router) {
    if (authUser.length < 1) this.router.navigate(['/login'])
  }
  getUser() {
    return authUser;
  }
  editUserInformation(firstName: any, lastName: any, gmail: any, iPath: any) {
    console.log(UserList);
    
    this.index = UserList.findIndex((user) => user.Id == authUser[0].Id)
    console.log(this.index);
    
    if (gmail.length != '' && firstName != '' && lastName != '') {
      UserList[this.index].FirstName = firstName;
      UserList[this.index].LastName = lastName;
      UserList[this.index].Email = gmail;
      UserList[this.index].ImagePath = iPath;

      Swal.fire("Information Updated Successfully", "Information Updated!", "success");
    }
    else {
      Swal.fire("Update Failed", "Empty fields are available!", "error");
    }

  }
  editUserPassword(oldPassword:any,newPassword:any,newPasswordConfirm:any){
    this.index = UserList.findIndex((user) => user.Id == authUser[0].Id)

    if(UserList[this.index].Password==oldPassword){
      if(newPassword==newPasswordConfirm){
        UserList[this.index].Password = newPassword;

        Swal.fire("Password Updated Successfully", "Password Updated!", "success");
        this.logOut();
      }
      else{
        Swal.fire("Passwords Do Not Match", "Passwords Do Not Match!", "error");
      }
    }
    else{
      Swal.fire("Check your old password", "The old password is not correct!", "error");
    }
  }
  logOut(){
    for (var i = authUser.length; i > 0; i--) {
 
     authUser.pop();
      
     }
     Swal.fire("Signed out of the system", "Checked out!", "success");
     this.router.navigate(['/login']);
  }
}
