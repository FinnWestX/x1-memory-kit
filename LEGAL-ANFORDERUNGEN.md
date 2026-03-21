# Legal-Anforderungen für x1-landing Website
# Stand: 21.03.2026 — Recherchiert aus IT-Recht Kanzlei, eRecht24, Händlerbund, IHK

---

## 1. Impressum (§5 DDG, NICHT TMG!)

### Pflichtangaben:
- Vollständiger Vor- und Nachname (bürgerlicher Name, kein Pseudonym)
- Ladungsfähige Anschrift (Straße, Hausnummer, PLZ, Ort — kein Postfach)
- E-Mail-Adresse
- Zweiter Kontaktweg (Telefon ODER Kontaktformular mit Antwort in 30-60 Min)
- Wirtschafts-Identifikationsnummer (W-IdNr.) — Pflicht sobald zugewiesen, wenn keine USt-IdNr.
- Kleinunternehmer-Hinweis: "Kleinunternehmer gemäß §19 UStG — es wird keine Umsatzsteuer erhoben"
- VSBG-Hinweis (Pflicht weil wir AGB haben): "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."

### NICHT nötig:
- Handelsregisternummer (kein HR-Eintrag)
- Aufsichtsbehörde (kein zulassungspflichtiger Beruf)
- Verantwortlicher nach §18 MStV (kein journalistischer Inhalt)
- EU-Streitbeilegungslink (Plattform seit 20.07.2025 abgeschaltet — Link MUSS RAUS)
- Persönliche Steuer-ID (privat, NICHT veröffentlichen!)

### Postflex-Adresse:
```
[Vor- und Nachname]
Finn West
c/o Postflex #[Vertrags-ID]
Emsdettener Straße 10
48268 Greven
```

---

## 2. Widerrufsbelehrung (§§355, 356 BGB)

### Grundsatz:
- 14 Tage Widerrufsrecht ab Vertragsschluss
- Bei digitalen Downloads kann Widerrufsrecht vorzeitig erlöschen (§356 Abs. 5 Nr. 2 BGB)

### Vier Voraussetzungen für Erlöschen:
1. Unternehmer hat mit Vertragserfüllung begonnen (Download freigeschaltet)
2. Verbraucher hat ausdrücklich zugestimmt (aktive Checkbox, NICHT vorausgefüllt)
3. Verbraucher hat Kenntnis vom Verlust des Widerrufsrechts bestätigt
4. Bestätigungsmail mit allem auf dauerhaftem Datenträger

### Checkbox-Text (SEPARATE Checkbox, nicht mit AGB kombinieren):
"Ich stimme ausdrücklich zu, dass vor Ablauf der Widerrufsfrist mit der Ausführung des Vertrages begonnen wird. Mir ist bekannt, dass ich durch die Bereitstellung der digitalen Inhalte mein Widerrufsrecht verliere."

### Muster-Widerrufsformular (PFLICHT, Anlage 2 EGBGB):
```
Muster-Widerrufsformular

(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)

— An [Name, Anschrift, E-Mail]:

— Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Bereitstellung der folgenden digitalen Inhalte (*)

— Bestellt am (*)

— Name des/der Verbraucher(s)

— Anschrift des/der Verbraucher(s)

— Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)

— Datum

(*) Unzutreffendes streichen.
```

### Ohne korrekte Belehrung:
- Widerrufsfrist verlängert sich auf 12 Monate + 14 Tage
- Kunde behält Download UND bekommt Geld zurück
- Kein Wertersatz bei digitalen Inhalten (§357a BGB)

### Ab 19.06.2026: Widerrufsbutton wird Pflicht (§356a BGB)

---

## 3. AGB

### Pflichtklauseln für digitale Produkte:
1. Geltungsbereich (B2C, Verbraucherdefinition §13 BGB)
2. Vertragsschluss (Bestellung = Angebot, Bestätigung = Annahme)
3. Preise: "Aufgrund der Kleinunternehmerregelung gemäß §19 UStG wird keine Umsatzsteuer erhoben und daher auch nicht ausgewiesen."
4. Bereitstellung: Sofort-Download nach Zahlungseingang per E-Mail
5. Widerrufsrecht + Erlöschen bei digitalen Inhalten
6. Nutzungsrechte: Persönliche Nutzung, Anpassung erlaubt, Weitergabe/Weiterverkauf verboten
7. Gewährleistung: Gesetzliche Rechte, NICHT verkürzen bei B2C
8. Haftung: Unbeschränkt für Vorsatz + grobe Fahrlässigkeit + Leben/Körper/Gesundheit. Bei leichter Fahrlässigkeit nur Kardinalpflichten.
9. Streitbeilegung: VSBG-Hinweis
10. Anwendbares Recht: Deutsches Recht, UN-Kaufrecht ausgeschlossen
11. Salvatorische Klausel (OHNE Ersetzungsklausel — BGH-unwirksam)

### VERBOTEN in AGB:
- "inkl. MwSt." als Kleinunternehmer
- Haftungsausschluss für Vorsatz/grobe Fahrlässigkeit
- Haftungsausschluss für Leben/Körper/Gesundheit
- Gewährleistungsverkürzung bei B2C
- Pauschalierter Schadenersatz über typischen Schaden hinaus
- Salvatorische Klausel mit "Ersetzung"
- OS-Plattform-Link (seit 20.07.2025 abgeschaltet)

### Bestellbutton MUSS heißen: "zahlungspflichtig bestellen" (oder ähnlich klar)

---

## 4. Datenschutzerklärung (DSGVO)

### Muss enthalten:
- Verantwortlicher (Name, Adresse, E-Mail)
- Erhobene Daten (Name, E-Mail bei Kauf via Stripe)
- Zahlungsabwicklung: Stripe Inc., San Francisco — Link zu deren Datenschutzerklärung
- Hosting: GitHub Pages / Microsoft — Hinweis auf Datenübertragung USA, Standardvertragsklauseln
- Cookies: Nur technisch notwendige (kein Cookie-Banner nötig)
- SSL/TLS-Verschlüsselung
- Rechte der Betroffenen: Auskunft, Löschung, Berichtigung, Widerspruch, Datenportabilität (Art. 15-21 DSGVO)
- Beschwerderecht bei Aufsichtsbehörde

---

## 5. Checkout-Anforderungen

- [ ] Button: "zahlungspflichtig bestellen"
- [ ] Checkbox 1 (AGB): "Ich habe die AGB gelesen und akzeptiere sie"
- [ ] Checkbox 2 (Widerruf, SEPARAT): "Ich stimme ausdrücklich zu, dass vor Ablauf der Widerrufsfrist mit der Ausführung des Vertrages begonnen wird. Mir ist bekannt, dass ich durch die Bereitstellung der digitalen Inhalte mein Widerrufsrecht verliere."
- [ ] Beide Checkboxen NICHT vorausgefüllt
- [ ] Bestellung nur möglich wenn beide aktiviert
- [ ] Bestätigungsmail mit: Widerrufsbelehrung + Checkbox-Text + Muster-Widerrufsformular

---

## 6. Offene Punkte

- [ ] Postflex-Adresse eintragen (in Arbeit)
- [ ] Bürgerlicher Name eintragen
- [ ] Wirtschafts-ID eintragen (sobald zugewiesen)
- [ ] Stripe Live-Key einbauen
- [ ] Bestätigungsmail-System einrichten (Stripe Webhooks)
- [ ] Ab 19.06.2026: Widerrufsbutton einbauen
- [ ] Datenschutzerklärung: Warte auf Agent 4 Ergebnis
