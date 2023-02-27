#!/bin/bash

while true; do
    # Supprimer léléments de la requette arp
    sudo ip neigh del <ip de la machine>

    # Récupérer la page avec curl
    curl http://exemple.com/page-victoire.html

    # Attendre 2 secondes avant de recommencer
    sleep 2
done
