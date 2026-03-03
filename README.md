# Express REST API – Backend-Architekturprojekt

Dieses Projekt demonstriert den Aufbau einer strukturierten Backend-Anwendung mit **Node.js** und **Express**.

Der Fokus liegt auf einer klaren **Trennung der Verantwortlichkeiten innerhalb der Anwendung** sowie auf einer modularen Architektur, die Wartbarkeit und Erweiterbarkeit des Codes verbessert.

Die Anwendung stellt eine **REST-API** bereit und veranschaulicht typische Architekturprinzipien moderner Backend-Systeme.

---

# Architektur

Die Anwendung folgt einer klar strukturierten Schichtenarchitektur:

Routes → Controller → Services → Datenzugriff

**Routes**

- definieren die HTTP-Endpunkte
- verbinden HTTP-Requests mit den entsprechenden Controllern

**Controller**

- verarbeiten eingehende Requests
- validieren Eingaben
- steuern die API-Antworten

**Services**

- kapseln die Geschäftslogik
- entkoppeln Controller von der eigentlichen Anwendungslogik

**Middleware**

- übernimmt wiederverwendbare Aufgaben
- z. B. Request-Verarbeitung, Validierung oder Logging

---

# Wichtige Konzepte

Dieses Projekt demonstriert insbesondere folgende Backend-Konzepte:

- REST-API-Design mit Express
- modulare Backend-Struktur
- Controller-Service-Pattern
- Middleware-Pipeline
- Trennung von API-Schicht und Geschäftslogik
- strukturierte Projektorganisation
- automatisierte Tests
- Linting und Code-Formatierung

---

# Installation

Repository klonen

```bash
git clone https://github.com/pietow/express-rest-api-architecture.git
````

Abhängigkeiten installieren

```bash
npm install
```

Server starten

```bash
npm start
```

---

# Tests

Die Anwendung enthält automatisierte Tests.

Tests ausführen:

```bash
npm test
```

---

# Technologien

* Node.js
* Express
* JavaScript
* REST API
* Mocha (Tests)
* ESLint
* Prettier


