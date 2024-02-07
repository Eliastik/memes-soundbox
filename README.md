# Memes Soundbox

<img src="https://raw.githubusercontent.com/Eliastik/memes-soundbox/master/screenshot.png" width="640" alt="Screenshot 2" />
<img src="https://raw.githubusercontent.com/Eliastik/memes-soundbox/master/screenshot_1.png" width="640" alt="Screenshot" />

# Français

Memes Soundbox est une base permettant de créer des boîtes à sons de mèmes Internet totalement paramétrables, composées d'animations sonores. De plus, grâce à l'utilisation de mes librairies [Simple Sound Studio Library](https://github.com/eliastik/simple-sound-studio-lib) et ses [composants React](https://github.com/Eliastik/simple-sound-studio-components), il est possible de modifier la voix !

* Versions en ligne : [www.eliastiksofts.com/memes](https://www.eliastiksofts.com/memes)
* Repository Github : [https://github.com/Eliastik/memes-soundbox](https://github.com/Eliastik/memes-soundbox)
* Version : 1.0 (07/02/2024)

### Technologies

* TypeScript
* React
* NextJS
* Tailwind CSS / DaisyUI

### Credits

* Voir les dépendances dans le fichier package.json
* Utilise des fichiers [Impulse Response](https://en.wikipedia.org/wiki/Impulse_response) (pour le filtre de réverbération) [venant d'ici](http://www.cksde.com/p_6_250.htm) (Medium Damping Cave E002 M2S) et [d'ici](https://openairlib.net/?page_id=36) (lien vers les sources dans les paramètres du filtre)
* Utilise des icônes venant de [Heroicons](https://heroicons.com/) sous licence MIT
* Utilise des icônes venant de [Font Awesome](https://fontawesome.com/) - [Licence](https://github.com/FortAwesome/Font-Awesome/blob/6.x/LICENSE.txt)

## Créer ses propres boîtes à sons

### Première étape

Créez un fichier d'environnement ".env.dev" ou ".env.prod" dans le dossier du projet comme suit (ceci est un exemple d'un paramétrage basé sur mon site web) :

```
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_UPDATER_URI=https://www.eliastiksofts.com/memes/config/update.json
NEXT_PUBLIC_CONFIG_URI="https://www.eliastiksofts.com/memes/config/{memeName}.json"
NEXT_PUBLIC_MANIFEST_URI=https://www.eliastiksofts.com/memes/{memeName}/manifest.json
NEXT_PUBLIC_LINK_LIST_URI=https://www.eliastiksofts.com/memes/config/list.json
```

Ces URLs correspondent aux URLs vers les fichiers de configuration que nous allons paramétrer par la suite : template de configuration d'une boîte à sons, et URL du fichier de configuration comprenant la liste des boîtes à sons.

L'application remplace le placeholder "memeName" par l'identifiant de la boîte à sons (paramétré à la deuxième étape) pour aller chercher les différents fichiers de configuration.

### Deuxième étape

Créez un fichier de configuration contenant la liste des boîtes à sons que vous souhaitez mettre en place. Voici un exemple correspondant aux captures d'écran. Il s'agit d'un fichier JSON :

```
[
    {
            "labels": {
                "fr": "Denis Brogniart – Ah !",
                "en": "Denis Brogniart – Ah !"
            },
            "url": "https://www.eliastiksofts.com/memes/ah",
            "code": "ah"
    },
    {
            "labels": {
                "fr": "La boîte à El Risitas",
                "en": "El Risitas Soundbox"
            },
            "url": "https://www.eliastiksofts.com/memes/risitas",
            "code": "risitas"
    }
]
```

Ce fichier comprend l'URL vers la boîte à son en question, un identifiant (code) et les labels (différents selon la langue)

### Troisième étape

Créez un fichier de configuration pour votre boîte à sons. Voici un exemple de configuration JSON :

```
{
  "appTitle": {
      "fr": "Denis Brogniart – Ah !",
      "en": "Denis Brogniart – Ah !"
  },
  "windowTitle": {
      "fr": "Boite à sons Denis Brogniart – Ah !",
      "en": "Soundbox Denis Brogniart – Ah !"
  },
  "favicon": "https://www.eliastiksofts.com/memes/icons/ah/favicon.ico",
  "icon": "https://www.eliastiksofts.com/memes/icons/ah/icon_512.png",
  "soundboxDescription": {
      "fr": "Le fameux Ah de Denis Brogniart (dans l'émission Koh-Lanta) ! Apparemment, les femmes ne savent pas faire de cabanes. Cliquez autant de fois que vous voulez sur Denis pour qu'il dise Ah. Vous pouvez aussi modifier sa voix !",
      "en": "Denis Brogniart's famous Ah (on Koh-Lanta)! Click as many times as you like on Denis to make him say Ah. You can also change his voice!"
  },
  "sounds": [
    {
      "labels": {
        "fr": "Ah !",
        "en": "Ah !"
      },
      "soundURL": "https://www.eliastiksofts.com/memes/assets/ah/sounds/ah.mp3",
      "animationURL": "https://www.eliastiksofts.com/memes/assets/ah/img/ah.gif",
      "animationSize": 365961,
      "soundDescription": {
          "fr": "Description du son",
          "en": "Sound description"
      },
      "sourceURL": "https://www.google.fr"
    },
    {
      "labels": {
        "fr": "Ah ! (entier)",
        "en": "Ah ! (full)"
      },
      "soundURL": "https://www.eliastiksofts.com/memes/assets/ah/sounds/ah.mp3",
      "animationURL": "https://www.eliastiksofts.com/memes/assets/ah/img/ah_full.gif",
      "animationSize": 1821614
    }
  ]
}
```

## Journal des versions

* Version 1.0 (07/02/2024) :
    - Version initiale

# English

Memes Soundbox is a base for creating fully customizable soundboxes of Internet memes, composed of sound animations. Thanks to the use of my [Simple Sound Studio Library](https://github.com/eliastik/simple-sound-studio-lib) and its [React components](https://github.com/Eliastik/simple-sound-studio-components), it's possible to modify the voice!

* Online versions: [www.eliastiksofts.com/memes](https://www.eliastiksofts.com/memes)
* Github repository: [https://github.com/Eliastik/memes-soundbox](https://github.com/Eliastik/memes-soundbox)
* Version: 1.0 (2/7/2024)

### Technologies

* TypeScript
* React
* NextJS
* Tailwind CSS / DaisyUI

### Credits

* See dependencies in package.json file
* Uses files [Impulse Response](https://en.wikipedia.org/wiki/Impulse_response) (for the reverb filter) [from here](http://www.cksde.com/p_6_250.htm) (Medium Damping Cave E002 M2S) and [here](https://openairlib.net/?page_id=36) (link to sources in filter parameters)
* Uses icons from [Heroicons](https://heroicons.com/) under MIT license
* Uses icons from [Font Awesome](https://fontawesome.com/) - [License](https://github.com/FortAwesome/Font-Awesome/blob/6.x/LICENSE.txt)

## Create your own soundboxes

### First step

Create a ".env.dev" or ".env.prod" environment file in the project folder as follows (this is an example of a setup based on my website):

```
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_UPDATER_URI=https://www.eliastiksofts.com/memes/config/update.json
NEXT_PUBLIC_CONFIG_URI="https://www.eliastiksofts.com/memes/config/{memeName}.json"
NEXT_PUBLIC_MANIFEST_URI=https://www.eliastiksofts.com/memes/{memeName}/manifest.json
NEXT_PUBLIC_LINK_LIST_URI=https://www.eliastiksofts.com/memes/config/list.json
```

These URLs correspond to the URLs to the configuration files we'll be setting up later: soundbox configuration template, and URL to the configuration file containing the list of soundboxes.

The application replaces the "memeName" placeholder with the sound box identifier (set in the second step) to fetch the various configuration files.

### Second step

Create a configuration file containing the list of soundboxes you wish to set up. Here's an example corresponding to the screenshots. It's a JSON file:

```
[
    {
            "labels": {
                "fr": "Denis Brogniart – Ah !",
                "en": "Denis Brogniart – Ah !"
            },
            "url": "https://www.eliastiksofts.com/memes/ah",
            "code": "ah"
    },
    {
            "labels": {
                "fr": "La boîte à El Risitas",
                "en": "El Risitas Soundbox"
            },
            "url": "https://www.eliastiksofts.com/memes/risitas",
            "code": "risitas"
    }
]
```

This file includes the URL to the soundbox in question, an identifier (code) and the labels (different depending on the language).

### Step 3

Create a configuration file for your soundbox. Here's an example of a JSON configuration file:

```
{
  "appTitle": {
      "fr": "Denis Brogniart – Ah !",
      "en": "Denis Brogniart – Ah !"
  },
  "windowTitle": {
      "fr": "Boite à sons Denis Brogniart – Ah !",
      "en": "Soundbox Denis Brogniart – Ah !"
  },
  "favicon": "https://www.eliastiksofts.com/memes/icons/ah/favicon.ico",
  "icon": "https://www.eliastiksofts.com/memes/icons/ah/icon_512.png",
  "soundboxDescription": {
      "fr": "Le fameux Ah de Denis Brogniart (dans l'émission Koh-Lanta) ! Apparemment, les femmes ne savent pas faire de cabanes. Cliquez autant de fois que vous voulez sur Denis pour qu'il dise Ah. Vous pouvez aussi modifier sa voix !",
      "en": "Denis Brogniart's famous Ah (on Koh-Lanta)! Click as many times as you like on Denis to make him say Ah. You can also change his voice!"
  },
  "sounds": [
    {
      "labels": {
        "fr": "Ah !",
        "en": "Ah !"
      },
      "soundURL": "https://www.eliastiksofts.com/memes/assets/ah/sounds/ah.mp3",
      "animationURL": "https://www.eliastiksofts.com/memes/assets/ah/img/ah.gif",
      "animationSize": 365961,
      "soundDescription": {
          "fr": "Description du son",
          "en": "Sound description"
      },
      "sourceURL": "https://www.google.fr"
    },
    {
      "labels": {
        "fr": "Ah ! (entier)",
        "en": "Ah ! (full)"
      },
      "soundURL": "https://www.eliastiksofts.com/memes/assets/ah/sounds/ah.mp3",
      "animationURL": "https://www.eliastiksofts.com/memes/assets/ah/img/ah_full.gif",
      "animationSize": 1821614
    }
  ]
}
```

## Journal des versions

* Version 1.0 (2/7/2024) :
    - Initial version
