import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
providedIn: 'root'
})
export class ToastBasicService {
constructor(private toastr: ToastrService ){}

error(message: string, title: string){
    this.toastr.error(`${message}`, `${title}`, {
        closeButton: true,
        progressBar: true
    })
}

sucess(message: string, title: string){
    this.toastr.success(`${message}`, `${title}`, {
        closeButton: true,
        progressBar: true
    })
}

info(message: string, title: string){
    this.toastr.info(`${message}`, `${title}`, {
        closeButton: true,
        progressBar: true
    })
}

warning(message: string, title: string){
    this.toastr.warning(`${message}`, `${title}`, {
        closeButton: true,
        progressBar: true
    })
}
}