# iut-project Hafez MADI

## Setup

Lancer la commande docker:
```shell
docker run -d --name hapi-mysql\
-p 3307:3306 -e MYSQL_ROOT_PASSWORD=hapi\
-e MYSQL_DATABASE=user\
mysql:8.0 --default-authentication-plugin=mysql_native_password
```
Le projet utilise Nodemailer pour les mails.

Pour simuler leurs envoi, [Ethereal](https://ethereal.email/create) est utilisé
Modifiez le fichier iut-project/server/.env et renseignez les informations données par ethereal
```yaml
MAIL_HOST='smtp.ethereal.email'
MAIL_USER=<Username>
MAIL_PASSWORD=<Password>
```

## Lancement
A la racine du projet, lancer:
````shell
npm start
````

Ouvrir le navigateur à l'adresse:
http://localhost:3000/documentation

