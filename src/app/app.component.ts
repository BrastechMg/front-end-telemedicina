import { Component } from '@angular/core';
import { WhiteLabelDto } from './models/dto/white-label.dto';
import { WhiteLabelService } from './services/white-label.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Cartão Saúde Ouro';
  isLoading: boolean = true;
  constructor(private whiteLabel: WhiteLabelService) {
  }

  ngOnInit() {
    //const domain = window.location.hostname; //Para produção
    const domain = window.location.port; //Para testes

    this.getWhiteLabelVariables(domain);
  }

  getWhiteLabelVariables(domain: string){
    this.whiteLabel.getWhiteLabelLayout(domain).subscribe({
      next: ({primaryColor, contrastColor, textColor, cnpj}: WhiteLabelDto) => {

        this.setVariable('--primary-color', primaryColor)
        this.setVariable('--secondary-color', contrastColor)
        this.setVariable('--primary-text', textColor) 
        localStorage.setItem("CNPJ", cnpj)
        this.isLoading = false
      },
      error: (err) => {

      }
    })
  }

  setVariable(variable: string, value: string){
    document.documentElement.style.setProperty(variable, value)
  }

  onActivate(event: any) {
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 }
}


