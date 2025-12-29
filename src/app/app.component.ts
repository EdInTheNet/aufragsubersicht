import { Component, computed, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { auftragsAnsicht } from './shared/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  //** HAUPTANSICHT */

  id = signal<number>(0);
  auftragsNummer = signal<string>('');// BA Nummer zum Beispiel oderr interne Auftragsnummer

  //** NEBENANSICHT FÜR EINEN ODERER MEHRERE BESTANDTEILE EINSE AUFTRAGES Bsp. welche Teile geneau bearbeitet werden sollen */

  auftragBezeichnung = signal<string>(''); // Bsp. Montage, Zuschneiden, Sägen oder Kleben
  auftragsObjekt = signal<string>('');// Das Endergebeniss des Auftrages Bsp. ein Schrank 100 X 400
  auftragsMaterial = signal<string>('');// das Werkstück oder das material um das es sich handelt beim jetzigen Arbeitsschritt

  ngOnInit() {
    this.setData();
    this.erstelleAuftrag();
  };

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

  callImageUrl() {
    //TODO Stock Bilder für alle Material und Auftrags Arten suchen und einfügen und dann abrufen
  }

  routerToZeiterfassung() {
    window.open('https://auftragsakte.kemmlit.io/tools/auftragszeiterfassung-werk');
  }

  routerToMagazienApp() {
    return null;
  }

  routToFotoApp() {
    window.open('https://palettenkontrolle.kemmlit.io/main');
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
