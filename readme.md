Evaluation :

Le but est de créer une application dédiée à Rick et Morty.

L'application a deux onglets. Un onglet de recherche de personnages, un onglet de suivi d'épisodes vus.

# Onglet Personnages

## Écran formulaire

L'onglet de recherche a un formulaire de recherche avec deux champs :

- un champ texte pour filtrer sur le nom du personnage
- un switch pour indiquer qu'on ne veut que avoir des personnages morts dans les résultats de recherche
	Note : le texte à côté du switch est aussi cliquable pour activer/désactiver le switch plus facilement
- un bouton Rechercher

Au lancement de la recherche, on navigue sur un nouvel écran (même onglet) qui affiche les résultats de recherche.

Quand on soumet le formulaire, on sauvegarde l'état du formulaire en AsyncStorage. Quand on ouvre l'appli, on récupère l'état potentiel du formulaire depuis le AsyncStorage.
L'idée est de se souvenir de la dernière recherhe faite et de pré-remplir le formulaire quand on retourne sur l'appli.

## Écran résultats de recherche

La recherche est gérée via cette API : 
https://rickandmortyapi.com/documentation/#get-all-characters

Potentiellement, la recherche ne retourne pas résultat : gérer ce cas en affichant un message à l'utilisateur.

L'API ne retourne que 20 résultats maxi. On ne va pas gérer de quelconque pagination, on affichera toujours maximum 20 résultats.

On veut tout de même afficher à l'écran l'info du nombre de résultats au total (qui peut être très grand), et celui du nombre de résultats affichés.

Les résultats sont affichés sous forme de liste, chaque élément affichant le nom du personne et sa photo sur la même ligne.

À l'appui sur un résultat, on ouvre un nouvel écran (même onglet) qui affiche le nom du perso dans le titre de l'écran, puis l'image en grand.
On affiche aussi, ancré en bas de l'écran, un bouton "Retour au formulaire", pour directement retourner sur le formulaire.
Note : on ne veut pas refaire de requête réseau ici pour afficher l'image, on veut passer la donnée entre l'écran de liste et l'écran de détails.
Note bis : après avoir appuyé sur "Retour au formulaire", si j'appuie sur le bouton "retour" physique du téléphone, cela quitte bien l'appli.

À chaque affichage d'un nouvel écran de ce nouvel onglet, je peux aussi appuyer sur un bouton Retour affiché en haut à gauche de l'écran pour revenir à l'écrant précédent.

# Onglet Épisodes

Sur cet onglet il n'y a qu'un écran. On veut suivre notre avancée dans le visionnage de la saison 1 de Rick et Morty.

**En dur dans le code**, je vais avoir une liste de 11 épisodes. Par exemple :

```
const ALL_EPISODES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
```

Je veux afficher une liste des épisodes qu'il me reste à voir.

Chaque élément de la liste a, sur la même ligne :
	- du texte (exemple : "Episode 1")
	- ancré à droite, une icone de type "checkmark-circle". Quand on appuie sur cette icone, l'élément disparait : cela veut dire qu'on a vu l'épisode

À partir du moment où au moins un épisode a été vu, on affiche, ancré en bas de l'écran, un texte "Réinitialiser"
Quand on appuie sur Réinitialiser, une boite de confirmation apparait, demandant à l'utilisateur s'il veut vraiment faire ça. Appuyer sur "oui" refait apparaitre tous les épisodes, autrement dit, les remet dans l'état "à voir".

Les épisodes vus sont sauvegardés en AsyncStorage. Quand je quitte/reviens sur l'appli, la liste d'épisodes vus est la même qu'avant car elle est sauvegardé en local.


# Style visuel

Il n'est pas demandé d'avoir exactement le même style visuel que sur la démo. Le style visuel n'est pas le plus important. À faire en dernier et avec ce que vous voulez.

# Sur quoi vous êtes notés

Un point important de la note et qu'on ne devine pas forcément, est qu'il faut bien architecturer son code : créer des composants réutilisables quand il y a besoin, bien nommer ses variables, bref, faire que le code soit lisible et compréhensible.

Vous n'aurez surement pas le temps de tout finir. Priorisez le fait d'avoir une appli fonctionnelle sur les parties principales : afficher des résultats de recherche suivant votre formulaire, noter des épisodes comme vus. Si le bouton de confirmation de "réinitialiser" ou la synchro AsyncStorage n'est pas faite, ce ne sont pas les parties majeures du code, c'est moins grave.

# Règles

Vous avez le droit de consulter internet, regarder vos notes, les corrections d'exercices. Mais l'évaluation est cependant individuelle, aucune entre aide n'autorisée.

Vous avez jusqu'à 16h30 pour me rendre un fichier zip contenant votre appli (sans le dossier "node_modules") ou un lien vers votre projet uploadé sur github ou gitlab.