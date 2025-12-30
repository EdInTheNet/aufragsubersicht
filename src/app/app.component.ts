import { Component, computed, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { auftragsAnsicht } from './shared/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-root',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ZXingScannerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  //** HAUPTANSICHT */
  auftragsNummer = signal<string>('');

  //** NEBENANSICHT FÜR EINEN ODERER MEHRERE BESTANDTEILE EINSE AUFTRAGES Bsp. welche Teile geneau bearbeitet werden sollen */
  auftragBezeichnung = signal<string>(''); // Bsp. Montage, Zuschneiden, Sägen oder Kleben
  auftragsObjekt = signal<string>('');// Das Endergebeniss des Auftrages Bsp. ein Schrank 100 X 400
  auftragsMaterial = signal<string>('');// das Werkstück oder das material um das es sich handelt beim jetzigen Arbeitsschritt

  ngOnInit() {
    this.setData();
    this.erstelleAuftrag();
  };

  onScanSuccess(result: string) {
    try {
      const splittedResult = result.split('_');
      if (splittedResult.length < 3) throw new Error('ungültiger QR code');
      this.auftragsNummer.set(splittedResult.slice(0, 5).join(":"));
    } catch (err) {
      console.error(err);
    }
  }

  setData(): void {
    const testDaten: any[] = [
      { AuftragsNummer: '902.25.2345.00.01', AuftragsBezeichnung: 'Montage Einheit', AuftragsObjekt: 'C Basic', AuftraggsMaterial: 'HPL' },
    ];
    const d = testDaten[0];
    this.auftragsNummer.set(d.AuftragsNummer);
    this.auftragBezeichnung.set(d.AuftragsBezeichnung);
    this.auftragsObjekt.set(d.AuftragsObjekt);
    this.auftragsMaterial.set(d.AuftraggsMaterial);
  };

  routerToZeiterfassung() {
    window.open('https://auftragsakte.kemmlit.io/tools/auftragszeiterfassung-werk'); // soll später eine rout sein 
  }

  routerToMagazienApp() {
    return null;
  }

  routToFotoApp() {
    window.open('https://palettenkontrolle.kemmlit.io/main'); // soll später eine rout sein
  }

  erstelleAuftrag(): void {
    const newAuftrag: auftragsAnsicht = {
      AuftragsNummer: this.auftragsNummer(),
      AuftragsBezeichnung: this.auftragBezeichnung(),
      AuftragsObjekt: this.auftragsObjekt(),
      AuftraggsMaterial: this.auftragsMaterial(),
    };
    console.log(newAuftrag);
  };

}
