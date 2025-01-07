// ==UserScript==
// @name         Tesla Kennzeichen - MoD
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Tesla Kennzeichen
// @author       Ghaleb
// @match        https://www.tesla.com/de_DE/teslaaccount/business/*
// @grant        none
// @icon         https://www.mobility-on-demand.com/wp-content/uploads/2019/05/signet-300-trans.png
// ==/UserScript==

(function() {
    'use strict';

    const vinToKennzeichen = {
        "XP7YGCEK5RB393212": "NW-MD-63E",
        "XP7YGCEK3RB409228": "NW-MD-69E",
        "XP7YGCEK1PB174423": "NW-MD-74E",
        "XP7YGCEK6PB103427": "NW-MD-91E",
        "XP7YGCEK1RB409227": "NW-MD-96E",
        "5YJ3E7EB3KF202496": "NW-MD-13E",
        "LRW3E7FA9LC104008": "NW-MD-16E",
        "5YJ3E7EA6MF883683": "NW-MD-19E",
        "7SAXCCE50PF392844": "NW-MD-120E",
        "7SAXCCE52PF393722": "NW-MD-130E",
        "5YJXCCE27KF186593": "NW-MD-10E",
        "5YJXCCE25HF034272": "NW-MD-3E",
        "XP7YGCEK8RB305415": "NW-MD-12E",
        "XP7YGCEK9PB151665": "NW-MD-64E",
        "XP7YGCES8RB437266": "NW-MD-149E",
        "XP7YGCES9RB440404": "NW-MD-153E",
        "XP7YGCEK8PB066073": "NW-MD-2E",
        "XP7YGCEK1PB149859": "NW-MD-47E",
        "XP7YGCEK3PB111100": "NW-MD-49E",
        "XP7YGCEK4PB189739": "NW-MD-53E",
        "XP7YGCEK8PB100786": "NW-MD-61E"
    };

    //  Hinzufügen der Kennzeichen
    function addKennzeichen() {
        const vinElements = document.querySelectorAll('a[data-cy="vin-link"]'); // Alle VIN-Links finden

        vinElements.forEach(link => {
            const vin = link.textContent.trim(); // VIN extrahieren
            if (vinToKennzeichen[vin]) {
                const kennzeichen = vinToKennzeichen[vin];

                // Prüfen, ob Kennzeichen bereits hinzugefügt wurde
                if (!link.parentElement.querySelector('.kennzeichen')) {
                    const kennzeichenElement = document.createElement('div');
                    kennzeichenElement.textContent = `${kennzeichen}`;
                    kennzeichenElement.className = 'kennzeichen';
                    kennzeichenElement.style.fontSize = '0.9em';
                    kennzeichenElement.style.color = '#4CAF50'; //  Farbe grün für Kennzeichen
                    kennzeichenElement.style.marginTop = '5px';
                    link.parentElement.appendChild(kennzeichenElement); // Kennzeichen einfügen
                }
            }
        });
    }

    // MutationObserver, um dynamische Änderungen zu erkennen
    const observer = new MutationObserver(() => {
        addKennzeichen();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initialer Aufruf
    addKennzeichen();
})();
